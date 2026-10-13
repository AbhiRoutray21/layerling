import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { graphiteGrey } from "../../scripts/generate-graphite-theme.mjs";

/*
 * The guide follows the program's colour theme, Graphite too (#278): the dark theme with the warm
 * browns turned grey. Its greys must be the ones the program's own Graphite works out.
 */
const page = join(__dirname, "..", "..", "apps/web/public/guide/index.html");

function tokens(block: string) {
  return Object.fromEntries([...block.matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]{6})/g)].map((match) => [match[1], match[2].toLowerCase()]));
}

describe.skipIf(!existsSync(page))("the guide in Graphite", () => {
  const html = readFileSync(page, "utf8");
  const dark = tokens(/:root\[data-theme="dark"\]\s*\{([^}]*)\}/.exec(html)?.[1] ?? "");
  const graphite = tokens(/:root\[data-theme="dark"\]\[data-palette="graphite"\]\s*\{([^}]*)\}/.exec(html)?.[1] ?? "");

  it("sets the palette when Graphite is the stored theme", () => {
    expect(html).toContain('t==="graphite"');
    expect(html).toContain('dataset.palette="graphite"');
  });

  it("has a grey for every brown of the dark theme", () => {
    expect(Object.keys(graphite).sort()).toEqual(["accent-ink", "card", "code", "edge", "ground", "ink", "muted", "tint"]);
  });

  it("uses the greys the program's Graphite works out", () => {
    for (const [name, value] of Object.entries(graphite)) {
      const source = dark[name];
      expect(source, name).toBeTruthy();
      const number = parseInt(source.slice(1), 16);
      const grey = graphiteGrey((number >> 16) & 255, (number >> 8) & 255, number & 255) as number[];
      expect(value, name).toBe(`#${grey.map((part) => part.toString(16).padStart(2, "0")).join("")}`);
    }
  });
});
