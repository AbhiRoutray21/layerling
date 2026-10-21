---
title: Installazione come app, uso offline e hosting autonomo
summary: Avviare layerling come un normale programma, anche senza connessione, e farlo funzionare sul proprio computer.
---

## Installazione come app

Puoi installare layerling come un normale programma. Avrà così una propria icona e una finestra dedicata, senza barra degli indirizzi. Dopo la prima visita si avvierà anche **senza connessione Internet**. I tuoi progetti restano sul computer. Installarlo è utile: l’app si avvia più rapidamente perché non deve essere caricata ogni volta, funziona senza Internet e riduce il carico sul server. Non perdi nulla: layerling ti avvisa comunque quando è disponibile una nuova versione.

Nella pagina iniziale compare un suggerimento con {{ui:installHint.install}} se il browser supporta l’installazione. Altrimenti:

- **Chrome ed Edge:** fai clic sull’icona di installazione a destra della barra degli indirizzi oppure scegli «Installa come app» dal menu del browser.
- **Safari su Mac:** apri il menu «File» e scegli «Aggiungi al Dock».
- **Safari su iPhone e iPad:** tocca l’icona di condivisione, poi «Aggiungi alla schermata Home».
- **Firefox:** non permette di installare app. layerling può comunque funzionare offline in una scheda.

Puoi chiudere il suggerimento nella pagina iniziale con {{ui:installHint.dismiss}}. Se avvii di nuovo l’app installata con Chrome o Edge, la finestra già aperta torna in primo piano invece di aprirne un’altra.

## Aggiornamenti

Quando è disponibile una versione più recente, layerling te lo segnala nella pagina iniziale. Con {{ui:dashboard.updateBannerLink}} puoi leggere le novità. Il numero di versione si trova in basso a destra. Ricarica la pagina per passare alla nuova versione.

Su layerling.com e sugli altri server web, una pagina aperta rileva automaticamente gli aggiornamenti. Di tanto in tanto controlla la versione sul server quando torni alla scheda, oppure subito se un file del programma di cui ha bisogno non è più disponibile. Se nel frattempo è stato installato un aggiornamento, in basso a destra appare una scheda che lo segnala e ne elenca le novità. Con {{ui:newVersion.reload}} il progetto aperto viene prima salvato nel browser e poi la pagina viene ricaricata; al termine ritrovi il progetto com’era. {{ui:newVersion.later}} nasconde la scheda per 15 minuti. Ricarica appena possibile: una pagina che resta sulla vecchia versione potrebbe caricare parti della nuova versione incompatibili. La stessa scheda compare anche se è già successo: i processi CAD, caricati solo al primo utilizzo, indicano la versione a cui appartengono. Se questa non corrisponde a quella della pagina — dopo un aggiornamento o quando usi una copia salvata di una versione precedente — la scheda chiede di ricaricare la pagina prima che le due versioni entrino in conflitto.

Se layerling è aperto in più schede, queste si controllano a vicenda: quando un’altra scheda esegue una versione più recente, in fondo alla scheda vecchia appare un avviso che ti invita a ricaricarla. Se lo stesso progetto è aperto in due schede, entrambe ti avvisano perché il salvataggio automatico potrebbe sovrascrivere le modifiche dell’altra. Se apri layerling in un’altra scheda mentre è già in esecuzione, la nuova scheda propone di continuare in quella già aperta e offre la possibilità di chiudersi. Se vuoi usare intenzionalmente due schede, per esempio per affiancare due progetti, fai clic su {{ui:tabs.keepHere}} nella nuova scheda. Anche questa guida si apre in una scheda separata: se layerling è aperto accanto, il pulsante in alto a destra mostra «Torna all’editor» e chiude la guida invece di aprire un secondo editor.

## Lingua e aspetto

Scegli la lingua dall’elenco in alto a destra. Il selettore accanto permette di scegliere {{ui:theme.short.system}} (segue il sistema operativo), {{ui:theme.short.light}}, {{ui:theme.short.dark}} e {{ui:theme.short.graphite}}, un grigio scuro neutro.

## Esecuzione autonoma

layerling è software libero (AGPL-3.0) e può essere eseguito sul tuo computer o su un server, per esempio in un laboratorio, un’associazione o una scuola. Ci sono diversi modi per farlo, descritti nel [README su GitHub](https://github.com/henmedia/layerling/blob/main/README.md#getting-started):

- **Avvio rapido su Windows:** una sola riga in PowerShell installa tutto e crea un collegamento sul desktop. Se layerling è già in esecuzione, un altro doppio clic non avvia un secondo server: apre soltanto la pagina.
- **Docker:** per dispositivi NAS e server domestici, senza dover installare Node.js. Ogni versione è disponibile come immagine pronta all’uso `henmedia/layerling` su Docker Hub (anche `ghcr.io/henmedia/layerling`) per amd64 e arm64. Il comando `docker run -d -p 3000:3000 henmedia/layerling:latest` la avvia; su un NAS puoi cercarla nel registro del gestore dei container.
- **Esportazione statica:** il risultato è composto da file normali che qualsiasi server web può distribuire. Devono trovarsi nella radice di un indirizzo (`https://layerling.example.com/` o `http://192.168.0.5:8080/`), non in una sottocartella e non vanno aperti direttamente dal disco; nel README trovi i passaggi. Se accanto a `index.html` c’è una cartella `store` scrivibile e il server supporta PHP, questa può essere usata anche come spazio condiviso per i progetti.

Il collegamento MCP per gli assistenti IA è disponibile solo nel server di sviluppo; vedi [Progettare con un’IA](chapter:ai-with-mcp).

## Aiuto e feedback

- Nell’editor, la sezione {{ui:editor.group.help}} contiene la {{ui:editor.guide}}, con le operazioni principali, e la panoramica delle [scorciatoie da tastiera](chapter:shortcuts). Ogni sezione della guida rapida ha un punto interrogativo che rimanda al capitolo corrispondente.

![La guida rapida nell’editor. In alto sono elencati video realizzati da altre persone e ogni sezione ha un punto interrogativo.](shot:quick-guide)

- Domande, suggerimenti e segnalazioni di bug sono benvenuti nel [forum](https://forum.drucktipps3d.de/forum/board/127-layerling/) e su [GitHub](https://github.com/henmedia/layerling/discussions).
- Le novità di ogni versione sono riportate nelle note di rilascio, disponibili in fondo alla pagina iniziale e all’editor.