---
title: "Schizzi: dal contorno al corpo"
summary: Disegna un contorno piatto, arrotondane o smussane gli angoli e trasformalo in un corpo per estrusione o rivoluzione.
---

Non tutto si può costruire con forme di base. Per i pezzi con un proprio contorno, come una staffa, il profilo di un dente o un vaso, prima disegni il **contorno** e poi ne ricavi un corpo. È a questo che serve la modalità schizzo.

## Creare uno schizzo

In alto, passa da {{ui:editor.modeGeometry}} a {{ui:editor.modeSketch}}. Nel gruppo {{ui:sketch.group.create}} della barra degli strumenti trovi tre pulsanti affiancati, che determinano come trasformare il contorno:

- **{{ui:sketch.extrude}}:** il contorno viene estruso verso l’alto, come uno stampino per biscotti.
- **{{ui:sketch.revolve}}:** il contorno ruota intorno a un asse, come su un tornio. Puoi creare vasi, tazze, coni e qualsiasi forma tonda.
- **{{ui:sketch.sweep}}:** il contorno segue un percorso, per esempio un canalino per cavi che gira intorno a un angolo, una conduttura o un anello intorno a una forma. Vedi «Estrudere lungo un percorso» più avanti.

L’editor mostra un foglio con una griglia: è la superficie su cui disegnare.

## Disegnare

Nella modalità schizzo, la barra degli strumenti è divisa in sezioni:

