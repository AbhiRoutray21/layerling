---
title: File, salvataggio e condivisione
summary: Dove si trovano i progetti, come farne copie di sicurezza, quali formati layerling importa ed esporta e cosa offre l’archivio condiviso sul server.
---

## Dove vengono conservati i progetti

layerling salva tutto nel browser del tuo computer. Non serve un account e non viene caricato nulla online. Ogni modifica viene salvata automaticamente. L’immagine di anteprima nella pagina iniziale mostra la vista che avevi davanti l’ultima volta che sei tornato con {{ui:editor.homeDashboard}}. Se riapri layerling nello stesso browser anche dopo diversi giorni, ritrovi tutto.

Se torni alla pagina iniziale da un progetto vuoto, layerling ti chiede se vuoi conservarlo. {{ui:confirm.yes}} o [[Enter]] lo mantiene; {{ui:confirm.no}} lo elimina, così non si accumulano progetti vuoti. Se il progetto si trova in una cartella condivisa sul server, {{ui:confirm.no}} elimina il file dal server per tutti gli utenti.

Questo ha uno svantaggio: chi cancella i dati del browser o passa a un altro computer perde i progetti. **Perciò crea una copia di sicurezza dei lavori importanti e salvala in un file.**

## Cartelle per i progetti

Con decine di progetti, un unico elenco non basta. Nella pagina iniziale, {{ui:shared.newFolder}} crea una cartella per i progetti di questo browser; fai clic sulla cartella per aprirla. Puoi inserire cartelle all’interno di altre cartelle.

- **Spostare un progetto in una cartella:** trascinalo sulla cartella oppure scegli {{ui:shared.moveTo}} dal menu del progetto, che elenca tutte le cartelle. I nuovi progetti e i file aperti o importati mentre una cartella è aperta vengono salvati al suo interno.
- **Tornare indietro:** la prima miniatura di una cartella, `..`, e la riga sotto {{ui:dashboard.projects}} riportano alla cartella precedente; puoi anche trascinarci sopra un progetto. Trascinando una cartella su un’altra, la inserisci al suo interno.
- **Rinominare ed eliminare:** trovi entrambi i comandi nel menu della cartella. Eliminandola non elimini i progetti: quelli al suo interno vengono spostati di un livello verso l’alto.
- **Cercare:** la ricerca include tutte le cartelle. Per ogni progetto trovato viene indicata la cartella; facendoci clic la apri.

{{ui:dashboard.backupAll}} conserva le cartelle: i progetti restano nelle rispettive cartelle nel file di copia di sicurezza e, quando ripristini il file, tornano al loro posto. Le cartelle di questo browser sono separate da quelle sul server.

## Creare copie di sicurezza e condividere i progetti

Nella pagina iniziale, il menu di ogni progetto permette di rinominarlo, duplicarlo o eliminarlo. {{ui:dashboard.backupAll}} raccoglie tutti i progetti in un unico file. {{ui:dashboard.restoreBackup}}, accanto a questo comando nell’avviso sui progetti salvati nel browser (compare anche su un nuovo computer senza progetti), li ripristina, anche in un altro browser o computer. Puoi usare lo stesso file anche con {{ui:dashboard.importGeometry}}. Le forme personalizzate di {{ui:myShapes.title}} di questo browser vengono salvate nello stesso file, nella cartella `Custom shapes`; vedi [Forme](chapter:shapes). Se ripristini la copia di sicurezza in un browser che contiene già alcuni dei progetti, non vengono aggiunti una seconda volta; l’avviso indica quanti erano già presenti.

Per creare una copia di sicurezza di un singolo progetto nell’editor, fai clic su {{ui:editor.export}}, scegli il formato **LYL** e fai clic su {{ui:export.saveProject}}. LYL è il formato di progetto di layerling e contiene tutto: forme, gruppi, schizzi, dati CAD, sorgenti importate e cronologia, cioè i passaggi che puoi annullare. Sotto {{ui:export.historyTitle}} scegli quanti degli ultimi passaggi includere; il valore iniziale corrisponde a quello conservato nelle impostazioni (l’ingranaggio nella barra degli strumenti), sotto {{ui:workspace.history}}. L’ultima opzione, {{ui:export.historyNone}}, salva soltanto lo stato attuale del progetto: è il modo per condividere un file senza la cronologia delle modifiche. L’esportazione crea una copia con il nome {{ui:export.fileName}} che scegli; il progetto nel browser conserva la propria cronologia. Puoi ancora aprire i vecchi file `.skf` creati con le versioni precedenti; al salvataggio vengono convertiti in `.lyl`.

