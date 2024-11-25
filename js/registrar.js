let users = JSON.parse(localStorage.getItem('users')) || [];

// Adiciona o usuário "ADM" apenas se ainda não estiver no array
if (!users.some(user => user.email === "campergames68@gmail.com")) {
    users.push({ email: "campergames68@gmail.com", password: "1234", username: "ADM", access: "admin" });
    localStorage.setItem('users', JSON.stringify(users)); // Atualiza o localStorage
}

// Manipula o evento de submissão do formulário
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário tradicional

    // Pega os valores dos campos de entrada
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    // Elementos de erro
    const erro = document.querySelectorAll(".erro");
    const userErro = document.querySelector(".name");
    const emailErro = document.querySelector(".email");
    const passwordErro = document.querySelector(".password");
    const confirmPasswordErro = document.querySelector(".passwordConfirm");
 
    if (userErro) userErro.innerHTML = "";
    if (emailErro) emailErro.innerHTML = "";
    if (confirmPasswordErro) confirmPasswordErro.innerHTML = "";
    
   if(!username){
    userErro.innerHTML = "*Preencha com seu Nome!";
   }
   if(!email){
   emailErro.innerHTML="*Preencha com um E-Mail válido!"
   }
if(password.length<8){
    passwordErro.innerHTML="*A senha deve conter no mínimo 8 caracteres.";
    return;
}
    // Verifica se as senhas são iguais
    if (password !== confirmPassword) {
        confirmPasswordErro.innerHTML = "*As senhas não coincidem!";
        return; // Para o processo aqui
    }

    // Verifica se o email de usuário já existe
    const userExists = users.some(user => user.email === email);
    if (userExists) {
        emailErro.innerHTML = "*Email já cadastrado!";
    return; // Para o processo aqui
    }
    if (!username || !email || !password || !confirmPassword) {
        
       
       return; // Para o processo aqui
   }
    // Adiciona o novo usuário ao array
    users.push({ email: email, password: password, username: username, access: "public" });

    // Armazena o array de usuários de volta no localStorage
    localStorage.setItem('users', JSON.stringify(users));

    // Redireciona para a página de login
   event.target.submit();
});
