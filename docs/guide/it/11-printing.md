---
title: Preparare la stampa 3D
summary: Scegliere la stampante, ricevere avvisi quando un pezzo non rientra nel volume di stampa e orientarlo correttamente.
---

## Scegliere la stampante

Apri le impostazioni (l’ingranaggio nella barra degli strumenti, {{ui:editor.workspaceSettings}}) e passa alla sezione {{ui:workspace.workplane}}. In {{ui:workspace.printer}} puoi scegliere la stampante da un elenco di oltre cinquanta modelli comuni, tra cui Bambu Lab, Prusa, Creality, Anycubic, Elegoo e molti altri.

![Le impostazioni del piano di lavoro con una stampante selezionata. Il piano di stampa e l’altezza massima di stampa provengono dal profilo dello slicer.](shot:settings-workplane)

Succedono tre cose:

- Il piano di lavoro assume le dimensioni del piano di stampa.
- Nell’angolo del piano di lavoro compaiono il nome della stampante e il volume di stampa. Se le scritte sono d’intralcio, disattivale con {{ui:workspace.showPlateLabels}} sotto {{ui:workspace.workplane}}; puoi nascondere nello stesso modo anche il nome del progetto in basso a sinistra.
- layerling **mostra un avviso** quando un pezzo non rientra nel volume di stampa.

I profili delle stampanti provengono da OrcaSlicer e corrispondono a quelli disponibili nel programma di slicing. Se preferisci lavorare senza una stampante selezionata, scegli {{ui:workspace.printerNone}}. Puoi anche impostare manualmente le dimensioni del piano di lavoro.

## Quando un pezzo non rientra

Un corpo che sporge oltre il bordo del piano di stampa viene evidenziato. Un messaggio indica da quali lati sporge e di quanto. Lo stesso avviso appare quando il pezzo è **troppo alto**: l’altezza viene misurata a partire dal corpo più basso, come quando lo slicer appoggia il modello sul piano.

![La scatola è più larga del piano di stampa della Bambu Lab A1 mini. Il messaggio in basso indica di quanto lo supera.](shot:printer-overhang)

L’avviso non impedisce di continuare a lavorare: ti aiuta a non scoprire solo nello slicer che il pezzo è troppo grande. Spesso puoi dividerlo: taglialo in due con {{ui:editor.tool.split}} e stampa separatamente le due metà.

## Orientare correttamente il pezzo

Il modo in cui un pezzo poggia sulla piastra ne determina la resistenza e l’aspetto. Gli strumenti nel gruppo {{ui:editor.group.arrange}} ti aiutano a orientarlo:

- {{ui:editor.tool.layFlat}}: fai clic su una faccia per appoggiarvi il pezzo. In un solo clic scegli il lato migliore per la stampa.
- {{ui:editor.tool.dropToWorkplane}} ([[D]]): appoggia il pezzo sul piano di lavoro quando è sospeso in aria.

Alcune regole pratiche per scegliere l’orientamento:

- Appoggia sulla piastra le facce piatte più grandi: aderiscono meglio.
- Per i pezzi lunghi sottoposti a carichi, scegli un orientamento che non disponga gli strati perpendicolarmente al carico: è la direzione in cui il pezzo è più fragile.
- Evita gli sbalzi con un’inclinazione superiore a 45° oppure aggiungi i supporti nello slicer.

## Individuare gli sbalzi

Nel menu accanto all’occhio ({{ui:editor.group.visibility}}), attiva **Mostra sbalzi**. Le facce rivolte verso il basso con un’inclinazione superiore a 45° vengono evidenziate con un tratteggio rosso e bianco: sono i punti in cui la stampante potrebbe aver bisogno di supporti. Le superfici appoggiate sulla piastra non vengono evidenziate. Puoi quindi controllare già durante la progettazione se una sfera, un arco o un foro orizzontale si stampa senza supporti; il [foro a goccia](chapter:threads-and-mechanics) serve proprio a questo. Ruota il pezzo o appoggialo su un’altra faccia con {{ui:editor.tool.layFlat}}: il tratteggio si aggiorna subito.

Puoi impostare l’inclinazione massima gestibile dalla stampante nelle impostazioni, sotto {{ui:workspace.appearance}}: da 30° (prudente) a 70° (per stampanti con un buon raffreddamento del pezzo). Anche una faccia appoggiata a un altro corpo viene evidenziata: layerling valuta solo la faccia in sé.

## Spessore delle pareti, gioco e smussi

- Le pareti dovrebbero essere larghe almeno quanto due linee di estrusione: 0,8 mm con un ugello da 0,4 mm. Per i pezzi robusti, usa uno spessore da 1,2 a 2 mm.
- Quando due parti devono combaciare, serve un po’ di gioco: di solito da 0,2 a 0,4 mm, a seconda della stampante. Stampa una piccola coppia di prova prima del pezzo grande.
- Spesso si smussa leggermente il bordo inferiore appoggiato alla piastra. In questo modo si riduce l’allargamento del primo strato, detto «piede d’elefante».

## Quando il pezzo è pronto

Scegli {{ui:editor.export}}, poi **STL** o **3MF**. STL è il formato più semplice. 3MF conserva i nomi e i colori dei singoli corpi ed è quindi utile per la stampa multicolore. La finestra di esportazione mostra anche quanti grammi e metri di filamento servirebbero per stampare il pezzo pieno. Per saperne di più, consulta [File e salvataggio](chapter:files-and-saving).