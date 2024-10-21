let users = JSON.parse(localStorage.getItem('users')) || [];
users.push({ email: "campergames68@gmail.com", password: "1234", username: "ADM",access:"admin"});

document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário tradicional
  
    // Pega os valores dos campos de entrada
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
 
    // Verifica se as senhas são iguais
    if (password !== confirmPassword) {
        
        return; // Para o processo aqui se as senhas não forem iguais
    }
  
    // Verifica se o email de usuário já existe
    const userExists = users.some(user => user.email === email);
    if (userExists) {
       
        return;
    }
  
    // Adiciona o novo usuário ao array
    users.push({ email: email, password: password, username: username,access:"public"});
  
    // Armazena o array de usuários de volta no localStorage
    localStorage.setItem('users', JSON.stringify(users));
  
   ;
    // Redireciona para a página de login
    window.location.href = 'login.html';
  });  
