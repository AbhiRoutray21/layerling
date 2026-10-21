---
title: Smussi, raccordi e svuotamento
summary: Applicare smussi e raccordi a spigoli selezionati e creare pareti di spessore uniforme per scatole, tazze e involucri.
---

## Smussare e raccordare gli spigoli

Gli spigoli affilati raramente hanno un bell’aspetto su un pezzo stampato e non sono particolarmente robusti. Uno **smusso** taglia lo spigolo in diagonale; un **raccordo** lo arrotonda. Entrambi si applicano agli spigoli su cui fai clic.

1. Seleziona il corpo o il gruppo.
2. Fai clic su {{ui:editor.tool.fillet}} o {{ui:editor.tool.chamfer}} nella barra degli strumenti, premi [[B]] per il raccordo o [[Shift+B]] per lo smusso, oppure fai clic con il tasto destro sul corpo e scegli il comando dal menu.
3. Gli spigoli del corpo si illuminano. Fai clic su quelli da modificare. Fai di nuovo clic per rimuovere uno spigolo dalla selezione. Con [[Shift]] puoi aggiungere o rimuovere un singolo spigolo.
4. Imposta la dimensione e conferma con {{ui:edge.apply}} o [[Enter]]. In seguito, la finestra resta aperta sul nuovo corpo con la stessa dimensione, così puoi applicare subito un altro raccordo o smusso. {{ui:edge.done}}, [[Esc]] o la croce chiudono la finestra. Tenendo premuto [[Shift]] o [[Ctrl]], un clic su {{ui:edge.topEdges}}, {{ui:edge.bottomEdges}}, {{ui:edge.verticalEdges}} o {{ui:edge.horizontalEdges}} aggiunge quegli spigoli a quelli già selezionati, invece di sostituirli.

![Lo strumento «Raccorda spigoli»: sono selezionati tutti gli spigoli affilati e l’anteprima mostra un raggio di 4 mm.](shot:fillet-preview)

Il pannello si trova in alto a destra. Se copre gli spigoli che vuoi selezionare, trascinalo dalla barra del titolo; la prossima volta si aprirà in quella posizione. Vale anche per {{ui:editor.tool.hollow}} e {{ui:editor.tool.array}}. Fai doppio clic sulla barra del titolo per riportarlo al suo posto.

Se scegli una forma dall’elenco mentre il pannello è aperto, questo si chiude senza applicare modifiche e dimentica gli spigoli selezionati. Il clic posiziona la nuova forma invece di selezionare uno spigolo.

Nel pannello trovi:

- {{ui:edge.allSharpEdges}} seleziona tutti gli spigoli in una volta; {{ui:edge.clear}} deseleziona tutto.
- **{{ui:edge.radius}}** imposta il raccordo. Per lo smusso, imposta {{ui:edge.distance}} o {{ui:edge.angle}}.
- {{ui:edge.sharpThreshold}} determina quali spigoli sono considerati affilati. Con 25° vengono rilevate solo le pieghe nette, mentre le transizioni piatte vengono ignorate.
- {{ui:edge.verticalEdges}} seleziona gli spigoli verticali, per esempio gli angoli di una scatola: con un solo raccordo puoi arrotondarli tutti.
- {{ui:edge.topEdges}} seleziona solo gli spigoli lungo la parte più alta del corpo. È il modo rapido per creare un tagliabiscotti: disegna il contorno come tratto in uno schizzo e poi smussa gli spigoli superiori. {{ui:edge.angle}} imposta l’inclinazione dello smusso; non può superare lo spessore della parete.
- {{ui:edge.bottomEdges}} seleziona solo gli spigoli lungo la parte più bassa del corpo, l’opposto di {{ui:edge.topEdges}}. È il modo rapido per raccordare o smussare solo la base di un pezzo.
- {{ui:edge.chamfillet}}, nella parte superiore della finestra dello smusso accanto a {{ui:editor.tool.chamfer}}, crea una base stampabile: uno smusso a contatto con la piastra passa in modo tangenziale a un raccordo verso la parete. Così i primi strati non richiedono supporti e il bordo resta morbido. {{ui:edge.distance}} imposta l’altezza occupata dalla base; {{ui:edge.angle}} (da 15° a 75°) l’inclinazione dello smusso sulla piastra. Seleziona gli spigoli con {{ui:edge.bottomEdges}}.
- {{ui:edge.onlyVisibleEdges}} nasconde gli spigoli che, dal punto di vista corrente, si trovano dietro il corpo. Inizialmente tutti gli spigoli sono visibili attraverso il corpo, ma su un pezzo complesso può creare confusione; attivando l’opzione vedi e puoi selezionare solo quelli rivolti verso di te. Ruota la vista per raggiungere gli altri. Gli spigoli evidenziati in rosso (vedi sotto) restano sempre visibili.
- {{ui:edge.tangentChains}} fa sì che un clic selezioni anche gli spigoli che proseguono con continuità, per esempio tutti quelli intorno a una faccia dagli angoli arrotondati. L’interruttore determina solo quali spigoli vengono selezionati con un clic: il kernel CAD estende sempre lo smusso o il raccordo anche agli spigoli tangenti. Il pannello indica quanti altri spigoli saranno coinvolti.
- {{ui:edge.keepSize}} mantiene invariata la dimensione dello smusso o del raccordo anche se in seguito ridimensioni il corpo.
- {{ui:edge.previewQuality}} ({{ui:edge.draft}}, {{ui:edge.standard}} o {{ui:edge.fine}}) determina il livello di dettaglio dell’anteprima. Per i pezzi complessi, {{ui:edge.draft}} è più veloce.

