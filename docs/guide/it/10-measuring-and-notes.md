---
title: Misurazioni e note
summary: Metro a nastro, righello e squadra da carpentiere, distanze dall’origine, note legate a una parte e punti di riferimento a cui agganciare gli oggetti.
---

Per costruire un pezzo con precisione, devi poterlo misurare. layerling offre diversi strumenti per farlo, che non vengono mai inclusi nei file esportati. Per misurare lo spessore delle pareti e gli spazi interni a un pezzo, è meglio usare la [vista in sezione](chapter:view-and-workplane) con {{ui:camera.sectionMeasure}}.

## Il metro a nastro

Il metro a nastro si trova in fondo alla barra della telecamera, sul bordo sinistro ({{ui:camera.tapeTools}}). Misura le distanze tra angoli, spigoli e facce. Facendo clic sullo strumento si apre un pannello con i comandi. Se copre il punto che vuoi misurare, trascinalo dalla maniglia a sinistra in un punto qualsiasi del piano di lavoro; con un doppio clic sulla maniglia torna al suo posto:

![Il metro a nastro con i suoi pulsanti: aggiungi una misura, sposta i punti di misurazione, rimuovi una misura, misura spigoli interi, elimina tutte le misure.](shot:tape-menu)

1. **{{ui:camera.addMeasurement}}:** fai clic su un punto, trascina fino al successivo e fai clic. Viene mostrata la distanza.
2. **{{ui:camera.moveMeasurement}}:** afferra e sposta i punti; il valore li segue.
3. **{{ui:camera.deleteMeasurement}}:** attiva il comando e fai clic su una misura per rimuoverla.
4. **{{ui:camera.tapeWholeEdges}}:** facendo clic su uno spigolo, misuri la sua lunghezza completa, per esempio la circonferenza di un cerchio. Se disattivi l’opzione, il clic posiziona invece un punto sullo spigolo; il secondo può essere ovunque, così puoi misurare il diametro o un’altra distanza. [[Alt]] inverte l’impostazione per un solo clic. Su un cerchio, quando il puntatore si avvicina al punto opposto al primo, il punto si aggancia e resta sulla circonferenza esatta, così il diametro viene misurato con precisione.
5. **{{ui:camera.deleteAllMeasurements}}:** elimina tutte le misure in una volta. Poiché l’operazione non si può annullare, layerling chiede conferma; se non ci sono misure, il comando non fa nulla.
6. **{{ui:camera.tapeMarkMiddle}}:** sotto il valore di ogni misura c’è un piccolo pulsante con il mirino. Crea un [punto di riferimento](#punti-di-riferimento) al centro della misura: al centro di uno spigolo tondo, come il bordo di un foro, anche su una mesh importata dove non ci sono altri riferimenti al centro; oppure a metà di un diametro o di una misurazione rettilinea. Trascinando una forma, il suo centro si aggancia a quel punto. Se il punto esiste già, non viene duplicato. Il metro a nastro si aggancia ai punti di riferimento come agli angoli, così puoi misurare dal centro di un cerchio o dal punto medio di una linea: crea il punto e poi fai clic su di esso.

Premi [[Esc]] per uscire dalla modalità di misurazione.

## Il righello

Scegli {{ui:shape.ruler}} nella libreria delle forme. È solo uno strumento di misurazione: non compare nei file esportati e non può essere raggruppato né tagliato. Per ogni corpo che tocca o si sovrappone al righello, mostra direttamente nella vista un valore che fluttua accanto al corpo. Puoi modificare il valore sul posto e il corpo si sposta di conseguenza. Il simbolo più sospeso crea una copia della forma misurata. La scala stampata è in millimetri; dopo aver impostato i pollici con l’interruttore in basso a destra, passa ai pollici, con una tacca ogni sedicesimo e i pollici interi numerati.

## La squadra da carpentiere

A volte è più facile misurare ad angolo retto. Fai clic su {{ui:camera.cornerRulerTool}} nella barra della telecamera e poi sul piano di lavoro. Viene posizionata una squadra con due bracci perpendicolari e tacche, come una squadra da falegname. Anche questa non è un corpo. Facendo clic vicino all’angolo di un corpo, la squadra si aggancia esattamente a quell’angolo.

La squadra si appoggia al piano di lavoro. Se il piano si trova sul lato di un corpo, anche la squadra si trova su quel lato; vedi [Vista e piano di lavoro](chapter:view-and-workplane). In questo modo puoi misurare su una parete verticale: posiziona il piano di lavoro sulla parete, metti la squadra nell’angolo superiore sinistro e fai clic sulla maniglia finché i bracci sono rivolti a destra e verso il basso.

- **Trascina la maniglia** per spostare la squadra.
- **Fai clic brevemente sulla maniglia** per ruotarla di 90°.
- **Fai clic sulla ×** accanto alla maniglia per rimuoverla.
- **Il piccolo pulsante a sinistra della maniglia** cambia il riferimento della misurazione: l’esterno di un corpo (estremo, icona con linee) o il suo centro (punto medio, mirino). Un interruttore dello stesso tipo si trova accanto a ciascun valore verde e imposta solo quel valore: per un cilindro verticale, misura il centro sui due bracci e la base in altezza; per uno coricato, il centro sul diametro e un’estremità lungo l’asse. Quando tutte e tre le misure hanno di nuovo lo stesso riferimento, il pulsante sulla maniglia mostra la modalità comune.

Se i corpi sono allineati con uno dei bracci, la squadra ne mostra automaticamente le dimensioni. Questa funzione opera solo sulla piastra di base, non sul lato di un corpo.

Quando selezioni un corpo, la squadra indica in verde la distanza dall’angolo lungo entrambi i bracci e in altezza. Fai clic su un valore verde per inserirne uno: il corpo si sposta esattamente a quella distanza. Se selezioni più corpi, vengono trattati come un unico elemento: la squadra ne misura il contorno comune e il valore inserito li sposta tutti insieme, mantenendo invariata la posizione reciproca.

Le linee guida dei valori verdi corrono lungo il piano su cui poggia la squadra, fino al punto sotto o accanto al corpo; la misura dell’altezza ha una freccia dedicata. L’interruttore di ogni valore si trova nel suo riquadro. I bracci e le tacche sono linee nello spazio: un corpo che si trova davanti a esse le nasconde, come farebbe con una squadra reale. Il piccolo occhio sotto la maniglia cambia il comportamento: con l’occhio barrato, i corpi nascondono la squadra (impostazione iniziale); con l’occhio aperto, la squadra resta visibile sopra ogni cosa. I valori sui bracci sfumano in corrispondenza dei corpi che si trovano davanti.

Con il riferimento al punto medio, i valori verdi misurano fino al centro del corpo, anche in altezza. Così puoi posizionare il centro di una sfera esattamente a 15 mm da uno spigolo senza sottrarne il raggio. Su una parete puoi posizionare un foro a 40 mm dal lato sinistro e a 190 mm dall’alto: seleziona il foro, imposta il riferimento al punto medio e inserisci 40 e 190. In questo caso l’altezza viene misurata verso l’esterno della parete.

Il metro a nastro e la squadra restano al loro posto mentre lavori su uno schizzo e tornano visibili quando passi alla vista 3D. Non vengono salvati nel progetto né nella cronologia e scompaiono quando ricarichi la pagina.

## Distanze dall’origine e durante lo spostamento

Nelle impostazioni, sotto {{ui:workspace.appearance}}, ci sono due interruttori per mostrare le misure in tempo reale:

- {{ui:workspace.showMoveDimensions}} mostra di quanto sposti un elemento mentre lo trascini.
- {{ui:workspace.showOriginDimensions}} mostra le distanze della selezione dall’origine della piastra, anche quando selezioni più corpi.

Con {{ui:workspace.dimensionsAlwaysVisible}}, le misure restano sempre visibili.

## Note

Una nota registra ciò che la geometria non può dire: «Questa vite è troppo stretta di 0,3 mm», «stampare già il coperchio?» o «misura da Peter». Creane una con {{ui:editor.tool.note}} o premi [[N]].

- Se la posizioni **su un corpo**, lo segue.
- Se la posizioni **accanto al corpo**, resta sul piano di lavoro ({{ui:note.free}}).
- {{ui:note.detach}} stacca dal corpo una nota associata.
- Trascina una nota per spostarla; fai clic per modificarla.
- Durante la scrittura, [[Enter]] salva il testo e [[Esc]] ripristina quello che c’era prima; [[Shift]]+[[Enter]] inizia una nuova riga.

Le note vengono salvate nel progetto, non compaiono nei file esportati e possono essere mostrate o nascoste con {{ui:visibility.notes}}.

## Punti di riferimento

Un punto di riferimento è un semplice segno nello spazio, come una tacca a matita o un punto di tracciatura in un’officina: non appartiene a un corpo, non viene mai stampato e permette ad altri elementi di agganciarsi. Fai clic con il tasto destro su un corpo e scegli {{ui:contextMenu.markCenter}}, {{ui:contextMenu.markCorners}} o {{ui:contextMenu.markMidpoints}}: i punti compaiono sulla faccia superiore del corpo, o dell’intera selezione se ne hai selezionati più di uno.

- Trascina un punto per spostarlo oppure fai clic per vederne e modificarne le coordinate; seguono l’unità di misura selezionata. Se copre qualcosa, puoi trascinare separatamente la scheda di ciascun punto dalla barra del titolo; le altre restano al loro posto. Fai doppio clic sul titolo per riposizionare una scheda. L’ultima scheda selezionata resta in primo piano. **Elimina tutto** nella scheda o nel menu del clic destro rimuove tutti i punti. {{ui:common.delete}} ne elimina uno.
- Anche il metro a nastro può creare un punto: {{ui:camera.tapeMarkMiddle}}, il pulsante con il mirino sotto una misura, lo posiziona al centro, per esempio al centro di un foro tondo. Il metro misura anche da un punto: si aggancia ai punti di riferimento come agli angoli.
- Quando trascini una forma, i suoi spigoli e il centro si agganciano a un punto, proprio come si agganciano alle altre forme ({{ui:workspace.objectSnap}}). Anche la squadra si aggancia ai punti.
- I punti vengono salvati nel progetto, non compaiono nei file esportati e vengono mostrati o nascosti insieme alle note con {{ui:visibility.notes}}.
- Un sistema di intelligenza artificiale può crearli, elencarli e rimuoverli con `layerling_add_reference_points`, `layerling_list_reference_points` e `layerling_remove_reference_points`.