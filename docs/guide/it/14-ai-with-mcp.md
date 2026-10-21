---
title: Progettare con un’IA (MCP)
summary: Come un assistente IA come Gemini, Claude o Codex crea e modifica forme, le raggruppa e acquisisce immagini della vista nell’editor aperto.
---

layerling include un server MCP. MCP è uno standard che permette a un assistente IA di usare strumenti in altri programmi. Grazie a questo server, un client IA come Gemini, Claude o Codex può vedere una scheda dell’editor aperta e lavorarci: crea forme, ne modifica le dimensioni, le raggruppa, le taglia, arrotonda gli spigoli, legge la scena e acquisisce immagini della vista. Descrivi il pezzo, l’IA lo costruisce e tu puoi osservarla e intervenire in qualsiasi momento.

Il collegamento tra il client IA e l’editor funziona **localmente sul tuo computer**. Tieni però presente che ciò che l’IA legge, cioè la scena e le immagini della vista, viene inviato al fornitore del client IA, come qualsiasi altro dato inserito al suo interno.

> **Importante:** il collegamento MCP è disponibile nel server di sviluppo che avvii sul tuo computer. È disattivato su layerling.com e nelle installazioni con hosting statico. Una copia ospitata da te, per esempio l’immagine Docker su un NAS, può attivarlo con un token di accesso; vedi «Una copia su un NAS o un server» più avanti.

## Configurazione

