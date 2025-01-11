function openOverlay(event) {                                               // Funktion til at opbygge og vise overlay med event data som parameter
    const overlay = document.querySelector(".event-cal__overlay");
    const title = document.getElementById("event-title");
    const date = document.getElementById("event-date");
    const time = document.getElementById("event-time");
    const description = document.getElementById("event-description");
    const join = document.getElementById("event-join");
    const image = document.getElementById("event-image");

    // Opdater overlay-indhold
    title.innerText = event.title;
    date.innerText = `Dato: ${event.date}`;
    time.innerText = `kl: ${event.time}`;
    description.innerText = event.description;
    join.innerText = event.join;
    image.src = event.image;

    // Vis overlay med fade-in effekt
    overlay.classList.remove("event-cal__overlay-hidden");
    setTimeout(() => {
        overlay.classList.add("event-cal__overlay-visible");
    }, 10);                                                                 // Kort forsinkelse for at sikre at overlay er synlig før fade-in effekt altså --> (display: block) appendes til div (standard i user agent stylesheet)
}

// Funktion til at lukke overlay
document.getElementById("close-overlay").addEventListener("click", () => {
    const overlay = document.querySelector(".event-cal__overlay");
    overlay.classList.remove("event-cal__overlay-visible");
    setTimeout(() => {                                                      // setTimeout til at vente på transition før hidden class tilføjes
        overlay.classList.add("event-cal__overlay-hidden");                 // Tilføj hidden class for at skjule overlay
    }, 300);                                                                // Forsinkelse for at sikre transition er færdig
});

// Dele til at tilføje eventlisteners til alle se mere knapper med class seMereKnapper i kommende events og kurser som åbner overlay ved klik på knapper i kommende events og kurser sektion
const seMereKnapper = document.querySelectorAll(".buttonSeMere");

// Funktion til at Tilføj event listener til hver knap 
seMereKnapper.forEach(knap => {
    knap.addEventListener("click", (e) => {
        const dato = e.target.getAttribute("data-dato");                    // Hent datoen fra data-dato attributten


        const event = events.find(event => event.date === dato);            // Find det tilsvarende event i events arrayet
        // console.log(`Clicked on: ${dato}`, event);                       // Debug log

        if (event) {                                                        // Hvis eventet findes, åbn overlayet med event data
            openOverlay(event);
        }
    });
});