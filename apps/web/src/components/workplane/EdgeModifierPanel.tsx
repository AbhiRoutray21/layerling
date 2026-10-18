"use client";

import { GuideHelpLink } from "@/components/GuideHelpLink";
import { MovableToolPanel } from "@/components/workplane/MovableToolPanel";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Check, LoaderCircle, Minus, Pencil, Plus, RotateCcw, X } from "lucide-react";
import { displayStepFromMillimeters, displayToMillimeters, formatMeasurementNumber, lengthDisplayUnit, millimetersToDisplay, parseMeasurementInput } from "@/lib/measurementUnits";
import type { CadModifierKind, CadModifierQuality } from "@/lib/cadModifierTypes";
import { CAD_MODIFIER_MAX_SHARP_ANGLE, cadModifierUserErrorMessage, edgeModifierSelectionStatus } from "@/lib/cadModifierRuntime";
import { t } from "@/lib/i18n";
import { useLanguage } from "@/lib/useLanguage";
import type { WorkplaneWorkspaceSettings } from "@/types/layerling";
import { selectWholeValue } from "@/lib/numberField";

const MIN_EDGE_MODIFIER_AMOUNT = 0.001;
const EDGE_MODIFIER_AMOUNT_STEP = 0.001;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function formatSliderValue(value: number, accuracy: WorkplaneWorkspaceSettings["accuracy"], step: number) {
  if (step >= 1) return String(Math.round(value));
  return formatMeasurementNumber(value, accuracy, step);
}

export type EdgeHistoryOption = {
  id: string;
  label: string;
  kind: CadModifierKind;
  amount: number;
  edgeCount: number;
  /** Only for a deletion of faces. */
  faceCount?: number;
  targetName: string;
  removesNewerCount: number;
  /** Opens the tool again with the value and edges it had. */
  editable: boolean;
};

/** Der gespeicherte Text ist englisch - fuer die Tafel wird er neu gesetzt. */
function edgeHistoryLabel(option: EdgeHistoryOption) {
  const size = String(Number(option.amount.toFixed(2)));
  if (option.kind === "shell") return t("edge.revertShell", { size });
  if (option.kind === "deleteFace") {
    return option.faceCount === 1 ? t("edge.revertDeleteFaceOne") : t("edge.revertDeleteFaceMany", { count: option.faceCount ?? 0 });
  }
  if (option.edgeCount === 1) {
    return t(option.kind === "fillet" ? "edge.revertFilletOne" : option.kind === "chamfillet" ? "edge.revertChamfilletOne" : "edge.revertChamferOne", { size });
  }
  return t(option.kind === "fillet" ? "edge.revertFilletMany" : option.kind === "chamfillet" ? "edge.revertChamfilletMany" : "edge.revertChamferMany", { size, count: option.edgeCount });
}

/**
 * The treatments a body already has - fillets, chamfers, hollowing, deleted faces - with "Revert" for each and
 * "Edit" where the tool can be opened again with the same values (#227). The fillet and chamfer
 * tool, the hollow tool and Delete face show the same list (#237).
 */
/**
 * Whether the list was open when it was last left. Taking a feature back opens the tool again on the restored body, which
 * builds the panel anew, and a list that shut itself after every click made taking back several in a row a chore (#517).
 */
let historyListWasOpen = false;

