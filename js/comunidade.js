// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('post-form');
    const postList = document.getElementById('post-list');

    // Função para carregar postagens do localStorage
    function loadPosts() {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.forEach((post, index) => {
            const postElement = createPostElement(post.userName, post.author, post.content, index);
            postList.appendChild(postElement);
        });
    }

    // Função para criar um novo elemento de postagem
    function createPostElement(userName, author, content, index) {
        const post = document.createElement('article');
        if(lastLoggedUser===userName||lastAccess==="admin"){
            
            post.className = 'post';
            post.innerHTML = `
                <h3>${userName}</h3>
                <p><strong>Destino:</strong> ${author}</p>
                <p>${content}</p>
                <button class="delete-btn" data-index="${index}">Excluir</button>`;
            return post;
        }else{
            
            post.className = 'post';
            post.innerHTML = `
                <h3>${userName}</h3>
                <p><strong>Destino:</strong> ${author}</p>
                <p>${content}</p>`;
            return post; 
        }
        }
    

    // Função para salvar postagens no localStorage
    function savePosts(posts) {
        localStorage.setItem('posts', JSON.stringify(posts));
    }

    // Função para limpar todas as postagens
    function clearPosts() {
        localStorage.removeItem('posts');
        postList.innerHTML = ''; // Limpa a lista de postagens na página 
    }

    // Função para excluir uma postagem específica
    function deletePost(index) {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.splice(index, 1);
        savePosts(posts);
        postList.innerHTML = ''; // Limpa a lista de postagens na página
        loadPosts(); // Recarrega as postagens restantes
    }

    // Carregar postagens quando a página for carregada
    loadPosts();

    postForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Pegando valores do formulário
        const userName = lastLoggedUser;
        const access = localStorage.getItem('lastAccess')
        const author = document.getElementById('author').value;
        const content = document.getElementById('content').value;

        // Criando nova postagem e adicionando à lista
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        const index = posts.length; // O novo índice é o tamanho atual do array
        posts.push({ userName, author, content });
        savePosts(posts);

        const postElement = createPostElement(userName, author, content, index);
        postList.appendChild(postElement);

        // Limpando o formulário
        postForm.reset();
    });

    // Adicionando evento de exclusão às postagens
    postList.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-btn')) {
            const index = event.target.getAttribute('data-index');
            deletePost(parseInt(index, 10));
        }
    });
});

// Exibe o nome do último usuário logado
const lastLoggedUser = localStorage.getItem('lastLoggedUser');
const lastAccess = localStorage.getItem('lastAccess')
// Atualiza o nome do usuário e controla a visibilidade do botão de logout
if (lastLoggedUser) {
    document.querySelector('.namePost').textContent = lastLoggedUser;
    document.querySelector('.name').textContent = lastLoggedUser;
    document.getElementById('logoutBtn').style.display = 'inline-block'; // Mostrar botão
} else {
    document.querySelector('.namePost').textContent;
    document.querySelector('name').textContent;
    document.getElementById('logoutBtn').style.display = 'none'; // Ocultar botão
}

// Função de logout
document.getElementById('logoutBtn').addEventListener('click', function () {
    // Remove o usuário logado do localStorage
    localStorage.removeItem('lastLoggedUser');
    localStorage.removeItem('lastAcsses')


    // Redireciona para a página de login
    window.location.href = 'index.html'; // Redireciona para a página de login
});
