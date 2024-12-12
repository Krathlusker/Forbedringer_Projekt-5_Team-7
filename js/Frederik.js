const events = [
    {
        title: "3D-print-kursus",
        date: "12.12.2024", // Brug "dd-mm-yyyy"
        description: "Hos os kan du lære at 3D-printe! Det bliver rigtig sjovt. På vores kursus lærer du alt lige fra 3D-moddellering til hvordan du får sat printeren igang. Kom ned og vær med!",
        image: "./img/machines/3d-printer.webp",
    },
    {
        title: "Lasercutter-kursus",
        date: "19.1.2025",
        description: "Drømmer du også om at lave dine egne avancerede prototyper? Med et kursus i vores lasercuttere, åbner du op for mange muligheder for at gøre dine idéer til virkelighed.",
        image: "./img/temp/277463923_2021874247973141_387521198919364496_n.webp",
    },
    {
        title: "Tekstiltryk-kursus",
        date: "8.1.2025",
        description: "Kom og lær hvordan du kan lave dine egne t-shirt prints! På vores tekstiltrykkursus bliver du rustet til at lave tryk på mange forskellige tekstiler. Det er også lidt fedt at have sine egne t-shirts, når man skal lave pitch med sine studiekammerater.",
        image: "./img/machines/tekstilprinter.webp",
    },
    {
        title: "Design Thinking Workshop",
        date: "20.2.2025",
        description: "Har du en idé, men mangler du processen til at gøre den til virkelighed? På vores Design Thinking workshop lærer du en metode, der sikrer, at du udvikler brugerfokuserede og innovative løsninger. Kom og prøv kræfter med processen i praksis!",
        image: "./img/temp/Wikimania_2024_-_GLAM_Global_Meetup_afternoon_03_-_Sustainable_Future_brainstorming.webp",
    },
    {
        title: "Illustrator for begyndere",
        date: "15.3.2025",
        description: "Vil du gerne lave dine egne flotte designs? På dette kursus lærer du de grundlæggende funktioner i Adobe Illustrator. Vi gennemgår værktøjer, teknikker og små tricks, så du kan skabe imponerende grafik til dine projekter.",
        image: "./img/temp/41689670925_b8810ebdff_c.webp",
    },
    {
        title: "Tinkercad Introduktion",
        date: "22.3.2025",
        description: "Kom og lær Tinkercad, et simpelt og kraftfuldt værktøj til 3D-design. Kurset er perfekt for begyndere og giver dig mulighed for hurtigt at skabe digitale modeller, som du kan printe på vores 3D-printere. Tag første skridt mod at bringe dine idéer til livs!",
        image: "./img/temp/large_display_Dice_1.webp",
    },
    {
        title: "Prusa XL Multitool Printer Workshop",
        date: "10.4.2025",
        description: "Oplev det nyeste inden for 3D-printteknologi med Prusa XL multitool printeren. Lær hvordan du kan kombinere forskellige materialer og teknikker i én enkelt printproces. En spændende mulighed for dem, der vil tage deres prototyper til næste niveau!",
        image: "./img/machines/Original_Prusa_XL_spool.webp",
    },
    {
        title: "Elektronik og kredsløb",
        date: "18.6.2025",
        description: "Vil du gerne lære at bygge dine egne elektroniske kredsløb? På dette kursus tager vi dig igennem grundprincipperne i elektronik, fra lodning til opsætning af simple kredsløb. Perfekt til prototyping og gadgets.",
        image: "./img/temp/Arduino-based_wow-and-flutter_meter_03.webp",
    }
];


let visning = document.querySelector(".event-cal__month");
let forrige = document.querySelector(".pagination-arrow--left");
let naeste = document.querySelector(".pagination-arrow--right");
let dage = document.querySelector(".event-cal__days");
let valgt = document.querySelector(".event-cal__day--selected-day");

let dato = new Date();
let aar = dato.getFullYear();
let maaned = dato.getMonth();

function visKalender() {
    const foersteDag = new Date(aar, maaned, 1);
    const sidsteDag = new Date(aar, maaned + 1, 0);
    const foersteDagIndex = (foersteDag.getDay() + 6) % 7; // Starter ugen på mandag
    const antalAfDage = sidsteDag.getDate();

    let formateretDato = dato.toLocaleString("da-DK", {
        month: "long",
        year: "numeric",
    });
    visning.innerHTML = `${formateretDato}`;

    dage.innerHTML = ""; // Ryd dage

    // Tilføj tomme felter før første dag
    for (let i = 1; i <= foersteDagIndex; i++) {
        let div = document.createElement("div");
        div.classList.add("event-cal__day--not-current-month");
        dage.appendChild(div);
    }

    // Tilføj dagene i måneden
    for (let j = 1; j <= antalAfDage; j++) {
        let div = document.createElement("div");
        let dagsDato = new Date(aar, maaned, j);

        // Brug lokal datoformat (ISO-standard i lokal tidszone) for korrekt sammenligning
        const lokalDato = dagsDato.toLocaleDateString("da-DK");

        div.dataset.dato = lokalDato; // Brug "dd-mm-yyyy" format
        div.innerHTML = j;
        div.classList.add("event-cal__day");

        // Markér dags dato
        if (
            dagsDato.getFullYear() === new Date().getFullYear() &&
            dagsDato.getMonth() === new Date().getMonth() &&
            dagsDato.getDate() === new Date().getDate()
        ) {
            div.classList.add("event-cal__day--today");
        }

        // Markér dage med events
        if (events.some(event => event.date === lokalDato)) {
            div.classList.add("event-cal__day--has-event");
        }

        div.addEventListener("click", () => {
            const event = events.find(event => event.date === lokalDato);
            console.log(`Clicked on: ${lokalDato}`, event); // Debug log
            if (event) {
                openOverlay(event); // Vis overlay
            }
        }); 

        dage.appendChild(div);
    }

    // Tilføj tomme felter efter sidste dag
    const sidsteDagIndex = (sidsteDag.getDay() + 6) % 7; // Dag i ugen for månedens sidste dag
    const tommeFelterEfter = 6 - sidsteDagIndex; // Antal tomme felter for at fuldføre ugen

    for (let k = 1; k <= tommeFelterEfter; k++) {
        let div = document.createElement("div");
        div.classList.add("event-cal__day--not-current-month");
        dage.appendChild(div);
    }
}


function visValgt() {
    const dagElementer = document.querySelectorAll(".event-cal__day");
    dagElementer.forEach((dag) => {
        dag.replaceWith(dag.cloneNode(true)); // Fjerner gamle hændelser
    });
    const opdateredeDage = document.querySelectorAll(".event-cal__day");
    opdateredeDage.forEach((dag) => {
        dag.addEventListener("click", (e) => {
            const valgtDag = e.target.dataset.dato;
            console.log(valgtDag)
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

function openOverlay(event) {
    const overlay = document.querySelector(".event-cal__overlay");
    const title = document.getElementById("event-title");
    const date = document.getElementById("event-date");
    const description = document.getElementById("event-description");
    const image = document.getElementById("event-image");

    // Opdater overlay-indhold
    title.innerText = event.title;
    date.innerText = `Dato: ${event.date}`;
    description.innerText = event.description;
    image.src = event.image;

    // Vis overlay
    overlay.classList.remove("event-cal__overlay-hidden");
}

// Funktion til at lukke overlay
document.getElementById("close-overlay").addEventListener("click", () => {
    document.querySelector(".event-cal__overlay").classList.add("event-cal__overlay-hidden");
});

// Initialisering
visKalender();