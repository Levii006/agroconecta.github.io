let produtos = [
    { id: 1, nome: "Morango Orgânico", preco: "R$ 100,00", unidade: "kg", descricao: "Caixa com 20kg fresquinho colhido hoje.", imagem: "img/produtos/morango.avif", categoria: "frutas", vendedor: "Maria Oliveira", local: "Itapetininga, SP", telefone: "(15) 98877-5544" },
    { id: 2, nome: "Milho Verde", preco: "R$ 80,00", unidade: "saco", descricao: "Saco de 30kg de Milho Verde de alta qualidade.", imagem: "img/produtos/milho.jpg", categoria: "graos", vendedor: "José Mendes", local: "Sorocaba, SP", telefone: "(15) 99712-3344" },
    { id: 3, nome: "Alface", preco: "R$ 20,00", unidade: "kg", descricao: "Alface fresca e crocante.", imagem: "img/produtos/alface.jpeg", categoria: "verduras", vendedor: "Ana Silva", local: "Itapetininga, SP", telefone: "(15) 99654-2211" },
    { id: 4, nome: "Tomate", preco: "R$ 85,00", unidade: "kg", descricao: "Caixa com 20kg de Tomates vermelhos e suculentos.", imagem: "img/produtos/tomate.jpeg", categoria: "frutas", vendedor: "Carlos Pereira", local: "Piedade, SP", telefone: "(15) 99543-1122" },
    { id: 5, nome: "Abobrinha", preco: "R$ 60,00", unidade: "kg", descricao: "Caixa com 30kg de Abobrinha grande.", imagem: "img/produtos/abobrinha.jpg", categoria: "verduras", vendedor: "Luciana Costa", local: "Salto, SP", telefone: "(15) 99432-3344" },
    { id: 6, nome: "Feijão", preco: "R$ 80,00", unidade: "kg", descricao: "Saco de 20kg de Feijão de alta qualidade.", imagem: "img/produtos/feijao.jpg", categoria: "graos", vendedor: "Laércio Dias", local: "Brigadeiro, SP", telefone: "(15) 99432-3344" },
    { id: 7, nome: "Batata Doce", preco: "R$ 75,00", unidade: "kg", descricao: "Caixa com 35kg de Batata Doce.", imagem: "img/produtos/batataDoce.jpeg", categoria: "verduras", vendedor: "Marcos Paulo", local: "Belo Horizonte, SP", telefone: "(15) 99432-3344" },
    { id: 8, nome: "Maça", preco: "R$ 90,00", unidade: "kg", descricao: "Caixa com 35kg de Maças grandes.", imagem: "img/produtos/macas.jpg", categoria: "frutas", vendedor: "Lucas Pereira", local: "Belo Horizonte, SP", telefone: "(15) 99432-3344" },
    { id: 9, nome: "Laranja", preco: "R$ 90,00", unidade: "kg", descricao: "Caixa com 25kg de Laranja.", imagem: "img/produtos/laranja.jpg", categoria: "frutas", vendedor: "Marcelo Santos", local: "Belo Horizonte, SP", telefone: "(15) 99432-3344" },
];

let usuarioLogado = null;

// ==================== FUNÇÃO DE BUSCA (PRINCIPAL) ====================
function handleSearch() {
    const termo = document.getElementById('search-input').value.toLowerCase().trim();

    // Se o campo estiver vazio, mostra todos os produtos
    if (!termo) {
        renderProducts(produtos);
        navigateToSection('comprar');
        return;
    }

    // Filtra os produtos que contenham o termo pesquisado
    const produtosFiltrados = produtos.filter(produto => 
        produto.nome.toLowerCase().includes(termo) ||
        produto.descricao.toLowerCase().includes(termo) ||
        produto.categoria.toLowerCase().includes(termo)
    );

    // Mostra apenas os produtos filtrados
    renderProducts(produtosFiltrados);
    
    // Garante que a seção de produtos seja exibida
    navigateToSection('comprar');
}

// ==================== RENDERIZAR PRODUTOS ====================
function renderProducts(listaDeProdutos) {
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    grid.innerHTML = '';

    if (listaDeProdutos.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full text-center py-16">
                <p class="text-6xl mb-4">😕</p>
                <p class="text-xl font-medium">Nenhum produto encontrado</p>
                <p class="text-gray-500">Tente outra palavra-chave</p>
            </div>`;
        return;
    }

    listaDeProdutos.forEach(produto => {
        grid.innerHTML += `
        <div onclick="showProductDetail(${produto.id})" class="product-card bg-white border rounded-3xl overflow-hidden cursor-pointer">
            <img src="${produto.imagem}" class="w-full h-56 object-cover" alt="${produto.nome}">
            <div class="p-5">
                <div class="flex justify-between items-start">
                    <h4 class="font-semibold text-lg">${produto.nome}</h4>
                    <p class="text-emerald-600 font-bold">${produto.preco}</p>
                </div>
                <p class="text-sm text-gray-500 mt-1">${produto.descricao}</p>
                <p class="text-xs text-emerald-600 mt-3">${produto.local}</p>
            </div>
        </div>`;
    });
}

// ==================== NAVEGAÇÃO ====================
function navigateToSection(section) {
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    
    const targetSection = document.getElementById(section);
    if (targetSection) {
        targetSection.classList.remove('hidden');
    }

    // Se for a seção de produtos, rola para ela
    if (section === 'comprar') {
        window.scrollTo({ top: 300, behavior: 'smooth' });
    }
}

// ==================== ANUNCIAR ====================
function handleAnunciarClick() {
    if (!usuarioLogado) {
        if (confirm("Para anunciar você precisa estar logado.\n\nDeseja fazer login?")) {
            window.location.href = "login.html";
        }
        return;
    }
    window.location.href = "anunciar.html";
}

// Funções básicas de login/cadastro (mantidas simples por enquanto)
function handleCadastro(e) {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    
    if (nome && email) {
        alert(`✅ Cadastro realizado com sucesso!\n\nBem-vindo, ${nome}!`);
        window.location.href = "index.html";
    }
}

function handleLogin(e) {
    
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    
    if (email) {
        usuarioLogado = { nome: email.split('@')[0], email: email };
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
        alert("Login realizado com sucesso!");
        window.location.href = "index.html";
    }
}

function logout() {
    localStorage.removeItem('usuarioLogado');
    window.location.href = "index.html";
}

// Inicialização da página
function init() {
    // Verificar se usuário está logado
    const savedUser = localStorage.getItem('usuarioLogado');
    if (savedUser) {
        usuarioLogado = JSON.parse(savedUser);
        updateUserUI();
    }
    
    renderProducts(produtos);
}

window.onload = init;