**Salvare in una cartella a scelta (Chrome ed Edge).** Con questi browser, il pulsante apre la finestra di salvataggio del sistema: puoi scegliere la cartella e il nome del file e sostituire un file esistente. In seguito, [[Ctrl]]+[[S]] salva di nuovo il progetto nello stesso file, senza aprire la finestra. Anche un progetto aperto da un file `.lyl` con {{ui:dashboard.importGeometry}} o con il pulsante Apri nella finestra di esportazione viene salvato nello stesso file. Il browser potrebbe chiedere una volta il permesso di modificarlo. Dopo aver ricaricato la pagina, il progetto dimentica il file associato e il successivo [[Ctrl]]+[[S]] lo richiede di nuovo; la finestra si apre nella cartella usata l’ultima volta. Firefox e Safari non consentono a una pagina di scrivere direttamente nei file: il progetto viene scaricato nella cartella Download come prima e [[Ctrl]]+[[S]] lo scarica di nuovo. In Firefox puoi scegliere di selezionare la cartella ogni volta in Impostazioni, Generale, Download.

## Esportare

Fai clic su {{ui:editor.export}} o premi [[Ctrl]]+[[E]].

![La finestra di esportazione con i formati STL, 3MF, OBJ, STEP, SVG, PNG, LYL e 2D.](shot:export-panel)

In alto trovi il nome del file; sotto scegli il formato. Se hai selezionato qualcosa, viene esportata solo la selezione; altrimenti, l’intero progetto. Se la selezione esclude parti visibili, un messaggio nella finestra lo segnala chiaramente e {{ui:export.selectAll}} seleziona con un solo clic tutto ciò che è visibile. Dopo aver creato il file, la finestra si chiude automaticamente; se l’esportazione non riesce, resta aperta e mostra un messaggio.

| Formato | Uso | Informazioni |
| --- | --- | --- |
| **STL** | Programma di slicing e stampa 3D | Mesh triangolare, il formato più semplice e diffuso. STL non distingue le parti: i corpi che si sovrappongono vengono uniti in un’unica mesh. Per mantenerli separati, esporta in 3MF. In Chrome ed Edge, la prima esportazione STL chiede dove salvare; le esportazioni successive dello stesso progetto sovrascrivono quel file finché non inserisci un altro nome nel campo del nome file o premi {{ui:export.stlSaveAs}}. |
| **3MF** | Programma di slicing con colori | Ogni corpo resta una parte indipendente con il proprio nome e colore. I corpi sovrapposti vengono uniti solo se hanno lo stesso colore; se una forma di un altro colore si trova all’interno, per esempio un logo su una piastra, la prima forma creata lascia spazio a quella successiva. Adatto a PrusaSlicer, Bambu Studio, OrcaSlicer e Cura. All’apertura, Bambu Studio e OrcaSlicer chiedono come associare i colori ai filamenti e segnalano che il file «non proviene da Bambu»: è un messaggio innocuo. |
| **OBJ** | Modellazione e scambio | Formato mesh ampiamente supportato. I colori sono salvati come colori dei vertici nello stesso file, senza un file `.mtl` separato. Bambu Studio e OrcaSlicer li leggono e, come per 3MF, chiedono come associarli ai filamenti; gli altri programmi mostrano solo la forma. Come con 3MF, i corpi sovrapposti vengono uniti solo se hanno lo stesso colore. |
| **STEP** | Programma CAD completo | Mantiene come geometria esatta scatole, cilindri, sfere, coni e forme create da un contorno (stelle, cuori, ellissi, tubi, mezze sfere, tetti tondi, scatole arrotondate, incastri a coda di rondine, fori e altro), oltre a tubi curvi, filettature, molle e ingranaggi, raccordi e smussi. La prima esportazione STEP della sessione carica una sola volta il kernel CAD (circa 22 MB). |
| **SVG** | Taglio laser e plotter | Vista dall’alto precisa in millimetri, con fori e contorni curvi. |
| **PNG** | Post nei forum, siti di stampa, domande | Immagine della vista corrente a risoluzione doppia, senza maniglie, riquadri di selezione o quote. Nella finestra scegli {{ui:export.png.plate}} e {{ui:export.png.transparent}}. Ruota e ingrandisci la vista prima di esportare; la selezione non influisce sull’immagine. |
| **LYL** | layerling | Progetto modificabile con tutti i dati associati. |
| **2D** | Officina, tornio e fresatrice, documentazione | Disegno in scala 1:1 in PDF o SVG: viste frontale, dall’alto e laterale destra su un foglio ISO. Vedi sotto. |

