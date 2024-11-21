let users = JSON.parse(localStorage.getItem('users')) || [];
users.push({ email: "campergames68@gmail.com", password: "1234", username: "ADM",access:"admin"});

document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário tradicional
    // Pega os valores dos campos de entrada
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
 
//ALERTAS
const erros= document.querySelector("error-list")
const caixa=document.querySelector(".erro")
erros.innerHTML=""

if(username.value==""){
    erros.innerHTML+="<li>Preencha com seu Nome!</li>"
}
if(email.value==""){
    erros.innerHTML+="<li>Preencha com um Email válido!</li>"
}
if(password.value==""){
    erros.innerHTML+="<li>Preencha uma senha de no minimo 4 digítos!</li>"
}
if(confirmPassword.value==""){
    erros.innerHTML+="<li>Preencha com a mesma senha do campo a cima!</li>"
}
    // Verifica se as senhas são iguais
    if (password !== confirmPassword) {
        erros.innerHTML+="<li>As senhas não coencidem</li>"
        return; // Para o processo aqui se as senhas não forem iguais
    }
    // Verifica se o email de usuário já existe
    const userExists = users.some(user => user.email === email);
    if (userExists) {
       erros.innerHTML+="<li>Este Email ja está cadastrado!</li>"
        return;
    }
  
    if(erros!=""){
        caixa.classList.remove("hide")
    }else{
        caixa.classList.add("hide")
        evt.target.submit()
        //form.submit()
    }
    








    // Adiciona o novo usuário ao array
    users.push({ email: email, password: password, username: username,access:"public"});
  
    // Armazena o array de usuários de volta no localStorage
    localStorage.setItem('users', JSON.stringify(users));
  
   ;
    // Redireciona para a página de login
    window.location.href = 'login.html';
  });  
