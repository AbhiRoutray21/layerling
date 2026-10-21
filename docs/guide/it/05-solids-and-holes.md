---
title: Solidi e fori
summary: Come trasformare forme semplici in fori passanti, asole e tasche e come modificare in seguito un gruppo.
---

Questa è l’idea più importante di layerling, ed è facile da imparare: **ogni forma è un solido o un foro.** Il solido resta; il foro è uno strumento che asporta materiale.

## Solido o foro

Seleziona una forma e fai clic su {{ui:inspector.solid}} o {{ui:inspector.hole}} nelle impostazioni. Con la tastiera è più rapido: [[H]] trasforma la selezione in un foro, [[S]] la rende di nuovo un solido. Entrambi i comandi si trovano anche nel menu che si apre facendo clic con il tasto destro sul corpo. I fori sono mostrati in trasparenza, così puoi vedere dove si trovano. [[T]] rende trasparente un corpo, per esempio per guardare all’interno di un involucro; premendolo di nuovo, il corpo torna opaco. Il comando si applica all’intera selezione: se almeno un corpo è già trasparente, tutti tornano opachi; altrimenti diventano tutti trasparenti.

Finché le forme non sono raggruppate, il foro non produce effetti. Resta semplicemente al suo posto e indica dove verrà asportato il materiale in seguito.

![Il cilindro è un foro e sporge dalla parte superiore del cubo, così lo attraversa da parte a parte.](shot:hole-before)

## Raggruppare

Seleziona uno o più solidi e fori, poi fai clic su {{ui:editor.tool.group}} ([[Ctrl]]+[[G]]). A questo punto i fori asportano materiale dai solidi che toccano. Il risultato è una nuova forma unica.

![Il risultato: un cubo con un foro passante.](shot:hole-after)

In questo modo puoi creare:

- **Fori passanti:** un cilindro impostato come foro che attraversa un corpo.
- **Asole:** una scatola allungata impostata come foro sul bordo.
- **Tasche:** un foro che non attraversa tutto il corpo.
- **Filettature in un pezzo:** un foro filettato impostato come foro; vedi [Filettature e meccanismi](chapter:threads-and-mechanics).

Se nel gruppo ci sono più solidi, vengono uniti. Due solidi che si toccano diventano un unico pezzo.

Puoi trattare un gruppo come una forma: spostarlo, ruotarlo, colorarlo o raggrupparlo di nuovo. {{ui:editor.tool.ungroup}} ([[Ctrl]]+[[Shift]]+[[G]]) lo scioglie e ripristina le singole parti.

### Trasformare un gruppo in un foro

Anche un intero gruppo può essere un solido o un foro. Si applica una regola semplice:

- Se il gruppo contiene solo solidi (oppure solo fori), puoi trasformarlo interamente e le sue parti lo seguono.
- Se contiene entrambi, per esempio un cubo con un foro passante, ogni parte mantiene il proprio stato. L’intero gruppo diventa uno strumento, ma il foro resta un foro.

## Raggruppare senza unire

A volte vuoi tenere insieme delle parti senza fonderle, per esempio un logo bianco su una piastra nera per una stampa multicolore. A questo serve {{ui:editor.tool.bundle}} ([[Ctrl]]+[[B]]), come in Tinkercad. Un raggruppamento senza fusione si sposta, ruota e ridimensiona come una forma, ma le parti non vengono unite:

- Ogni parte mantiene il proprio colore e resta un solido o un foro.
- I fori non asportano materiale.
- Nell’esportazione STL, 3MF o OBJ, ogni parte resta un corpo separato; nei file 3MF e OBJ conserva anche il proprio colore.

{{ui:editor.tool.ungroup}} ([[Ctrl]]+[[Shift]]+[[G]]) scioglie il raggruppamento; [[E]] lo apre per modificarlo, come un gruppo. Smussi, raccordi e svuotamento non funzionano su un raggruppamento senza fusione, perché non è un corpo unico: per applicarli, uniscilo oppure lavora sulle singole parti. Se vuoi che un foro nel raggruppamento asporti materiale, raggruppalo con il corpo usando Ctrl+G.

## Intersezione

{{ui:editor.tool.intersect}} mantiene solo la parte comune a due o più corpi. Sovrapponi due forme, selezionale entrambe e fai clic sul comando. Per esempio, puoi trasformare un cilindro e una scatola in un pezzo con un lato curvo e uno diritto. Un gruppo viene considerato per la sua forma visibile, fori compresi. Se selezioni anche un foro, il risultato è la parte condivisa da tutti i solidi e da tutti i fori. Se le forme non hanno parti in comune, non cambia nulla e compare un messaggio. Accanto al comando, {{ui:editor.tool.intersectPreview}} mostra la parte comune prima di applicare l’operazione: le forme selezionate diventano trasparenti e la parte condivisa appare in verde. Seleziona e sposta separatamente le forme: la parte verde le segue. {{ui:editor.tool.intersect}} applica l’intersezione; [[Esc]] chiude l’anteprima.

## Modificare un gruppo