**Esportare STL in una cartella a scelta (Chrome ed Edge).** La prima esportazione STL di un progetto apre la finestra di salvataggio del sistema, così puoi scegliere la cartella e il nome e sostituire un file esistente. In seguito, ogni esportazione STL dello stesso progetto sovrascrive quel file senza aprire la finestra; la finestra di esportazione mostra quale file verrà usato. Con **Salva con nome…**, accanto al pulsante di esportazione, puoi sceglierne un altro. La finestra ricorda la propria cartella, indipendentemente da quella usata per i progetti, così i file per lo slicer possono restare insieme. Dopo aver ricaricato la pagina, il progetto dimentica il file STL associato e l’esportazione successiva lo richiede di nuovo. Firefox e Safari scaricano il file come al solito.

Se non raggruppi un foro, durante l’esportazione viene sottratto a tutti i corpi che raggiunge, come nella vista. Non serve quindi raggruppare prima di ogni esportazione. Quando esporti una selezione, vengono considerati solo i fori selezionati. Un foro non può essere esportato da solo: layerling te lo segnala.

STEP include solo i corpi CAD esatti. Gli elementi che non possono essere scritti come geometria esatta, per esempio una mesh importata in formato STL, vengono esclusi. Il messaggio dopo l’esportazione elenca i corpi esclusi e ne indica il motivo. Per la stampante usa STL o 3MF, che includono tutto.

### Un disegno per l’officina

Scegli il formato **2D** (passaci sopra il puntatore: viene indicato come Drawing), poi scegli PDF o SVG sotto il nome del file. Se hai selezionato qualcosa, viene disegnata solo la selezione; altrimenti viene rappresentato tutto il progetto visibile. I fori non raggruppati sottraggono comunque materiale ai corpi che raggiungono.

layerling disegna le viste frontale, dall’alto e laterale destra con proiezione del primo diedro (la vista laterale destra si trova a sinistra di quella frontale, la vista dall’alto sotto di essa) sul foglio ISO più piccolo adatto, da A4 ad A0, o più grande se il pezzo lo richiede. La scala è sempre 1:1. Ogni vista indica la larghezza e l’altezza complessive; gli spigoli nascosti sono tratteggiati. I fori tondi paralleli alla direzione di una vista mostrano una croce al centro e un’etichetta (F1, T1, R1); una tabella in basso elenca diametro e posizione, misurati dall’angolo inferiore sinistro della vista. Il riquadro del cartiglio in basso a destra riporta nome, scala, unità, data e numero del foglio. Le diciture sul foglio seguono la lingua dell’interfaccia.

Stampa al 100% o con l’opzione «dimensioni effettive», altrimenti le misure non corrisponderanno. Il disegno non riporta filettature, profondità, tolleranze o fori inclinati; inoltre, le dimensioni provengono dal modello mesh, quindi sono nominali. Un pezzo molto dettagliato (oltre 100.000 triangoli) o con più di 200 fori non viene elaborato e compare un messaggio; prova a selezionare meno oggetti.

La proiezione si basa sul lavoro di disegno di Cadverix-3D di WC3D.

### Quanto filamento serve?

Per i formati STL, 3MF, OBJ e STEP, il riquadro {{ui:export.estimateTitle}} mostra il volume, il peso e la lunghezza del filamento da 1,75 mm necessari per gli elementi esportati. Il calcolo segue il contenuto del file: solo i corpi visibili, con i fori sottratti e le sovrapposizioni conteggiate una volta sola. A destra scegli il materiale (PLA, PETG, ABS, ASA, TPU o PA, nylon); il peso viene calcolato in base alla sua densità. Il volume corrisponde al corpo vero e proprio. Il peso e la lunghezza del filamento sono stime approssimative per una stampa con pareti e riempimento: sotto il titolo puoi impostare {{ui:export.estimateInfillLabel}} (inizialmente 15%) e {{ui:export.estimateWallsLabel}} (inizialmente 2). Il riquadro indica cosa è stato conteggiato e quanto peserebbe lo stesso pezzo pieno. Le impostazioni dello slicer determinano il valore effettivo: usa quindi la stima come riferimento per confrontare i progetti o verificare se il filamento rimasto sulla bobina basterà. Con un riempimento al 100%, il calcolo considera il pezzo pieno e fornisce il limite massimo.

