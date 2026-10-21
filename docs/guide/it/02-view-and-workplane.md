---
title: Vista e piano di lavoro
summary: Muoversi nella scena, osservarla frontalmente e posizionare nuove forme sulla superficie che preferisci.
---

## Muoversi nella scena

Con il mouse:

| Azione | Risultato |
| --- | --- |
| trascinare con il tasto destro | ruota la vista |
| fare clic con il tasto destro | su un solido apre un menu con i comandi più usati: duplica, foro o solido, raggruppa, nascondi, blocca, elimina e altri; nello spazio vuoto mostra Incolla e Seleziona tutto |
| trascinare con il tasto centrale | sposta la vista |
| rotellina del mouse | ingrandisce e rimpicciolisce |
| tenere premuto [[Ctrl]] e trascinare con il tasto sinistro | sposta la vista anche in questo modo |

La velocità dello zoom con la rotellina si regola con {{ui:workspace.zoomSpeed}} nelle impostazioni, sotto {{ui:workspace.appearance}}: un cursore da 1 a 14, impostato inizialmente su 5. Oltre 10 aumenta solo la velocità della rotellina. Un singolo scatto della rotellina ingrandisce allo stesso modo in tutti i browser; con il trackpad, invece, lo zoom dipende dall’ampiezza del gesto.

Su tablet o telefono, due dita ingrandiscono e rimpiccioliscono (allontanandole o avvicinandole) e spostano la vista (facendole scorrere insieme). Un dito sullo spazio vuoto ruota la vista e, con un tocco, deseleziona tutto; su una forma o una maniglia agisce sul progetto come il tasto sinistro del mouse. Per ruotare la vista iniziando il gesto con un dito sopra una forma, attiva {{ui:camera.touchRotate}} nella barra della telecamera. L’interruttore appare sui dispositivi con schermo tattile.

Una tavoletta grafica con penna funziona come un mouse: la punta equivale al tasto sinistro e il pulsante laterale della penna al tasto destro, sia per ruotare la vista sia per aprire il menu. Puoi configurare i tasti rapidi della tavoletta nel relativo driver per usarli con le [scorciatoie da tastiera](chapter:shortcuts) di layerling.

**Su un tablet, se puoi, usa uno stilo.** La punta è molto più precisa di un dito e non copre il punto che vuoi selezionare: così puoi toccare con precisione punti, linee sottili e maniglie di uno schizzo, punti di misurazione e spigoli. Inoltre, le sessioni di lavoro lunghe sono meno faticose. layerling permette già di selezionare punti, linee, maniglie e spigoli con il dito da una distanza leggermente maggiore rispetto al puntatore del mouse, ma lo stilo resta più preciso. Questo vale per le penne riconosciute come tali dal tablet, come S Pen e Apple Pencil. Uno stilo semplice con punta in gomma viene interpretato come un dito e non offre maggiore precisione.

Sul tablet non c’è il tasto destro: tieni il dito fermo per mezzo secondo su una forma o nello spazio vuoto per aprire lo stesso menu del clic destro. Nello spazio vuoto il menu include **Seleziona tutto**. Nel menu, **Selezione multipla** sostituisce Shift sul tablet: ogni tocco su un solido lo aggiunge alla selezione o lo rimuove, finché non tocchi lo spazio vuoto o premi [[Esc]]. Con un dito sullo spazio vuoto puoi comunque ruotare la vista. Puoi afferrare con il dito le maniglie intorno a una forma selezionata anche toccandole da poco più in là.

### Il cubo di visualizzazione

Il cubo in alto a sinistra mostra da quale direzione stai guardando. Fai clic su una delle sue facce per passare alla vista ortogonale dall’alto, dal basso, dal davanti, da dietro, da sinistra o da destra. Fai clic su un angolo del cubo per vedere il modello in diagonale da quell’angolo; fai clic vicino a uno spigolo per guardarlo da quella direzione, tra due facce. Il punto si illumina quando il puntatore ci passa sopra. Anche i tasti da [[1]] a [[6]] attivano le viste ortogonali. Tenendo premuto [[Shift]], la vista si adatta anche alla selezione, come con [[Shift]]+[[F]].

