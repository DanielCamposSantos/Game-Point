document.addEventListener("DOMContentLoaded", () => {
    // Sistema de tabs
    const btnJogador = document.getElementById('btn-jogador');
    const btnAnfitriao = document.getElementById('btn-anfitriao');
    const formJogador = document.getElementById('form-jogador');
    const formAnfitriao = document.getElementById('form-anfitriao');

    function switchForm(activeButton, activeForm) {
        [btnJogador, btnAnfitriao].forEach(btn => btn.classList.remove('active'));
        [formJogador, formAnfitriao].forEach(form => form.classList.remove('active'));

        activeButton.classList.add('active');
        activeForm.classList.add('active');
    }

    btnJogador.addEventListener('click', () => switchForm(btnJogador, formJogador));
    btnAnfitriao.addEventListener('click', () => switchForm(btnAnfitriao, formAnfitriao));

    switchForm(btnJogador, formJogador);

    setupFormValidation('jogador');
    setupFormValidation('anfitriao');

    function setupFormValidation(formType) {
        const form = document.getElementById(`form-${formType}`);
        const nome = document.getElementById(`nome-${formType}`);
        const email = document.getElementById(`email-${formType}`);
        const telefone = document.getElementById(`telefone-${formType}`);
        const documento = document.getElementById(`${formType === 'jogador' ? 'cpf' : 'documento'}-${formType}`);
        const senha = document.getElementById(`senha-${formType}`);

        if (telefone) addSimpleMask(telefone, "phone");
        if (documento && formType === 'jogador') addSimpleMask(documento, "cpf");
        if (documento && formType === 'anfitriao') addSimpleMask(documento, "cnpj-cpf");

        if (nome) nome.addEventListener("input", () => validarCampo(nome, validarNomeCompleto));
        if (email) email.addEventListener("input", () => validarCampo(email, validarEmail));
        if (telefone) telefone.addEventListener("input", () => validarCampo(telefone, validarTelefone));
        if (documento) documento.addEventListener("input", () => {
            if (formType === 'jogador') {
                validarCampo(documento, validarCPF);
            } else {
                validarCampo(documento, validarDocumentoAnfitriao);
            }
        });
        if (senha) senha.addEventListener("input", () => {
            validarSenha(senha, formType);
            validarCampo(senha, validarSenhaForca);
        });

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const campos = [nome, email, telefone, documento, senha];
            let isValid = true;

            campos.forEach(campo => {
                if (campo) {
                    let resultado;
                    switch(campo.id) {
                        case `nome-${formType}`:
                            resultado = validarNomeCompleto(campo.value);
                            break;
                        case `email-${formType}`:
                            resultado = validarEmail(campo.value);
                            break;
                        case `telefone-${formType}`:
                            resultado = validarTelefone(campo.value);
                            break;
                        case `cpf-${formType}`:
                        case `documento-${formType}`:
                            resultado = formType === 'jogador' ? validarCPF(campo.value) : validarDocumentoAnfitriao(campo.value);
                            break;
                        case `senha-${formType}`:
                            resultado = validarSenhaForca(campo.value);
                            break;
                    }
                    
                    if (resultado && !resultado.ok) {
                        isValid = false;
                        mostrarErro(campo, resultado.msg);
                    } else {
                        limparErro(campo);
                    }
                }
            });

            if (isValid) {
                alert(`Cadastro de ${formType} enviado com sucesso!`);
                form.reset();
            }
        });
    }

    function validarCampo(campo, validacaoFn) {
        const resultado = validacaoFn(campo.value);
        if (resultado.ok) {
            limparErro(campo);
        } else {
            mostrarErro(campo, resultado.msg);
        }
        return resultado.ok;
    }

    function validarNomeCompleto(value) {
        if (!value) return { ok: false, msg: "Nome é obrigatório." };
        const partes = value.trim().split(/\s+/).filter(Boolean);
        if (partes.length < 2) return { ok: false, msg: "Informe nome e sobrenome." };
        return { ok: true, msg: "" };
    }

    function validarEmail(value) {
        if (!value) return { ok: false, msg: "E-mail é obrigatório." };
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        return re.test(value) ? { ok: true, msg: "" } : { ok: false, msg: "Formato de e-mail inválido." };
    }

    function validarTelefone(value) {
        if (!value) return { ok: false, msg: "Telefone é obrigatório." };
        const digits = value.replace(/\D/g, "");
        return digits.length >= 10 && digits.length <= 11 ? { ok: true, msg: "" } : { ok: false, msg: "Telefone inválido." };
    }

    function validarCPF(value) {
        const digits = value.replace(/\D/g, "");
        return digits.length === 11 ? { ok: true, msg: "" } : { ok: false, msg: "CPF deve ter 11 dígitos." };
    }

    function validarDocumentoAnfitriao(value) {
        const digits = value.replace(/\D/g, "");
        return digits.length === 11 || digits.length === 14 ? { ok: true, msg: "" } : { ok: false, msg: "CPF deve ter 11 dígitos ou CNPJ 14 dígitos." };
    }

    function validarSenhaForca(value) {
        if (!value) return { ok: false, msg: "Senha é obrigatória." };
        return value.length >= 6 ? { ok: true, msg: "" } : { ok: false, msg: "Senha deve ter pelo menos 6 caracteres." };
    }

    function validarSenha(senha, formType) {
        const meter = document.getElementById(`senha-meter-${formType}`);
        const feedback = document.getElementById(`senha-feedback-${formType}`);
        
        let forca = 0;
        if (senha.value.length >= 8) forca++;
        if (/[A-Z]/.test(senha.value) && /[a-z]/.test(senha.value)) forca++;
        if (/\d/.test(senha.value)) forca++;
        if (/[^A-Za-z0-9]/.test(senha.value)) forca++;
        
        if (meter) meter.value = forca;
        if (feedback) {
            let texto = "";
            let cor = "#d32f2f";
            
            if (forca === 0) texto = "";
            else if (forca === 1) texto = "Senha fraca";
            else if (forca === 2) texto = "Senha média";
            else if (forca === 3) texto = "Senha boa";
            else texto = "Senha forte";
            
            if (forca >= 3) cor = "#2e7d32";
            else if (forca === 2) cor = "#fbc02d";
            
            feedback.textContent = texto;
            feedback.style.color = cor;
        }
    }

    function mostrarErro(campo, mensagem) {
        let feedback = campo.nextElementSibling;
        if (!feedback || !feedback.classList.contains('validation-feedback')) {
            feedback = document.createElement('div');
            feedback.className = 'validation-feedback';
            campo.parentNode.insertBefore(feedback, campo.nextSibling);
        }
        feedback.textContent = mensagem;
        campo.style.borderColor = '#d32f2f';
    }

    function limparErro(campo) {
        const feedback = campo.nextElementSibling;
        if (feedback && feedback.classList.contains('validation-feedback')) {
            feedback.textContent = '';
        }
        campo.style.borderColor = '#ccc';
    }

    function addSimpleMask(el, pattern) {
        el.addEventListener("input", () => {
            const digits = el.value.replace(/\D/g, "");
            
            if (pattern === "phone") {
                if (digits.length <= 2) el.value = digits;
                else if (digits.length <= 6) el.value = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
                else if (digits.length <= 10) el.value = `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
                else el.value = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
            } 
            else if (pattern === "cpf") {
                let s = digits.slice(0, 11);
                if (s.length > 3) s = s.slice(0, 3) + "." + s.slice(3);
                if (s.length > 7) s = s.slice(0, 7) + "." + s.slice(7);
                if (s.length > 11) s = s.slice(0, 11) + "-" + s.slice(11, 13);
                el.value = s;
            }
            else if (pattern === "cnpj-cpf") {
                if (digits.length <= 11) {
                    // CPF
                    let s = digits.slice(0, 11);
                    if (s.length > 3) s = s.slice(0, 3) + "." + s.slice(3);
                    if (s.length > 7) s = s.slice(0, 7) + "." + s.slice(7);
                    if (s.length > 11) s = s.slice(0, 11) + "-" + s.slice(11, 13);
                    el.value = s;
                } else {
                    // CNPJ
                    let s = digits.slice(0, 14);
                    if (s.length > 2) s = s.slice(0, 2) + "." + s.slice(2);
                    if (s.length > 6) s = s.slice(0, 6) + "." + s.slice(6);
                    if (s.length > 10) s = s.slice(0, 10) + "/" + s.slice(10);
                    if (s.length > 15) s = s.slice(0, 15) + "-" + s.slice(15, 17);
                    el.value = s;
                }
            }
        });
    }
});