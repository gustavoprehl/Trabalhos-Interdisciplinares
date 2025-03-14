document.addEventListener('DOMContentLoaded', (event) => {
  const menuToggle = document.getElementById('menu-toggle');
  const sideMenu = document.getElementById('side-menu');
  const closeMenu = document.getElementById('close-menu');

  const loadUserData = () => {
    const userData = localStorage.getItem("userData");
    writeUserData(JSON.parse(userData));
  };

  const writeUserData = (data) => {
    const usernameElement = document.getElementById('username');
    const locationElement = document.getElementById('location');
    const bioElement = document.getElementById('bio');
    const followersElement = document.getElementById('user-followers');
    const followingElement = document.getElementById('user-following');
    const profilePhotoElement = document.getElementById('profile-photo');
    const coverPhotoElement = document.getElementById('cover-photo');

    usernameElement.textContent = data.name;
    locationElement.textContent = data.location;
    bioElement.textContent = data.bio;
    followersElement.textContent = data.followers;
    followingElement.textContent = data.following;

    profilePhotoElement.src = data.profilePhoto;
    profilePhotoElement.alt = `Foto de perfil de ${data.name}`;

    coverPhotoElement.src = data.coverPhoto;
    coverPhotoElement.alt = `Foto de perfil de ${data.name}`;
};


  loadUserData();

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

  const followBtn = document.getElementById('follow-btn');
  followBtn.addEventListener('click', () => {
      alert('Você está seguindo este usuário.');
  });

  // Função mensagem com chat minimizável
  const messageBtn = document.getElementById('message-btn');
  const chatBox = document.getElementById('chat-box');
  const minimizeChat = document.getElementById('minimize-chat');
  const chatInput = document.getElementById('chat-input');
  const sendChat = document.getElementById('send-chat');
  const chatContent = document.querySelector('.chat-content');

  messageBtn.addEventListener('click', () => {
      chatBox.style.display = chatBox.style.display === 'none' || chatBox.style.display === '' ? 'flex' : 'none';
  });

  minimizeChat.addEventListener('click', () => {
      chatBox.style.display = 'none';
  });

  // Função redirecionar para upload de fotos
  const uploadBtn = document.getElementById('upload-btn');
  uploadBtn.addEventListener('click', () => {
      window.location.href = '/upload'; // Altere para a URL correta da sua página de upload de fotos
  });

  // Enviar mensagem no chat
  sendChat.addEventListener('click', () => {
      const message = chatInput.value.trim();
      if (message !== '') {
          const messageElement = document.createElement('p');
          messageElement.textContent = message;
          chatContent.appendChild(messageElement);
          chatInput.value = '';
          chatContent.scrollTop = chatContent.scrollHeight; // Rolagem automática para a última mensagem
      }
  });

  // Permitir enviar mensagem ao pressionar Enter
  chatInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
          event.preventDefault();
          sendChat.click();
      }
  });

  loadUserData();
});