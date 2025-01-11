function openOverlay(event) {
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

    // Vis overlay
    overlay.classList.remove("event-cal__overlay-hidden");
}

// Funktion til at lukke overlay
document.getElementById("close-overlay").addEventListener("click", () => {
    document.querySelector(".event-cal__overlay").classList.add("event-cal__overlay-hidden");
});

// Dele til at tilføje eventlisteners til alle se mere knapper med class seMereKnapper i kommende events og kurser som åbner overlay ved klik på knapper i kommende events og kurser sektion
const seMereKnapper = document.querySelectorAll(".buttonSeMere");

// Tilføj event listener til hver knap
seMereKnapper.forEach(knap => {
    knap.addEventListener("click", (e) => {
        const dato = e.target.getAttribute("data-dato");                    // Hent datoen fra data-dato attributten


        const event = events.find(event => event.date === dato);            // Find det tilsvarende event i events arrayet
        // console.log(`Clicked on: ${dato}`, event);                     // Debug log

        if (event) {                                                        // Hvis eventet findes, åbn overlayet med event data
            openOverlay(event);
        }
    });
});