Trascina il cubo per ruotare la vista, proprio come trascinando con il tasto destro del mouse. Se non hai selezionato nulla, puoi ruotare la vista anche con i tasti freccia: 15° per ogni pressione, 90° tenendo premuto [[Shift]]. Ruotano il modello nella direzione indicata: [[→]] sposta la parte anteriore verso destra, [[↑]] inclina la parte anteriore verso l’alto. Se hai selezionato un elemento, le frecce lo spostano; fai prima clic nello spazio vuoto per ruotare la vista. Su uno schermo tattile puoi usare un dito, senza attivare {{ui:camera.touchRotate}}.

### La barra della telecamera

Sul bordo sinistro c’è una barra stretta. Dall’alto:

- {{ui:camera.home}} riporta in vista l’intera scena. Il tasto corrispondente è [[Home]]; anche [[F]] lo fa quando non c’è nulla di selezionato.
- {{ui:camera.focusSelection}} ingrandisce la selezione ([[F]] o [[Shift]]+[[F]]).
- {{ui:camera.zoomIn}} e {{ui:camera.zoomOut}} ingrandiscono o rimpiccioliscono per passaggi, come i tasti [[+]] e [[−]].
- {{ui:camera.orthographic}} attiva una vista piatta, in cui gli spigoli paralleli restano paralleli. Per misurare e allineare gli spigoli spesso è più comoda della prospettiva. [[O]] alterna le due viste; un secondo clic torna alla vista precedente.
- {{ui:camera.hideWorkplane}} (l’occhio sopra una griglia) nasconde il piano con la griglia, così puoi guardare da sotto il lato inferiore del progetto. Cambia solo la vista: le nuove forme continuano a essere posizionate sul piano di lavoro. Fai di nuovo clic per mostrarlo.
- {{ui:camera.placeWorkplane}}, il metro a nastro e la squadra sono strumenti indipendenti, descritti più avanti e in [Misurazioni e note](chapter:measuring-and-notes).

La piccola freccia in cima alla barra la nasconde se è d’intralcio.

Quando riapri un progetto, la vista è come l’avevi lasciata: in questo browser vengono conservati l’angolazione, lo zoom e la posizione, così puoi riprendere da dove ti eri fermato, anche dopo aver usato Home o chiuso la pagina. Un file salvato (`.lyl`) conserva la vista, quindi il progetto si apre allo stesso modo anche altrove. La vista non fa parte della cronologia di annullamento.

## Guardare all’interno: vista in sezione

{{ui:camera.sectionView}}, l’ultimo pulsante della barra (lo strumento di taglio), apre una sezione lungo un piano per controllare pareti, cavità e parti che combaciano. Il taglio è solo nella vista: il progetto, i suoi file e tutte le esportazioni restano intatti. Dove il piano attraversa un solido, la sezione viene riempita con un colore leggermente più scuro di quello del solido; un foro al suo interno resta vuoto, così puoi distinguere il materiale dalle cavità. La faccia riempita appare poco dopo che il piano ha smesso di muoversi.