Quando cambi la dimensione, layerling ricalcola l’anteprima; potrebbe volerci qualche istante. Puoi continuare a modificarla: verrà calcolato l’ultimo valore che hai scelto.

Se la dimensione è troppo grande per lo spigolo, layerling te lo segnala e suggerisce un valore più piccolo. Spesso basta ridurlo di uno o due millimetri. In corrispondenza di angoli acuti, il raccordo può richiedere più spazio di quanto suggerisca il suo raggio. Sugli schermi piccoli, il pannello scorre automaticamente verso il messaggio per mostrarlo.

Se una selezione applicabile smette di funzionare dopo che selezioni un altro spigolo, quest’ultimo diventa rosso e viene disegnato più spesso: è lo spigolo che, con questa dimensione, non può essere modificato insieme agli altri. Fai di nuovo clic per deselezionarlo oppure riduci la dimensione. Se selezioni altri spigoli mentre il messaggio è visibile, il primo resta rosso. Se non c’è una selezione precedente valida, come al primo clic o dopo aver aumentato la dimensione, diventano rossi gli spigoli che non funzionano nemmeno da soli, oppure tutti se il problema è la loro combinazione.

Anche lo spigolo sotto il puntatore viene disegnato più spesso, così puoi vedere quale selezionerai con un clic.

### Annullare un trattamento degli spigoli

Puoi sempre modificare di nuovo un corpo già trattato. Selezionalo e apri lo strumento, Raccordo, Smusso o Svuotamento: ognuno mostra l’elenco dei trattamenti. Sotto {{ui:edge.featureHistory}} vedi quelli già applicati. {{ui:edge.revertAction}} annulla un singolo trattamento. Attenzione: vengono annullati anche gli eventuali trattamenti successivi che si trovano sopra quello scelto; il pannello indica quanti.

Accanto a uno smusso, a un raccordo o a uno svuotamento compare anche {{ui:edge.editAction}}. Annulla il trattamento come sopra, ma riapre subito lo strumento con gli stessi spigoli selezionati e il valore precedente. Puoi modificare il valore e applicarlo di nuovo: per esempio, trasformare un raccordo da 3 mm a 5 mm senza riselezionare gli spigoli. Se ci sono trattamenti successivi, vengono annullati anche in questo caso. La modifica è disponibile per i trattamenti degli spigoli che applichi d’ora in avanti; quelli più vecchi consentono solo di annullarli, come i singoli elementi di un gruppo.

