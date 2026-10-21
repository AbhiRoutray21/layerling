---
title: Selezione e disposizione
summary: Selezionare le forme, trovarle nell’elenco degli oggetti, allinearle, specchiarle, ruotarle, appoggiarle su una faccia e moltiplicarle con motivi regolari.
---

## Selezionare

Fai clic su una forma per selezionarla. Con [[Shift]] puoi aggiungerne altre alla selezione o rimuoverle. Mentre tieni premuto [[Shift]] con due o più forme selezionate, sotto il puntatore compare un piccolo numero che le conta. Fai clic nello spazio vuoto o premi [[Esc]] per deselezionare tutto. Trascina un riquadro sul piano di lavoro vuoto per selezionare tutto ciò che tocca; tenendo premuto [[Shift]], il riquadro aggiunge gli elementi non selezionati e rimuove quelli già selezionati. Se vuoi selezionare un solo elemento di un gruppo ravvicinato, attiva {{ui:workspace.frameByDirection}} nelle impostazioni (sezione {{ui:workspace.appearance}}): trascinando il riquadro verso destra selezioni solo ciò che è completamente al suo interno; trascinandolo verso sinistra selezioni tutto ciò che tocca. Il bordo del riquadro è tratteggiato. [[Ctrl]]+[[A]] seleziona tutti i corpi visibili. Se trascini un corpo o una maniglia del riquadro, puoi annullare l’operazione con [[Esc]] finché tieni premuto il pulsante del mouse: tutto torna com’era e non viene aggiunta alcuna azione alla cronologia.

Nascondi ciò che è d’intralcio con {{ui:editor.tool.hideSelected}} ([[Ctrl]]+[[H]]). Le forme nascoste restano nel progetto, ma non sono visibili e non vengono incluse nell’esportazione; la finestra di esportazione indica in anticipo quante sono. [[Ctrl]]+[[Shift]]+[[H]] le mostra di nuovo tutte. Per impedire che qualcosa si sposti, bloccalo con il lucchetto in cima alle impostazioni o con [[Ctrl]]+[[L]]. Una forma bloccata non può essere spostata, ridimensionata, ruotata, ricolorata o eliminata: le maniglie diventano grigie, accanto alla freccia in alto compare un lucchetto e gli strumenti che potrebbero modificarla sono disattivati. Passando il puntatore su una maniglia puoi comunque vedere le dimensioni; premendo un tasto che la modificherebbe compare il messaggio «Oggetto bloccato». Se nella selezione c’è una forma bloccata, non puoi modificare nemmeno le altre. Nascondere, rinominare, copiare e duplicare resta possibile.

Il numero sul pulsante del gruppo {{ui:editor.group.visibility}} indica quante forme sono nascoste; facendoci clic le mostri tutte. Quando apri un progetto con forme nascoste, un avviso lo segnala una volta e offre un pulsante per mostrarle.

## L’elenco degli oggetti

Quando un progetto contiene molte parti, è facile perdere il filo nella vista. L’elenco degli oggetti ({{ui:editor.tool.showOutliner}} oppure [[Ctrl]]+[[Shift]]+[[O]]) mostra tutte le forme in un elenco. Rimane aperto o chiuso come l’hai lasciato, per tutti i progetti, finché non lo chiudi; questa scelta viene salvata nel browser.

![L’elenco degli oggetti: il gruppo «Gruppo» contiene due parti e accanto c’è una sfera. L’icona della cartella apre il gruppo.](shot:object-list)