- Scegli l’asse perpendicolare al piano di taglio: X (larghezza), Y (profondità) o Z (altezza), come nei campi della posizione. Inizialmente il piano passa per il centro del progetto.
- {{ui:camera.sectionCoarse}} sposta il piano attraverso tutto il progetto; {{ui:camera.sectionFine}} lo sposta di poco in entrambe le direzioni, con incrementi di un decimo di millimetro. Puoi anche inserire la posizione direttamente.
- Il pulsante accanto agli assi mostra l’altro lato del taglio; {{ui:camera.sectionReset}} riporta il piano al centro e {{ui:camera.sectionShowPlane}} nasconde il piano blu.
- Puoi fare clic e selezionare gli elementi messi in vista dal taglio, comprese le pareti interne.
- {{ui:camera.sectionWorkplane}} posiziona il piano di lavoro sulla sezione. Si trova sul piano di taglio e guarda verso l’esterno del corpo rimasto, come la faccia lasciata dal taglio. Se poi passi allo schizzo, questo inizia esattamente lì; il contorno tenue mostra la sezione, così puoi disegnarci sopra e agganciarvi le linee. Per esempio, puoi disegnare un coperchio che si adatti alla cavità aperta con la sezione. Il pulsante accanto agli assi sceglie quale lato mantenere e, di conseguenza, la direzione del piano di lavoro. Per tornare alla piastra di base, usa il comando abituale.
- {{ui:camera.sectionMeasure}} misura direttamente sulla sezione: il contorno appare in blu e, con due clic, ottieni la distanza e le sue componenti lungo i due assi del piano. Entrambi i punti si agganciano al contorno, dando la precedenza agli angoli. Quando il secondo clic cade sulla parete opposta, il punto si allinea perpendicolarmente al primo: così puoi leggere lo spessore delle pareti, gli spazi vuoti e il gioco senza dover mirare con precisione. Un terzo clic avvia la misurazione successiva; [[Esc]] termina la misurazione. Se sposti il piano, la misurazione viene cancellata. Su un contorno circolare, per esempio una sezione di cilindro o di foro, una piccola croce indica il centro e anche il centro è un punto di aggancio. Fai clic su un punto della circonferenza, poi avvicinati al punto opposto: il secondo clic si posiziona esattamente dall’altra parte del centro e la misura indica Ø, cioè il diametro. Dal centro a un punto della circonferenza ottieni invece R, il raggio.
- {{ui:camera.sectionExportSvg}} salva i contorni sul piano di taglio come SVG in scala 1:1, per un laser, un plotter, una dima o una guarnizione. Una sezione lungo X si osserva da destra, lungo Y dal davanti e lungo Z dall’alto. Come nell’esportazione, vengono inclusi solo i corpi visibili e i fori vengono già sottratti; i corpi dello stesso colore vengono uniti in un unico contorno. Ogni colore resta un tracciato separato senza riempimento, così il software laser li mantiene separati come livelli.

Il pannello resta agganciato al pulsante. Se copre qualcosa, trascinalo dalla barra del titolo in un punto qualsiasi del piano di lavoro: la prossima volta si aprirà lì. Fai doppio clic sulla barra del titolo o riportalo sul pulsante per rimetterlo al suo posto.

X e [[Esc]] chiudono il pannello; se è in corso una misurazione, [[Esc]] la termina prima. La sezione resta attiva finché non la disattivi con {{ui:camera.sectionActive}} o torni alla panoramica del progetto. Quando la sezione è attiva, il relativo pulsante resta evidenziato. Gli elementi posizionati sul lato rimosso dal taglio diventano visibili solo dopo aver disattivato la sezione. Il tablet non ha il tasto [[Esc]], quindi il pannello mostra due pulsanti in più: {{ui:camera.sectionBack}} termina la misurazione in corso oppure, se non ce n’è una, chiude il pannello; {{ui:camera.sectionConfirm}} chiude il pannello direttamente. Sul computer questi pulsanti non compaiono.

## Il piano di lavoro

Le nuove forme si allineano al piano di lavoro. Inizialmente è la piastra di base con la griglia, ma puoi posizionarlo su qualsiasi superficie per aggiungere qualcosa a una faccia laterale o inclinata.

1. Premi [[W]] o fai clic su {{ui:camera.placeWorkplane}}.
2. Sposta il mouse su una faccia di un corpo. La faccia si illumina.
3. Fai clic per posizionare il piano di lavoro sulla faccia. Da quel momento, tutto ciò che aggiungi si appoggia lì.

Se fai clic sulla piastra vuota, il piano di lavoro si dispone orizzontalmente nel punto selezionato, seguendo la griglia di aggancio. Le nuove forme e gli schizzi completati, anche quelli ottenuti per rivoluzione, appariranno lì invece che al centro della piastra. Quando il piano di lavoro è disposto in questo modo sulla piastra, viene mostrato solo il contorno: due griglie sullo stesso piano creerebbero uno sfarfallio.

