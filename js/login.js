document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário tradicional
  
    // Pega os valores dos campos de entrada
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Obtém o array de usuários cadastrados do localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
  
    // Verifica se as credenciais correspondem a algum usuário cadastrado
    const validUser = users.find(user => user.email === email && user.password === password);
  const erro= document.querySelector(".erro")
    if (validUser) {
        // Armazena o último usuário logado
        localStorage.setItem('lastLoggedUser',validUser.username);
        localStorage.setItem('lastAccess',validUser.access)
       
        // Redireciona para a página comunidade.html
       event.target.submit();
    } else {
       erro.innerHTML="*Usuário ou senha inválido!"
    }
  });   