Se un foro passante è troppo piccolo, non devi sciogliere il gruppo e ricominciare da capo. Seleziona il gruppo e fai clic su {{ui:group.edit}} nelle sue impostazioni, sull’icona della cartella nell’elenco degli oggetti oppure premi [[E]]. Anche un doppio clic sul gruppo lo apre, come in Tinkercad; vale anche per un raggruppamento senza fusione. Se preferisci disattivare questa funzione, vai nelle impostazioni e spegni {{ui:workspace.doubleClickOpensGroup}}. Una parte inizia a spostarsi solo dopo che hai trascinato il puntatore di alcuni pixel, così un clic incerto o un doppio clic non la sposta per errore. Le parti ora sono separate e puoi modificarle con qualsiasi strumento: allargare un foro, spostare un corpo o aggiungere un foro.

![Il gruppo in modifica: la barra in basso contiene Annulla e Fine; l’elenco degli oggetti mostra le parti.](shot:open-group)

In fondo alla vista compare una barra. {{ui:group.done}} ricrea il gruppo mantenendone il nome, il colore e lo stato di solido o foro. {{ui:common.cancel}} lo ripristina senza modifiche.

Se una delle parti è a sua volta un gruppo, puoi modificarlo allo stesso modo, continuando a qualsiasi livello di profondità del progetto. La barra mostra dove ti trovi, per esempio «Staffa › Supporto per vite». {{ui:group.done}} e {{ui:common.cancel}} terminano sempre la modifica del gruppo più interno e risalgono di un livello. All’interno di un gruppo puoi modificare solo gli eventuali gruppi che ne fanno parte; per modificarne un altro, termina prima la modifica corrente.

A differenza di {{ui:editor.tool.ungroup}}, che scioglie definitivamente il gruppo, la modifica lo mantiene: nome e impostazioni restano e puoi sempre annullare con {{ui:common.cancel}}.

Attenzione: quando ricrei il gruppo, i raccordi e gli smussi applicati all’**intero** gruppo vengono persi. La barra te lo segnala.

## Dividere

{{ui:editor.tool.split}} nell’area {{ui:editor.group.modify}} divide la selezione in due con un piano. Può servire, per esempio, per un pezzo troppo grande per il piano di stampa o per vedere l’interno di un modello. Seleziona uno o più solidi o fori e fai clic sul comando. Un piano traslucido mostra esattamente dove avverrà il taglio; finché non lo applichi, non cambia nulla.

- {{ui:split.orientation}}: **X** crea un taglio verticale tra sinistra e destra; **Y** tra davanti e dietro; **Z** un taglio orizzontale tra sopra e sotto. Gli assi hanno gli stessi nomi della scheda Posizione, con Z verso l’alto; inizialmente il piano si trova sull’asse Z.
- {{ui:split.position}}: indica il punto in cui passa il piano; puoi usare il cursore o inserire un valore. Inizialmente si trova al centro. Puoi anche trascinare la punta della freccia sul piano per spostarlo lungo la freccia a incrementi di 0,1 mm.
- {{ui:split.pickFace}}, il pulsante accanto alla posizione, dispone il piano su una faccia: fai clic sul pulsante e poi sulla faccia. Orientamento, entrambe le rotazioni e posizione vengono impostati per adattarsi alla faccia. Durante la selezione, un piano blu sotto il puntatore mostra quale faccia verrà usata. Puoi scegliere anche una faccia di un corpo non selezionato, per allineare il taglio; il piano resta comunque all’interno della selezione. [[Esc]] interrompe la selezione e lascia il piano dov’era.
- I due cursori di rotazione sotto il piano lo ruotano intorno agli altri due assi, fino a 180° in entrambe le direzioni, per un taglio inclinato. Puoi usarli insieme.

{{ui:split.apply}} oppure [[Enter]] esegue il taglio; [[Esc]] lo annulla (se stai selezionando una faccia, la prima pressione di [[Esc]] interrompe solo quella selezione). Ogni oggetto attraversato dal piano diventa due corpi chiusi, con un nome che indica il lato, per esempio «Scatola (Z+)» e «Scatola (Z-)»; gli oggetti non toccati restano invariati. Un foro diventa due fori e un corpo svuotato conserva la propria cavità. Le due metà restano nella posizione originale: per stamparle, appoggiale sulla faccia tagliata con {{ui:editor.tool.layFlat}}.

Le metà sono mesh semplici: impostazioni come il numero di lati di un cilindro o il testo di una scritta vengono perse, quindi configurale prima di dividere. [[Ctrl]]+[[Z]] ripristina l’originale con un solo passaggio. Gli oggetti bloccati o nascosti non possono essere divisi.

## Separare le parti

Se una forma è composta da più elementi separati, come un testo fatto di singole lettere, {{ui:inspector.separateParts}} li divide in forme indipendenti. Il comando si trova anche nel menu che si apre facendo clic con il tasto destro sulla forma.

> **Suggerimento:** crea sempre i fori leggermente più lunghi della parte che devono attraversare. Se il foro finisce esattamente a filo della faccia, a volte resta uno strato sottilissimo di materiale. Un millimetro in più garantisce che il foro la attraversi del tutto.