Su una faccia, l’origine del piano di lavoro si aggancia alla griglia. Se fai clic vicino a un angolo della faccia, si posiziona esattamente su quell’angolo. Vicino a uno spigolo, si appoggia sullo spigolo e la griglia si allinea con esso: puoi usarlo per scegliere intenzionalmente l’inclinazione della griglia. Se non ci sono angoli o spigoli vicini, la griglia su una faccia inclinata corre parallela al corpo; perciò, se la scatola è ruotata, anche la griglia ruota con essa.

Fai clic accanto alla piastra o premi [[Esc]] per riportare il piano di lavoro sulla piastra di base. Ancora più rapidamente, usa {{ui:camera.resetWorkplane}}: il pulsante con la freccia verso il basso si trova nella barra della telecamera, sotto l’occhio, quando il piano di lavoro è su una faccia. [[Shift]]+[[W]] lo posiziona direttamente sulla faccia selezionata. Se tieni premuto [[Shift]] mentre fai clic, il piano è rivolto nella direzione opposta.

Quando il piano di lavoro è su una faccia, accanto a {{ui:camera.placeWorkplane}} appare un occhio. Nasconde il piano senza rimuoverlo e lascia vedere meglio il progetto: le nuove forme continuano ad appoggiarsi su quella faccia e la rotazione continua ad avvenire intorno a essa. Fai clic sull’occhio per mostrare di nuovo il piano; anche impostarne uno nuovo lo rende visibile.

## Griglia e aggancio

La griglia mostra le dimensioni della piastra. In basso a destra trovi l’**incremento di aggancio**: gli spostamenti e le modifiche delle dimensioni avvengono a passi di quella misura, per esempio 1 mm. Riducila per i lavori di precisione e aumentala per disporre gli elementi più velocemente. {{ui:editor.tool.snapToGrid}} nella barra degli strumenti sposta le forme selezionate sull’incrocio della griglia più vicino. Durante lo spostamento, le forme si agganciano anche alle altre forme: vedi [Selezione e disposizione](chapter:select-and-arrange).

Nelle impostazioni, sotto {{ui:workspace.measurement}}, scegli le {{ui:workspace.units}}. Con {{ui:units.imperial}}, layerling mostra tutte le misure in pollici: sulle forme, nel pannello delle proprietà, sul metro a nastro e sul righello. La griglia di aggancio propone incrementi da 1/64 di pollice fino a 1 pollice; anche la griglia della piastra viene visualizzata in pollici (da 1/8 a 1 pollice, con 1/4 di pollice come valore iniziale) e ha una linea più marcata ogni pollice intero. Sotto {{ui:workspace.inchFormat}} scegli se visualizzare i pollici come frazioni, come in Tinkercad (1 5/8, arrotondato a 1/64 di pollice), o come numeri decimali (1.625), con il numero di cifre decimali impostato in {{ui:workspace.accuracy}}. Puoi digitare entrambe le forme, compreso «1 5/8». Per passare rapidamente da millimetri a pollici, usa l’interruttore **mm | in** accanto a {{ui:inspector.snapGrid}}, in fondo alla finestra delle proprietà: per il progetto corrente cambia l’unità di misura, la griglia della piastra e l’incremento di aggancio, come le impostazioni.

Nello stesso punto, sotto {{ui:workspace.customSnapGrids}}, puoi aggiungere incrementi di aggancio personalizzati: specifica un nome e una misura in millimetri. Per esempio, «Passo pin 2,54 mm» per la distanza tra i pin dei chip DIP, delle intestazioni e dei fori delle basette millefori, oppure «Unità tasto MX» con 19,05 mm per la distanza tra i tasti di una tastiera. Nel menu dell’incremento di aggancio saranno disponibili la misura intera, la metà e un quarto (1 ×, ½ × e ¼ ×), così puoi spostare le forme di un passo, mezzo passo o un quarto di passo. Se vuoi usare solo la misura intera, deseleziona {{ui:workspace.customSnapGridParts}} accanto alla voce: il menu mostrerà solo quell’incremento. Gli incrementi personalizzati vengono salvati con il progetto e inclusi anche quando usi {{ui:workspace.makeDefault}}.

