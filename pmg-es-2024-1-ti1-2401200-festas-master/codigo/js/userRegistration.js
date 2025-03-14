import { getUsers, saveJsonFile } from "./global.js";

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    createUser();
});

async function createUser() {
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const documentId = document.getElementById('document').value;
    const email = document.getElementById('email').value;
    const number = document.getElementById('number').value;
    const password = document.getElementById('password').value;
    const Confirmpassword = document.getElementById('Confirmpassword').value;

    const product = document.querySelector('input[name="product"]:checked');
    const gender = document.querySelector('input[name="gender"]:checked');

    if (!product ||!gender) {
        alert('Por favor, selecione se você é produtor de eventos e seu gênero.');
        return;
    }

    if (password!== Confirmpassword) {
        alert('As senhas não coincidem.');
        return;
    }

    const user = {
        bio: "",
        location: "",
        followers: 0,
        following: 0,
        profilePhoto: "https://media.licdn.com/dms/image/C5603AQF6fMRFoMIr-w/profile-displayphoto-shrink_200_200/0/1649639389911?e=2147483647&v=beta&t=6pr6QDvJRx1CCsUtz2B-frUGHBt6bOukUy6nIPcmol4",
        coverPhoto: "https://www.ucs.br/site/static/uploads/imagens/capa_engenharia_software.png",
        email: email,
        password: password,
        product: product.id,
        gender: gender.id
    }

    await saveUser(user);

    };

    async function saveUser(user) {
        try {
            const users = await getUsers();
            users.push(user);
            
            if (users) {
                saveJsonFile(users, "save-user");
                alert('Usuário cadastrado com sucesso!');
                window.location.href = 'login.html';
        
            } else {
                alert('Preencha os dados do usuario para prosseguir.')
            }   
        } catch (error) {
            alert('Erro ao salvar usuário.');
            console.log(error);
        }
    }

    window.createUser = createUser;