- Fai clic su una voce per selezionare la forma, comprese le parti all’interno di un gruppo. Tenendo premuto [[Shift]], puoi aggiungere o rimuovere altre voci, proprio come nella vista. Le frecce aprono e chiudono i gruppi.
- L’etichetta indica se una parte è {{ui:outliner.solid}} o {{ui:outliner.hole}}.
- Il lucchetto e l’occhio permettono di bloccare e nascondere singole parti.
- {{ui:outliner.rename}} assegna un nome alla parte; anche la matita accanto al nome in cima alle impostazioni rinomina la forma selezionata. Nei progetti grandi, nomi descrittivi sono di grande aiuto.
- Il campo di ricerca trova le forme per nome e tipo, quindi anche «cilindro» o «foro». Cerca anche all’interno dei gruppi, per quanto siano annidati: un gruppo che contiene una corrispondenza resta nell’elenco e si apre per mostrare le parti trovate e i gruppi che conducono a esse. Se la corrispondenza è il nome del gruppo stesso, aprendolo vedi tutte le sue parti.
- La freccia all’estrema sinistra della barra del titolo comprime e riapre l’elenco.

L’elenco è ancorato subito a destra del cubo di visualizzazione. Trascinalo dalla barra del titolo per spostarlo in un punto qualsiasi del piano di lavoro; può passare sotto il cubo e la barra della telecamera. Rilascialo accanto al cubo oppure fai doppio clic sulla barra del titolo per ancorarlo di nuovo. In questo browser vengono memorizzati la posizione e lo stato aperto o compresso.

## Inserire una posizione

La scheda {{ui:inspector.position}} nel pannello delle proprietà mostra la posizione del corpo selezionato e permette di inserirla direttamente: {{ui:prop.positionX}} e {{ui:prop.positionY}} indicano il centro del riquadro d’ingombro sul piano, con gli stessi segni delle distanze mostrate sul piano di lavoro; {{ui:prop.positionZ}} indica l’altezza della base del corpo. X cresce verso destra, Y verso il fondo e Z verso l’alto, secondo la regola della mano destra, come in Tinkercad e nei programmi CAD. Le frecce degli assi sulla piastra indicano le direzioni. I valori seguono l’unità di misura impostata e i cursori raggiungono la stessa distanza del trascinamento.

## Lasciare le parti accanto alla piastra

Puoi trascinare una forma oltre il bordo della piastra e lasciarla lì, fino a circa una larghezza di piastra oltre ciascun lato, per conservarla e riutilizzarla in seguito. I tasti freccia permettono di spostarla anche più lontano. La parte lasciata da parte continua a far parte del progetto e viene inclusa nell’esportazione insieme al resto. Per escluderla, nascondila oppure esporta solo la selezione. Se hai scelto una stampante, layerling avvisa durante l’esportazione se qualcosa si trova fuori dal piano di stampa.

## Aggancio durante lo spostamento

Quando trascini una forma sul piano di lavoro, questa si aggancia alle altre: il suo bordo sinistro, destro, anteriore o posteriore, oppure il suo centro, si allinea esattamente con il bordo o il centro di un’altra forma. Una linea guida rosa mostra a cosa si sta agganciando. Così puoi affiancare due parti o centrarne una dietro l’altra senza inserire numeri. Funziona anche con la griglia disattivata.

Tieni premuto [[Shift]] durante il trascinamento per vincolare lo spostamento a un asse: la forma segue la direzione, X o Y, lungo cui l’hai trascinata di più e non si muove sull’altro asse. È meglio premere [[Shift]] dopo aver iniziato a trascinare: se la forma non è ancora selezionata, un clic con [[Shift]] la aggiunge soltanto alla selezione.

Se tieni già premuto [[Alt]] quando inizi a trascinare, sposti una copia, come in Tinkercad: la forma originale resta al suo posto e la copia viene posizionata dove rilasci il pulsante. Se premi [[Alt]] solo durante il trascinamento, sospendi l’aggancio e la forma segue soltanto la griglia. Anche una copia si aggancia solo dopo che rilasci [[Alt]] durante il trascinamento. Per disattivare definitivamente l’aggancio, usa il menu della griglia in basso a destra ({{ui:inspector.objectSnap}}) oppure le impostazioni. Per ora l’aggancio funziona solo durante lo spostamento sul piano di lavoro normale, non quando sollevi o ridimensioni una forma.

