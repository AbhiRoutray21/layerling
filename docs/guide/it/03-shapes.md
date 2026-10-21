---
title: Posizionare e modificare le forme
summary: La libreria delle forme, le dimensioni inserite con valori o maniglie, il colore, la rotazione, la rastremazione e la torsione.
---

In layerling ogni pezzo parte da una forma. Da queste puoi costruire tutto il resto: le forme si completano a vicenda, si sottraggono materiale o si uniscono per crearne una nuova.

## Aggiungere una forma

Fai clic su {{ui:editor.addShape}} nella barra degli strumenti. Si apre la libreria delle forme.

![La libreria delle forme. Ogni immagine è generata dalla geometria reale della forma.](shot:shape-menu)

La libreria si chiude dopo ogni scelta. Puoi spostarla trascinando la barra del titolo, per metterla in un punto che non copra quello che vuoi selezionare, per esempio sopra il pannello delle proprietà. Fai doppio clic sulla barra del titolo per rimetterla sotto il pulsante; la posizione viene conservata nel browser. Il fermo nella barra del titolo mantiene aperta la libreria mentre aggiungi più forme una dopo l’altra. Trascina i bordi e gli angoli per ridimensionarla, fin dove lo schermo lo consente; anche le dimensioni vengono salvate nel browser. Fai doppio clic su un bordo per ripristinarle. Se la restringi, la libreria nasconde i nomi e mostra solo le immagini: il nome compare quando passi il puntatore su una forma.

Scegli una forma. A questo punto resta agganciata al puntatore del mouse e viene posizionata dove fai clic. Se la sposti sopra un corpo, si appoggia alla faccia sotto il puntatore, anche se inclinata, come lo strumento Cruise di Tinkercad; sopra la piastra vuota, si appoggia al piano di lavoro. [[Esc]] annulla il posizionamento. Gli strumenti che attendono un clic, come il metro a nastro, la squadra, una nota, {{ui:camera.placeWorkplane}}, {{ui:editor.tool.layFlat}} o gli strumenti per gli spigoli, si disattivano quando scegli una forma, così il clic la posiziona. Al contrario, attivando uno di quegli strumenti la forma viene posata. Se preferisci che le forme compaiano al centro della piastra, puoi disattivare il posizionamento con un clic nelle impostazioni (sezione {{ui:workspace.appearance}}, interruttore {{ui:workspace.cruise}}).

La libreria offre:

- **Forme di base:** {{ui:shape.box}}, {{ui:shape.roundedBox}}, {{ui:shape.cylinder}}, {{ui:shape.slot}}, {{ui:shape.ellipse}}, {{ui:shape.polygon}} (da tre a ventiquattro lati), {{ui:shape.sphere}}, {{ui:shape.cone}}, {{ui:shape.pyramid}} (da tre a ventiquattro lati, compreso il triangolo), {{ui:shape.wedge}}, {{ui:shape.roundRoof}}, {{ui:shape.halfSphere}} e {{ui:shape.torus}}.
- **Tubi:** {{ui:shape.tube}} e {{ui:shape.bentTube}}, composti da un massimo di dodici segmenti rettilinei con curve tra un segmento e l’altro, e {{ui:shape.loft}}, che collega un profilo a un altro, per esempio un quadrato a un cerchio.
- **Forme decorative:** {{ui:shape.star}}, {{ui:shape.heart}} e {{ui:shape.crescent}}.
- **Testo:** {{ui:shape.text}}, anche lungo un arco circolare. Per saperne di più, consulta [Testo](chapter:text).
- **Meccanica:** {{ui:shape.thread}} (asta filettata, vite, dado e foro filettato), {{ui:shape.spring}}, contenitori e piastre di base {{ui:shape.gridfinity}}, {{ui:shape.gear}} e {{ui:shape.knurl}} per le impugnature. Per saperne di più, consulta [Filettature e meccanismi](chapter:threads-and-mechanics).
- **Per le costruzioni:** {{ui:shape.hinge}} stampabile in un unico pezzo, {{ui:shape.dovetail}}, {{ui:shape.teardrop}} per i fori orizzontali, {{ui:shape.counterbore}} e {{ui:shape.countersink}} per le teste delle viti e {{ui:shape.ruler}}, che è solo uno strumento di misurazione e non compare mai nei file esportati.

