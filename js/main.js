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
        <div onclick="" class="product-card bg-white border rounded-3xl overflow-hidden cursor-pointer">
            <img src="${produto.imagem}" class="w-full h-56 object-cover" alt="${produto.titulo}">
            <div class="p-5">
                <div class="flex justify-between items-start">
                    <h4 class="font-semibold text-lg">${produto.titulo}</h4>
                    <p class="text-emerald-600 font-bold">${produto.preco}</p>
                </div>
                <p class="text-sm text-gray-500 mt-1">${produto.descricao}</p>
                <p class="text-xs text-emerald-600 mt-3">${produto.nome}</p>
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

//HOMEPAGE REDIRECT
function handleAnunciarClick() {
    const savedUser = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (savedUser == null) {
        if (confirm("Para anunciar você precisa estar logado.\n\nDeseja fazer login?")) {
            window.location.href = "login.html";
        }
    } else {
        window.location.href = "anunciar.html";
    }
}

//REGISTRAR ANUNCIO
function handleRegistrarAnuncio(e) {
    e.preventDefault();

    const savedUser = JSON.parse(localStorage.getItem('usuarioLogado'));
    var email = JSON.stringify(savedUser.email);
    email = email.replace(/"/g, "");

    const titulo = document.getElementById('nome-produto').value;
    const preco = document.getElementById('preco').value;
    const unidadeId = document.getElementById('unidade');
    const unidade = unidadeId.options[unidadeId.selectedIndex].text;
    const categoriaId = document.getElementById('categoria');
    const categoria = categoriaId.options[categoriaId.selectedIndex].text;
    const descricao = document.getElementById('descricao').value;

    if (titulo && preco && unidade && descricao) {

        fetch('http://localhost:3000/anunciar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, titulo, preco, unidade, categoria, descricao })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro HTTP: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Resposta do servidor:', data);

                alert(`✅ Anuncio registrado com sucesso!!`);
                window.location.href = "perfil.html";
            })
            .catch(error => {
                console.error('Erro ao registrar produto:', error);
                alert('Erro ao registrar produto. Verifique o console para detalhes.');
            });
    }

}

//OBTER ANUNCIOS

// ================== FUNÇÕES DE AUTENTICAÇÃO ==================

// CADASTRO:
function handleCadastro(e) {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const empresa = document.getElementById('empresa').value;
    const cnpj = document.getElementById('cnpj').value;
    const cidade = document.getElementById('cidade').value;
    const estadoId = document.getElementById('estado');
    const estado = estadoId.options[estadoId.selectedIndex].text;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const telefone = document.getElementById('telefone').value;

    if (nome && empresa && cnpj && email && senha && telefone) {

        fetch('http://localhost:3000/cadastrar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, empresa, cnpj, cidade, estado, email, senha, telefone, })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro HTTP: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Resposta do servidor:', data);
                if (data.validade === false) {
                    alert('Cadastro já presente no sistema!');
                    return;
                }
                alert(`✅ Cadastro realizado com sucesso!\n\nBem-vindo, ${nome}!`);
                window.location.href = "index.html";
                usuarioLogado = { nome, email, empresa, cnpj, cidade, estado, telefone, };
                localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
            })
            .catch(error => {
                console.error('Erro ao cadastrar usuário:', error);
                alert('Erro ao cadastrar usuário. Verifique o console para detalhes.');
            });
    }
}

// LOGIN
function handleLogin(e) {

    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const senha = document.getElementById('login-senha').value;

    if (email && senha) {
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro HTTP: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Resposta do servidor:', data);
                if (data.validade === false) {
                    alert('Email ou senha incorretos!');
                    return;
                }
                alert(`Login realizado com sucesso!\n\nBem-vindo, ${data.nome}!`);
                usuarioLogado = { nome: data.nome, email, empresa: data.empresa, cnpj: data.cnpj, cidade: data.cidade, estado: data.estado, telefone: data.telefone };
                localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
                window.location.href = "index.html";
            })
            .catch(error => {
                console.error('Erro ao fazer login:', error);
                alert('Erro ao fazer login. Verifique o console para detalhes.');
            });
    }
}


//LOGOUT 
function logout() {
    localStorage.removeItem('usuarioLogado');
    window.location.href = "index.html";
}