## Allineare

Seleziona due o più forme e usa {{ui:editor.tool.align}}: intorno alla selezione compaiono punti per allineare a sinistra, al centro o a destra; davanti, al centro o dietro; in alto, al centro o in basso. Fai clic su un punto per spostare tutte le forme in quella posizione. Se prima fai clic su una delle forme selezionate, questa resta ferma e le altre si allineano a essa. Se la selezione include una forma bloccata, quella forma diventa l’unico riferimento fisso. Sinistra, destra, davanti, dietro, sopra e sotto si riferiscono al riquadro intorno alla forma; il centro di un triangolo, un pentagono o una stella coincide invece con il centro della forma stessa. Un foro centrato su una di queste forme si trova quindi al centro della forma, non del suo riquadro.

Se una forma è ruotata, per esempio di 45°, viene allineato il suo riquadro, non i suoi spigoli. Per allinearla secondo gli spigoli, imposta prima il piano di lavoro su una sua faccia ({{ui:camera.placeWorkplane}}, poi fai clic sulla faccia): i punti seguono gli assi di quel piano e le forme vengono misurate e spostate lungo quegli assi, come in Tinkercad. Riporta il piano di lavoro sulla piastra per allineare nuovamente lungo gli assi principali.

![Lo strumento Allinea mostra con dei punti i possibili riferimenti intorno alla selezione.](shot:align)

La scorciatoia è [[L]]. [[Esc]] annulla.

## Specchiare

{{ui:editor.tool.mirror}} ([[M]], oppure fai clic con il tasto destro sulla selezione e scegli il comando) ribalta la selezione rispetto a un piano: {{ui:mirror.leftRight}}, {{ui:mirror.frontBack}} o {{ui:mirror.topBottom}}. Fai clic sulla freccia dell’asse corrispondente. È utile per le parti simmetriche: costruisci una metà, duplicala e specchia la copia.

## Ruotare e impostare il perno

Puoi ruotare una forma con le frecce curve, inserendo numeri nelle impostazioni oppure premendo [[R]] per incrementi di 45°. Se trascini sulla circonferenza di rotazione, lo scatto avviene a ogni tacca, cioè ogni 22,5°; tieni premuto [[Shift]] per incrementi più piccoli, con tacche aggiuntive ogni 11,25°. Trascina fuori dalla circonferenza per ruotare liberamente a incrementi di 1°, oppure di 45° tenendo premuto [[Shift]]. Normalmente la selezione ruota intorno al proprio centro, ma a volte serve un altro perno, per esempio per continuare a ruotare dall’estremità di un tubo inclinato. In questi casi usa {{ui:editor.tool.rotationPivot}} e fai clic su una faccia. Una faccia piatta usa il proprio centro, per esempio l’asse dell’estremità di un tubo. Da quel momento la selezione ruota intorno a quel punto. Fai di nuovo clic sullo strumento per rimuovere il perno.

Gli angoli vengono salvati con il corpo. Nelle sue impostazioni, {{ui:inspector.rotation}} li mostra nei campi {{ui:prop.rotateX}}, {{ui:prop.rotateY}} e {{ui:prop.rotateZ}}, con le stesse direzioni della posizione: Y corre lungo la piastra, Z è rivolto verso l’alto. Inserisci un angolo per ruotare il corpo a quel valore, intorno al proprio centro oppure al suo perno, se ne ha uno. Quando selezioni un corpo ruotato, i suoi angoli compaiono anche sotto di esso sul piano di lavoro; nelle impostazioni, {{ui:workspace.showRotationAngles}} permette di nasconderli.

![Un corpo ruotato intorno a due assi: sotto compaiono i suoi angoli e nelle impostazioni la scheda Rotazione permette di inserirli come numeri.](shot:rotation-card)