Puoi ottenere un triangolo in due modi: {{ui:shape.polygon}} con tre lati crea un triangolo isoscele, il «tetto» di Tinkercad; {{ui:shape.wedge}} crea invece un triangolo rettangolo. Entrambe sono vere e proprie forme prismatiche triangolari. Per creare un foro triangolare, duplica la forma, riduci le dimensioni della copia, impostala come foro e allineala con {{ui:editor.tool.centerOnWorkplane}} o {{ui:editor.tool.align}}. Entrambi i comandi usano il riquadro d’ingombro della forma, cioè il riquadro più piccolo che la contiene: anche un quadrato dimezzato viene quindi considerato un quadrato intero. La ricerca dei comandi ([[Ctrl]]+[[K]]) trova entrambe le forme anche cercando «triangolo» o «tetto».

{{ui:shape.slot}} può essere più stretta a un’estremità che all’altra, per esempio per creare una protezione sopra la cinghia tra due pulegge. In {{ui:inspector.properties}} imposta {{ui:prop.slotSmallEnd}}: l’estremità più larga ha la stessa larghezza della capsula e i lati sono linee rette che collegano i due archi. {{ui:prop.slotCentreDistance}} indica la distanza tra i centri dei due archi, cioè la distanza tra le pulegge. Se modifichi l’estremità più stretta, la distanza tra i centri non cambia e la capsula si allunga o si accorcia. Anche la capsula rastremata resta un corpo esatto, utilizzabile con raccordi e nell’esportazione STEP.

## Le impostazioni della forma

Quando selezioni una forma, le sue impostazioni compaiono a destra. In alto c’è il nome; facendo clic sulla matita accanto ({{ui:outliner.rename}}) puoi inserirne uno nuovo. [[Enter]] lo conferma, [[Esc]] annulla e, se lasci il nome vuoto, torna quello predefinito. Più a destra, il lucchetto impedisce di spostare la forma per errore e l’occhio la nasconde. La freccia all’estrema sinistra comprime le impostazioni lasciando visibile solo la barra del titolo.

Il pannello delle impostazioni è ancorato al bordo destro. Se copre qualcosa che vuoi vedere, trascinalo dalla barra del titolo: rimarrà sospeso nel punto in cui lo rilasci. La posizione si mantiene anche per la forma successiva. Per ancorarlo di nuovo, rilascialo in alto a destra oppure fai doppio clic sulla barra del titolo. Quando il pannello è sospeso o compresso, l’incremento di aggancio si sposta dal fondo del pannello all’angolo in basso a destra del piano di lavoro.

![Le impostazioni di un cilindro: solido o foro, diametro e altezza impostabili con un numero o un cursore.](shot:editor-overview)

