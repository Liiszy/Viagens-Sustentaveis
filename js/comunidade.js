
const lastAccess = localStorage.getItem('lastAccess');
//função api estado/cidade
carregarLocalidades('estados');

// Função unificada para carregar estados e cidades
async function carregarLocalidades(tipo, estado = '') {
    let url = '';

    // Define a URL com base no tipo de dados que queremos carregar
    if (tipo === 'estados') {
        url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';
    } else if (tipo === 'cidades' && estado) {
        url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`;
    } else {
        console.error("Tipo inválido ou estado não especificado para carregar cidades.");
        return;
    }

    try {
        const resp = await fetch(url);
        const dados = await resp.json();

        const select = document.querySelector(tipo === 'estados' ? "#estados" : "#cidades");
        select.innerHTML = "";

        // Popula o select com os dados recebidos
        dados.forEach(obj => {
            if (tipo === 'estados') {
                select.innerHTML += `<option value="${obj.sigla}">${obj.nome}</option>`;
            } else {
                select.innerHTML += `<option value="${obj.nome}">${obj.nome}</option>`;
            }
        });
    } catch (error) {
        console.error("Erro ao carregar dados:", error);
    }
}

// Carregar os estados ao carregar a página
document.addEventListener("DOMContentLoaded", function () {
    carregarLocalidades('estados');

    // Adiciona evento para carregar cidades quando um estado é selecionado
    document.querySelector("#estados").addEventListener("change", function () {
        const estado = this.value;
        carregarLocalidades('cidades', estado);
        
        // Imprime o estado selecionado em texto
        const estadoSelecionado = this.options[this.selectedIndex].text;
        console.log("Estado selecionado:", estadoSelecionado);
        document.querySelector("#estado-selecionado").textContent = `Estado selecionado: ${estadoSelecionado}`;
    });

    // Adiciona evento para imprimir a cidade selecionada em texto
    document.querySelector("#cidades").addEventListener("change", function () {
        const cidadeSelecionada = this.options[this.selectedIndex].text;
        console.log("Cidade selecionada:", cidadeSelecionada);
        document.querySelector("#cidade-selecionada").textContent = `Cidade selecionada: ${cidadeSelecionada}`;
    });
});

console.log(lastAccess)
document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('post-form');
    const postList = document.getElementById('post-list');

    // Função para carregar postagens do localStorage
    function loadPosts() {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        postList.innerHTML = ''; // Limpa a lista antes de recarregar

        posts.forEach((post, index) => {
            const postElement = createPostElement(post.userName, post.author, post.content, index);
            postList.appendChild(postElement);

            // Se o post tiver respostas, exibe-as
            if (post.responses && post.responses.length > 0) {
                displayResponses(index, post.responses);
            }
        });
    }
  
  
    // Função para criar um novo elemento de postagem
    function createPostElement(userName, author, content, index) {
        const post = document.createElement('article');
        post.className = 'post';

        // Estrutura do post com campo de resposta
        post.innerHTML = `
            <div class="caixa-resposta">
                <h3>${userName}</h3>
                <p><strong>Destino:</strong> ${author}</p>
                <p>${content}</p>
                <div class="responses-container">
                    <button class="toggle-responses-btn" data-index="${index}" style="display: none;">Mostrar Comentários</button>
                </div>
                <div class="responses" id="responses-${index}" style="display: none;"></div>
                <button class="reply-btn" data-index="${index}">Responder</button>
                <div class="response-form-container" id="response-form-container-${index}" style="display: none;">
                    <form class="response-form" data-index="${index}">
                        <input type="text" class="response-content" placeholder="Escreva uma resposta" required />
                        <button type="submit">Enviar</button>
                        ${(lastLoggedUser === userName || lastAccess === "admin") ? `<button class="delete-btn" data-index="${index}">Excluir</button>` : ''}
                    </form>
                </div>
            </div>
        `;
        // Evento para mostrar/ocultar a caixa de resposta
        const replyBtn = post.querySelector('.reply-btn');
        const responseFormContainer = post.querySelector('.response-form-container');

        replyBtn.addEventListener('click', () => {
            // Alterna a visibilidade da caixa de resposta
            const isVisible = responseFormContainer.style.display === 'block';
            responseFormContainer.style.display = isVisible ? 'none' : 'block';
        });

        // Evento para mostrar/ocultar as respostas
        const toggleResponsesBtn = post.querySelector('.toggle-responses-btn');
        const responsesContainer = post.querySelector('.responses');

        toggleResponsesBtn.addEventListener('click', () => {
            const isVisible = responsesContainer.style.display === 'block';
            responsesContainer.style.display = isVisible ? 'none' : 'block';
            toggleResponsesBtn.textContent = isVisible ? 'Mostrar Comentários' : 'Ocultar Comentários';
        });

        // Evento para enviar uma resposta
        const responseForm = post.querySelector('.response-form');
        responseForm.addEventListener('submit', (event) => {
            event.preventDefault();
            
            const responseContent = responseForm.querySelector('.response-content').value;
            const responseUser = lastLoggedUser || 'Anônimo';
    
            addResponse(index, responseUser, responseContent); // Adiciona a resposta ao localStorage e exibe
            responseForm.reset(); // Limpa o campo de resposta
            responseFormContainer.style.display = 'none'; // Esconde a caixa de resposta após enviar
        });

        return post;
    }

    // Função para adicionar uma resposta ao post e salvar no localStorage
    function addResponse(postIndex, userName, content) {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        
        // Verifica se o post existe e inicializa as respostas, se necessário
        if (posts[postIndex]) {
            if (!posts[postIndex].responses) {
                posts[postIndex].responses = [];
            }
            
            // Adiciona a nova resposta
            posts[postIndex].responses.push({ userName, content });
            savePosts(posts); // Salva no localStorage
            
            // Exibe a resposta no post
            displayResponses(postIndex, posts[postIndex].responses);
        }
    }

    // Função para exibir respostas de um post
    function displayResponses(postIndex, responses) {
        const responsesContainer = document.getElementById(`responses-${postIndex}`);
        const toggleButton = document.querySelector(`.toggle-responses-btn[data-index="${postIndex}"]`);

        responsesContainer.innerHTML = ''; // Limpa as respostas anteriores

        // Adiciona cada resposta ao container de respostas
        responses.forEach((response, responseIndex) => {
            const responseElement = document.createElement('div');
            responseElement.className = 'response';
            responseElement.innerHTML = `
                <p><strong>${response.userName}:</strong> ${response.content}</p>
                ${(lastLoggedUser === response.userName || lastAccess === "admin") ? `<button class="delete-response-btn" data-post-index="${postIndex}" data-response-index="${responseIndex}">Excluir Resposta</button>` : ''}
            `;
            responsesContainer.appendChild(responseElement);
        });

        // Exibe o botão de mostrar/ocultar apenas se houver respostas
        if (responses.length > 0) {
            responsesContainer.style.display = 'block'; // Exibe as respostas
            toggleButton.style.display = 'inline-block'; // Exibe o botão para mostrar/ocultar comentários
            toggleButton.textContent = 'Ocultar Comentários'; // Define o texto correto do botão
        } else {
            responsesContainer.style.display = 'none'; // Esconde as respostas
            toggleButton.style.display = 'none'; // Esconde o botão de mostrar/ocultar
        }
    }

    // Função para salvar postagens no localStorage
    function savePosts(posts) {
        localStorage.setItem('posts', JSON.stringify(posts));
    }

    // Função para excluir uma postagem específica
    function deletePost(index) {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.splice(index, 1);
        savePosts(posts);
        loadPosts(); // Recarrega as postagens restantes com os novos índices
    }

    // Função para excluir uma resposta específica
    function deleteResponse(postIndex, responseIndex) {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        if (posts[postIndex] && posts[postIndex].responses) {
            posts[postIndex].responses.splice(responseIndex, 1); // Remove a resposta
            savePosts(posts);
            loadPosts(); // Recarrega os posts com as respostas removidas
        }
    }

    // Carregar postagens quando a página for carregada
    loadPosts();

    // Verificação se o formulário existe antes de adicionar o evento
    if (postForm) {
        postForm.addEventListener('submit', (event) => {
            event.preventDefault();
        
            // Pegando valores do formulário
            const userName = lastLoggedUser;
            const estadoSelecionado = document.getElementById('estados').options[document.getElementById('estados').selectedIndex].text;
            const cidadeSelecionada = document.getElementById('cidades').options[document.getElementById('cidades').selectedIndex].text;
            const author = `${cidadeSelecionada}, ${estadoSelecionado}`; // Destino formatado como "Cidade, Estado"
            const content = document.getElementById('content').value;
        
            // Criando nova postagem e adicionando à lista
            const posts = JSON.parse(localStorage.getItem('posts')) || [];
            const index = posts.length;
            posts.push({ userName, author, content });
            savePosts(posts);
        
            const postElement = createPostElement(userName, author, content, index);
            postList.appendChild(postElement);
        
            // Limpando o formulário
            postForm.reset();
            document.getElementById('estados').selectedIndex = 0; // Reinicia o estado
            document.getElementById('cidades').selectedIndex = 0; // Reinicia a cidade
        });
    }

    // Adicionando evento de exclusão às postagens
    postList.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-btn')) {
            const index = parseInt(event.target.getAttribute('data-index'), 10);
            deletePost(index);
        }

        // Evento de exclusão de resposta
        if (event.target.classList.contains('delete-response-btn')) {
            const postIndex = parseInt(event.target.getAttribute('data-post-index'), 10);
            const responseIndex = parseInt(event.target.getAttribute('data-response-index'), 10);
            deleteResponse(postIndex, responseIndex);
        }
    });
});