Selezionando **un solo corpo**, il perno appartiene al corpo: puoi selezionare altre parti e tornare al corpo, il perno resta al suo posto. Si sposta, ruota e ridimensiona insieme al corpo; viene salvato nel progetto e ripristinato con Annulla. Sotto {{ui:inspector.position}}, il perno ha coordinate X, Y e Z che puoi inserire o regolare; {{ui:inspector.pivotRemove}} lo rimuove. Puoi anche trascinare il suo indicatore rosso: scorre sulla superficie dei corpi e si aggancia agli angoli, ai punti medi degli spigoli e agli spigoli, così il perno di una cerniera può cadere esattamente su un angolo. Se selezioni più corpi, il perno vale solo per quella selezione e scompare quando ne crei un’altra.

## Appoggiare una faccia sul piano

Vuoi appoggiare un pezzo sul lato migliore per stamparlo? Selezionalo, fai clic su {{ui:editor.tool.layFlat}} e poi sulla faccia che vuoi rivolgere verso il basso. Quando passi il puntatore sul pezzo, la faccia sotto di esso si illumina, così vedi quale stai per scegliere; ruota la vista per controllare gli altri lati. Il pezzo ruota fino ad appoggiare quella faccia sul piano di lavoro.

Vuoi unire due pezzi faccia a faccia o allinearli sullo stesso piano? Seleziona il pezzo da spostare, fai clic su {{ui:editor.tool.mateFaces}}, poi sulla sua faccia e infine sulla faccia dell’altro pezzo. Nel pannello, {{ui:mate.mode.against}} mette le facce una contro l’altra, a contatto; {{ui:mate.mode.flush}} le dispone sullo stesso piano, affiancate; {{ui:mate.gap}} lascia uno spazio tra loro, per esempio per garantire il gioco. {{ui:mate.apply}} sposta il pezzo: lo ruota lungo il percorso più breve finché le facce sono parallele (non lo ruota se lo sono già), poi lo fa scorrere solo verso l’altra faccia, mantenendo la posizione laterale. L’altro pezzo resta fermo e basta un solo Annulla per ripristinare tutto.

![Il pannello Allinea facce: si sceglie il pezzo da spostare, poi la faccia dell’altro pezzo, quindi l’allineamento faccia a faccia o sullo stesso piano e l’eventuale distanza.](shot:mate-faces)

**Impostare un angolo preciso tra due facce:** {{ui:editor.tool.mateFaces}} rende parallele le facce; non c’è uno strumento dedicato per impostare un angolo tra loro, ma puoi farlo così. Prima accosta le facce con {{ui:editor.tool.mateFaces}}, in modo che siano parallele. Imposta poi il perno sullo spigolo in cui si incontrano ({{ui:editor.tool.rotationPivot}}, facendo clic sullo spigolo o su un angolo) e inserisci l’angolo, per esempio 15 o 30, nella scheda {{ui:inspector.rotation}} del pezzo. Ruoterà intorno al perno. Gli assi della scheda corrispondono a quelli della piastra, quindi il metodo funziona se lo spigolo è lungo X, Y o Z.

Puoi anche usare {{ui:editor.tool.dropToWorkplane}} ([[D]]) per appoggiare la selezione sul piano di lavoro e {{ui:editor.tool.centerOnWorkplane}} per centrarla.

[[C]] solleva la selezione, come Cruise in Tinkercad: la forma segue il puntatore del mouse e si appoggia alla faccia del corpo sopra cui passi, anche se è inclinata. Un clic la posa; [[Esc]] la lascia dov’era. La parte inferiore si appoggia alla faccia ed è allineata ai suoi spigoli, come una nuova forma; la rotazione intorno al proprio asse verticale resta invariata. Più parti si spostano insieme mantenendo le distanze reciproche. Passando sopra la piastra vuota, [[C]] riporta sul piano di lavoro una parte inclinata.

## Motivi: fila e cerchio

