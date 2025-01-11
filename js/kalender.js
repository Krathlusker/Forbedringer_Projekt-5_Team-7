let visning = document.querySelector(".event-cal__month");
let forrige = document.getElementById("event-cal-left");
let naeste = document.getElementById("event-cal-right");
let dage = document.querySelector(".event-cal__days");
let valgt = document.querySelector(".event-cal__day--selected-day");

let dato = new Date();
let aar = dato.getFullYear();
let maaned = dato.getMonth();

function visKalender() {
    const foersteDag = new Date(aar, maaned, 1);
    const sidsteDag = new Date(aar, maaned + 1, 0);
    const foersteDagIndex = (foersteDag.getDay() + 6) % 7;                  // Starter ugen på mandag - Benytter modulo som er matematisk operation, der giver resten af divisionen af to tal (i dette tilfælde 7) dvs. dagens nummer (søndag = 0, mandag = 1 osv.) + 6. eksempelvis hvis det er tirsdag (2) så vil det være 2+6 = 8 % 7 = 1 (der vi være en værdi af 1 tilovers, fordi modulo undersøger hvor mange gange 7 går op i 8, og det er 1 gang med 1 tilovers)
    const antalAfDage = sidsteDag.getDate();

    let formateretDato = dato.toLocaleString("da-DK", {
        month: "long",                                                      // "long" giver månedsnavn, "short" giver forkortet månedsnavn
        year: "numeric",                                                    // "numeric" giver årstal som tal, "2-digit" giver årstal som to-cifret tal
    });
    visning.innerHTML = `${formateretDato}`;                                // Vis måned og år

    dage.innerHTML = ""; // Ryd dage

    // Tilføj tomme felter før første dag
    for (let i = 1; i <= foersteDagIndex; i++) {                            // Loop fra 1 til foersteDagIndex. En iteration for hver tomme felt svarende til antal dage før første dag i måneden <-- Se modulo forklaring ovenfor
        let div = document.createElement("div");                            // Opret div-element ved hjælp af DOM-metoden createElement
        div.classList.add("event-cal__day--not-current-month");             // Tilføj CSS-klasse til div-element
        dage.appendChild(div);                                              // Tilføj div-element til dage (parent-element) i DOM ved hjælp af appendChild-metoden som tilføjer et element som det sidste barn af et andet element
    }

    // Tilføj dagene i måneden
    for (let j = 1; j <= antalAfDage; j++) {                                // Loop fra 1 til antalAfDage. En iteration for hver dag i måneden som sker efter tilføjelsen af tomme felter inden første dag i nuværende måned
        let div = document.createElement("div");                            // Opret div-element
        let dagsDato = new Date(aar, maaned, j);                            // Opret datoobjekt for nuværende dag for at kunne sammenligne med dagsdato senere

        // Brug lokal datoformat (ISO-standard i lokal tidszone) for korrekt sammenligning
        const lokalDato = dagsDato.toLocaleDateString("da-DK");             // "dd-mm-yyyy" format

        div.dataset.dato = lokalDato;                                       // Brug "dd-mm-yyyy" format - lav et dataset til senere brug i eventlistener (se visValgt-funktion) som indeholder datoen som er tilknyttet div-elementet
        div.innerHTML = j;                                                  // Vis dagnummer i div-element (1-31) <-- Se loop ovenfor
        div.classList.add("event-cal__day");

        // Markér dags dato med CSS-klasse som giver en stroke rundt om dagen
        if (
            dagsDato.getFullYear() === new Date().getFullYear() &&          // Sammenlign årstalet for dagsdato og nuværende dato, && betyder "og"
            dagsDato.getMonth() === new Date().getMonth() &&
            dagsDato.getDate() === new Date().getDate()
        ) {
            div.classList.add("event-cal__day--today");
        }

        // Markér dage med events med CSS-klasse som giver div en orange farve
        if (events.some(event => event.date === lokalDato)) {               // Tjek om der er et event på den aktuelle dag ved at benytte array-metoden some, som returnerer true hvis mindst ét element i arrayet opfylder betingelsen. "some" metodens argument er en callback-funktion, som tager et element som argument og returnerer true eller false. I dette tilfælde tjekker vi om eventets dato matcher lokalDato
            div.classList.add("event-cal__day--has-event");                 // Tilføj CSS-klasse til div-element hvis der er et event på den aktuelle dag
        }

        div.addEventListener("click", () => {
            const event = events.find(event => event.date === lokalDato);   // Find eventet for den aktuelle dag
            // console.log(`Clicked on: ${lokalDato}`, event);              // Debug log
            if (event) {                                                    // Hvis variablen event er sand <-- se event, som peger på events-arrayet ovenfor (events.some()
                openOverlay(event);                                         // Åbn overlay med eventet
            }
        }); 
        dage.appendChild(div);
    }

    // Tilføj tomme felter efter sidste dag
    const sidsteDagIndex = (sidsteDag.getDay() + 6) % 7;                    // Samme princip som for foersteDagIndex, dvs. antal tomme felter efter sidste dag i måneden for at fuldføre ugen til søndag
    const tommeFelterEfter = 6 - sidsteDagIndex;                            // Antal tomme felter for at fuldføre ugen. Måden det gøres på er at tage 6 og trække sidsteDagIndex fra, for at finde ud af hvor mange tomme felter der er tilbage i ugen før første søndag i næste måned

    for (let k = 1; k <= tommeFelterEfter; k++) {                           // Loop fra 1 til tommeFelterEfter. En iteration for hver tomme felt svarende til antal dage efter sidste dag i måneden
        let div = document.createElement("div");
        div.classList.add("event-cal__day--not-current-month");
        dage.appendChild(div);
    }
}


function visValgt() {
    const dagElementer = document.querySelectorAll(".event-cal__day");
    dagElementer.forEach(dag => {
        dag.replaceWith(dag.cloneNode(true));                               // Fjern eventlisteners fra dage for at undgå duplikering ved klik på forrige/naeste måned pilene - uden denne linje vil eventlisteners blive tilføjet flere gange ved klik på forrige/naeste måned (performance issue)
    });
    const opdateredeDage = document.querySelectorAll(".event-cal__day");
    opdateredeDage.forEach(dag => {
        dag.addEventListener("click", (e) => {                              // (e) er et event-objekt, som indeholder information om det event, der er blevet udløst - dvs. den data der er tilknyttet eventet der er blevet trykket på, i dette tilfælde datoen for den valgte dag (dataset.dato), som bruges til at finde eventet i events-arrayet i events.js
            const valgtDag = e.target.dataset.dato;                         // Hent datoen for den valgte dag fra dataset (se visKalender-funktion) - e.target refererer til det element, der udløste eventet
        });
    });
}


// Navigationsknapper
forrige.addEventListener("click", () => {
    if (maaned === 0) {
        maaned = 11;
        aar--;
    } else {
        maaned--;
    }
    dato.setFullYear(aar, maaned);
    visKalender();
});

naeste.addEventListener("click", () => {
    if (maaned === 11) {
        maaned = 0;
        aar++;
    } else {
        maaned++;
    }
    dato.setFullYear(aar, maaned);
    visKalender();
});

// Initialisering
visKalender();