export function EdgeFeatureHistory({
  appliedFeatureCount,
  reversibleFeatureCount,
  historyOptions,
  onRemoveFeature,
  onEditFeature,
}: {
  appliedFeatureCount: number;
  reversibleFeatureCount: number;
  historyOptions: EdgeHistoryOption[];
  onRemoveFeature: (id: string) => void;
  onEditFeature?: (id: string) => void;
}) {
  const [historyOpen, setHistoryOpenState] = useState(historyListWasOpen);
  const setHistoryOpen = (update: (open: boolean) => boolean) => {
    setHistoryOpenState((open) => {
      const next = update(open);
      historyListWasOpen = next;
      return next;
    });
  };
  if (appliedFeatureCount === 0) return null;
  return (
    <div className="edge-modifier-history-actions">
      <button
        className="edge-modifier-history-toggle"
        type="button"
        aria-expanded={historyOpen}
        disabled={reversibleFeatureCount === 0}
        onClick={() => setHistoryOpen((open) => !open)}
      >
        {historyOpen ? <Minus size={15} /> : <Plus size={15} />}
        <span>{t("edge.featureHistory")}</span>
      </button>
      {reversibleFeatureCount === 0 ? <span>{t("edge.noStoredHistory")}</span> : null}
      {historyOpen && historyOptions.length > 0 ? (
        <div className="edge-modifier-history-list">
          <p className="edge-modifier-history-hint">{t("edge.revertHint")}</p>
          {historyOptions.map((option) => (
            <div className="edge-modifier-history-row" key={option.id}>
              <button className="edge-modifier-history-item" type="button" onClick={() => onRemoveFeature(option.id)}>
                <RotateCcw size={14} />
                <span>
                  <strong>{`${t("edge.revertAction")}: ${edgeHistoryLabel(option)}`}</strong>
                  <small>{option.targetName}</small>
                  {option.removesNewerCount > 0 ? (
                    <small className="edge-modifier-history-warning">{t("edge.alsoRemovesNewer", { count: option.removesNewerCount })}</small>
                  ) : null}
                </span>
              </button>
              {option.editable && onEditFeature ? (
                <button className="edge-modifier-history-edit" type="button" title={t("edge.editHint")} onClick={() => onEditFeature(option.id)}>
                  <Pencil size={14} />
                  <span>{t("edge.editAction")}</span>
                </button>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function EdgeModifierSlider({
  label,
  value,
  min,
  max,
  step,
  unit,
  workspace,
  length = false,
  disabled = false,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  workspace: WorkplaneWorkspaceSettings;
  length?: boolean;
  disabled?: boolean;
  onChange: (value: number) => void;
}) {
  const safeMin = Number.isFinite(min) ? min : 0;
  const safeMax = Math.max(safeMin, Number.isFinite(max) ? max : safeMin);
  const actualValue = Number.isFinite(value) ? value : safeMin;
  const controlValue = length ? millimetersToDisplay(actualValue, workspace) : actualValue;
  const controlMin = length ? millimetersToDisplay(safeMin, workspace) : safeMin;
  const controlMax = length ? millimetersToDisplay(safeMax, workspace) : safeMax;
  const controlStep = length ? displayStepFromMillimeters(step, workspace) : step;
  const sliderValue = clamp(controlValue, controlMin, controlMax);
  const position = ((sliderValue - controlMin) / Math.max(Number.EPSILON, controlMax - controlMin)) * 100;
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(formatSliderValue(controlValue, workspace.accuracy, controlStep));
  const unitLabel = length ? lengthDisplayUnit(workspace).label : unit;

  useEffect(() => {
    if (!editing) {
      setDraft(formatSliderValue(controlValue, workspace.accuracy, controlStep));
    }
  }, [controlStep, controlValue, editing, workspace.accuracy]);

  const toModelValue = (nextValue: number) => length ? displayToMillimeters(nextValue, workspace) : nextValue;

  const commitDraft = () => {
    const next = parseMeasurementInput(draft);
    const finiteNext = Number.isFinite(next) ? next : controlValue;
    const committed = clamp(toModelValue(finiteNext), safeMin, safeMax);
    // Leaving the field without a change is no change: reporting it threw the preview
    // away and nothing computed a new one, so Apply spun for good (#204).
    if (Math.abs(committed - actualValue) > 1e-9) onChange(committed);
    setEditing(false);
  };

  const handleSliderChange = (nextValue: number) => {
    const next = clamp(Number.isFinite(nextValue) ? nextValue : controlMin, controlMin, controlMax);
    onChange(clamp(toModelValue(next), safeMin, safeMax));
    setDraft(formatSliderValue(next, workspace.accuracy, controlStep));
  };

  return (
    <label className="edge-modifier-field edge-modifier-slider range-property" style={{ "--slider-pos": `${position}%` } as CSSProperties}>
      <span className="range-property-header">
        <span className="range-property-name">{label}</span>
        <span className="range-value-control">
          <input
            type="text"
            value={editing ? draft : formatSliderValue(controlValue, workspace.accuracy, controlStep)}
            inputMode="decimal"
            disabled={disabled}
            onFocus={(event) => {
              setDraft(formatSliderValue(controlValue, workspace.accuracy, controlStep));
              setEditing(true);
              selectWholeValue(event.currentTarget);
            }}
            onChange={(event) => setDraft(event.currentTarget.value)}
            onBlur={commitDraft}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                event.stopPropagation();
                event.currentTarget.blur();
              } else if (event.key === "Escape") {
                event.preventDefault();
                event.stopPropagation();
                setDraft(formatSliderValue(controlValue, workspace.accuracy, controlStep));
                setEditing(false);
              }
            }}
          />
          {unitLabel ? <span className={`range-value-unit${unitLabel === "°" ? " degree" : ""}`}>{unitLabel}</span> : null}
        </span>
      </span>
      <div className="range-control">
        <input
          type="range"
          min={controlMin}
          max={controlMax}
          step={controlStep}
          value={sliderValue}
          disabled={disabled}
          onChange={(event) => handleSliderChange(Number(event.currentTarget.value))}
        />
      </div>
    </label>
  );
}

export function EdgeModifierPanel({
  kind,
  amount,
  maxAmount,
  chamferAngle,
  quality,
  sharpAngle,
  workspace,
  tangentChain,
  onlyVisibleEdges,
  impliedEdgeCount = 0,
  preserveEdgeSize,
  targetName,
  groupedCount,
  appliedFeatureCount,
  reversibleFeatureCount,
  historyOptions,
  selectedCount,
  availableCount,
  busy,
  prepared,
  error,
  onAmountChange,
  onChamferAngleChange,
  onKindChange,
  onQualityChange,
  onSharpAngleChange,
  onTangentChainChange,
  onOnlyVisibleEdgesChange,
  onPreserveEdgeSizeChange,
  onSelectAll,
  onSelectTop,
  onSelectBottom,
  onSelectVertical,
  activeQuickSelection = null,
  onClear,
  onRemoveFeature,
  onEditFeature,
  onApply,
  onCancel,
}: {
  kind: CadModifierKind;
  amount: number;
  maxAmount: number;
  chamferAngle: number;
  quality: CadModifierQuality;
  sharpAngle: number;
  workspace: WorkplaneWorkspaceSettings;
  tangentChain: boolean;
  /** Hide the edges the body covers from this view instead of drawing them through it. */
  onlyVisibleEdges: boolean;
  /** Edges the kernel will treat as well, because they run on smoothly from a picked one (#161). */
  impliedEdgeCount?: number;
  preserveEdgeSize: boolean;
  targetName: string;
  groupedCount: number;
  appliedFeatureCount: number;
  reversibleFeatureCount: number;
  historyOptions: EdgeHistoryOption[];
  selectedCount: number;
  availableCount: number;
  busy: boolean;
  prepared: boolean;
  error: string | null;
  onAmountChange: (value: number) => void;
  onChamferAngleChange: (value: number) => void;
  onKindChange?: (kind: "chamfer" | "chamfillet") => void;
  onQualityChange: (value: CadModifierQuality) => void;
  onSharpAngleChange: (value: number) => void;
  onTangentChainChange: (value: boolean) => void;
  onOnlyVisibleEdgesChange: (value: boolean) => void;
  onPreserveEdgeSizeChange: (value: boolean) => void;
  onSelectAll: () => void;
  /** Picks only the edges along the very top, e.g. the rim of a cookie cutter (#154). */
  onSelectTop?: () => void;
  onSelectBottom?: () => void;
  onSelectVertical?: () => void;
  /** Which of the quick buttons made the edges picked now, to light it up (#517). */
  activeQuickSelection?: "all" | "top" | "bottom" | "vertical" | null;
  onClear: () => void;
  onRemoveFeature: (id: string) => void;
  /** Takes a treatment back and opens the tool again with its value and edges (#227). */
  onEditFeature?: (id: string) => void;
  onApply: () => void;
  onCancel: () => void;
}) {
  useLanguage();
  const title = kind === "fillet" ? t("edge.filletTitle") : kind === "chamfillet" ? t("edge.chamfilletTitle") : t("edge.chamferTitle");
  const amountMin = Math.min(MIN_EDGE_MODIFIER_AMOUNT, Math.max(Number.EPSILON, maxAmount));
  const amountMax = Math.max(amountMin, maxAmount);
  // On a short screen the panel scrolls, and the error sits at its foot under
  // the buttons: bring the whole bottom into view whenever a message appears.
  const errorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const panel = errorRef.current?.closest<HTMLElement>(".edge-modifier-panel");
    if (panel) panel.scrollTop = panel.scrollHeight;
  }, [error]);
  return (
    <MovableToolPanel className="edge-modifier-panel" ariaLabel={title}>
      {(handleProps) => (<>
      <div className="edge-modifier-header movable" title={t("panel.moveHint")} {...handleProps}>
        <div>
          <strong>{title}</strong>
          <span>{edgeModifierSelectionStatus(prepared, selectedCount, availableCount)}</span>
        </div>
        <div className="panel-header-actions">
          <GuideHelpLink section="edgeTreatment" />
          <button type="button" aria-label={kind === "fillet" ? t("edge.cancelFillet") : t("edge.cancelChamfer")} onClick={onCancel}><X size={20} /></button>
        </div>
      </div>

      <div className={`edge-modifier-target ${groupedCount > 0 ? "grouped" : ""}`}>
        <strong>{targetName}</strong>
        <span>
          {groupedCount > 0 ? t("edge.groupedObjects", { count: groupedCount }) : t("edge.singleObject")}
          {appliedFeatureCount === 0
            ? ""
            : appliedFeatureCount === 1
              ? t("edge.existingFeatureOne")
              : t("edge.existingFeatureMany", { count: appliedFeatureCount })}
        </span>
      </div>

      <div className="edge-modifier-selection-help">
        {!prepared ? t("edge.loading") : busy ? t("edge.previewBusy") : t("edge.selectionHelp")}
      </div>

      <div className="edge-modifier-quick-actions">
        <button type="button" className={activeQuickSelection === "all" ? "active" : ""} aria-pressed={activeQuickSelection === "all"} disabled={!prepared} onClick={onSelectAll}>{t("edge.allSharpEdges")}</button>
        {onSelectTop ? <button type="button" className={activeQuickSelection === "top" ? "active" : ""} aria-pressed={activeQuickSelection === "top"} disabled={!prepared} title={t("edge.topEdgesHint")} onClick={onSelectTop}>{t("edge.topEdges")}</button> : null}
        {onSelectBottom ? <button type="button" className={activeQuickSelection === "bottom" ? "active" : ""} aria-pressed={activeQuickSelection === "bottom"} disabled={!prepared} title={t("edge.bottomEdgesHint")} onClick={onSelectBottom}>{t("edge.bottomEdges")}</button> : null}
        {onSelectVertical ? <button type="button" className={activeQuickSelection === "vertical" ? "active" : ""} aria-pressed={activeQuickSelection === "vertical"} disabled={!prepared} title={t("edge.verticalEdgesHint")} onClick={onSelectVertical}>{t("edge.verticalEdges")}</button> : null}
        <button type="button" disabled={!prepared} onClick={onClear}>{t("edge.clear")}</button>
      </div>

      <EdgeFeatureHistory
        appliedFeatureCount={appliedFeatureCount}
        reversibleFeatureCount={reversibleFeatureCount}
        historyOptions={historyOptions}
        onRemoveFeature={onRemoveFeature}
        onEditFeature={onEditFeature}
      />

      {(kind === "chamfer" || kind === "chamfillet") && onKindChange ? (
        <div className="edge-modifier-field shell-openings" role="radiogroup" aria-label={t("edge.chamferTitle")}>
          <div className="shell-opening-options">
            <button
              type="button"
              role="radio"
              aria-checked={kind === "chamfer"}
              className={kind === "chamfer" ? "active" : ""}
              disabled={!prepared}
              onClick={() => onKindChange("chamfer")}
            >
              {t("editor.tool.chamfer")}
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={kind === "chamfillet"}
              className={kind === "chamfillet" ? "active" : ""}
              disabled={!prepared}
              title={t("edge.chamfilletHint")}
              onClick={() => onKindChange("chamfillet")}
            >
              {t("edge.chamfillet")}
            </button>
          </div>
          {kind === "chamfillet" ? <span className="shell-openings-summary">{t("edge.chamfilletHint")}</span> : null}
        </div>
      ) : null}

      <EdgeModifierSlider
        label={kind === "fillet" ? t("edge.radius") : t("edge.distance")}
        value={amount}
        min={amountMin}
        max={amountMax}
        step={EDGE_MODIFIER_AMOUNT_STEP}
        workspace={workspace}
        length
        disabled={!prepared}
        onChange={onAmountChange}
      />

      {kind === "chamfer" || kind === "chamfillet" ? <EdgeModifierSlider label={t("edge.angle")} value={chamferAngle} min={kind === "chamfillet" ? 15 : 5} max={kind === "chamfillet" ? 75 : 85} step={1} unit="°" workspace={workspace} disabled={!prepared} onChange={onChamferAngleChange} /> : null}

      <EdgeModifierSlider label={t("edge.sharpThreshold")} value={sharpAngle} min={1} max={CAD_MODIFIER_MAX_SHARP_ANGLE} step={1} unit="°" workspace={workspace} disabled={!prepared} onChange={onSharpAngleChange} />

      <label className="edge-modifier-check" title={t("edge.onlyVisibleEdgesHint")}>
        <input type="checkbox" checked={onlyVisibleEdges} disabled={!prepared} onChange={(event) => onOnlyVisibleEdgesChange(event.currentTarget.checked)} />
        <span>{t("edge.onlyVisibleEdges")}</span>
      </label>

      <label className="edge-modifier-check" title={t("edge.tangentChainsHint")}>
        <input type="checkbox" checked={tangentChain} disabled={!prepared} onChange={(event) => onTangentChainChange(event.currentTarget.checked)} />
        <span>{t("edge.tangentChains")}</span>
      </label>
      {impliedEdgeCount > 0 ? (
        // The kernel always carries a chamfer or fillet on along edges that continue smoothly;
        // the switch above only decides what a click picks, so say what will happen (#161).
        <p className="edge-modifier-note" role="note">
          {t(impliedEdgeCount === 1 ? "edge.tangentImpliedOne" : "edge.tangentImpliedMany", { count: impliedEdgeCount })}
        </p>
      ) : null}

      <label className="edge-modifier-check">
        <input type="checkbox" checked={preserveEdgeSize} disabled={!prepared} onChange={(event) => onPreserveEdgeSizeChange(event.currentTarget.checked)} />
        <span>{t("edge.keepSize")}</span>
      </label>

      <label className="edge-modifier-field">
        <span>{t("edge.previewQuality")}</span>
        <select value={quality} disabled={!prepared} onChange={(event) => onQualityChange(event.currentTarget.value as CadModifierQuality)}>
          <option value="draft">{t("edge.draft")}</option>
          <option value="standard">{t("edge.standard")}</option>
          <option value="fine">{t("edge.fine")}</option>
        </select>
      </label>

      {error ? <div ref={errorRef} className="edge-modifier-error" role="alert">{cadModifierUserErrorMessage(error)}</div> : null}
      <div className="edge-modifier-footer">
        <button type="button" className="secondary" onClick={onCancel}>{t("common.cancel")}</button>
        <button type="button" className="primary" disabled={!prepared || busy || selectedCount === 0 || Boolean(error)} onClick={onApply}>
          {busy ? <LoaderCircle className="edge-modifier-spinner" size={17} /> : <Check size={17} />}
          {t("edge.apply")}
        </button>
      </div>
      </>)}
    </MovableToolPanel>
  );
}