Per creare griglie di fori, cerchi di bulloni e corone di denti, usa {{ui:editor.tool.array}}. Seleziona le forme da moltiplicare e fai clic sullo strumento nella barra.

![Il motivo in modalità «Cerchio»: le copie vengono mostrate inizialmente come anteprima.](shot:pattern-tool)

- **{{ui:array.mode.row}}:** ripete la selezione a intervalli regolari. La fila può avanzare contemporaneamente su tutti e tre gli assi con {{ui:array.spacingX}}, {{ui:array.spacingY}} e {{ui:array.spacingZ}}: un solo valore crea una fila diritta; due o tre producono una fila diagonale o una scala. Un intervallo negativo dispone la fila nella direzione opposta.
- **{{ui:array.mode.circle}}:** distribuisce la selezione intorno a un centro. Scegli il numero di copie con {{ui:array.count}} e imposta {{ui:array.angle}} su 360° per un cerchio completo. Puoi scegliere se ruotare anche le copie. {{ui:array.rise}} solleva ogni copia un po’ più della precedente, creando una vite o una spirale ascendente; {{ui:array.radiusChange}} la allontana dal centro o la avvicina, creando una spirale piatta. Usandoli insieme ottieni una spirale conica. Una spirale compie al massimo un giro: oltre 360° l’angolo viene considerato un cerchio completo e non si possono creare più di 100 copie.

Suggerimento: imposta prima il perno su una faccia con {{ui:editor.tool.rotationPivot}}; il centro del cerchio si troverà esattamente lì.

![Motivo circolare con un incremento di altezza e di raggio per ogni copia: le copie salgono e si allargano come una spirale.](shot:pattern-spiral)

Inizialmente le copie sono mostrate come anteprima. Solo {{ui:array.apply}} le crea davvero. Se sono fori, raggruppali con il corpo da forare.

## Motivo di fori su una faccia

Per creare aperture di ventilazione, griglie per altoparlanti, cestini e involucri, {{ui:holePattern.title}} distribuisce fori regolari su una faccia piatta. Non serve più creare un foro, ripeterlo e posizionarlo sulla parete. Seleziona un solo corpo e fai clic su {{ui:holePattern.title}} nel gruppo {{ui:editor.group.modify}} della barra degli strumenti, accanto allo strumento per i motivi. Puoi anche fare clic con il tasto destro sul corpo o trovarlo con [[Ctrl]]+[[K]].

1. Fai clic su una faccia piatta del corpo. Viene considerata tutta la faccia piatta intorno al punto, non solo il triangolo sotto il puntatore. Non è possibile usare una faccia curva: compare un messaggio e puoi scegliere una faccia piatta.
2. Nella finestra, scegli la forma e la disposizione dei fori:
   - **{{ui:holePattern.form}}:** {{ui:holePattern.form.round}}, {{ui:holePattern.form.square}}, {{ui:holePattern.form.rectangle}}, {{ui:holePattern.form.hexagon}} o {{ui:holePattern.form.slot}}.
   - **Dimensioni:** il {{ui:holePattern.size.diameter}} di un foro tondo, il {{ui:holePattern.size.side}} di uno quadrato, {{ui:holePattern.size.width}} e {{ui:holePattern.size.height}} di un rettangolo o di un’asola. Per un esagono, la dimensione indica la distanza tra {{ui:holePattern.size.corners}}.
   - **{{ui:holePattern.spacing}}:** distanza tra i centri di due fori vicini. Se è troppo piccola per le dimensioni scelte, layerling la aumenta al minimo necessario per lasciare una parete tra i fori.
   - **{{ui:holePattern.wall}}:** la stessa distanza espressa in un altro modo: lo spessore della parete che resta tra due fori vicini, quindi lo spessore della parete nella stampa. Inserendola, viene aggiornata la distanza tra i centri, e viceversa. Per esagoni, rettangoli e asole, layerling misura la distanza minima tra i bordi.
   - **{{ui:holePattern.arrangement}}:** {{ui:holePattern.arrangement.grid}} dispone i fori in righe e colonne. {{ui:holePattern.arrangement.staggered}} sposta ogni seconda riga della metà della distanza e avvicina le righe, così ogni foro ha i vicini alla stessa distanza; con gli esagoni si ottiene un nido d’ape.
   - **{{ui:holePattern.margin}}:** distanza libera tra i fori e il bordo della faccia. Vengono creati solo i fori interamente contenuti nella faccia, al netto di questo margine; quelli che oltrepasserebbero il bordo vengono esclusi. Il margine viene mantenuto anche intorno alle aperture nella faccia.
   - **{{ui:holePattern.depth}}:** {{ui:holePattern.depth.through}} (valore iniziale) fora tutta la parete. Con {{ui:holePattern.depth.custom}} puoi inserire la profondità in millimetri, per esempio per creare degli incavi.