## Importare

Con {{ui:editor.import}} o [[Ctrl]]+[[I]] puoi importare file esterni nel progetto.

![La finestra di importazione: apri o inserisci progetti e importa geometrie.](shot:import-panel)

- **{{ui:import.openProject}}:** apre un progetto di layerling (`.lyl` o un vecchio `.skf`) come nuovo progetto.
- **{{ui:import.insertProject}}:** aggiunge i corpi di un progetto di layerling a quello aperto. È utile per le forme di base che riutilizzi spesso: creale una volta, salvale e importale ogni volta che servono.
- **Aggiungi geometria:** trascina nella finestra file STL, OBJ, 3MF, STEP, SVG, PNG o JPG oppure fai clic per scegliere un file. Puoi ruotare, spostare, forare e modificare le mesh importate. Un SVG diventa un corpo creato da uno schizzo; lo stesso vale per un SVG ottenuto con un tracciatore come picsvg.com o con «Ricalca bitmap» di Inkscape. I contorni diventano linee e curve dello schizzo, alto 4 mm e visualizzato dall’alto come nel disegno. Nelle proprietà imposta {{ui:prop.sketchFill}}, scegliendo un’area o un tratto esterno, interno o centrato; {{ui:prop.sketchSilhouette}} esclude i fori. Vedi [Schizzi](chapter:sketches), «Riempimento e sagoma». Puoi modificare i singoli punti in modalità schizzo. Se vuoi importarlo con dimensioni specifiche, inserisci prima la larghezza nel campo **SVG e immagine: larghezza in mm** della finestra di importazione, come in Tinkercad: l’intero disegno viene ridimensionato in proporzione, altezza e profondità incluse. Il campo viene poi svuotato; se lo lasci vuoto, un SVG mantiene le dimensioni originali e un’immagine viene importata larga 50 mm. Solo un SVG molto complesso, con più di 2500 linee e curve, viene importato come mesh fissa. Un’immagine PNG o JPG viene ricalcata e importata allo stesso modo, come corpo creato da uno schizzo largo 50 mm, che puoi ridimensionare in seguito. L’icona è la parte dell’immagine diversa dallo sfondo, cioè la parte che non copre la maggioranza dei bordi dell’immagine. Anche un SVG che contiene soltanto un’immagine viene ricalcato allo stesso modo. Una forma che non può diventare un solido, per esempio un contorno che si incrocia o si tocca in un punto, viene esclusa; dopo l’importazione layerling indica quante forme sono state escluse. In questi casi, nel programma di disegno unisci le parti sovrapposte, chiudi i contorni e salva di nuovo il file. Se importi separatamente disegni creati su un’unica pagina, per esempio i livelli dello stesso documento esportati come file distinti, attiva {{ui:import.keepSvgPage}} nella finestra prima di importarli: ciascuno mantiene la propria posizione sulla pagina. Altrimenti ogni disegno viene centrato su sé stesso. Un file OBJ o 3MF a colori viene importato come un corpo per colore, ciascuno nella posizione originale. In OBJ i colori possono trovarsi nel file stesso, come negli OBJ esportati da layerling, o in un file `.mtl` accanto. Seleziona anche quest’ultimo oppure importa l’intero ZIP, come fa Tinkercad quando esporta un OBJ. Il file 3MF include i colori; in un progetto proveniente da Bambu Studio, OrcaSlicer o PrusaSlicer, ogni parte usa il colore del filamento assegnato. Un 3MF con più oggetti, per esempio un progetto con un oggetto per piano di stampa, viene importato con un corpo per oggetto; modificatori, volumi negativi e bloccanti dei supporti dello slicer vengono esclusi. I colori dipinti sulle facce nello slicer non vengono importati.

Un progetto salvato con una versione **più recente di layerling** potrebbe contenere elementi che la tua versione non riconosce ancora, come una nuova forma, una nuova impostazione o font personalizzati. Se per questo motivo layerling non riesce ad aprirlo, un messaggio indica entrambe le versioni. Se invece lo apre, un avviso spiega che gli elementi più recenti potrebbero avere un aspetto diverso. In entrambi i casi, ricaricare la pagina può essere d’aiuto: layerling.com offre sempre la versione più recente. L’app installata la scarica al successivo avvio; sul tuo server devi installare l’aggiornamento.