- **{{ui:inspector.solid}} o {{ui:inspector.hole}}:** il solido resta, il foro asporta materiale. Facendo clic su {{ui:inspector.solid}} si apre la tavolozza dei colori. I colori personalizzati che crei vengono poi raccolti in {{ui:inspector.recentColors}}, con gli ultimi otto usati. Per saperne di più, consulta [Solidi e fori](chapter:solids-and-holes). Il fermo nella riga {{ui:inspector.keptColors}} mantiene per sempre il colore scelto: viene mostrato in una riga separata e i colori più recenti non lo sostituiscono. Fai di nuovo clic sul fermo per rimuoverlo. Puoi conservare fino a 21 colori in questo browser.
- **{{ui:inspector.transparent}}:** rende il corpo trasparente, per esempio per vedere una forma che si trova dietro.
- **{{ui:inspector.multicolor}}:** disponibile solo per i gruppi; puoi attivarlo o disattivarlo con [[Shift]]+[[M]]. Quando è attivo, ogni parte del gruppo mantiene il proprio colore, anche se il gruppo è stato tagliato con fori per formare un unico corpo (le pareti lasciate dai fori assumono il colore del corpo in cui sono stati praticati). Se scegli un colore per il gruppo, l’opzione si disattiva e tutto il gruppo assume quel colore. I raggruppamenti mantengono sempre i colori delle singole parti. Nell’esportazione 3MF ogni parte conserva il proprio colore, così il programma di slicing può assegnarla ai filamenti; OBJ conserva i colori dei vertici, quindi il confine tra colori diversi risulta un po’ più irregolare.
- **{{ui:inspector.properties}}:** contiene le dimensioni e tutte le altre proprietà della forma. Per un cilindro, il diametro, l’altezza e il numero di lati. Per un tubo o un anello tondo, {{ui:prop.outerDiameter}}, {{ui:prop.innerDiameter}} (utile per una boccola da montare su un albero di dimensioni note) e lo spessore della parete: inserendone due qualsiasi, nell’ordine che preferisci, viene calcolata la terza. Il diametro esterno mantiene invariato il foro e modifica la parete; quello interno mantiene invariato il diametro esterno e modifica la parete. Se il foro è più largo del tubo, il diametro esterno aumenta in base allo spessore della parete. La lunghezza del tubo corrisponde alla sua altezza. Se deformi un tubo non circolare tirando uno dei lati, al posto del solo diametro esterno compaiono i campi Lunghezza e Larghezza; in questo caso, modificando la larghezza, lo spessore della parete resta invariato. Per un ingranaggio trovi il numero di denti, per una molla il numero di spire. Accanto al nome di ogni valore modificato rispetto a quello predefinito compare una piccola freccia: facendoci clic, ripristini solo quel valore, indipendentemente da ciò che hai fatto dopo, diversamente da Annulla. Anche facendo doppio clic su un cursore ripristini il valore iniziale; lo stesso vale per i cursori delle impostazioni dell’area di lavoro. Trascinando con il mouse il cursore di una lunghezza, il valore si aggancia all’incremento di aggancio, così l’altezza varia in millimetri interi (tranne quando la griglia è disattivata o il cursore è troppo corto). I valori digitati e regolati con i tasti freccia restano invece precisi. {{ui:inspector.saveDefaults}} in fondo salva i valori correnti come valori iniziali per questo tipo di forma, come {{ui:workspace.shapeDefaults}} nelle impostazioni; {{ui:inspector.resetDefaults}} ripristina quelli originali dell’app.
- **{{ui:inspector.makeEllipse}}:** disponibile solo per un cilindro. Un cilindro è sempre tondo: ha un solo diametro e ogni maniglia cambia entrambi i lati insieme. Per ottenere un ovale, fai clic qui per trasformarlo in {{ui:shape.ellipse}}: è lo stesso corpo, ma puoi impostarne separatamente lunghezza e larghezza. Non puoi usare questa trasformazione su un cilindro con smussi, raccordi o pareti, né su uno ruotato o raggruppato: in questi casi, crea direttamente {{ui:shape.ellipse}}.
- **{{ui:inspector.taper}}:** applica dimensioni diverse in alto e in basso, per esempio per creare una pendenza o un imbuto.
- **{{ui:inspector.twist}}:** torce la parte superiore rispetto a quella inferiore oppure la sposta lateralmente. Puoi così creare colonne ritorte e torri inclinate.

![Un gruppo con un blocco arancione, un perno blu e un foro che attraversa un unico corpo. Con Colori multipli attivo, il perno resta blu, il blocco arancione e le pareti del foro prendono il colore del blocco.](shot:group-multicolor)

Rastremazione e torsione funzionano con quasi tutte le forme. Fanno eccezione l’ingranaggio, la filettatura, la molla, Gridfinity, la zigrinatura, la cerniera, la piramide, il tubo curvo, la goccia, gli strumenti per le teste delle viti e il righello: hanno dimensioni fisse oppure, come la piramide, una parte superiore già definita.

![Un cono con raggio superiore e altezza modificati: accanto a ciascun valore c’è una piccola freccia per ripristinarlo; in basso, due pulsanti permettono di salvare o ripristinare i valori iniziali della forma.](shot:property-reset)

