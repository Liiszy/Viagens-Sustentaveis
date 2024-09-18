// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('post-form');
    const postList = document.getElementById('post-list');

    // Função para carregar postagens do localStorage
    function loadPosts() {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.forEach((post, index) => {
            const postElement = createPostElement(post.title, post.author, post.content, index);
            postList.appendChild(postElement);
        });
    }

    // Função para criar um novo elemento de postagem
    function createPostElement(title, author, content, index) {
        const post = document.createElement('article');
        post.className = 'post';
        post.innerHTML = `
            <h3>${title}</h3>
            <p><strong>Destino:</strong> ${author}</p>
            <p>${content}</p>
            <button class="delete-btn" data-index="${index}">Excluir</button>
        `;
        return post;
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
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const content = document.getElementById('content').value;

        // Criando nova postagem e adicionando à lista
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        const index = posts.length; // O novo índice é o tamanho atual do array
        posts.push({ title, author, content });
        savePosts(posts);

        const postElement = createPostElement(title, author, content, index);
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

// Atualiza o nome do usuário e controla a visibilidade do botão de logout
if (lastLoggedUser) {
    document.getElementById('name').textContent = lastLoggedUser;
    document.getElementById('logoutBtn').style.display = 'inline-block'; // Mostrar botão
} else {
    document.getElementById('name').textContent;
    document.getElementById('logoutBtn').style.display = 'none'; // Ocultar botão
}

// Função de logout
document.getElementById('logoutBtn').addEventListener('click', function() {
    // Remove o usuário logado do localStorage
    localStorage.removeItem('lastLoggedUser');
   

    // Redireciona para a página de login
    window.location.href = 'index.html'; // Redireciona para a página de login
});