Le immagini modello si aggiungono in modalità schizzo; vedi [Schizzi](chapter:sketches).

## Semplificare una mesh importata

Una mesh scansionata o scolpita spesso contiene molti più triangoli del necessario e ognuno di essi resta presente mentre sposti, tagli e salvi il pezzo. {{ui:simplify.title}} nel gruppo Modifica (o nel menu del clic destro sul corpo) mostra la mesh originale accanto al risultato previsto con la percentuale di triangoli scelta; entrambe le viste ruotano e si ingrandiscono con i pulsanti del mouse usati sul piano di lavoro. Imposta la percentuale o il numero di triangoli da conservare, poi fai clic su {{ui:simplify.apply}} per ottenere una mesh più leggera. Il risultato è una mesh semplice: in caso di taglio o fusione, non sono più disponibili {{ui:group.edit}} e le parti originali.

Il taglio, la fusione e l’intersezione delle mesh importate vengono calcolati nel browser; perciò le impostazioni dell’area di lavoro limitano il numero massimo di triangoli che una mesh può contenere ({{ui:workspace.booleanTriangleLimit}}). Le mesh che superano il limite non vengono elaborate e un messaggio indica il numero di triangoli. Semplifica prima la mesh oppure aumenta il limite, se il tuo computer è in grado di gestirla.

## Segnalare un problema

Se layerling si comporta in modo inatteso, crea un file {{ui:editor.bugReport}}: il collegamento si trova nel piè di pagina, accanto al forum. Il file è uno ZIP, perché GitHub e molti forum non accettano un file `.lyl` da solo. Contiene il progetto in formato `.lyl` e un breve testo con la versione, il browser, le dimensioni dello schermo, gli ultimi messaggi e gli eventuali errori. La pagina iniziale apre lo ZIP come una copia di sicurezza; in alternativa, puoi estrarlo e aprire il file `.lyl`. Non contiene informazioni personali. Allega il file al tuo post sul forum o su GitHub, così è possibile riprodurre il problema usando esattamente il tuo progetto.

Se layerling si blocca con un errore, al posto della pagina vuota compare una finestra con il messaggio. Da lì puoi salvare come file `.lyl` lo stato del progetto conservato più di recente nel browser, tornare alla panoramica o iniziare un nuovo progetto. Il messaggio e il file salvato aiutano a segnalare il problema.

## Progetti condivisi sul server

Se layerling funziona sul tuo computer o su un server web, può offrire una cartella condivisa in cui tutti gli utenti possono salvare i progetti. Nella pagina iniziale appare come {{ui:dashboard.sharedProjects}}. Puoi creare cartelle, spostare i progetti trascinandoli e cercare nell’intera cartella. Un progetto che si trova lì viene salvato automaticamente sul server. Puoi spostare sul server un progetto di questo browser trascinandone la scheda sull’icona del server oppure scegliendo {{ui:dashboard.sendToServer}} dal menu della scheda. Una copia di sicurezza che apri viene prima caricata in questo browser, come ogni altro progetto; da lì puoi trasferirla sul server. Nella pagina iniziale il progetto è mostrato con il nome del file: rinominandolo dalla scheda o dalla parte superiore dell’editor, rinomini anche il file sul server. Eliminare un progetto o una cartella lo rimuove definitivamente, insieme alla copia di lavoro di questo browser. Le forme personalizzate conservate sul server si trovano nella cartella `Custom shapes`; vedi [Forme](chapter:shapes).

Ci sono due modi per velocizzare il trasferimento: {{ui:dashboard.sendAllToServer}} nella pagina iniziale copia in un solo passaggio sul server tutti i progetti di questo browser; attivando {{ui:dashboard.newOnServer}}, tutti i nuovi progetti vengono creati direttamente nella cartella sul server e salvati lì fin dalla prima modifica. Questa scelta viene memorizzata nel browser. Se un progetto non può essere trasferito, per esempio perché sul server esiste già un file con lo stesso nome, resta nel browser e il messaggio indica quanti progetti non sono stati trasferiti.

La modifica non è simultanea: chi apre un file lavora sulla propria copia. Se nel frattempo qualcun altro ha modificato il file, layerling impedisce di sovrascriverlo.

Questa funzione non è attiva su layerling.com. Per configurarla sul tuo server, consulta il [README su GitHub](https://github.com/henmedia/layerling/blob/main/README.md).