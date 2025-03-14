import { getEvents, getCurrentUser } from './global.js';

document.addEventListener('DOMContentLoaded', (event) => {

  buildSideMenu();
  fillAllEvents();
  fillArtists();
});

function buildSideMenu(){
  const menuToggle = document.getElementById('menu-toggle');
  const sideMenu = document.getElementById('side-menu');
  const closeMenu = document.getElementById('close-menu');
  const listMenu = document.getElementById('list-menu');
  const user = getCurrentUser();

  if(user){
    const liMinhaConta = document.createElement('li');
    liMinhaConta.innerHTML = "<a>Minha conta</a>";
    liMinhaConta.onclick = () => saveUserAndRedirect();

    const lilogOut = document.createElement('li');
    lilogOut.innerHTML = "<a>Sair</a>";
    lilogOut.onclick = () => logOut();

    listMenu.appendChild(liMinhaConta);
    listMenu.appendChild(lilogOut);
  } else
  {
    const li = document.createElement('li').innerHTML = "<a href=\"/pages/login.html\">Login</a>";
    const liRegister = document.createElement('li').innerHTML = "<a href=\"/pages/userRegistration.html\">Registre-se</a>";
    listMenu.innerHTML = li;
    listMenu.innerHTML += liRegister;
  }
  const toggleMenu = () => {
    if (sideMenu.style.width === '250px') {
      sideMenu.style.width = '0';
    } else {
      sideMenu.style.width = '250px';
    }
  };

  menuToggle.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleMenu();
  });

  closeMenu.addEventListener('click', () => {
    sideMenu.style.width = '0';
  });

  document.addEventListener('click', (event) => {
    if (sideMenu.style.width === '250px' && !sideMenu.contains(event.target) && event.target !== menuToggle) {
      sideMenu.style.width = '0';
    }
  });

  sideMenu.addEventListener('click', (event) => {
    event.stopPropagation();
  });
}

function fillAllEvents() {
  getEvents().then(events => {
    const swiperFireContainer = document.getElementById('fire');
    const swiperBestContainer = document.getElementById('best');

    events.forEach(event => {
      const swiperSlide = document.createElement('swiper-slide');
      const div = document.createElement('div');
      div.className = 'd-flex flex-column align-items-center';

      const img = document.createElement('img');
      img.src = event.coverPhoto.url;
      img.alt = event.coverPhoto.name;

      const p = document.createElement('p');
      p.textContent = event.name;
      p.className = 'mb-0';

      const pDate = document.createElement('span');
      pDate.textContent = event.date;
      pDate.className = 'text-secondary h6 m-0';

      const pTime = document.createElement('span');
      pTime.textContent = event.time;
      pTime.className = 'text-secondary h6';

      div.style.cursor = 'pointer';
      div.onclick = () => sendEventData(event);

      div.appendChild(img);
      div.appendChild(p);
      div.appendChild(pDate);
      div.appendChild(pTime);
      swiperSlide.appendChild(div);

      if (event.category == "fire") {
        swiperFireContainer.appendChild(swiperSlide);
      } else if (event.category == "best") {
        swiperBestContainer.appendChild(swiperSlide);
      }

    });
  });
};

async function fillArtists() {
  const swiperArtists = document.getElementById('artists');
  const titleArtists = document.getElementById('artists-title');

  const events = await getEvents();
  const randomIndex = Math.floor(Math.random() * events.length);

  titleArtists.innerHTML =  `${titleArtists.innerHTML} ${events[randomIndex].name}`

  events[randomIndex].artists.forEach(artist => {
    const swiperSlide = document.createElement('swiper-slide');
    const div = document.createElement('div');
    div.className = 'd-flex flex-column align-items-center';
    
    
    const img = document.createElement('img');
    img.src = artist.profilePhoto.url;
    img.alt = artist.name;
    
    const p = document.createElement('p');
    p.textContent = artist.name;
    p.className = 'mb-0';
    
    div.appendChild(img);
    div.appendChild(p);
    swiperSlide.appendChild(div);

    swiperArtists.appendChild(swiperSlide);
  });
};

function sendEventData(event) {
  localStorage.setItem("eventData", JSON.stringify(event));
  window.location.href = "/pages/eventPage.html";
}

function saveUserAndRedirect() {
  window.location.href = "/pages/profile.html";
}

function logOut(){
  localStorage.removeItem('userData');
  location.reload();
}

window.saveUserAndRedirect = saveUserAndRedirect;
window.logOut = logOut;