1. Scarica layerling da [GitHub](https://github.com/henmedia/layerling) e avvialo nella cartella del progetto con `npm run dev`. Devi avere Node.js installato. Su Windows, la procedura rapida indicata nel README si occupa di installarlo.
2. Apri una scheda dell’editor, per esempio `http://127.0.0.1:3000/?editor=1`. Puoi lasciare che se ne occupi l’IA: se non è aperto nessun editor, il primo strumento che ne ha bisogno avvia il browser con un editor e attende la connessione. Funziona con layerling sul tuo computer; per una copia su NAS o server devi aprire tu l’editor. Imposta `LAYERLING_MCP_OPEN_EDITOR=0` per disattivare questa funzione nel server MCP.
3. Collega il client IA al server MCP. Il client lo avvia automaticamente con `node scripts/layerling-mcp-server.mjs`.

### Claude Code

Non devi installare nulla: il progetto include un file `.mcp.json` che registra il server e la skill in `.claude/skills/layerling-mcp-skill`. Apri la cartella di layerling in Claude Code e chiedi, per esempio: «Usa gli strumenti MCP di layerling per elencare gli editor aperti e analizzare la scena».

### Claude Desktop

Claude Desktop non legge i file del progetto. Aggiungi il server alla sua configurazione. Come modello, usa `docs/mcp/claude-desktop-config.example.json` nel progetto e sostituisci il percorso dello script con il percorso assoluto sul tuo computer. Poi riavvia Claude Desktop.

### Codex

Copia la skill da `docs/skills/layerling-mcp-skill` nella cartella delle skill di Codex, aggiungi il server alla configurazione di Codex usando `docs/mcp/codex-config.example.toml` e riavvia il client.

### Gemini e Antigravity

Antigravity rileva automaticamente la skill dell’area di lavoro in `.agents/skills/layerling-mcp-skill`. Per Gemini CLI, copia la skill da `docs/skills/layerling-mcp-skill` nella cartella globale delle skill (`~/.gemini/skills/`), aggiungi il server alle impostazioni usando `docs/mcp/gemini-config.example.json` e riavvia il client.

Le istruzioni dettagliate per ciascun client si trovano nel [README su GitHub](https://github.com/henmedia/layerling/blob/main/README.md#layerling-mcp-skill).

## Una copia su un NAS o un server

Una copia ospitata da te può consentire a un client IA di controllare in rete gli editor aperti. La funzione è disattivata per impostazione predefinita, perché chiunque possa controllare il collegamento può leggere e modificare i progetti aperti. Sul server, imposta `LAYERLING_MCP_REMOTE` su `true` e `LAYERLING_MCP_TOKEN` su un segreto di almeno 16 caratteri (per l’immagine Docker, usa `environment:` nel file compose; non serve ricompilare). Apri una scheda dell’editor di quella copia e lasciala aperta; poi comunica al client MCP l’indirizzo e lo stesso token: `LAYERLING_URL=http://nas:3000` e `LAYERLING_MCP_TOKEN=<il token>`.

Solo un client con il token può elencare o controllare gli editor. Le pagine dell’editor non richiedono un token, ma funzionano solo con un indirizzo o un nome accessibile esclusivamente dalla tua rete (un indirizzo IP, un nome senza punto oppure che termina in `.local` o `.lan`); se usi un dominio reale dietro un proxy inverso, aggiungilo a `LAYERLING_MCP_ALLOWED_HOSTS`. Usalo su una rete di cui ti fidi e proteggi con HTTPS il traffico che esce da essa. Nel README trovi tutti i dettagli.

## Cosa può fare l’IA

L’IA usa le stesse funzioni che usi tu, attraverso lo stesso percorso nell’editor. Le nuove funzioni di layerling diventano subito disponibili anche come azioni MCP. Ecco gli strumenti:

| Strumento | Funzione |
| --- | --- |
| `layerling_list_editors` | Elenca le schede degli editor aperti |
| `layerling_open_editor` | Apre una nuova scheda dell’editor nel browser predefinito e attende la connessione (solo sul tuo computer) |
| `layerling_read_scene` | Legge la scena, la selezione, le unità e le dimensioni esatte di tutti gli oggetti |
| `layerling_list_objects` | Elenca tutti gli oggetti con dimensioni, posizione, rotazione e ID |
| `layerling_select_objects` | Seleziona gli oggetti |
| `layerling_delete_objects` | Elimina gli oggetti |
| `layerling_create_shape` | Crea una forma: parallelepipedo, cilindro, testo (anche curvo), filetto, ingranaggio, corpo da schizzo e altro |
| `layerling_import_file` | Importa un file come nella finestra di importazione; un OBJ o 3MF a colori diventa un corpo per colore, mentre un 3MF con più oggetti diventa un corpo per oggetto |
| `layerling_add_font` | Aggiunge un font personalizzato da un file TrueType, OpenType o WOFF; resta nel browser e il progetto conserva solo le lettere utilizzate |
| `layerling_list_fonts` | Elenca i font integrati e quelli personalizzati, con ID e nome |
| `layerling_import_mesh` | Importa nel progetto una mesh triangolare |
| `layerling_update_object` | Modifica dimensioni, posizione, colore, nome, natura di solido o foro e ogni altro aspetto della forma, compreso il bordo delle lettere di un testo |
| `layerling_align_objects` | Allinea gli oggetti tra loro |
| `layerling_scale_objects` | Ridimensiona gli oggetti in percentuale, insieme o ciascuno attorno al proprio centro |
| `layerling_lay_flat` | Appoggia un oggetto sulla piastra usando una delle sue facce |
| `layerling_place_on_face` | Appoggia gli oggetti su una faccia di un altro, anche inclinata, come con il tasto C |
| `layerling_perforate_face` | Pratica una trama di fori in una faccia piana; i fori restano tali e sono raggruppati con il corpo |
| `layerling_sweep_sketch` | Trascina una sezione rettangolare o circolare lungo un percorso di punti creando un unico corpo preciso; un percorso chiuso forma un anello |
| `layerling_push_face` | Estrude una faccia piana o scava una tasca, con un rientro dal bordo e un raggio agli angoli; la nuova parte è un corpo da schizzo raggruppato con il corpo originale |
| `layerling_mate_faces` | Accosta una faccia di un oggetto a quella di un altro, faccia contro faccia o a filo |
| `layerling_open_group` | Apre un gruppo per modificare le parti una alla volta, compresi i gruppi contenuti al suo interno |
| `layerling_close_group` | Chiude il gruppo («Fatto») oppure annulla l’operazione |
| `layerling_group_objects` | Raggruppa gli oggetti |
| `layerling_ungroup_objects` | Scioglie i gruppi |
| `layerling_boolean_cut` | Taglia i solidi usando i fori |
| `layerling_intersect_objects` | Conserva solo la parte comune agli oggetti (Intersezione) |
| `layerling_separate_parts` | Separa le parti disconnesse di una forma |
| `layerling_split_objects` | Divide solidi o fori in due con un piano |
| `layerling_list_edges` | Elenca gli spigoli CAD reali di un oggetto |
| `layerling_apply_edge_treatment` | Smussa o raccorda gli spigoli selezionati |
| `layerling_hollow_object` | Svuota un corpo mantenendo uno spessore uniforme delle pareti |
| `layerling_list_faces` | Elenca le facce di un corpo preciso |
| `layerling_delete_faces` | Elimina le facce e chiude l’apertura |
| `layerling_array_objects` | Moltiplica gli oggetti in fila o in cerchio |
| `layerling_bundle_objects` | Raggruppa gli oggetti come con Ctrl+B: si spostano insieme, mantengono colore e tipo e vengono esportati separatamente |
| `layerling_layer_text` | Trasforma un testo in una pila di livelli per la stampa a più colori (lettere, bordi più larghi, piastra senza fori) oppure ricostruisce la pila, con foro per l’anello portachiavi, angoli per livello e bordo delle lettere arrotondato o smussato; con un elenco di nomi crea un’etichetta per ciascun nome |
| `layerling_layer_icon` | Trasforma un’icona SVG (il testo del file o un corpo da schizzo estruso) in un’etichetta a livelli per la stampa a più colori — icona, bordi più larghi, piastra senza fori — oppure la ricostruisce con una nuova larghezza o un diverso numero di livelli; indicando una quantità, riempie la piastra di copie |
| `layerling_measure_section` | Misura su un piano di sezione tra due punti agganciati al contorno: spessore delle pareti, distanze e accoppiamenti |
| `layerling_show_overhangs` | Attiva o disattiva il tratteggio degli sbalzi, imposta l’angolo e indica per ogni corpo l’area che richiederebbe supporti |
| `layerling_estimate_print` | Stima volume, peso e filamento per la selezione o per l’intero progetto: per un corpo pieno e, in modo approssimativo, con pareti e riempimento come nella finestra di esportazione |
| `layerling_add_reference_points` | Aggiunge punti di riferimento — al centro, agli angoli, a metà degli spigoli o in posizioni precise — a cui si agganciano le forme |
| `layerling_list_reference_points` | Elenca i punti di riferimento con i rispettivi ID e posizioni |
| `layerling_remove_reference_points` | Elimina i punti di riferimento tramite ID oppure li elimina tutti |
| `layerling_inspect_errors` | Mostra l’ultimo messaggio e l’ultimo errore, oltre ai messaggi e agli errori della sessione |
| `layerling_wrap_around_cylinder` | Avvolge attorno a un cilindro un corpo piatto, per esempio un SVG o un testo, verso l’esterno oppure verso l’interno come incisione |
| `layerling_simplify_mesh` | Riduce il numero di triangoli di una mesh importata, indicando una percentuale o un numero di triangoli |
| `layerling_save_custom_shape` | Salva i corpi come forme personalizzate, sul server o nel browser, per inserirli in altri progetti |
| `layerling_list_custom_shapes` | Elenca le forme personalizzate salvate sul server e nel browser |
| `layerling_insert_custom_shape` | Inserisce una forma personalizzata nel progetto aperto, eventualmente alle coordinate x/z indicate |
| `layerling_delete_custom_shape` | Rimuove una forma personalizzata; i corpi già inseriti restano nel progetto |
| `layerling_show_workplane` | Nasconde o mostra la piastra e la griglia, per esempio per fotografare il lato inferiore (modifica solo la vista) |
| `layerling_set_section_view` | Apre una sezione della vista lungo un piano per guardare all’interno (non taglia né modifica gli oggetti) |
| `layerling_clear_history` | Elimina definitivamente tutti i passaggi di annullamento, come il pulsante «Elimina cronologia» della vista Cronologia; richiede `confirm: true` |
| `layerling_set_history_view` | Mostra uno stato precedente del progetto, come la vista Cronologia (il progetto effettivo resta intatto; gli strumenti di modifica attendono che la vista venga chiusa) |
| `layerling_restore_from_history` | Copia nel progetto oggetti provenienti da uno stato precedente, anche parti all’interno dei gruppi, come il comando «Inserisci nel progetto» della vista Cronologia; l’operazione si annulla con un solo passaggio |
| `layerling_export_section_svg` | Restituisce come SVG in scala 1:1 i contorni sul piano di sezione, dagli stessi corpi usati per l’esportazione |
| `layerling_export_drawing` | Crea il disegno tecnico dell’esportazione «2D»: tre viste in scala 1:1 su un foglio ISO, con dimensioni complessive e una tabella dei fori circolari, come testo SVG o PDF |
| `layerling_export_mesh` | Crea il file della finestra di esportazione in formato STL, 3MF o OBJ, usando gli stessi corpi; può salvarlo in un percorso di questo computer o restituirlo in base64 |
| `layerling_save_project` | Salva l’intero progetto modificabile come file `.lyl` in un percorso del computer su cui gira il server MCP, senza aprire una finestra; un file esistente viene sostituito solo con `overwrite`, il salvataggio passa da un file temporaneo e la destinazione di Ctrl+S nell’editor resta invariata |
| `layerling_set_workplane` | Posiziona il piano di lavoro su un lato di un corpo o di nuovo sulla piastra di base, e lo nasconde o lo mostra |
| `layerling_capture_image` | Acquisisce un’immagine della vista: frontale, dall’alto, laterale, diagonale da un angolo e altre |

Così l’IA può verificare il proprio lavoro: crea una forma, acquisisce un’immagine, la controlla e la migliora.

## Un esempio

Le dici: «Costruisci una scatola cilindrica larga 60 mm e alta 40 mm, con pareti da 2,5 mm, aperta in cima, e un coperchio piatto con la scritta “Tea” disposta ad arco». L’IA crea i cilindri, svuota quello interno, dispone il testo curvo sul coperchio e alla fine acquisisce alcune immagini per controllare che tutto combaci.

> **Suggerimento:** indica misure precise e spiega a cosa serve il pezzo («supporto per un’asta da 12 mm, compatibile con Bambu Lab A1»). In questo modo l’IA farà scelte più adatte. Osserva come lavora: puoi intervenire in qualsiasi momento, perché si tratta dello stesso editor.