{{ui:inspector.saveDefaults}} salva le modifiche apportate alla forma come valori iniziali per tutte le nuove forme dello stesso tipo: dimensioni, impostazioni e colore. Colora di verde un cilindro e premi il pulsante: da quel momento, tutti i nuovi cilindri saranno verdi; gli altri tipi manterranno i propri colori. {{ui:inspector.resetDefaults}} ripristina i valori iniziali dell’app per quel tipo di forma. Nelle impostazioni, sotto {{ui:workspace.shapeDefaults}}, sono contrassegnati i tipi che hanno valori predefiniti. Anche un nuovo progetto creato dalla pagina iniziale li utilizza. I valori sono conservati in questo browser.

Scatole, cilindri, ellissi, poligoni, tubi e anelli rastremati o inclinati mantengono la loro forma esatta, come le capsule, le stelle, i cuori, le mezzelune, gli incastri a coda di rondine e le scatole arrotondate senza bordi superiori e inferiori arrotondati. Puoi applicare smussi e raccordi come sulle forme semplici e l’esportazione STEP le conserva. Lo stesso vale per le forme ritorte: la sezione ruota con precisione man mano che sale e i lati si avvolgono in modo uniforme dal basso verso l’alto.

Digitare è più preciso che trascinare. Tutti i campi numerici accettano i millimetri e le percentuali: se inserisci «50 %» nella larghezza di 40 mm, ottieni 20 mm. Puoi anche eseguire calcoli: «15*3», «120-2*4» o «(40+2)/2» restituiscono rispettivamente 45, 112 e 21; puoi usare `x` al posto di `*`. Il campo memorizza il calcolo, sia nel pannello delle proprietà sia nelle quote intorno al corpo selezionato: quando ci fai di nuovo clic, la formula compare al posto del numero, se il valore corrisponde ancora, e puoi modificarla direttamente, per esempio da «(140+2)/2» a «(40+6)/2». Se trascini una maniglia o ridimensioni il corpo, la formula non corrisponde più e il campo mostra di nuovo solo il numero.

## Quanto è tondo un cerchio? Il numero di lati

Nelle proprietà delle forme tonde, come cilindri, coni, tubi, ellissi e fori, trovi l’interruttore {{ui:prop.sidesFollowSize}} e il cursore {{ui:prop.sides}}. {{ui:shape.torus}} ha due cursori: {{ui:prop.torusSides}} regola i lati intorno all’anello, {{ui:prop.torusSteps}} quelli intorno al tubo. Anche questi valori si adattano alle dimensioni finché non li imposti manualmente, così un toro grande non mostra sfaccettature. Il motivo è semplice: per visualizzare ed esportare in STL, 3MF e OBJ, layerling disegna i cerchi come poligoni composti da tanti piccoli lati. Più lati ci sono, più la forma è liscia e più triangoli servono.

**Quando il numero di lati è importante**

- **Nell’esportazione per il programma di slicing** (STL, 3MF, OBJ). Un cilindro con pochi lati viene esportato come poligono.
- **Quando si uniscono corpi e fori.** Se il foro è stato praticato con una forma che ha pochi lati, anche il pezzo finito avrà un foro spigoloso. Questo vale anche per i fori delle viti.
- **Nella vista.** Molte forme molto dettagliate rallentano l’editor.

**Quando non è importante**

- **Nell’esportazione STEP.** Il file conserva la forma tonda, non il poligono.
- **Per smussi e raccordi** ({{ui:editor.tool.chamfer}}, {{ui:editor.tool.fillet}}), finché la forma resta tonda. È così se non hai impostato il numero di lati, se questo è almeno pari al valore predefinito della forma oppure se il poligono si discosta dal cerchio al massimo di {{value:EXACT_ROUND_TOLERANCE}} mm. Il valore predefinito è {{value:ROUND_FROM_SIDES}} lati per cilindri, ellissi, tubi e coni; {{value:ROUND_FROM_ROOF_SIDES}} per {{ui:shape.roundRoof}}; {{value:ROUND_FROM_SPHERE_STEPS}} segmenti per {{ui:shape.sphere}}; {{value:ROUND_FROM_HALF_SPHERE_STEPS}} per {{ui:shape.halfSphere}}; {{value:ROUND_FROM_TORUS_SIDES}} lati e {{value:ROUND_FROM_TORUS_STEPS}} segmenti per {{ui:shape.torus}}; infine, {{value:ROUND_FROM_BENT_TUBE_QUALITY}} come valore di {{ui:prop.quality}} per {{ui:shape.bentTube}} tondo.
- **Per filettature, molle e ingranaggi elicoidali.** Lo strumento per gli spigoli e l’esportazione STEP utilizzano la geometria esatta; {{ui:prop.quality}} determina solo il livello di dettaglio della visualizzazione.

