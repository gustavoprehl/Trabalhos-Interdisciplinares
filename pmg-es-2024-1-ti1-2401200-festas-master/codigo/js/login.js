document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        loginUser();
    });
});

async function loginUser() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    
    if(email !== "" && password !== ""){
        const user = await getUser(email, password);
        console.log(user);
        if(user){
            localStorage.setItem("userData", JSON.stringify(user));
            window.location.href = "/index.html";

        } else {
            alert('Usuario nao encontrado')
        }
    } else {
        alert('Preencha os campos para fazer o login')
    }
}

async function getUser(email, password) {
    const users = await fetch('/db/user.json')
      .then(response => response.json())
      .then(data => {
        return data;
      })
      .catch(error => console.error('Erro ao carregar o JSON:', error));

      const userFound = users.find(user => user.email == email && user.password == password);

      return userFound ?? null;
  }