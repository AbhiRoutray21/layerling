---
title: Per iniziare
summary: Dal foglio bianco al primo pezzo per la stampante 3D, in cinque minuti, senza account e senza installare nulla.
---

layerling è un programma di progettazione per la stampa 3D che funziona direttamente nel browser. Puoi creare un pezzo partendo da forme semplici, praticare fori, arrotondare gli spigoli e inviarlo al tuo programma di slicing. Non devi installare nulla né creare un account. Quello che progetti resta sul tuo computer.

![La pagina iniziale di layerling: in alto «Crea un nuovo progetto 3D», sotto i tuoi progetti e la guida rapida.](shot:start-page)

## Creare un progetto

Apri [layerling.com](https://layerling.com/). Nella pagina iniziale, fai clic su {{ui:dashboard.createDesign}}. Si apre l’editor con un piano di lavoro vuoto, la griglia su cui prenderà forma il tuo progetto.

Se hai già un file da cui continuare, usa {{ui:dashboard.importGeometry}}. Puoi importare progetti di layerling (`.lyl`) e file STL, OBJ, 3MF, STEP o SVG.

In seguito, tutti i tuoi progetti compariranno nella pagina iniziale con un’immagine di anteprima. Vengono conservati nella memoria del browser e salvati automaticamente dopo ogni modifica, quindi non c’è un pulsante per salvare. **layerling non si assume alcuna responsabilità per i progetti conservati nel browser.** Il browser può bloccarsi o un aggiornamento può causare problemi: ogni tanto crea una copia di sicurezza con {{ui:dashboard.backupAll}} nella pagina iniziale oppure salva i progetti come file. Puoi ripristinare una copia con {{ui:dashboard.restoreBackup}}. Il capitolo [File e salvataggio](chapter:files-and-saving) spiega come raccogliere i progetti in un file e condividerli.

## Panoramica dell’editor

![L’editor con due forme sul piano di lavoro. In alto la barra degli strumenti, a sinistra i comandi della telecamera e a destra le impostazioni della forma selezionata.](shot:editor-overview)

- **In alto** c’è la barra degli strumenti, organizzata per attività: {{ui:editor.group.clipboard}}, {{ui:editor.group.history}}, {{ui:editor.group.shapes}}, {{ui:editor.group.visibility}}, {{ui:editor.group.combine}}, {{ui:editor.group.modify}}, {{ui:editor.group.arrange}}, {{ui:editor.group.manage}} e {{ui:editor.group.help}}. Passa il puntatore su un’icona per vederne il nome. I punti interrogativi, per esempio nelle impostazioni di una forma, nella libreria delle forme o nei pannelli degli strumenti, aprono direttamente il capitolo corrispondente di questa guida.
- **Al centro** c’è il piano di lavoro. Qui posizioni le forme, le modelli e ne visualizzi il risultato.
- **A destra** trovi le impostazioni della forma selezionata: colore, dimensioni, posizione e tutte le altre proprietà. Inserire i numeri è più preciso che trascinare la forma.
- **A sinistra** ci sono i comandi della telecamera e, sopra di essi, il cubo di visualizzazione. Ti permettono di spostarti nella scena; trovi maggiori dettagli in [Vista e piano di lavoro](chapter:view-and-workplane).
- **Nella parte più alta** puoi passare da {{ui:editor.modeGeometry}} a {{ui:editor.modeSketch}}, rinominare il progetto e scegliere la lingua e la combinazione di colori.

## I pulsanti intorno all’area di lavoro

Passa il puntatore su un pulsante per vederne il nome. Se non sai a cosa serve, fai clic su {{ui:interactiveHelp.title}} nell’area {{ui:editor.group.help}} ([[Shift]]+[[F1]]), poi sul pulsante. Ecco quelli su cui riceviamo più domande.

### Incolla

{{ui:editor.tool.paste}} ([[Ctrl]]+[[V]]) aggiunge al progetto ciò che hai copiato con {{ui:editor.tool.copy}}. {{ui:common.duplicate}} copia e incolla in un solo passaggio.

### Elimina

{{ui:common.delete}} ([[Delete]]) rimuove le forme selezionate. {{ui:editor.tool.undo}} le ripristina.

### Separa gruppo

{{ui:editor.tool.ungroup}} ([[Ctrl]]+[[Shift]]+[[G]]) separa il gruppo selezionato nelle forme che lo compongono.

### Impostazioni dell’area di lavoro

{{ui:editor.workspaceSettings}} apre le impostazioni dell’area di lavoro: unità di misura, dimensioni del piano, stampante, griglia, colori, illuminazione e altro. Per saperne di più, consulta [Vista e piano di lavoro](chapter:view-and-workplane).

### Tema

{{ui:common.theme}}, nella parte più alta, permette di scegliere l’aspetto di layerling: come il sistema, chiaro, scuro o grafite.

### Rinominare il progetto

{{ui:editor.renameProject}}: la matita accanto al nome, nella parte più alta. Inserisci il nuovo nome e premi [[Enter]].

### Nome del progetto

Il nome del progetto ({{ui:confirm.projectName}}) appare nella parte più alta. Fai clic sul nome, inseriscine uno nuovo e premi [[Enter]] per confermare.

### Opzioni di visibilità

{{ui:editor.visibilityOptions}}, la freccia accanto all’icona dell’occhio, raccoglie le opzioni per mostrare o nascondere: l’elenco degli oggetti, tutto ciò che hai nascosto, le note e gli sbalzi di stampa. Per saperne di più, consulta [Selezione e disposizione](chapter:select-and-arrange).

### Nascondere gli elementi selezionati

{{ui:editor.tool.hideSelected}} ([[Ctrl]]+[[H]]) nasconde le forme selezionate. Restano nel progetto e nell’elenco degli oggetti; puoi mostrarle di nuovo da {{ui:editor.visibilityOptions}}.

### Cercare i comandi

{{ui:palette.open}}: digita il nome di uno strumento, di una forma o di un’impostazione e fai clic sul risultato.

### Nascondere i comandi della telecamera

{{ui:camera.hide}} ritrae i comandi della telecamera a sinistra e lascia più spazio all’area di lavoro; {{ui:camera.show}} li mostra di nuovo.

### Griglia di aggancio

{{ui:inspector.snapGrid}}, in fondo alle proprietà, definisce l’incremento a cui si agganciano gli spostamenti e i ridimensionamenti. L’interruttore **mm | in** accanto permette di cambiare unità di misura. Per saperne di più, consulta [Vista e piano di lavoro](chapter:view-and-workplane).

### Unità di misura: millimetri o pollici

L’interruttore **mm | in** accanto a {{ui:inspector.snapGrid}} cambia l’unità di misura, la griglia del piano e l’incremento di aggancio del progetto.

### La barra in basso

In fondo alla finestra: {{ui:dashboard.sponsor}} apre la pagina da cui puoi sostenere il progetto; {{ui:dashboard.userGuide}} apre questa guida; {{ui:dashboard.forum}} porta alla pagina per domande, idee e segnalazioni di problemi (le discussioni su GitHub o, in tedesco, il forum di drucktipps3d); {{ui:editor.bugReport}} crea un archivio ZIP per segnalare un problema; {{ui:dashboard.projectOnGitHub}} porta alla pagina del progetto su GitHub, mentre il numero di versione apre le note di rilascio. I collegamenti alle note legali e all’informativa sulla privacy dipendono da chi gestisce la versione di layerling che stai usando.

## Il tuo primo pezzo

Come esempio, realizziamo un cubo con un foro.

1. Fai clic su {{ui:editor.addShape}} nella barra degli strumenti e scegli {{ui:shape.box}}. La forma seguirà il puntatore: fai clic sul piano di lavoro per posizionarla.
2. A destra, imposta le dimensioni: per esempio 40 mm di lunghezza, 40 mm di larghezza e 20 mm di altezza.
3. Allo stesso modo, posiziona {{ui:shape.cylinder}} al centro: diametro di 14 mm e altezza di 30 mm. Deve essere più alto del cubo, così lo attraverserà da parte a parte.
4. Seleziona il cilindro e fai clic su {{ui:inspector.hole}} a destra. Il cilindro diventa trasparente: da solido si trasforma in uno strumento che asporta materiale.
5. Seleziona entrambe le forme e fai clic su {{ui:editor.tool.group}}. Ora il cubo ha un foro.

![Il cilindro è impostato come foro e sporge dalla parte superiore del cubo.](shot:hole-before)

![Dopo aver raggruppato le forme, il cubo presenta un foro passante.](shot:hole-after)

È così che si creano fori, asole e tasche. Il capitolo [Solidi e fori](chapter:solids-and-holes) lo spiega nel dettaglio.

## Novità dalla tua ultima visita

Quando riapri layerling dopo un aggiornamento, una scheda nella pagina iniziale elenca le novità introdotte da quando l’hai visitato l’ultima volta: le versioni uscite nel frattempo, dalla più recente. Se è passato molto tempo, scorri verso il basso all’interno della scheda. In fondo, {{ui:whatsNew.earlier}} aggiunge anche le versioni precedenti alla tua ultima visita. Chiudi la scheda con {{ui:whatsNew.dismiss}}: resterà chiusa fino all’aggiornamento successivo. {{ui:whatsNew.footerLink}}, nella barra in basso della pagina iniziale, mostra di nuovo le ultime novità in qualsiasi momento. Il browser ricorda qual è l’ultima versione che hai visto; nessun tuo dato viene trasmesso.

Se usi una copia di layerling sul tuo computer o server, l’avviso «Aggiornamento disponibile» include il pulsante {{ui:update.previewShow}}, che mostra le novità prima dell’installazione. L’elenco viene scaricato da GitHub solo quando premi il pulsante.

## Dal progetto alla stampa

Quando il pezzo è pronto, fai clic su {{ui:editor.export}}, scegli STL o 3MF e scarica il file. Aprilo nel tuo programma di slicing, per esempio Bambu Studio, PrusaSlicer, OrcaSlicer o Cura. Se scegli la tua stampante nelle impostazioni, mentre progetti puoi verificare se il pezzo entra nel piano di stampa. Per saperne di più, consulta [Stampa](chapter:printing).

> **Suggerimento:** se usi Tinkercad, ti orienterai in fretta: piano, forme, solido e foro, raggruppamento, allineamento e specchiatura funzionano quasi allo stesso modo. Le novità principali sono smussi e raccordi, svuotamento, filettature e schizzi.