Puoi modificare dimensioni, larghezza della griglia e colore della piastra nelle impostazioni (l’ingranaggio nella barra degli strumenti), nelle sezioni {{ui:workspace.appearance}}, {{ui:workspace.measurement}}, {{ui:workspace.workplane}}, {{ui:workspace.shapeDefaults}} e {{ui:workspace.history}}. Sotto {{ui:workspace.appearance}} trovi opzioni come {{ui:workspace.startInPerspective}} e {{ui:workspace.showShadows}}; sotto {{ui:workspace.workplane}} trovi {{ui:workspace.showGrid}}. Sempre sotto {{ui:workspace.appearance}} puoi impostare i colori dell’area di lavoro: {{ui:workspace.backgroundColor}} e {{ui:workspace.surfaceColor}} per il tema chiaro (i temi scuri mantengono i propri), oltre al colore della griglia, che si trova sotto {{ui:workspace.workplane}}. Qui puoi anche scegliere se la linea più scura della griglia compare ogni 5 o 10 incrementi ({{ui:workspace.gridMajorEvery}}) e assegnarle un colore dedicato con {{ui:workspace.gridMajorColor}}; anche la croce centrale e il bordo della piastra adottano quel colore. Ogni linea della griglia diventa più spessa quando ingrandisci, come in Tinkercad, e resta visibile quando rimpicciolisci. Se preferisci, disattiva {{ui:workspace.gridLinesGrow}}: le linee resteranno spesse un pixel a qualsiasi livello di zoom, come nello schizzo. Nel campo del colore, premi [[Enter]] per confermare un valore esadecimale digitato. {{ui:workspace.edgeLines}} disegna un contorno su ogni corpo, usando il colore di {{ui:workspace.edgeColor}} (inizialmente nero, come in Tinkercad): è utile quando forme dai colori scuri si confondono tra loro. L’opzione è disattivata inizialmente e non viene applicata alle mesh importate molto grandi. La griglia passa sempre per l’origine, quindi le linee più marcate restano sugli assi, qualunque siano le dimensioni della piastra. Se la griglia è scomparsa, per esempio perché le è stato assegnato lo stesso colore della piastra, {{ui:workspace.resetGrid}} in fondo alla sezione {{ui:workspace.workplane}} ripristina visibilità, colori, spaziatura e spessore delle linee, sia qui sia nelle impostazioni predefinite salvate con {{ui:workspace.makeDefault}}.

{{ui:workspace.showAxes}} (attivo inizialmente) mostra tre frecce nell’angolo posteriore sinistro della piastra: **X** in rosso verso destra, **Y** in verde verso il fondo e **Z** in blu verso l’alto, secondo il sistema dei campi di posizione. È la regola della mano destra usata anche da Tinkercad, dai programmi CAD e dai software di slicing. Quando il piano di lavoro è su una faccia, gli assi seguono quella faccia. Se sono d’intralcio, disattivali qui.

Due cursori sotto {{ui:workspace.appearance}} regolano l’illuminazione dei corpi. {{ui:workspace.shadowStrength}} imposta quanto sono scure le ombre proiettate; {{ui:workspace.shadeContrast}} regola il rapporto tra la luce ambientale uniforme e la luce principale: verso «intenso», le facce in ombra diventano più scure e le ombre più visibili; verso «morbido», l’illuminazione è più uniforme. Al valore massimo il contrasto è molto marcato e le facce in ombra, insieme alle ombre proiettate, diventano molto scure. {{ui:workspace.shadowSoftness}} rende morbidi i bordi delle ombre invece di lasciarli netti. {{ui:workspace.lightAzimuth}} ruota la luce principale intorno alla piastra (0° dal davanti, 90° da destra); {{ui:workspace.lightElevation}} ne regola l’altezza. A 90° la luce è esattamente sopra la piastra, come in Tinkercad, e le ombre cadono direttamente sotto i corpi. {{ui:workspace.lightReset}} ripristina tutte le impostazioni. {{ui:workspace.classicLook}} configura l’area di lavoro come in Tinkercad: piano bianco, griglia azzurra chiara in millimetri con una linea più scura ogni centimetro, contorni neri e luce dall’alto con ombre morbide. In seguito puoi modificare ogni valore separatamente. Inizialmente viene mantenuto l’aspetto tradizionale di layerling; la configurazione più adatta dipende dal tuo monitor. La vista schizzo ha colori separati: {{ui:workspace.sketchBackground}} per la finestra intorno al foglio, {{ui:workspace.sketchPlateColor}} per il foglio sotto la griglia e {{ui:workspace.sketchGridColor}}, tutti per il tema chiaro. {{ui:workspace.sketchMatch}} applica con un solo clic i tre colori dell’area di lavoro.