Su un gruppo, per esempio un cilindro con un foro, lo spigolo trattato appartiene al corpo risultante, non a una delle parti: il gruppo diventa quindi un corpo unico. {{ui:editor.tool.ungroup}} continua a funzionare: prima annulla i trattamenti degli spigoli e poi scioglie il gruppo, tutto in un solo passaggio che [[Ctrl]]+[[Z]] annulla. Annulla il trattamento come descritto sopra per ripristinare il gruppo con tutte le sue parti. È più semplice applicare i trattamenti agli spigoli per ultimi. Lo stesso vale per le filettature: lo strumento usa la geometria esatta della filettatura, quindi puoi arrotondare gli spigoli di un blocco con un foro filettato senza rimuovere la filettatura. Il calcolo degli spigoli di una filettatura richiede più tempo che per una forma semplice: alcuni secondi per una M6 e circa mezzo minuto per una filettatura per tubi G1/2.

> **Da sapere:** layerling usa geometria CAD reale per raccordi e smussi, non solo una mesh di triangoli. Per questo gli spigoli arrotondati restano tali nell’esportazione STEP.

Anche i pezzi importati come STEP conservano la geometria CAD: raccordi, smussi e svuotamento funzionano sul corpo originale, indipendentemente dal livello di dettaglio mostrato sullo schermo. I file STL, OBJ e 3MF contengono solo triangoli; se la mesh è molto dettagliata, lo strumento per gli spigoli potrebbe non riuscire a elaborarla. Se il pezzo è disponibile anche in formato STEP, importa quello.

## Svuotare i corpi

Scatole, tazze, involucri e coperchi hanno una caratteristica in comune: sono vuoti all’interno e hanno pareti di spessore uniforme. È proprio quello che fa {{ui:editor.tool.hollow}}.

1. Seleziona il corpo e fai clic su {{ui:editor.tool.hollow}}, oppure fai clic con il tasto destro sul corpo e scegli il comando dal menu.
2. Imposta {{ui:shell.wall}}.
3. Sotto {{ui:shell.openings}}, attiva i lati che vuoi lasciare aperti: {{ui:shell.side.top}}, {{ui:shell.side.bottom}}, {{ui:shell.side.front}}, {{ui:shell.side.back}}, {{ui:shell.side.left}} o {{ui:shell.side.right}}, in qualsiasi combinazione. Solo {{ui:shell.side.front}}, per esempio, crea l’apertura per un cassetto; {{ui:shell.side.left}} e {{ui:shell.side.right}} creano un tunnel. Se non attivi nessun lato, il corpo resta chiuso su tutti i lati e presenta una cavità interna.
4. Scegli se {{ui:shell.edges}} devono essere {{ui:shell.edges.round}} o {{ui:shell.edges.sharp}}.
5. Fai clic su {{ui:shell.apply}}.

![Il pannello Svuotamento con lo spessore della parete, un interruttore per ogni lato da lasciare aperto e le opzioni per gli spigoli interni.](shot:hollow-panel)

Le pareti crescono verso l’interno. L’esterno resta invariato.

{{ui:shell.edges}} influisce solo nei punti in cui le pareti interne si allontanano, come un gradino nel corpo o intorno a un’apertura. Gli angoli della cavità di una scatola semplice sono sempre netti, indipendentemente dall’impostazione. Per ottenere un interno arrotondato, raccorda prima gli spigoli esterni del corpo (vedi sopra) e poi svuotalo: il raggio interno sarà pari al raggio esterno meno lo spessore della parete. Se non è possibile creare l’interno arrotondato, come può accadere con un contorno composto da moltissimi segmenti brevi, per esempio un disegno ricalcato, layerling crea lo stesso corpo cavo con angoli interni netti.

![Il risultato: un guscio con pareti da 3 mm, aperto in alto.](shot:hollow-result)

![La stessa scatola con il solo lato anteriore aperto: un’apertura per un cassetto.](shot:hollow-sides)

Per ogni lato aperto, il corpo deve avere una faccia piatta esattamente sul bordo di quel lato. Perciò non è possibile svuotare in questo modo sfere e forme libere. Se la parete è troppo spessa per il corpo, layerling te lo segnala e chiede uno spessore minore. È il caso anche di una scatola arrotondata sui bordi superiori e inferiori: la parete deve essere molto più sottile del raccordo, altrimenti porta prima il raccordo a 0.

