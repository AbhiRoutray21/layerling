---
title: Testo e scritte curve
summary: Testo in rilievo o inciso, con otto caratteri tipografici o uno personalizzato, anche lungo un arco circolare, per esempio su una moneta, un coperchio o un anello.
---

## Aggiungere testo

Scegli {{ui:shape.text}} nella libreria delle forme e posizionalo. Nel campo {{ui:prop.text}} a destra, inserisci il testo desiderato. Le impostazioni sotto permettono di modificarlo:

- **{{ui:prop.font}}:** sono disponibili otto caratteri tipografici: Multilingua, Sans, Serif, Script, Monospace, Arrotondato, Stencil (lettere composte da linee rette) e Giapponese (Zen Maru Gothic). Il nuovo testo usa inizialmente Sans. Tutti i caratteri includono le lettere accentate come ä, ö, ü, é e il simbolo €, oltre a kana, i kanji più comuni e molti di quelli meno frequenti nei nomi, come 澤, 槇 e 檜: puoi usare un nome giapponese con qualsiasi carattere tipografico e anche su una targhetta. Le lettere giapponesi vengono scaricate la prima volta che servono (i kanji rari sono in un secondo file, scaricato solo se il testo ne contiene uno), quindi per un momento potresti vedere dei punti interrogativi. In seguito restano salvate sul computer, così puoi usare il giapponese anche senza connessione. Puoi aggiungere i tuoi caratteri tipografici; vedi [Font personalizzati](#font-personalizzati).
- **{{ui:nameTag.letterSize}}:** determina l’altezza delle lettere viste dall’alto; {{ui:prop.height}} ne imposta lo spessore.
- **{{ui:prop.height}}:** determina quanto la scritta sporge dalla superficie.
- **{{ui:prop.bevel}}:** arrotonda i bordi delle lettere per renderli più morbidi. Con {{ui:prop.segments}} scegli il numero di segmenti.
- **{{ui:nameTag.letterEdge}}:** arrotonda o smussa il bordo superiore delle lettere, come su una targhetta: {{ui:nameTag.edge.none}}, {{ui:nameTag.edge.round}} o {{ui:nameTag.edge.chamfer}}, con la misura {{ui:nameTag.letterEdgeSize}} (inizialmente 0,4 mm, fino all’altezza del testo). L’effetto è più ampio di {{ui:prop.bevel}}, ma è limitato alla larghezza dei tratti: se un tratto è più sottile del doppio della misura, la parte superiore del bordo è più stretta. La faccia inferiore resta piatta, così puoi incollare in seguito le singole lettere. Quando scegli un trattamento per il bordo, questo sostituisce {{ui:prop.bevel}}.
- **Dimensioni:** puoi impostare lunghezza e larghezza della linea come per qualsiasi forma. Trascina le maniglie oppure inserisci le dimensioni.
- **{{ui:prop.textStretch}}:** inizialmente è disattivato: le lettere mantengono le proporzioni e restano al centro del riquadro, che può quindi essere più largo o profondo di quanto richiesto dalla parola. Attivandolo, le lettere vengono allungate per riempire il riquadro in entrambe le direzioni: puoi rendere più bassa o stretta una maiuscola, come in Tinkercad. Questa funzione riguarda il testo diritto; quello curvo ha una propria impostazione per l’altezza delle lettere.

Il testo è inizialmente un corpo unico. Per trattare le lettere singolarmente, fai clic su {{ui:inspector.separateParts}}. Ogni lettera diventa una forma indipendente.

Puoi anche smussare o raccordare gli spigoli del testo, diritti o curvi; vedi [Smussi, raccordi e svuotamento](chapter:edges-and-hollowing). Usa misure ridotte, per esempio da 0,2 a 0,5 mm, perché i tratti delle lettere sono sottili.

## Font personalizzati

Oltre agli otto font integrati, puoi usare qualsiasi font personale: un file presente sul computer oppure, in Chrome ed Edge, un font installato sul computer. Scegli {{ui:font.manage}} in fondo a {{ui:prop.font}}. Si apre la finestra {{ui:font.title}}.

- **{{ui:font.addFile}}** importa un file TrueType (`.ttf`), OpenType (`.otf`) o WOFF (`.woff`). Puoi anche trascinare il file direttamente nella finestra.
- **Su Windows**, i font installati si trovano nella cartella Fonts (`C:\Windows\Fonts`), che la finestra di selezione dei file del browser non mostra. Aprila invece in Esplora file e trascina il font nella finestra {{ui:font.title}}. I font installati solo per il tuo account si trovano in `%LOCALAPPDATA%\Microsoft\Windows\Fonts`, visibile anche dalla finestra di selezione. Su Mac si trovano in `/Library/Fonts` e `~/Library/Fonts`.
- **{{ui:font.fromSystem}}** mostra i font installati sul computer. La prima volta, il browser chiede se layerling può leggerli. Il campo di ricerca permette di trovare rapidamente un font; fai clic sul nome per selezionarlo.

Se il testo è selezionato, il nuovo font viene applicato subito. Altrimenti compare sotto {{ui:prop.font}}, nel gruppo {{ui:font.customGroup}}; nella finestra, {{ui:font.use}} lo applica ai testi selezionati. I font personalizzati funzionano come quelli integrati: puoi disporre il testo su un arco circolare, applicare smussi e raccordi agli spigoli ed esportare in STEP. Le lettere non disponibili nel font vengono recuperate da Sans.

### Arabo ed ebraico

L’arabo, il persiano, l’urdu e l’ebraico si scrivono da destra a sinistra: la prima lettera si trova a destra e, in un testo misto come «Name عربي», solo la parola araba procede al contrario; le cifre mantengono l’ordine abituale. Le lettere arabe si collegano tra loro come richiede la scrittura e la sequenza lam-alef diventa una legatura. Serve un font che contenga queste lettere: quelli integrati non le includono. Aggiungi un font personalizzato, per esempio Arial, Tahoma o Segoe UI su Windows, oppure uno gratuito come Noto Naskh Arabic, Noto Sans Arabic o Amiri. I segni vocalici vengono posizionati sulla lettera corrispondente. Testo su arco circolare, contorno, sagoma, livelli e targhette funzionano come per qualsiasi altro testo.

### Compatibilità con i browser

| Browser | Selezione di un file di font | Font installato sul computer |
| --- | --- | --- |
| Chrome ed Edge su computer, inclusa l’app di layerling installata | sì | sì, dopo aver dato il permesso al browser |
| Firefox | sì | no |
| Safari su Mac | sì | no |
| Tablet e telefono | sì, dai file del dispositivo | no |

Le pagine web non possono leggere liberamente i font installati. Solo Chrome ed Edge hanno un’autorizzazione per farlo, e solo sulle pagine sicure, tramite `https`, come layerling.com. Se layerling funziona tramite `http`, per esempio su un tuo server o come installazione Docker nella rete di casa, {{ui:font.fromSystem}} non è disponibile; puoi trascinare il font da Esplora file. Negli altri browser, seleziona il file del font dalla cartella dei font: il risultato è lo stesso. Se hai rifiutato la richiesta in Chrome o Edge, puoi concedere di nuovo l’autorizzazione dalle impostazioni del sito, dietro il lucchetto a sinistra dell’indirizzo.

layerling non può leggere file WOFF2 (quasi sempre esiste anche una versione TTF o OTF), raccolte di font (`.ttc`, che contengono più font nello stesso file) o font emoji a colori. Dei font molto grandi, come quelli cinesi, layerling carica i primi 8000 caratteri. I font variabili vengono letti nella loro impostazione predefinita, di solito con peso normale.

Alcuni font, soprattutto quelli corsivi e variabili, disegnano le lettere con tratti sovrapposti. Quando legge il font, layerling li unisce in un unico contorno pulito, così il corpo resta stampabile. In questi casi le lettere sono composte da segmenti rettilinei molto brevi anziché da curve; la differenza non è visibile.

### Dove vengono conservati i font

Un font personalizzato resta **in questo browser su questo computer**. Un altro browser o un altro computer non lo conosce finché non lo aggiungi anche lì. Cancellando i dati dei siti nel browser elimini anche i font. Nella finestra {{ui:font.title}}, il cestino rimuove un font dal browser. I tuoi progetti non perdono nulla, come spiega la sezione successiva.

### Condividere progetti che usano font personalizzati

Un progetto **non salva il file del font**: conserva solo i contorni delle lettere usate nei testi, compresi quelli presenti nei passaggi precedenti della cronologia. Se un testo dice «Hello», con esso vengono salvate solo le lettere H, e, l e o. Questo vale per tutti i modi in cui puoi salvare un progetto: nel browser, sul tuo server, come file `.lyl` e in {{ui:myShapes.title}}.

Di conseguenza:

- **Il progetto si apre correttamente ovunque**, anche su un computer che non ha il font. I testi mantengono lo stesso aspetto e puoi spostarli, ruotarli, ridimensionarli e raccordarli.
- **Per aggiungere nuove lettere serve il font.** Se qualcuno senza il font inserisce una lettera che non era presente nel progetto, layerling la disegna con Sans. Sotto {{ui:prop.font}} il font viene contrassegnato con {{ui:font.fromDesign}}. Aggiungendo il file del font, ricompaiono tutte le lettere.
- **Le esportazioni conservano solo la geometria.** I file STL, 3MF, OBJ, STEP e SVG contengono corpi e contorni, non i font.
- **Le versioni precedenti di layerling** non riconoscono ancora i font personalizzati e visualizzano questi testi con Multilingua.

**Licenze:** i font sono protetti dal diritto d’autore e la relativa licenza stabilisce cosa puoi farne. I contorni delle lettere incorporati sono simili a quelli conservati nei file PDF e la maggior parte delle licenze li consente. Alcuni font commerciali vietano però di redistribuire anche singole lettere. Prima di condividere o pubblicare un progetto con un font personalizzato, controllane la licenza. I font gratuiti, come quelli di Google Fonts (perlopiù distribuiti con la SIL Open Font License), possono essere condivisi senza problemi. Per un pezzo stampato o un file STL esportato non ci sono limitazioni di questo tipo: non contengono più il font, ma solo la geometria.

## Testo in rilievo o inciso

- **In rilievo:** posiziona il testo sulla superficie e raggruppalo con il corpo. Sporge come un rilievo.
- **Inciso:** trasforma il testo in {{ui:inspector.hole}}, fallo penetrare leggermente nella superficie e raggruppalo con il corpo. Le lettere vengono incise.

Per aggiungere testo a una faccia laterale, imposta prima il piano di lavoro su quella faccia; vedi [Vista e piano di lavoro](chapter:view-and-workplane).

## Contorno, sagoma e testo più spesso

Il testo non deve per forza essere creato come lettere piene. {{ui:prop.textFill}} nelle proprietà offre le stesse opzioni di Tinkercad:

- **{{ui:prop.textFill.filled}}:** lettere piene, come nell’originale.
- **{{ui:prop.textFill.outline}}:** una linea lungo il contorno delle lettere, per metà all’interno e per metà all’esterno.
- **{{ui:prop.textFill.outer}}:** una linea lungo il bordo esterno delle lettere.
- **{{ui:prop.textFill.inner}}:** una linea lungo il bordo interno delle lettere.

Scegliendo una linea, sotto l’elenco compaiono due impostazioni: {{ui:prop.sketchLineWidth}} determina lo spessore; {{ui:sketch.strokeJoin}} il modo in cui gira intorno agli angoli ({{ui:sketch.strokeJoin.round}}, {{ui:sketch.strokeJoin.bevel}} o {{ui:sketch.strokeJoin.miter}}). Le opzioni meno comuni si trovano sotto {{ui:inspector.more}}: {{ui:prop.sketchSilhouette}} esclude i fori di lettere come O, A o e; {{ui:prop.textWider}} mantiene piene le lettere e le ingrandisce in tutte le direzioni dello spessore della linea, fino a unire quelle che si toccano.

Con una linea esterna, una linea centrata o l’opzione «Più spesso», il riquadro del testo si allarga mentre le lettere mantengono le dimensioni. {{ui:prop.bevel}} e {{ui:prop.segments}} sono disponibili solo per le lettere piene.

## Livelli e targhette

Una targhetta per la stampa multicolore è composta da più livelli: le lettere in cima, sotto lo stesso testo leggermente più largo in un secondo colore e, alla base, una piastra senza fori in un terzo colore. layerling la crea con un solo clic:

- **Nuova targhetta:** scegli {{ui:shape.nameTag}} nella libreria delle forme e posizionala. Mostra «Name» con lettere bianche su un bordo rosso e una base scura.
- **A partire da un testo:** seleziona il testo e fai clic su {{ui:nameTag.makeLayers}} in cima alle sue impostazioni.

Le impostazioni della targhetta si trovano nella scheda {{ui:nameTag.title}}, in cima al pannello:

- **{{ui:prop.text}}** e **{{ui:prop.font}}**, inclusi i font personalizzati. La targhetta si allarga per contenere il testo.
- **{{ui:nameTag.letterSize}}:** altezza delle lettere maiuscole in millimetri. Tutti i livelli si adattano mantenendo l’allineamento.
- **{{ui:nameTag.layers}}:** una riga per ciascun livello, dall’alto verso il basso. Ogni riga contiene il colore (fai clic sul riquadro colorato), quanto il livello supera in larghezza le lettere, la sua altezza e {{ui:nameTag.noHoles}}, che riempie i fori di lettere come O e A. {{ui:nameTag.corners}} imposta come il livello più largo segue gli angoli delle lettere: {{ui:nameTag.corner.round}}, {{ui:nameTag.corner.bevel}} o {{ui:nameTag.corner.miter}}. La prima riga contiene le lettere. **+** aggiunge un livello in fondo, **–** rimuove il livello più basso. Una targhetta può avere da due a sei livelli.
- **{{ui:nameTag.keyring}}:** aggiunge al livello inferiore una linguetta diritta con estremità arrotondata e foro per l’anello portachiavi; la linguetta cresce insieme al foro. Un foro da 3 mm, valore iniziale, produce una linguetta larga 6,5 mm e sporgente di 6,75 mm, con il bordo del foro a 2 mm dal bordo del livello inferiore. Scegli {{ui:nameTag.keyringDiameter}} e {{ui:nameTag.keyringSide}}: {{ui:nameTag.side.left}}, {{ui:nameTag.side.right}} o {{ui:nameTag.side.top}}. Il foro attraversa tutti i livelli che incontra e la linguetta si sposta quando cambi il testo, l’altezza delle lettere o il font.
- **{{ui:nameTag.letterEdge}}:** arrotonda o smussa il bordo superiore delle lettere nel livello più alto, come nella finitura di una targhetta stampata: {{ui:nameTag.edge.none}}, {{ui:nameTag.edge.round}} o {{ui:nameTag.edge.chamfer}}, con la misura {{ui:nameTag.letterEdgeSize}} (inizialmente 0,4 mm, al massimo pari all’altezza del livello). Funziona con qualsiasi font e testo. Il bordo fa parte della mesh delle lettere; perciò lo strumento degli spigoli le considera una mesh, un’operazione pesante per un testo così dettagliato. Imposta il bordo qui invece.

Ogni modifica si applica subito. La targhetta è un raggruppamento senza fusione: si sposta come un pezzo unico, ma ogni livello resta un corpo separato del proprio colore, come serve al programma di slicing per la stampa multicolore. Per raccordare o smussare gli spigoli di un singolo livello, fai clic su {{ui:group.editBundle}} e seleziona il livello; vedi [Smussi, raccordi e svuotamento](chapter:edges-and-hollowing).

### Creare più targhette insieme

Inserisci i nomi in {{ui:textLayers.names}}, uno per riga, fino a un massimo di cento. Il pulsante sotto indica quante targhette verranno create, per esempio «Crea 12 targhette». Tutte avranno gli stessi livelli, la stessa altezza delle lettere e lo stesso foro per l’anello; ciascuna sarà un oggetto indipendente. Verranno disposte in righe sotto la prima, a 5 mm di distanza. Anche un testo normale ha l’elenco dei nomi più in basso nelle impostazioni.

## Targhette con icona

Una targhetta con icona è uguale a una targhetta con testo, ma usa un’icona SVG al posto delle lettere: un cuore, una nuvola o il logo di un club. L’icona è in cima, sotto c’è lo stesso contorno leggermente più largo in un secondo colore e alla base una piastra senza fori.

- **Nuova targhetta con icona:** scegli {{ui:shape.iconTag}} nella libreria delle forme. Si apre una finestra: fai clic su {{ui:iconTag.browse}}, scegli un file SVG, PNG o JPG, controlla l’immagine, inserisci {{ui:iconTag.width}} dell’icona e fai clic su {{ui:iconTag.ok}}. La targhetta viene posizionata al centro della piastra, con gli stessi livelli di una nuova targhetta con testo.
- **Da un corpo creato con uno schizzo:** un SVG importato o uno schizzo disegnato da te offre {{ui:nameTag.makeLayers}} in cima alle impostazioni.

La scheda {{ui:iconTag.title}}, in cima alle impostazioni, contiene:

- **{{ui:iconTag.replace}}:** sostituisce l’icona con quella di un altro file (SVG, PNG o JPG), mantenendo invariati livelli e larghezza.
- **{{ui:iconTag.iconWidth}}:** larghezza in millimetri dell’icona in cima. Tutti i livelli si adattano mantenendo l’allineamento.
- **{{ui:nameTag.layers}}:** le righe sono come quelle di una targhetta con testo: colore, larghezza aggiuntiva, {{ui:nameTag.corners}}, altezza e {{ui:nameTag.noHoles}}, più i pulsanti **+** e **–**; sono disponibili da due a sei livelli. Il primo contiene l’icona.
- **{{ui:nameTag.keyring}}:** come per una targhetta con testo, aggiunge un foro per l’anello che attraversa tutti i livelli e una linguetta arrotondata sul livello inferiore, oltre l’icona. {{ui:nameTag.keyringDiameter}} e {{ui:nameTag.keyringSide}} ne impostano le dimensioni e la posizione. La linguetta segue il contorno dell’icona; se è molto irregolare, controlla il punto in cui si unisce alla piastra.
- **{{ui:iconTag.count}}:** numero di targhette da creare, da 1 a 100. {{ui:iconTag.fill}} calcola quante ne entrano sul piano di stampa della stampante scelta nelle impostazioni; per loghi piccoli, riempie l’intera piastra. Il pulsante sotto le crea, a 5 mm di distanza e centrate sulla piastra; la prima è la targhetta originale.

L’SVG deve contenere contorni chiusi; un disegno fatto solo di linee aperte non può diventare una targhetta. Se il riempimento di un corpo creato da uno schizzo è impostato come linea, l’area della linea diventa l’icona.

**Le immagini (PNG o JPG)** vengono ricalcate per ricavarne un contorno, mostrato nell’anteprima. Sotto {{ui:iconTag.part}} scegli se usare {{ui:iconTag.part.dark}} o {{ui:iconTag.part.light}} come icona; inizialmente viene selezionata la parte che non è sfondo. I pixel trasparenti non fanno parte dell’icona. Anche un SVG che contiene solo un’immagine, come quando si importa una bitmap da Inkscape, viene ricalcato allo stesso modo. Il contorno segue i pixel: con un’immagine piccola il bordo può essere irregolare, quindi è meglio usarne una di almeno qualche centinaio di pixel. {{ui:iconTag.replace}} seleziona la parte dell’immagine diversa dallo sfondo.

## Testo lungo un arco circolare

Vuoi che il testo segua il bordo di una moneta, di un coperchio o di un anello anziché restare diritto? Usa l’impostazione {{ui:prop.textCurved}}.

![Il testo segue un cerchio. Tutte le lettere poggiano sulla stessa linea.](shot:curved-text)

Attivandola, il testo segue il cerchio. Tutte le lettere si appoggiano sulla stessa linea di base, con spaziatura uniforme come nel testo normale. Ci sono quattro impostazioni:

- **{{ui:prop.textRadius}}** (da 5 a 500 mm): il raggio del cerchio su cui si trova la linea di base delle lettere.
- **{{ui:nameTag.letterSize}}:** altezza delle lettere. Non dipende più dalla larghezza della forma.
- **{{ui:prop.textInward}}:** sposta il testo dalla parte superiore a quella inferiore del cerchio. Le lettere saranno rivolte verso il centro.
- **{{ui:prop.textFlipped}}:** capovolge solo le lettere, così puoi leggerle dal lato opposto. Il testo resta nella stessa posizione sul cerchio.

**Il centro del cerchio coincide con il centro della forma.** Perciò l’allineamento funziona come al solito: centrando il testo su un cilindro o un anello, questo risulta perfettamente concentrico. Trascinando una maniglia, raggio e altezza delle lettere crescono insieme, senza deformare la scritta.

> **Suggerimento:** nella parte superiore del cerchio, le lettere sporgono sopra la linea di base; con {{ui:prop.textInward}} si trovano all’interno e sono rivolte verso il centro. Per fare entrare la scritta su un disco, la somma del raggio e dell’altezza delle lettere deve essere inferiore al raggio del disco.