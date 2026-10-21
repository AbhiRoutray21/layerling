---
title: Tablet e comandi touch
summary: Lavorare con le dita o uno stilo: selezionare più corpi, ruotare e ingrandire la vista, usare il menu con pressione prolungata e sapere cosa aspettarsi su iPad.
---

## Dita e stilo

layerling funziona nel browser di un tablet e come app dalla schermata Home. Un tocco equivale a un clic con il tasto sinistro del mouse. Le tre cose che mancano su un tablet — tasto destro, tasto Maiusc e rotellina — hanno gesti dedicati:

| Cosa vuoi fare | Su un tablet |
| --- | --- |
| Selezionare un corpo | Toccalo. |
| Selezionare più corpi | Tieni il dito fermo per mezzo secondo, scegli {{ui:contextMenu.selectMultiple}}, poi tocca i corpi uno dopo l’altro. Se tocchi di nuovo un corpo selezionato, lo deselezioni. |
| Selezionare tutti i corpi | Tieni il dito fermo per mezzo secondo su uno spazio vuoto e scegli {{ui:contextMenu.selectAll}}. |
| Aprire il menu del clic destro | Tieni il dito fermo per mezzo secondo su un corpo o su uno spazio vuoto. |
| Spostare un corpo | Trascinalo. |
| Ridimensionare, ruotare o sollevare un corpo | Trascina le maniglie, i quadratini e le frecce che gli stanno attorno. Puoi afferrarle con il dito anche toccando poco di lato. |
| Ruotare la vista | Trascina un dito su uno spazio vuoto oppure trascina il cubo di orientamento. |
| Ingrandire o rimpicciolire la vista | Usa due dita: allontanale per ingrandire, avvicinale per rimpicciolire. |
| Spostare la vista | Fai scorrere due dita insieme. |
| Annullare la selezione | Tocca uno spazio vuoto. Non farlo mentre è attivo {{ui:camera.touchRotate}}, perché un dito ruota la vista; inoltre, in modalità {{ui:contextMenu.selectMultiple}}, il primo tocco sullo spazio vuoto termina solo la modalità e mantiene la selezione, mentre il successivo la annulla. |

## Selezionare più corpi

Senza il tasto Maiusc, {{ui:contextMenu.selectMultiple}} nel menu che appare con una pressione prolungata svolge la stessa funzione di Maiusc+clic su un computer. Quando la modalità è attiva, appare un messaggio e ogni tocco su un corpo lo aggiunge alla selezione o lo rimuove. Toccare uno spazio vuoto o premere [[Esc]] su una tastiera termina la modalità e mantiene la selezione. Nel frattempo puoi continuare a ruotare la vista trascinando un dito sullo spazio vuoto. Poi {{ui:editor.tool.group}}, {{ui:editor.tool.align}} o lo spostamento si applicano a tutti i corpi selezionati.

## Ruotare e ingrandire la vista

Trascina un dito su uno spazio vuoto per ruotare la vista; usa due dita per ingrandirla o spostarla. Se inizi il gesto su un corpo, agisci sul corpo, non sulla vista. Se preferisci ruotare la vista con un dito, attiva {{ui:camera.touchRotate}} nella barra della fotocamera: ovunque inizi il gesto, un dito ruota la vista invece di selezionare. Questa opzione compare solo sui dispositivi con schermo touch.

Trascinando il cubo di orientamento in alto a sinistra ruoti la vista; toccando uno dei suoi lati, angoli o spigoli passi direttamente alla vista corrispondente. Vedi [Vista e piano di lavoro](chapter:view-and-workplane).

## Maniglie, punti piccoli e stilo

La punta del dito copre ciò che tocchi. Con layerling puoi raggiungere maniglie, punti, linee e spigoli anche con un tocco un po’ decentrato rispetto a quanto è possibile con il puntatore del mouse, ma uno stilo è più preciso. Questo vale per gli stilo che il tablet riconosce come penne, come Apple Pencil o S Pen. Uno stilo normale con punta in gomma viene invece rilevato come un dito e non è più preciso: usalo come useresti il dito. Su iPad, Apple Pencil può anche restare sospesa sopra lo schermo e, dopo un momento, mostrare il nome di un controllo in un fumetto, come il suggerimento che appare passando il puntatore del mouse.

Se i corpi si spostano quando li toccano bambini o persone di fretta, attiva {{ui:workspace.selectBeforeMoving}} nelle impostazioni: prima dovrai selezionare un corpo e solo un trascinamento successivo potrà spostarlo.

## Su iPad o iPhone

- **Installala come app.** In Safari, tocca l’icona di condivisione e scegli «Aggiungi alla schermata Home». L’app si apre in una finestra dedicata, senza barra degli indirizzi, e funziona anche senza connessione; vedi [Installazione e uso offline](chapter:offline-and-install).
- **I progetti restano nel browser.** Non serve un account e non viene caricato nulla. Safari applica una propria regola contro il tracciamento: elimina i dati salvati da un sito dopo sette giorni senza visite a quel sito tramite Safari. Le app web aggiunte alla schermata Home sono escluse da questa regola, come documenta WebKit. È un motivo in più per usare l’app dalla schermata Home e fare copie di sicurezza dei lavori importanti: {{ui:dashboard.backupAll}} nella pagina iniziale raccoglie tutti i progetti in un unico file.
- **File.** Safari permette a una pagina di scrivere in un file solo tramite un download. Perciò {{ui:editor.export}} salva il file nella cartella Download dell’app File e [[Ctrl]]+[[S]] sulla tastiera lo scarica di nuovo; vedi [File e salvataggio](chapter:files-and-saving).
- **La tastiera non è necessaria.** Ogni strumento ha un pulsante nella barra multifunzione e, toccando un campo numerico, si apre la tastiera su schermo. Collegando una tastiera all’iPad puoi usare le [scorciatoie da tastiera](chapter:shortcuts).

## Laboratori con i bambini

Qui dita e stilo con punta in gomma funzionano allo stesso modo. Due impostazioni semplificano il lavoro in classe: {{ui:workspace.selectBeforeMoving}}, per evitare che un tocco sposti un corpo per sbaglio, e {{ui:camera.touchRotate}}, per ruotare sempre la vista con un dito. Il pulsante con il punto interrogativo nel gruppo Aiuto della barra multifunzione attiva {{ui:interactiveHelp.title}}: toccando un pulsante, un campo o una maniglia ne viene mostrata la spiegazione. Tocca di nuovo quel pulsante o premi [[Esc]] per uscire.