**Quando torna a essere importante**

- **Per smussi e raccordi su una forma con pochi lati.** Se imposti un numero di lati inferiore al valore predefinito, lo strumento per gli spigoli usa la forma visualizzata: un cilindro a sei lati resta un prisma esagonale e il raccordo segue i suoi sei spigoli. Puoi usarlo, per esempio, per creare una sede esagonale per un dado con angoli arrotondati. Per mantenere tonda una forma, lascia attivo {{ui:prop.sidesFollowSize}}.

**Come usarlo**

- **Lascia attivo {{ui:prop.sidesFollowSize}}.** layerling sceglierà il numero di lati in base al diametro, in modo che il poligono si discosti dal cerchio vero al massimo di {{value:ROUND_DEVIATION_TOLERANCE}} mm, molto meno di quanto una stampante riesca a risolvere. Le forme piccole avranno almeno {{value:MIN_AUTOMATIC_SIDES}} lati; quelle grandi ne avranno di più.
- **Riduci il numero di lati** se vuoi ottenere un poligono intenzionalmente (ma puoi anche usare {{ui:shape.polygon}}) oppure se l’editor rallenta a causa delle numerose forme tonde.
- **Aumenta il numero di lati** solo raramente: per parti tonde molto grandi, se nel file STL sono visibili gli spigoli.
- **Se devi solo lavorare sugli spigoli o esportare in STEP,** il numero di lati è irrilevante.

## Usare le maniglie

Oltre alle impostazioni, la forma presenta alcune maniglie:

- **Angoli e spigoli** servono per ingrandire o rimpicciolire la forma. Se trascini un lato oltre quello opposto, la forma continua a crescere dall’altro lato. La freccia in alto fa lo stesso verso il basso, sotto la base. Tieni premuto [[Shift]] mentre trascini un angolo per ridimensionare insieme larghezza, profondità e altezza mantenendo le proporzioni; tieni premuto [[Alt]] per ridimensionare a partire dal centro anziché dall’angolo opposto. Se non hai una tastiera o preferisci non tenere premuto un tasto, attiva {{ui:inspector.keepProportions}} in cima alle proprietà: gli angoli manterranno sempre le proporzioni e digitando un valore di larghezza, profondità o altezza anche gli altri due verranno ridimensionati dello stesso fattore. L’impostazione viene memorizzata.
- **La freccia in alto** cambia l’altezza; **la maniglia al centro** solleva o abbassa la forma.
- **Le frecce curve** ruotano la forma.
- **I numeri** accanto alla forma ne indicano le dimensioni. Fai clic su un numero per aprire un campo e inserire il valore desiderato. Premendo [[Enter]], la forma cresce dal lato opposto al numero, come quando la trascini; con [[Alt]]+[[Enter]] cresce intorno al centro, così resta allineata a un’altra forma. Questo vale per larghezza e lunghezza; l’altezza cresce sempre verso l’alto, a partire dalla base. I campi delle proprietà a destra mantengono il centro senza bisogno di tasti speciali. [[Tab]] conferma il numero e passa al campo successivo (larghezza, profondità, altezza); [[Shift]]+[[Tab]] torna al precedente. Nel campo delle proprietà selezionato, anche la rotellina del mouse cambia il valore: un’unità per scatto, dieci volte tanto con [[Shift]], un decimo con [[Ctrl]] e un centesimo con [[Alt]]. Se il campo non è selezionato, la rotellina scorre il pannello.
- **Facendo clic su un angolo** senza trascinarlo, puoi inserire insieme larghezza e profondità. Digita il primo valore, premi [[Tab]] per passare al secondo e [[Enter]] per applicarli entrambi. [[Esc]] annulla.