// ============= ATUALIZANDO HTML COM INFORMAÇÕES DE LOGIN ====================
// Inicialização da página INDEX
function init() {
    // Verificar se usuário está logado
    const savedUser = JSON.parse(localStorage.getItem('usuarioLogado'));
    let usuarioLogout = document.getElementById('user-logged-out');
    let usuarioLogin = document.getElementById('user-logged-in');
    const nomeUsuario = document.getElementById('user-name-display');
    const localUsuario = document.getElementById('user-location-display');

    if (savedUser != null) {
        usuarioLogout.setAttribute('class', 'hidden flex items-center gap-3');
        usuarioLogin.setAttribute('class', 'items-center gap-3');

        let nomeUsuarioTexto = JSON.stringify(savedUser.nome);
        nomeUsuarioTexto = nomeUsuarioTexto.replace(/"/g, "");
        let cidadeUsuario = JSON.stringify(savedUser.cidade);
        cidadeUsuario = cidadeUsuario.replace(/"/g, "");
        let estadoUsuario = JSON.stringify(savedUser.estado);
        estadoUsuario = estadoUsuario.replace(/"/g, "");

        nomeUsuario.textContent = nomeUsuarioTexto;
        localUsuario.textContent = cidadeUsuario + ", " + estadoUsuario;
    }
    else {
        usuarioLogout.setAttribute('class', 'flex items-center gap-3');
        usuarioLogin.setAttribute('class', 'hidden items-center gap-3')
    }

    let anuncios = {};
    let quantidadeAnuncios = -1;
    //renderizando produtos
    fetch('http://localhost:3000/anunciosTodos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            anuncios = data;
            quantidadeAnuncios = data.quantidade;
            const grid = document.getElementById('products-grid');
            if (!grid) return;

            grid.innerHTML = '';

            if (quantidadeAnuncios === -1) {
                grid.innerHTML = `
            <div class="col-span-full text-center py-16">
                <p class="text-6xl mb-4">😕</p>
                <p class="text-xl font-medium">Nenhum produto encontrado</p>
                <p class="text-gray-500">Tente outra palavra-chave</p>
            </div>`;
            } else {
                for (let i = 0; i < quantidadeAnuncios; i++) {
                    const produto = anuncios[i];
                    grid.innerHTML += `
                <div onclick="" class="product-card bg-white border rounded-3xl overflow-hidden cursor-pointer">
                    <img src="/img/template.png" class="w-full h-56 object-cover" alt="${data.titulo[i]}">
                    <div class="p-5">
                        <div class="flex justify-between items-start">
                            <h4 class="font-semibold text-lg">${data.titulo[i]}</h4>
                            <p class="text-emerald-600 font-bold">${data.preco[i]}</p>
                        </div>
                        <p class="text-sm text-gray-500 mt-1">${data.descricao[i]}</p>
                        <p class="text-xs text-emerald-600 mt-3">${data.nome[i]}</p>
                    </div>
                </div>`;
                };
            }
        })
        .catch(error => {
            console.error('Erro ao contabilizar produtos:', error);
            return 0;
        });
        realizarContagem();


}


function preencherPerfil() {
    //dados do usuario
    const savedUser = JSON.parse(localStorage.getItem('usuarioLogado'));

    const perfilNome = document.getElementById("perfil-nome");
    const perfilEmail = document.getElementById("perfil-email");
    const perfilTelefone = document.getElementById("perfil-telefone");

    if (savedUser != null) {
        let nomeUsuarioTexto = JSON.stringify(savedUser.nome);
        nomeUsuarioTexto = nomeUsuarioTexto.replace(/"/g, "");
        let emailUsuarioTexto = JSON.stringify(savedUser.email);
        emailUsuarioTexto = emailUsuarioTexto.replace(/"/g, "");
        let telefoneUsuarioTexto = JSON.stringify(savedUser.telefone);
        telefoneUsuarioTexto = telefoneUsuarioTexto.replace(/"/g, "");



        perfilNome.textContent = nomeUsuarioTexto;
        perfilEmail.textContent = emailUsuarioTexto;
        perfilTelefone.textContent = telefoneUsuarioTexto;
    }

    //quantidade de anuncios
    var contAnuncios = -1;
    const totalAnuncios = document.getElementById("total-anuncios");
    var email = JSON.stringify(savedUser.email);
    email = email.replace(/"/g, "");

    if (!email) {
        return Promise.reject(new Error('Usuário não está logado ou email ausente.'));
    }

    fetch('http://localhost:3000/anunciosUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            const quantidadeAnuncios = data.quantidade;
            console.log('Resposta do servidor:', data);
            contAnuncios = quantidadeAnuncios;
            totalAnuncios.textContent = contAnuncios;
        })
        .catch(error => {
            console.error('Erro ao contabilizar produtos:', error);
            return 0;
        });
}

function preencherPaginaAnuncios() {
    const savedUser = JSON.parse(localStorage.getItem('usuarioLogado'));
    var contAnuncios = -1;
    const totalAnuncios = document.getElementById("total-anuncios");
    var email = JSON.stringify(savedUser.email);
    email = email.replace(/"/g, "");

    const grid = document.getElementById('products-grid');

    let produtos = {};

    if (!email) {
        return Promise.reject(new Error('Usuário não está logado ou email ausente.'));
    }


    fetch('http://localhost:3000/anunciosUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            const quantidadeAnuncios = data.quantidade;
            for (i = 0; i < quantidadeAnuncios; i++) {
                grid.innerHTML += `
                    <div onclick="showProductDetail()" class="product-card bg-white border rounded-3xl overflow-hidden cursor-pointer">
                        <img src="/img/template.png" class="w-full h-56 object-cover" alt="${data.titulo[i]}">
                        <div class="p-5">
                            <div class="flex justify-between items-start">
                                <h4 class="font-semibold text-lg">${data.titulo[i]}</h4>
                                <p class="text-emerald-600 font-bold">R$${data.preco[i].toFixed(2)}</p>
                            </div>
                            <p class="text-sm text-gray-500 mt-1">${data.descricao[i]}</p>
                        </div>
                    </div>`;
            }

        })
        .catch(error => {
            console.error('Erro ao contabilizar produtos:', error);
            return 0;
        });

}

function realizarContagem(){
    const graphContainer = document.getElementById('pie-chart');

    fetch('http://localhost:3000/contabilizar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro HTTP: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Resposta do servidor:', data);
                let dataForChart = data.resultados.map(item => [item.categoria, item.quantidade]);
                let chart = anychart.pie(dataForChart);
                chart.title("Quantidade de Anúncios por Categoria");
                chart.container('pie-chart');
                chart.draw();
            })
            .catch(error => {
                console.error('Erro ao contabilizar:', error);
                alert('Erro ao contabilizar. Verifique o console para detalhes.');
            });
    }




