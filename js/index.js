// Exibe o nome do último usuário logado
const lastLoggedUser = localStorage.getItem('lastLoggedUser');


// Atualiza o nome do usuário e controla a visibilidade do botão de logout
if (lastLoggedUser) {
    document.getElementById('name').textContent = lastLoggedUser;
    document.getElementById('logoutBtn').style.display = 'inline-block'; // Mostrar botão

} else {
    document.getElementById('name').textContent;
    document.getElementById('logoutBtn').style.display = 'none'; // Ocultar botão


}

// Função de logout
document.getElementById('logoutBtn').addEventListener('click', function () {
    // Remove o usuário logado do localStorage
    localStorage.removeItem('lastLoggedUser');
    localStorage.removeItem('lastAccess')


    // Redireciona para a página de login
    window.location.href = 'index.html'; // Redireciona para a página de login
});

    const login=document.querySelector(".login-icon")
    if(lastLoggedUser&&lastLoggedUser!==""){
        login.classList.add("logged")
        console.log("logado")
    }else{
        login.classList.remove("logged")
        console.log("empty")
    } 

    