const botao = document.querySelector('.menu-header img[alt="botão de menu"]');
let menuAberto = false;

function abrirMenu() {
    if (menuAberto) return;
    
    const bloco = document.body;
    let item = document.createElement('div');
    item.classList.add('menu-oculto');
    item.id = 'menu-lateral';
    item.innerHTML = `
        <div id="menu-box">
            <img src="images/Logo/logo.png" alt="logo do gamepoint"
                class="logo">
            <img src="SVG/Sair.svg" alt="fechar menu" id="fechar-menu">
        </div>
        <ul>
            <li><a href="meu-perfil.html">Seu perfil</a></li>
            <li><a href="#">Busque por quadras</a></li>
            <li><a href="#">Histórico de partidas</a></li>
            <li><a href="#">Inicie uma partida agora</a></li>
            <li><a href="#">Avaliações</a></li>
            <li><a href="cadastro.html">Torne-se um anfitrião</a></li>
        </ul>
    `
    
    bloco.appendChild(item);
    
    const overlay = document.createElement('div');
    overlay.id = 'menu-overlay';
    document.body.appendChild(overlay);
    
    void item.offsetWidth;
    
    // Animar entrada
    setTimeout(() => {
        item.classList.add('menu-aberto');
        overlay.classList.add('overlay-ativo');
    }, 10);
    
    menuAberto = true;
    
    document.getElementById('fechar-menu').addEventListener('click', fecharMenu);
    overlay.addEventListener('click', fecharMenu);
    
    document.addEventListener('keydown', fecharComESC);
}

function fecharMenu() {
    if (!menuAberto) return;
    
    const menu = document.getElementById('menu-lateral');
    const overlay = document.getElementById('menu-overlay');
    
    if (menu) {
        menu.classList.remove('menu-aberto');
        menu.classList.add('menu-fechando');
        
        setTimeout(() => {
            if (menu.parentNode) {
                menu.parentNode.removeChild(menu);
            }
            if (overlay && overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
            menuAberto = false;
        }, 300);
    }
    
    document.removeEventListener('keydown', fecharComESC);
}

function fecharComESC(event) {
    if (event.key === 'Escape') {
        fecharMenu();
    }
}

botao.addEventListener('click', (e) => {
    e.stopPropagation();
    abrirMenu();
});

document.addEventListener('click', (e) => {
    const menu = document.getElementById('menu-lateral');
    if (menu && menuAberto && !menu.contains(e.target) && e.target.id !== 'menu') {
        fecharMenu();
    }
});

function verificarTamanhoTela() {
    if (window.innerWidth > 1360 && menuAberto) {
        fecharMenu();
    }
}

window.addEventListener('resize', verificarTamanhoTela);