3. Sulla faccia compare subito l’anteprima dei fori, che si aggiorna con ogni valore. La finestra indica quanti fori possono essere inseriti. {{ui:holePattern.repick}} permette di scegliere un’altra faccia; [[Esc]] chiude lo strumento. Come le altre finestre degli strumenti, puoi spostarla trascinando la barra del titolo.
4. Solo {{ui:holePattern.apply}} crea i fori.

I fori sono normali forme raggruppate con il corpo, proprio come dopo aver usato {{ui:editor.tool.group}}: la geometria non viene modificata in modo permanente. {{ui:editor.tool.ungroup}} scioglie il gruppo e libera ogni foro, che puoi poi spostare, modificare o eliminare singolarmente. L’intera operazione si annulla con un solo passaggio di {{ui:editor.tool.undo}}. Lo strumento crea al massimo 400 fori per volta; se sono di più, aumenta le dimensioni o la distanza.

Un sistema di intelligenza artificiale può eseguire la stessa operazione tramite il bridge MCP con `layerling_perforate_face` (vedi il capitolo [IA con MCP](chapter:ai-with-mcp)).

## Estrudere una faccia

Per creare una parete più spessa, un rialzo su una faccia o una tasca, lo strumento {{ui:faceTool.title}} lavora su una singola faccia piatta. Funziona anche su un file STL importato, che non contiene schizzi modificabili. Seleziona un solo corpo e fai clic su {{ui:faceTool.title}} nel gruppo {{ui:editor.group.modify}} della barra degli strumenti, accanto al motivo di fori. Puoi anche fare clic con il tasto destro sul corpo o cercare lo strumento con [[Ctrl]]+[[K]].

1. Fai clic su una faccia piatta del corpo. Come per il motivo di fori, viene considerata tutta la faccia piatta intorno al punto; le facce curve non sono supportate.
2. Nella finestra:
   - **{{ui:faceTool.direction}}:** scegli {{ui:faceTool.direction.out}} per aggiungere materiale sulla faccia oppure {{ui:faceTool.direction.in}} per creare una tasca. La tasca non può andare più in profondità del corpo dietro la faccia; su un corpo cavo può raggiungere la cavità.
   - **{{ui:faceTool.inset}}:** determina quanto il nuovo contorno resta all’interno del bordo della faccia. Verso l’esterno, il valore 0 usa tutta la faccia e rende la parete più spessa. Anche le aperture nella faccia si allargano della stessa misura.
   - **{{ui:faceTool.radius}}:** arrotonda tutti gli angoli del contorno, anche quelli interni, così una punta acuta termina con un arco. Un intaglio più stretto del doppio del raggio si chiude; le parti della faccia più strette del doppio del margine più il raggio vengono escluse.
   - **{{ui:faceTool.depth}}:** indica quanto il nuovo materiale sporge dalla faccia o quanto è profonda la tasca.