![Le impostazioni di Aspetto: i colori dello sfondo e del piano di lavoro per il tema chiaro e l’opzione per mostrare i contorni di tutti i corpi.](shot:settings-appearance)

![Tre corpi scuri con i contorni attivi: le linee ne distinguono i bordi.](shot:edge-lines)

![L’editor con la combinazione di colori scura. In alto a destra puoi scegliere la combinazione: Sistema, Chiaro, Scuro o Grafite.](shot:editor-dark)

{{ui:workspace.toolbarSize}}, sotto {{ui:workspace.appearance}}, rende più piccoli o più grandi i pulsanti della barra degli strumenti in alto, il menu delle forme e i comandi della telecamera a sinistra: {{ui:workspace.toolbarSizeSmall}}, {{ui:workspace.toolbarSizeMedium}} (la dimensione usata finora) o {{ui:workspace.toolbarSizeLarge}}. La dimensione piccola lascia più spazio al piano di lavoro su un portatile; quella grande rende i pulsanti più facili da premere su uno schermo grande o con un dito. Quando i pulsanti sono grandi e la finestra troppo stretta, i gruppi della barra degli strumenti passano a una seconda riga. La dimensione viene salvata in questo browser ed è la stessa per tutti i progetti.

> **Suggerimento:** interrompi la rotazione della vista quando devi far combaciare i pezzi con precisione. Usa i tasti numerici per passare alla vista ortogonale dall’alto o dal davanti, poi premi [[O]] per attivare la vista piatta. Vedrai subito se due spigoli sono davvero allineati.

## Quando layerling è lento

layerling esegue tutti i calcoli e disegna la scena nel browser. Su un computer datato, con una scheda grafica poco potente o con diverse finestre grandi aperte, la vista può risultare lenta. Ecco cosa puoi fare:

- **{{ui:workspace.fastMode}}** sotto {{ui:workspace.appearance}} disattiva subito tutto ciò che appesantisce la vista: ombre, contorni di tutti i corpi e inerzia della telecamera. Inoltre, sui display ad alta risoluzione, limita il rendering alla risoluzione dello schermo, riducendo il numero di pixel fino a quattro volte. Le tue impostazioni vengono conservate e tornano attive appena disattivi la modalità.
- **La telecamera continua a ruotare:** quando lasci il mouse dopo aver ruotato, la vista continua a muoversi per un istante e poi rallenta gradualmente. È il comportamento previsto, non un rallentamento. Se sei abituato a Tinkercad o Fusion 360, disattiva {{ui:workspace.cameraInertia}} sotto {{ui:workspace.appearance}}: la vista si fermerà subito.
- **Disattiva le singole opzioni:** senza usare la modalità veloce puoi disattivare soltanto {{ui:workspace.showShadows}} oppure {{ui:workspace.edgeLines}}.
- **Usa la scheda grafica:** in Chrome apri `chrome://gpu` (in Edge `edge://gpu`). Accanto a «WebGL» dovrebbe comparire «Accelerazione hardware». Se compare «Solo software», l’accelerazione hardware è disattivata nelle impostazioni del browser. In Windows puoi anche selezionare «Prestazioni elevate» per il browser in Impostazioni → Sistema → Schermo → Grafica, così userà la scheda grafica invece di quella meno potente integrata nel processore.
- **Semplifica le mesh importate molto grandi:** un modello con centinaia di migliaia di triangoli rallenta qualsiasi vista. Il capitolo sui file spiega come ridurne il numero, nella sezione «Semplificare una mesh importata».
- **Chiudi le altre schede:** tutte le schede di layerling aperte e le altre pagine 3D condividono la stessa scheda grafica.