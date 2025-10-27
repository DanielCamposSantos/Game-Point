
const loginContainer = document.getElementById('login');
const emailInput = document.getElementById('email');
const senhaInput = document.getElementById('senha');

function entrar() {
    // Remove qualquer mensagem existente
    const mensagemExistente = loginContainer.querySelector('.vazio');
    if (mensagemExistente) {
        mensagemExistente.remove();
    }
    
    if (emailInput.value && senhaInput.value) {
        window.location.href = 'pagina-principal.html';
    } else {
        const mensagemSpan = document.createElement('span');
        mensagemSpan.textContent = 'Insira o email e a senha para entrar';
        mensagemSpan.classList.add('vazio');
        
        loginContainer.insertBefore(mensagemSpan,document.getElementById('entrar'))
    }
}