Quando ruoti una forma di angoli retti, per esempio appoggiandola su un lato con {{ui:editor.tool.layFlat}}, i campi delle proprietà prendono il nome della direzione in cui va ciascuna misura: {{ui:prop.height}} indica la dimensione verticale, {{ui:prop.width}} quella lungo X e {{ui:prop.length}} quella lungo Y. Inserendo quindi l’altezza di una forma coricata, ne cambi la dimensione verticale e la base resta appoggiata alla piastra. Se la forma è inclinata a un angolo diverso, i campi mostrano le sue misure effettive e una nota lo segnala.

Puoi usare la tastiera al posto del mouse: i tasti freccia spostano la selezione di un incremento di aggancio (0,01 mm quando la griglia è disattivata); con [[Shift]] lo spostamento è di cinque incrementi, o di dieci se imposti {{ui:workspace.gridMajorEvery}} su {{ui:workspace.gridMajorSteps|10}} nelle impostazioni sotto {{ui:workspace.appearance}}, fino alla linea più scura successiva, come in Tinkercad. Le frecce seguono la vista: [[→]] sposta nella direzione che sullo schermo corrisponde a destra, [[↑]] allontana da te, anche dopo aver ruotato la piastra. Se sposti una forma fuori dalla visuale, anche la vista si sposta per seguirla. [[Ctrl]]+[[↑]] e [[Ctrl]]+[[↓]] la sollevano o la abbassano. Una sequenza di pressioni dei tasti freccia costituisce un solo passaggio nella cronologia: se la pressione successiva avviene entro un secondo e mezzo, Annulla ripristina l’intera sequenza, non un tasto alla volta. [[R]] ruota di 45°; [[Shift]]+[[R]] di 22,5°. [[D]] appoggia la selezione sul piano di lavoro.

Con le maniglie puoi ingrandire una forma fino alle dimensioni della piastra, almeno 220 mm in larghezza e profondità. Inserendo un numero nelle proprietà puoi superare quel limite; una forma ingrandita in questo modo non si riduce quando torni a trascinarne una maniglia. Puoi impostare un limite personale per ciascun tipo di forma nelle impostazioni, sotto {{ui:workspace.shapeDefaults}}, con {{ui:workspace.customLimit}}.

L’incremento di aggancio si trova in basso a destra nell’editor e puoi cambiarlo in qualsiasi momento.

## Copiare e duplicare

{{ui:editor.tool.copy}}, {{ui:editor.tool.paste}} e {{ui:editor.tool.duplicate}} si trovano nella barra degli strumenti ({{ui:editor.group.clipboard}}). [[Ctrl]]+[[D]] duplica la selezione. layerling ricorda come hai spostato o ruotato l’ultima copia e ripete la stessa operazione alla duplicazione successiva. Bastano così pochi tasti per creare una fila di fori o gradini. Per le disposizioni regolari puoi usare anche il motivo, descritto in [Selezione e disposizione](chapter:select-and-arrange).

> **Suggerimento:** se una forma non assume le dimensioni desiderate, spesso il problema dipende dai limiti previsti per le nuove forme. Nelle impostazioni, sotto {{ui:workspace.shapeDefaults}}, puoi scegliere come iniziano e quanto possono diventare grandi.

## Forme personalizzate

Un supporto, un’impugnatura o una piastra che usi spesso può essere aggiunto a {{ui:myShapes.title}}. Le forme personali compaiono in cima alla libreria, sopra {{ui:myShapes.basicShapes}}, e puoi comprimerle con la freccia accanto al titolo.