Puoi svuotare anche un corpo con una tasca, per esempio un blocco con un foro non passante creato raggruppando una scatola con un foro rialzato, e lasciarlo aperto in alto. Vengono svuotate anche le pareti intorno alla tasca, lasciando un’intercapedine tra la parete esterna e la tasca, aperta in alto, e una cavità sottile sotto il fondo della tasca.

**I corpi che terminano con una punta,** come un cono o un triangolo ottenuto per rivoluzione, non hanno una faccia piatta superiore da lasciare aperta. Non funzionano nemmeno con una cavità completamente chiusa, perché non è possibile arretrare verso l’interno una punta: anche con una parete di 1 mm, compare un messaggio che indica che lo spessore è eccessivo. In questi casi, disegna lo spessore nel profilo prima di applicare la rivoluzione: duplica il contorno, riduci uniformemente la copia, posizionala al centro di quello più grande e sottraila; poi applica la rivoluzione alla forma risultante (capitolo Schizzi, sezione Rivoluzione). La distanza tra i due contorni determina lo spessore della parete.

Se in seguito ridimensioni un corpo svuotato, layerling lo svuota nuovamente subito, usando le nuove dimensioni. Lo spessore della parete resta quello scelto, anche per i corpi tondi. Se trascini un lato di un cilindro più dell’altro, il cilindro diventa un’ellisse.

> **Suggerimento:** con un ugello da 0,4 mm, uno spessore della parete da 1,2 a 2 mm è un buon punto di partenza: abbastanza sottile da risparmiare materiale e abbastanza spesso da rendere il pezzo robusto.

## Eliminare facce

Un raccordo d’intralcio, un foro nel posto sbagliato, un risalto che non serve più: {{ui:editor.tool.deleteFace}} li rimuove dal corpo senza ricostruirlo da capo.

1. Seleziona il corpo e fai clic su {{ui:editor.tool.deleteFace}}, oppure fai clic con il tasto destro sul corpo e scegli il comando dal menu.
2. Fai clic su tutte le facce da rimuovere: quelle di uno spigolo arrotondato, la parete di un foro, il lato e la parte superiore di un risalto. La faccia selezionata si illumina; facendo di nuovo clic la deselezioni. Il pannello tiene il conto delle facce.
3. Fai clic su {{ui:deleteFace.apply}} o premi [[Delete]]. [[Esc]] chiude lo strumento senza modificare nulla.

Le facce intorno a quelle eliminate si estendono fino a chiudere il vuoto. Una scatola con spigoli superiori arrotondati torna ad avere spigoli netti, un foro viene riempito e un risalto scompare. Il corpo resta esatto, quindi puoi applicare di nuovo raccordi e smussi e l’esportazione STEP conserva le facce reali. [[Ctrl]]+[[Z]] annulla l’eliminazione in un solo passaggio. L’operazione compare anche sotto {{ui:edge.featureHistory}}, insieme a raccordi e smussi; {{ui:edge.revertAction}} la annulla. Non è disponibile {{ui:edge.editAction}}. Su un gruppo, come per i trattamenti degli spigoli, il risultato è un corpo unico.

Seleziona tutte, e soltanto, le facce da rimuovere. Se le facce circostanti non riescono a chiudere il vuoto, layerling te lo segnala e non modifica nulla: per esempio, una faccia laterale principale di una scatola non ha facce vicine che possano sostituirla. Eliminando solo il fondo di una tasca, questa diventa un foro passante, perché le pareti della tasca proseguono fino al lato opposto.

{{ui:editor.tool.deleteFace}} richiede facce esatte: funziona sui pezzi importati come STEP e sulle forme di layerling. Non è disponibile per ciò che layerling conserva come mesh: file STL, OBJ o 3MF importati, corpi divisi, avvolti o semplificati, oppure forme molto dettagliate come una scritta lunga. Se possibile, importa il pezzo in formato STEP. Su un pezzo importato molto dettagliato, anche poche facce potrebbero essere troppe per il kernel CAD: dopo 45 secondi l’operazione viene interrotta senza modifiche. Se ridimensioni un corpo dopo un trattamento degli spigoli mantenendone invariata la dimensione, le facce non sono più esatte alla nuova scala finché non annulli il ridimensionamento.