3. Il risultato compare subito in anteprima e si aggiorna con ogni valore. {{ui:faceTool.repick}} permette di scegliere un’altra faccia; [[Esc]] chiude lo strumento.
4. Solo {{ui:faceTool.apply}} applica la modifica.

Il materiale aggiunto è un normale corpo ottenuto da uno schizzo e raggruppato con il corpo originale: la geometria non viene modificata in modo permanente. {{ui:group.edit}} apre il gruppo; {{ui:inspector.editSketch}} sulla nuova parte mostra il contorno seguito. Sulla faccia superiore o inferiore di un corpo semplice ottenuto da uno schizzo (una sola superficie, non raggruppato, specchiato, rastremato, ritorto o inclinato e senza contorni, portachiavi, raccordi o smussi), si usa il contorno originale del corpo, definito al momento della creazione. Le sue linee e i suoi archi restano esatti ovunque il kernel CAD riesca a inserirli; vengono mantenuti dagli strumenti per gli spigoli e dall’esportazione STEP. Se ridimensioni il corpo in seguito, il margine resta invariato. Su qualsiasi altra faccia, e su tutte quelle di una mesh importata, il contorno segue i triangoli della faccia e le curve diventano brevi segmenti rettilinei. L’intera operazione si annulla con un solo passaggio di {{ui:editor.tool.undo}}. Per modificare in seguito il margine o il raggio, annulla e usa di nuovo lo strumento. Per arrotondare lo spigolo superiore in seguito, usa {{ui:editor.tool.fillet}} con {{ui:edge.topEdges}} sul gruppo come ultimo passaggio: come per qualsiasi trattamento degli spigoli su un gruppo, il gruppo viene unito in un unico corpo.

Un sistema di intelligenza artificiale può eseguire la stessa operazione tramite il bridge MCP con `layerling_push_face` (vedi il capitolo [IA con MCP](chapter:ai-with-mcp)).

## Modificare più parti insieme

Selezionando più parti, il pannello delle proprietà a destra indica quante sono e propone le opzioni valide per tutte: {{ui:inspector.solid}} o {{ui:inspector.hole}}, un unico colore (fai clic su {{ui:inspector.solid}} per aprire la tavolozza) e il blocco. Se la selezione contiene forme di tipo diverso, un clic le rende tutte solide o tutte fori. Se anche una sola parte è bloccata, puoi usare soltanto il comando di blocco. Le dimensioni si modificano con le maniglie, con {{ui:scalePercent.title}} o inserendo un numero nell’etichetta di una dimensione. Con più parti, il numero indica la dimensione dell’intera selezione: ogni parte si ingrandisce insieme alle distanze tra loro, come quando trascini una maniglia. Puoi impostare un solido o un foro anche con il clic destro o con i tasti [[S]] e [[H]].

## Ridimensionare in percentuale

Per ingrandire o rimpicciolire una o più parti della stessa percentuale, per esempio tutte le parti di un file di stampa del 20%, usa {{ui:scalePercent.title}}. Seleziona le parti, fai clic con il tasto destro e scegli {{ui:scalePercent.title}}, oppure cerca il comando con [[Ctrl]]+[[K]].

In {{ui:scalePercent.percent}} inserisci la dimensione come percentuale di quella attuale: 120% è un quinto in più, 50% è la metà. Larghezza, profondità e altezza cambiano allo stesso modo, mantenendo le proporzioni. La base resta ferma, così nessuna parte affonda nella piastra.

Selezionando più parti, puoi scegliere come ridimensionarle:

- **{{ui:scalePercent.mode.together}}:** le parti si ingrandiscono intorno al centro comune e anche le distanze aumentano. L’intera selezione cresce come se fosse una sola parte.
- **{{ui:scalePercent.mode.each}}:** ogni parte si ingrandisce nella posizione in cui si trova e le distanze tra le parti non cambiano.