1. Seleziona uno o più corpi, fori, gruppi oppure un modello importato.
2. Apri la libreria delle forme e fai clic su {{ui:myShapes.saveSelection}}. Inserisci un nome e conferma con {{ui:common.save}}.
3. In qualsiasi progetto, fai clic sulla miniatura per inserire la forma come faresti con qualunque altra. Puoi anche trascinare la miniatura sul piano di lavoro e rilasciarla nel punto desiderato. A quel punto la forma resta agganciata al puntatore come le altre: lo segue anche sopra le facce di altri corpi e un clic la posiziona; [[Esc]] la rimuove.

I corpi vengono reinseriti insieme, mantenendo la disposizione reciproca, ma restano selezionabili singolarmente. La matita sulla miniatura permette di rinominarla; il cestino la elimina dopo una richiesta di conferma. Le forme già inserite nei progetti non cambiano.

Le forme personalizzate di {{ui:myShapes.title}} sono conservate in questo browser, separatamente dai progetti, e saranno disponibili anche la prossima volta. {{ui:dashboard.backupAll}} nella pagina iniziale ne crea una copia insieme ai progetti; ripristinando la copia, recuperi entrambi. Per trasferire solo le forme in un altro browser, {{ui:myShapes.backup}} (la freccia verso il basso) le salva in un file ZIP e {{ui:myShapes.load}} (la freccia verso l’alto) le importa. {{ui:myShapes.load}} accetta anche singoli progetti `.lyl`, ognuno dei quali diventa una forma. Le forme già presenti non vengono aggiunte una seconda volta.

### Forme personalizzate sul server

Se attivi l’[archivio condiviso sul server](chapter:files-and-saving), la sezione mostra due gruppi: {{ui:myShapes.onServer}} e {{ui:myShapes.inBrowser}}. Quando salvi, scegli dove archiviare la forma; inizialmente è selezionato il server. La forma viene salvata nella cartella `Custom shapes`, come file `.lyl` indipendente con un’immagine, ed è disponibile su tutti i dispositivi che accedono al server. L’icona della nuvola su una forma del browser la trasferisce sul server; a quel punto non viene più conservata in entrambe le posizioni.

Anche nella pagina iniziale compare la cartella `Custom shapes`. Apri una forma come un progetto, modificala e verrà salvata automaticamente, come qualsiasi altro progetto sul server; al successivo inserimento userai la versione aggiornata. Poiché l’archivio sul server non prevede un accesso con credenziali, tutti quelli che raggiungono il server vedono le stesse forme.

## Avvolgere una forma intorno a un cilindro

Vuoi applicare un motivo, un logo o un testo a una tazza, una lattina o un tubo? Prima disponilo piatto sulla piastra, per esempio importando un SVG o creando un testo, come deve apparire visto dall’alto. Poi, nelle impostazioni della forma, avvolgilo intorno a un cilindro con {{ui:inspector.wrapCylinder}}:

1. Apri {{ui:inspector.wrapCylinder}} e inserisci {{ui:inspector.wrapDiameter}}, cioè il diametro della parete del cilindro, per esempio il diametro esterno della tazza. Puoi usare anche i decimi di millimetro, come 63,5.
2. Fai clic su {{ui:inspector.wrapApply}}. Ciò che prima andava da sinistra a destra ora corre intorno al cilindro, il bordo posteriore diventa quello superiore e lo spessore sporge dalla parete.
3. Seleziona la forma avvolta e il cilindro e centra entrambi da sinistra a destra e dal davanti al dietro. Il centro della forma avvolta coincide con l’asse del cilindro, quindi la forma si appoggia esattamente alla parete.

Per un’incisione, attiva {{ui:inspector.wrapInward}}: lo spessore penetrerà nella parete. Trasforma la forma in un foro, centrala e raggruppala con il cilindro.

Una forma già avvolta diventa una mesh e non può essere avvolta di nuovo. Annulla l’operazione oppure avvolgi ancora una volta la forma originale piatta usando un altro diametro.

Il risultato è una mesh, come un modello importato. Annulla per riappoggiare la forma in piano; per usare un altro diametro, annulla prima l’operazione e poi avvolgila di nuovo. La forma non può compiere più di un giro intorno al cilindro; in tal caso layerling imposta il diametro minimo che la contiene.