import { getEvents, saveJsonFile } from './global.js';

document.addEventListener('DOMContentLoaded', (event) => {
    buildEventPage();
});

function buildEventPage() {
    const eventData = localStorage.getItem("eventData");
    if (eventData) {
        const data = JSON.parse(eventData);
        const img = document.getElementById("profile-pic");
        img.src = data.coverPhoto.url;
        img.alt = data.coverPhoto.name;

        const pInfo = document.getElementById("info");
        pInfo.innerHTML = `<strong>Data do evento:</strong> ${data.date} | <strong>Horário:</strong> ${data.time} | <strong>Tipo do evento:</strong> ${data.category}`

        const pAbout = document.getElementById("about");
        pAbout.innerHTML = data.about;
        const divReview = document.getElementById("reviews");

        if ((data.review !== null || data.review !== undefined) && data.reviews.length > 0) {
            data.reviews.forEach(review => {
                const pAuthor = document.createElement('p');
                const pReview = document.createElement('p');
                pAuthor.className = 'mb-0 mt-4';
                pReview.className = 'mb-0';

                pAuthor.innerHTML = `<strong>${review.userName}:</strong>`
                pReview.innerHTML = `${review.comment} <hr>`;

                divReview.appendChild(pAuthor);
                divReview.appendChild(pReview);
            });

        } else {
            const pNoReview = document.createElement('p');
            pNoReview.innerHTML = "<strong>Ainda não temos reviews :)</strong>"
            divReview.appendChild(pNoReview);
        }
        const divArtist = document.getElementById('artists');

        data.artists.forEach(artist => {
            const divCard = document.createElement('div');
            const divBord = document.createElement('div');
            const img = document.createElement('img');
            const pName = document.createElement('p');

            divCard.classList = "col-md-4 mb-4";
            divBord.className = "artist";

            img.src = artist.profilePhoto.url;
            img.alt = artist.name;

            pName.innerText = artist.name;

            divBord.appendChild(img);
            divBord.appendChild(pName);
            divCard.appendChild(divBord);
            divArtist.appendChild(divCard);

        })

    }
};

async function saveReview() {
    const events = await getEvents();
    const eventData = JSON.parse(localStorage.getItem("eventData"));
    const newComment = document.getElementById('comment');

    const indice = events.findIndex(event => event.name === eventData.name);

    if (newComment.value !== "") {
        console.log(events[indice]);
        events[indice].reviews.push({
            userName: "Guilherme",
            comment: newComment.value
        })

        saveJsonFile(events, "save-data");

    } else {
        alert('Digite seu comentario para publicar')
    }
}

window.saveReview = saveReview;
