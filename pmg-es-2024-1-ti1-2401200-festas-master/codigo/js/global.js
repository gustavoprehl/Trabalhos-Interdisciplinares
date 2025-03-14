export function getEvents() {
  return fetch('/db/events.json')
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => console.error('Erro ao carregar o JSON:', error));
}
export function getUsers() {
  return fetch('/db/user.json')
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => console.error('Erro ao carregar o JSON:', error));
}

export function saveJsonFile(dados, url) {
  try {
    fetch(`http://localhost:3000/${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    })
      .then(response => response.text())
      .then(message => {
        alert(message);
      })
      .catch(error => {
        console.error('Erro:', error);
      });
  } catch (erro) {
    alert('Erro ao salvar. Tente novamente mais tarde.', erro);
    console.log(erro)
  }
}

export function getCurrentUser() {
  const userData = localStorage.getItem("userData");

  return userData ?? null;
}