Solo {{ui:scalePercent.apply}} modifica il progetto; puoi annullare l’operazione con un solo passaggio. Se la selezione contiene una parte bloccata, lo strumento non si apre.

## Annullare e ripristinare

{{ui:editor.tool.undo}} ([[Ctrl]]+[[Z]]) e {{ui:editor.tool.redo}} ([[Ctrl]]+[[Shift]]+[[Z]] oppure [[Ctrl]]+[[Y]]) scorrono la cronologia delle modifiche. Nelle impostazioni, sotto {{ui:workspace.history}}, scegli quanti passaggi vengono salvati insieme al progetto.

## Rivedere la cronologia

{{ui:editor.tool.history}}, accanto ai comandi Annulla e Ripristina, apre la cronologia senza modificare nulla. L’area di lavoro mostra il progetto nello stato selezionato e il cursore in basso scorre tutti i passaggi: all’estrema destra c’è lo stato attuale; ogni passaggio verso sinistra corrisponde a un Annulla; a destra dello stato attuale si trovano le modifiche annullate. Usa i tasti freccia per spostarti tra gli stati; [[Esc]] torna a quello attuale. Nel frattempo puoi ruotare e ingrandire la vista e fare clic sugli oggetti per ripristinarli (vedi sotto), ma non puoi spostarli; il progetto resta intatto. Se la barra copre qualcosa, trascinala dalla barra del titolo; fai doppio clic per riportarla al suo posto.

Puoi recuperare due elementi da uno stato precedente. {{ui:historyView.createProject}} crea un nuovo progetto nella panoramica a partire da quello stato; il nome è quello del progetto corrente seguito, tra parentesi, dall’ora dello stato. Se un progetto salvato precedentemente non contiene l’ora, viene aggiunto «copia». Anche la cronologia fino a quel punto viene conservata, così puoi continuare ad annullare le modifiche. {{ui:historyView.export}} apre la normale finestra di esportazione usando quello stato, da salvare come STL, 3MF, STEP, immagine o file LYL con la cronologia fino a quel momento.

Puoi anche ripristinare singoli oggetti nel progetto. Fai clic su un oggetto nello stato mostrato; con [[Shift]]+clic ne aggiungi altri o ne rimuovi uno, mentre facendo clic nello spazio vuoto deselezioni tutto. Scegli {{ui:historyView.bringBack}}. La vista si chiude e una copia di ogni oggetto viene aggiunta al progetto attuale, selezionata e nella posizione che occupava in quello stato; il resto non cambia. L’operazione conta come un solo passaggio e può essere annullata. Usala per recuperare una versione di una parte modificata in seguito o una parte che hai eliminato. Un gruppo viene ripristinato per intero; le note e i punti di riferimento associati a un oggetto restano nello stato precedente. Al nome viene aggiunto l’orario dello stato, per esempio «Scatola (12:32)», così puoi distinguerlo dalla versione attuale. Per recuperare una parte all’interno di un gruppo, seleziona il gruppo e scegli {{ui:historyView.openGroup}} oppure premi [[E]], come nel progetto: le parti vengono disposte come quando apri il gruppo per modificarlo e puoi selezionarle. La barra indica il gruppo aperto. {{ui:historyView.backOut}} lo richiude. Questa operazione serve solo a consultare la cronologia: gruppo, progetto e cronologia restano invariati.

{{ui:historyView.delete}} si trova da solo in basso a sinistra sulla barra. Dopo una richiesta di conferma, elimina definitivamente tutti i passaggi precedenti: il progetto conserva lo stato attuale, non quello mostrato; Annulla non avrà più nulla da ripristinare e i file salvati in seguito non conterranno la cronologia. Usalo per condividere un progetto senza il suo passato o per ricominciare da zero con i passaggi di Annulla. L’operazione non può essere annullata. Per condividere un file senza modificare la cronologia del tuo progetto, scegli {{ui:export.historyNone}} durante l’esportazione.