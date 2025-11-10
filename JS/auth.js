const loginContainer = document.getElementById('login-section');
const emailInput = document.getElementById('email');
const senhaInput = document.getElementById('senha');
const entrarBtn = document.getElementById('entrar');

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function entrar() {
    const mensagensErro = document.querySelectorAll('.vazio');
    mensagensErro.forEach(erro => erro.remove());
    
    emailInput.style.borderColor = '#E3E3E3';
    senhaInput.style.borderColor = '#E3E3E3';
    emailInput.placeholder = 'Insira seu e-mail';
    senhaInput.placeholder = 'Insira sua senha';
    
    const email = emailInput.value.trim();
    const senha = senhaInput.value.trim();
    
    if (!email) {
        const mensagemErro = document.createElement('span');
        mensagemErro.textContent = 'Por favor, insira seu e-mail';
        mensagemErro.classList.add('vazio');
        mensagemErro.style.display = 'block';
        mensagemErro.style.marginBottom = '15px';
        mensagemErro.style.color = 'red';
        mensagemErro.style.fontSize = '14px';
        
        loginContainer.insertBefore(mensagemErro, entrarBtn);
        emailInput.style.borderColor = 'red';
        return;
    }
    
    if (!validarEmail(email)) {
        const mensagemErro = document.createElement('span');
        mensagemErro.textContent = 'Por favor, insira um e-mail válido';
        mensagemErro.classList.add('vazio');
        mensagemErro.style.display = 'block';
        mensagemErro.style.marginBottom = '15px';
        mensagemErro.style.color = 'red';
        mensagemErro.style.fontSize = '14px';
        
        loginContainer.insertBefore(mensagemErro, entrarBtn);
        emailInput.style.borderColor = 'red';
        return;
    }
    
    if (!senha) {
        const mensagemErro = document.createElement('span');
        mensagemErro.textContent = 'Por favor, insira sua senha';
        mensagemErro.classList.add('vazio');
        mensagemErro.style.display = 'block';
        mensagemErro.style.marginBottom = '15px';
        mensagemErro.style.color = 'red';
        mensagemErro.style.fontSize = '14px';
        
        loginContainer.insertBefore(mensagemErro, entrarBtn);
        senhaInput.style.borderColor = 'red';
        return;
    }
    
    entrarBtn.textContent = 'Entrando...';
    entrarBtn.style.backgroundColor = '#666';
    entrarBtn.disabled = true;
    
    setTimeout(() => {
        window.location.href = 'pagina-principal.html';
    }, 1000);
}

emailInput.addEventListener('input', function() {
    const erro = document.querySelector('.vazio');
    if (erro) erro.remove();
    emailInput.style.borderColor = '#E3E3E3';
});

senhaInput.addEventListener('input', function() {
    const erro = document.querySelector('.vazio');
    if (erro) erro.remove();
    senhaInput.style.borderColor = '#E3E3E3';
});

emailInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        entrar();
    }
});

senhaInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        entrar();
    }
});