- **Disegna:** {{ui:sketch.line}} crea segmenti rettilinei: fai clic sui punti uno dopo l’altro; tenendo premuto [[Shift]], la nuova linea si aggancia a incrementi di 15°, incluse le direzioni orizzontale e verticale. Accanto al puntatore appaiono la lunghezza e l’angolo della linea. Puoi anche inserire la lunghezza desiderata: vedi [Linee con valori numerici](#linee-con-valori-numerici). {{ui:sketch.bezier}} crea curve controllate con le maniglie: fai clic su un punto e trascina nella direzione in cui vuoi che prosegua la linea, come con lo strumento Penna di Illustrator o Inkscape. Più trascini, più la curva si piega; mentre trascini, anche il segmento fino al nuovo punto si incurva, così vedi subito il risultato. Trascinare mentre posizioni un punto curva la linea; se vieni da Tinkercad e vuoi semplicemente fare clic sui punti, usa {{ui:sketch.smooth}}. {{ui:sketch.smooth}} traccia un percorso fluido attraverso i punti che selezioni. Per chiudere il contorno, alla fine fai di nuovo clic sul primo punto. Per terminare la sequenza senza chiudere il contorno, fai clic con il tasto destro senza spostare il puntatore oppure fai doppio clic sull’ultimo punto.
- **Forme:** {{ui:sketch.addShape}} offre contorni già pronti: {{ui:sketch.rectangle}}, {{ui:sketch.circle}}, {{ui:sketch.ellipse}}, {{ui:sketch.halfCircle}}, {{ui:sketch.pieSlice}}, {{ui:sketch.boltCircle}} (un disco con fori), {{ui:sketch.triangle}}, {{ui:sketch.hexagon}}, {{ui:sketch.polygon}} e {{ui:sketch.star}}. Fai clic su una forma per posizionarla all’origine dello schizzo oppure trascinala dal menu nel punto desiderato. In fondo al menu, {{ui:sketch.polygonSides}} imposta il numero di lati del poligono e di punte della stella; {{ui:sketch.starInner}} determina quanto si avvicinano al centro le rientranze della stella (dal 10 al 90% del raggio esterno). Entrambi i valori si applicano alla forma successiva. In seguito, come ogni forma dello schizzo, diventano normali punti d’angolo, che puoi spostare, arrotondare o smussare singolarmente.
- **Sovrapposizioni:** sovrapponendo due contorni chiusi restano due corpi distinti, che si uniscono nell’editor 3D; la sovrapposizione non diventa un foro. Un foro si crea solo quando un contorno è interamente all’interno di un altro. Spostando le forme, le linee non si uniscono nei punti d’incrocio, quindi puoi separarle di nuovo. Se invece disegni una linea che attraversa altre linee, layerling aggiunge un punto in corrispondenza di ogni incrocio.
- **Selezione:** {{ui:sketch.select}} sposta punti e linee. Facendo clic dentro un contorno chiuso, selezioni l’intero contorno e puoi trascinarlo o ridimensionarlo subito; all’interno di un foro selezioni il foro. Il riquadro intorno alla selezione ha otto maniglie: gli angoli cambiano insieme larghezza e altezza mantenendo le proporzioni mentre tieni premuto [[Shift]]. Quelle sui lati modificano una sola direzione. La maniglia rotonda sopra il riquadro ruota l’intera selezione intorno al centro; il numero sopra indica l’angolo e, tenendo premuto [[Shift]], la rotazione procede a incrementi di 15°. [[R]] ruota un contorno chiuso di 45° a ogni pressione. Fai clic sull’etichetta della larghezza o dell’altezza per inserire una nuova misura, anche come somma («60+12.5») o percentuale («150%»). Tenendo premuto [[Shift]], fai clic su un punto o una linea per aggiungerli alla selezione o rimuoverli, così puoi spostarne diversi insieme. Trascina un riquadro sullo spazio vuoto per selezionare tutto ciò che contiene. Puoi trascinare anche una linea: si sposta tramite i due estremi, oppure insieme all’intera selezione se ne fa parte. I tasti freccia spostano la selezione di un incremento della griglia; con [[Shift]] l’incremento è maggiore; tenendo premuto [[Shift]] mentre trascini, lo spostamento resta vincolato a un asse. {{ui:sketch.refine}} aggiunge un punto facendo clic su un segmento e lo rimuove facendo clic su un punto. Puoi anche usare {{ui:sketch.erase}}: un clic su un punto o una linea lo elimina; trascinando un riquadro su più elementi, li elimini tutti; se hai selezionato qualcosa, il pulsante cancella la selezione. Puoi inoltre inserire un’immagine modello con {{ui:sketch.addImage}}.
- **Appunti:** {{ui:editor.tool.copy}}, {{ui:editor.tool.paste}}, {{ui:editor.tool.duplicate}} e {{ui:editor.tool.delete}} agiscono sui punti, sulle linee e sulle immagini selezionati, come nell’editor 3D; [[Ctrl]]+[[X]] taglia. Gli elementi incollati o duplicati vengono posizionati accanto all’originale, con uno spazio di 10 mm, in un punto libero che non tocca linee esistenti, così non si uniscono mai a ciò che è già disegnato. Restano selezionati per poterli trascinare subito nella posizione desiderata.
- **Cronologia:** {{ui:sketch.undo}} e {{ui:sketch.redo}}.
- **Vista:** spostala con il tasto centrale del mouse o con [[Shift]] o [[Ctrl]] insieme al tasto destro, come nell’editor 3D. [[Home]] adatta l’intero schizzo alla vista; [[F]] ingrandisce la selezione (o, se non c’è nulla di selezionato, l’intero schizzo); [[+]] e [[−]] ingrandiscono e rimpiccioliscono, come nell’editor 3D. {{ui:camera.tapeTools}} nella barra laterale misura la distanza tra due punti. Lo schizzo mostra le misure non appena fai clic su un elemento: la lunghezza di una linea o, per un punto, le lunghezze delle linee che vi convergono. Il pulsante {{ui:sketch.showMeasurements}} nella barra laterale nasconde e mostra queste misure quando sono d’intralcio, per esempio mentre modelli le curve; il metro a nastro continua a funzionare. Su una linea retta, fai clic sull’etichetta della misura per inserire la lunghezza in millimetri; [[Enter]] applica il valore, [[Esc]] lo annulla. La linea mantiene la propria direzione, il punto iniziale resta fermo e le linee all’altro estremo si spostano di conseguenza. Selezionando un punto finale, si sposta quello. [[Alt]]+[[Enter]] allunga la linea in entrambe le direzioni intorno al centro. Sulle curve, l’etichetta mostra solo la lunghezza.

Un corpo può essere creato solo da un contorno **chiuso**.

![Un contorno a forma di L. Nell’angolo selezionato, in alto a sinistra, sono mostrate in millimetri le lunghezze delle due linee e, in gradi, l’angolo tra loro.](shot:sketch-outline)

I tasti da [[1]] a [[4]] selezionano gli strumenti di disegno nell’ordine in cui compaiono nella barra: {{ui:sketch.line}}, {{ui:sketch.bezier}}, {{ui:sketch.smooth}} e {{ui:sketch.refine}}. Funzionano quando non stai già disegnando una linea; mentre la disegni, le cifre indicano la lunghezza (vedi sotto).

## Linee con valori numerici

Dopo aver impostato il primo punto con {{ui:sketch.line}} o {{ui:sketch.smooth}}, digita un numero: accanto alla linea si aprono due campi, {{ui:sketch.typedLength}} in millimetri e {{ui:sketch.typedAngle}} in gradi. [[<]] o [[Tab]] passa al campo dell’angolo: «50<30» crea una linea lunga 50 mm a 30°, come in AutoCAD. [[Enter]] fissa il punto e puoi inserire subito la linea successiva; [[Esc]] chiude i campi senza terminare la sequenza.

L’angolo si misura in senso antiorario a partire da destra: 0° a destra, 90° verso l’alto, 180° a sinistra e 270° verso il basso. Lascia vuoto il campo dell’angolo e la linea seguirà il puntatore: inserisci solo la lunghezza e indicane la direzione con il mouse. Le somme, per esempio «40+12.5», funzionano in entrambi i campi. Se il punto uscirebbe dalla piastra, il campo lo segnala e attende un altro valore.

## Curvare un lato rettilineo

Seleziona una linea retta e fai clic su {{ui:sketch.curveLine}} nella barra che compare: il lato si incurva, come in Tinkercad, e mostra le due maniglie. Trascinale per modellare la curva: più una maniglia è lontana, più marcata sarà la piega. {{ui:sketch.straightenLine}} riporta il lato a una linea retta. Puoi arrotondare un punto selezionato con {{ui:sketch.smooth}}: compariranno maniglie dedicate e le linee vicine diventeranno curve. Fai clic su una maniglia per illuminarla; i tasti freccia la spostano di un incremento della griglia, o di un incremento maggiore con [[Shift]], così puoi regolare la curva con precisione.

![Il lato inferiore del contorno a L è incurvato e mostra due maniglie alle estremità.](shot:sketch-curve)

## Leggere e impostare gli angoli

Fai clic su un punto d’angolo dove si incontrano **due linee rette**: accanto alle lunghezze, layerling mostra l’**angolo** tra le linee in gradi, con un piccolo arco. Su un contorno chiuso viene indicato l’angolo interno alla forma, quindi un rientro misura più di 180°. Fai clic sul valore e inserisci un nuovo angolo. Una delle linee ruota intorno al vertice mantenendo la propria lunghezza; l’altra resta ferma. La linea che ruota è tratteggiata. [[Tab]] seleziona l’altra linea; [[Enter]] applica il valore, [[Esc]] annulla. Ciò che è collegato all’estremità più lontana della linea ruotata si sposta insieme a essa.

Spostando un punto cambiano tre angoli: quello nel punto stesso e quelli dei due vertici vicini alle estremità opposte delle linee. layerling mostra anche questi ultimi, così puoi fare clic su uno dei valori e modificarlo. Per esempio, puoi impostare a 75,5° l’angolo in basso a sinistra mentre è selezionato il punto in alto a sinistra, che si sposterà di conseguenza. Anche qui puoi eseguire calcoli, per esempio «90-14.5».

Non viene mostrato un angolo nel punto in cui incontra una curva o in cui convergono più di due linee. Il pulsante {{ui:sketch.showMeasurements}} nella barra laterale nasconde gli angoli insieme alle lunghezze.

## Arrotondare o smussare gli angoli

Fai clic su un punto d’angolo e scegli {{ui:sketch.filletCorner}} o {{ui:sketch.chamferCorner}}. Compare un piccolo campo per inserire {{ui:sketch.filletRadius}} o {{ui:sketch.chamferDistance}}. Digita la dimensione e conferma con il segno di spunta. La funzione lavora sugli angoli tra due linee rette.

Puoi modificare più angoli insieme: selezionali facendo clic su ciascuno con [[Shift]] oppure racchiudili in un riquadro; nella barra che compare, scegli {{ui:sketch.filletCorner}} o {{ui:sketch.chamferCorner}}. A tutti verrà applicato lo stesso raggio o la stessa distanza. Se due angoli selezionati condividono un lato, ognuno ne occupa al massimo il 45%, così un rettangolo arrotondato mantiene la stessa forma su tutti gli angoli. I punti che non si trovano tra due linee rette vengono ignorati e un messaggio indica quanti. Racchiudendo l’intera forma in un riquadro o facendo clic al suo interno, selezioni insieme angoli e linee; accanto agli strumenti per gli angoli, la barra offre {{ui:sketch.curveLine}} e {{ui:sketch.straightenLine}} per tutte le linee selezionate.

![L’angolo in alto a sinistra è arrotondato con un raggio di 12 mm.](shot:sketch-fillet)

## Specchiare

Seleziona punti e linee (fai clic, poi fai clic sugli altri con [[Shift]] oppure racchiudili in un riquadro) e premi {{ui:sketch.mirror}} nella barra. Scegli poi l’asse: {{ui:sketch.mirrorLeftRight}} specchia rispetto all’asse verticale al centro della piastra; {{ui:sketch.mirrorTopBottom}} rispetto a quello orizzontale; {{ui:sketch.mirrorAcrossLine}} rispetto a una linea retta dello schizzo, che selezioni con un clic. La copia viene aggiunta dall’altra parte e l’originale resta al suo posto. Le due forme sono indipendenti, quindi puoi modificarle separatamente. I punti sull’asse vengono condivisi: così, specchiando un mezzo contorno con le estremità sull’asse, ottieni un unico contorno chiuso. Disegna metà di una staffa, selezionala, specchiala e crea il corpo. Una linea di costruzione è un buon asse. [[Esc]] annulla.

## Linee di costruzione

Una linea di costruzione aiuta a posizionare i punti senza diventare parte del corpo. È tratteggiata e non viene mai considerata parte del contorno: puoi prolungarla oltre la forma quanto vuoi, senza ingrandire il corpo.

- Attiva {{ui:sketch.construction}} nel gruppo {{ui:sketch.group.draw}}. Le nuove linee, comprese quelle definite con misure, saranno linee di costruzione. Fai di nuovo clic sul pulsante per tornare alle linee normali.
- Per trasformare una linea già disegnata, fai clic su di essa e scegli {{ui:sketch.makeConstruction}}. {{ui:sketch.makeSolid}} la riporta a una linea normale.
- I nuovi punti si agganciano al punto in cui una linea di costruzione incrocia un’altra linea; un cerchio blu segnala l’aggancio. Si agganciano anche alle estremità della linea. Così puoi posizionare un angolo al centro, a una distanza precisa da un bordo o su un incrocio, senza dover fare calcoli.
- Una linea di costruzione non divide il contorno quando lo attraversa. Durante la rivoluzione può trovarsi anche a destra dell’asse.

## Creare un corpo dallo schizzo

Fai clic su {{ui:sketch.finishSketch}}. Il contorno diventa un corpo appoggiato sul piano di lavoro. Nelle sue impostazioni puoi cambiare l’altezza, il colore e tutto il resto, come per qualsiasi altra forma. Se lo ridimensioni, dopo un breve istante layerling lo ricrea dallo schizzo, che si ingrandisce insieme al corpo. Il corpo resta quindi esatto e può ricevere smussi e raccordi; quando riapri lo schizzo, le sue dimensioni corrispondono a quelle del corpo.

Se il piano di lavoro è sul lato di un corpo, disegni guardando quel lato: anche sul corpo finito, la parte superiore dello schizzo sarà rivolta verso l’alto. Nella vista schizzo, il contorno tenue del corpo ne indica la posizione. Se il piano di lavoro taglia un corpo, la vista mostra il contorno della sezione: un corpo cavo appare come un anello e puoi allineare lo schizzo alle sue pareti. Se posizioni o trascini un punto vicino a un angolo di questi contorni, si aggancia esattamente ad esso; un piccolo cerchio blu indica l’aggancio. Puoi così riprendere nel disegno gli spigoli di altri corpi, anche quando il piano di lavoro non coincide esattamente con essi. Per ricalcare il lavoro esistente, attiva {{ui:sketch.showPartEdges}} (il pulsante dei livelli tra i comandi di visualizzazione a sinistra): tutti gli spigoli dei corpi vengono disegnati sul piano dello schizzo, sottili e tenui, come se li guardassi attraverso, a qualsiasi altezza si trovino. Un piano verticale, per esempio posizionato su una faccia anteriore, mostra in questo modo la vista frontale. La scelta viene memorizzata nel browser.

![Il contorno è diventato un corpo e l’angolo è arrotondato.](shot:sketch-result)

Con {{ui:inspector.editSketch}} puoi tornare allo schizzo in qualsiasi momento per modificarlo. Anche un doppio clic sul corpo fa lo stesso, come in Tinkercad (un corpo bloccato resta chiuso); {{ui:workspace.doubleClickOpensSketch}} nelle impostazioni disattiva questa funzione. I trattamenti degli spigoli già applicati al corpo vengono persi, perché gli spigoli vengono ricreati.

### Rivoluzione

Per creare una rivoluzione, disegna metà della sezione **a sinistra dell’asse** mostrato nello schizzo. Accanto compare l’anteprima 3D, che mostra subito l’aspetto del corpo. Il contorno deve essere chiuso, altrimenti puoi creare una linea aperta come tratto (vedi sotto). Al termine, fai clic su {{ui:sketch.finishRevolve}}. Gli altri corpi del progetto vengono mostrati frontalmente, nella stessa vista del profilo, con l’asse al centro: disegna il profilo accanto o sopra di essi. Il corpo viene creato nel punto in cui l’hai disegnato; la linea orizzontale al centro dello schizzo rappresenta il piano di appoggio. Un profilo disegnato sopra la linea produce un corpo rialzato, il cui punto più basso corrisponde alla base.

Un corpo ottenuto per rivoluzione è esatto, come uno estruso: può ricevere smussi e raccordi ed essere svuotato per creare una tazza o un vaso. Un corpo rivoluzionato con una versione precedente di layerling è una mesh; apri {{ui:inspector.editSketch}} e termina di nuovo lo schizzo per renderlo esatto. Un profilo che attraversa l’asse non può essere creato come corpo esatto e diventa una mesh, come prima.

## Estrudere lungo un percorso

{{ui:sketch.sweep}} estrude un contorno lungo un percorso, per esempio un canalino per cavi che gira intorno a un angolo, una conduttura, una protezione intorno a una cinghia o un anello intorno a un esagono. Si trova accanto a {{ui:sketch.extrude}} e {{ui:sketch.revolve}} nel gruppo {{ui:sketch.group.create}}.

Disegna due elementi sullo stesso foglio:

- **La sezione**, come contorno chiuso. Disegnala guardando lungo il percorso dal punto iniziale: la larghezza segue la direzione sinistra-destra dello schizzo e la parte superiore sarà rivolta verso l’alto sul corpo finito. Una sezione cava, un canalino o un tubo si disegna con un contorno dentro un altro. La sezione è centrata sul percorso e il punto più basso del corpo appoggia sul piano dello schizzo.

- **Il percorso**, come {{ui:sketch.construction}}. Attivalo e disegna una sequenza di linee o curve, aperta o chiusa (una sequenza chiusa crea un anello). Il percorso resta sul piano dello schizzo.

Disegna la sezione vicino all’estremità in cui deve iniziare; il percorso comincia dall’estremità più vicina. Poi fai clic su {{ui:sketch.finishSweep}}. Una curva fatta di segmenti rettilinei diventa uno spigolo a mitra; una curva resta morbida e la sezione rimane verticale lungo tutto il percorso. Il corpo è esatto, come uno estruso: raccordi, smussi ed esportazione STEP funzionano. Se manca un contorno chiuso o un percorso, oppure se ci sono più percorsi indipendenti, layerling te lo segnala. Con {{ui:inspector.editSketch}} puoi riaprire lo schizzo e modificare la sezione o il percorso.

## Creare un corpo come tratto

Normalmente il corpo riempie l’area interna a un contorno chiuso. Con {{ui:sketch.stroke}} nella sezione {{ui:sketch.group.finish}}, puoi creare invece la linea stessa, assegnandole uno spessore. Attiva {{ui:sketch.strokeOn}} nel pannello: lo schizzo mostra subito il risultato.

- Un **contorno chiuso** diventa una cornice. {{ui:sketch.strokeAlign}} indica dove si trova la parete: {{ui:sketch.strokeAlign.center}} è centrata sulla linea disegnata; {{ui:sketch.strokeAlign.inside}} è al suo interno; {{ui:sketch.strokeAlign.outside}} all’esterno. L’allineamento esterno è utile per le tolleranze: disegna il contorno di un foro, per esempio un incastro a coda di rondine, e applica un tratto esterno da 0,2 mm per creare il gioco necessario alla stampa.
- Una **linea aperta** diventa una striscia centrata sulla linea. {{ui:sketch.strokeCap}} determina la forma delle estremità: {{ui:sketch.strokeCap.flat}}, {{ui:sketch.strokeCap.square}} (più lunga di metà dello spessore) o {{ui:sketch.strokeCap.round}}.
- {{ui:sketch.strokeJoin}} si applica a entrambi i tipi: {{ui:sketch.strokeJoin.miter}}, {{ui:sketch.strokeJoin.round}} o {{ui:sketch.strokeJoin.bevel}}.

Lo schizzo conserva la linea disegnata. Riaprendolo puoi continuare a modificarla insieme al tratto; disattivando la casella, il corpo viene ricreato come area. Per applicare il tratto, le curve vengono suddivise in brevi segmenti rettilinei.

Nella rivoluzione, il tratto diventa una parete sottile: disegna **una sola linea aperta** a sinistra dell’asse per il profilo della parete di un vaso o di una tazza, attiva {{ui:sketch.stroke}}, impostane lo spessore e applica la rivoluzione. Il tratto viene ruotato intorno all’asse; ciò che lo attraversa viene tagliato lungo l’asse.

## Riempimento e sagoma

Puoi impostare il tratto anche senza riaprire lo schizzo: nelle proprietà del corpo creato da uno schizzo, scegli {{ui:prop.sketchFill.area}}, {{ui:prop.sketchFill.outside}}, {{ui:prop.sketchFill.inside}} o {{ui:prop.sketchFill.center}} sotto {{ui:prop.sketchFill}}, poi imposta {{ui:prop.sketchLineWidth}} e {{ui:sketch.strokeJoin}}. Il corpo viene ricreato subito nella posizione attuale. Queste opzioni corrispondono alle modalità di riempimento usate da Tinkercad nell’importazione SVG: predefinita, linea esterna e linea interna. {{ui:prop.sketchFill.grow}} mantiene l’area riempita e la espande in tutte le direzioni dello spessore del tratto, con angoli netti, arrotondati o smussati. Può creare uno strato di base sotto un logo per una stampa multicolore, mentre il solo tratto esterno produrrebbe una cornice.

{{ui:prop.sketchSilhouette}} esclude tutti i contorni interni ad altri: fori e relative forme interne. Resta solo il contorno esterno. Insieme a {{ui:prop.sketchFill.outside}}, permette di creare uno stampino per biscotti: importa due volte un SVG, una come area con la sagoma attiva per la base e una con la sagoma e un tratto esterno da 1 a 2 mm per la parete. L’interruttore si trova anche nel pannello {{ui:sketch.stroke}} della modalità schizzo.

Se ricrei il corpo, i raccordi e gli smussi applicati agli spigoli vengono persi, come quando modifichi lo schizzo.

## Pareti inclinate per timbri

Uno schizzo estruso ha pareti verticali. Per un timbro, uno stampo per goffratura o un punzone servono pareti inclinate, sia esterne sia interne, che mantengano ovunque lo stesso spessore. layerling non offre un angolo di sformo per l’estrusione, ma con i contorni semplici puoi ottenere questo risultato usando {{ui:inspector.taper}}. Procedi così:

1. Disegna il contorno con il foro necessario e trasformalo in un corpo. Duplica il corpo con [[Ctrl]]+[[D]].
2. Sul primo corpo, attiva {{ui:prop.sketchSilhouette}} per riempire il foro e usa {{ui:inspector.taper}} per allargare la base rispetto alla parte superiore.
3. Sulla copia, riapri lo schizzo ed elimina il contorno esterno, lasciando solo quello del foro. Termina lo schizzo, trasforma il corpo in un foro con {{ui:inspector.hole}} e usa {{ui:inspector.taper}} per restringere la base rispetto alla parte superiore.
4. Sposta il foro nel primo corpo, al posto del foro originale, e raggruppa le due forme.

Ora le pareti sono inclinate sia all’esterno sia all’interno. La rastremazione ridimensiona l’intero contorno: il risultato è esatto per le forme semplici, per le quali puoi scegliere dimensioni che mantengano parallele le pareti, e solo approssimativo per i dettagli minuti, come le lettere.

## Usare un’immagine come modello

Con {{ui:sketch.addImage}} puoi inserire sotto lo schizzo una foto o un disegno da ricalcare. Puoi impostarne le dimensioni, l’opacità e la posizione. Quando è nel punto giusto, blocca l’immagine con [[L]] per non spostarla per errore mentre disegni. Un’immagine bloccata non è d’intralcio: i clic la attraversano, così puoi selezionare linee e punti disegnati sopra e racchiuderli in un riquadro. Per selezionarla di nuovo, per esempio per sbloccarla, fai clic tenendo premuto [[Alt]]. Se le impostazioni sul bordo destro coprono l’immagine, trascinale dalla barra del titolo; un doppio clic le ancora di nuovo.

Sotto {{ui:sketch.imageAlign}} puoi allineare una foto che non è stata scattata frontalmente:

- **{{ui:sketch.imageRotation}}:** ruota l’immagine intorno al centro usando la maniglia rotonda sopra il riquadro oppure inserendo un angolo in gradi. Con [[Shift]], la maniglia si aggancia a incrementi di 15°.
- **{{ui:sketch.centreImageX}}** e **{{ui:sketch.centreImageY}}:** posizionano il centro dell’immagine su X = 0 o Y = 0. Nella rivoluzione, X = 0 è l’asse, quindi l’immagine sarà simmetrica rispetto a esso.
- **{{ui:sketch.calibrateImage}}:** fai clic su due punti dell’immagine la cui distanza ti è nota, per esempio le estremità di un righello o un diametro noto, e inserisci la distanza reale. L’immagine viene ridimensionata uniformemente per rispettarla; il primo punto resta dov’è.
- **{{ui:sketch.cropImage}}:** le maniglie del riquadro ritagliano l’immagine invece di ridimensionarla. La parte tagliata resta conservata e ricompare con {{ui:sketch.uncropImage}} oppure trascinando di nuovo una maniglia verso l’esterno.

Queste quattro funzioni modificano solo l’immagine di riferimento, mai lo schizzo.

## Tasti in modalità schizzo

| Tasto | Funzione |
| --- | --- |
| [[Esc]] | termina la sequenza di linee e deseleziona tutto |
| [[Delete]] | elimina l’elemento selezionato |
| [[Ctrl]]+[[C]] | copia la selezione |
| [[Ctrl]]+[[X]] | taglia la selezione |
| [[Ctrl]]+[[V]] | incolla |
| [[Ctrl]]+[[D]] | duplica la selezione |
| [[Ctrl]]+[[Z]] | annulla |
| [[Shift]] | mentre disegni: aggancia la linea a incrementi di 15°; mentre trascini: vincola il movimento a un asse |
| cifra, [[<]], [[Tab]], [[Enter]] | mentre disegni: inserisce e conferma lunghezza e angolo della linea successiva |
| [[R]] | ruota lo schizzo chiuso di 45° |
| [[L]] | blocca o sblocca l’immagine modello |

> **Suggerimento:** usa il minor numero di punti possibile. Un contorno con pochi punti ben posizionati crea un corpo più liscio di un groviglio di molti punti.