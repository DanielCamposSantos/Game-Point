document.addEventListener("DOMContentLoaded", () => {
    const jogadorBtn = document.getElementById('btn-jogador');
    const anfitriaoBtn = document.getElementById('btn-anfitriao');
    const jogadorForm = document.getElementById('form-jogador');
    const anfitriaoForm = document.getElementById('form-anfitriao');

    function mostrarForm(btnAtivo, formAtivo) {
        jogadorBtn.classList.remove('active');
        anfitriaoBtn.classList.remove('active');
        jogadorForm.classList.remove('active');
        anfitriaoForm.classList.remove('active');

        btnAtivo.classList.add('active');
        formAtivo.classList.add('active');
    }

    jogadorBtn.addEventListener('click', () => mostrarForm(jogadorBtn, jogadorForm));
    anfitriaoBtn.addEventListener('click', () => mostrarForm(anfitriaoBtn, anfitriaoForm));

    mostrarForm(jogadorBtn, jogadorForm);

    function validarFormulario(tipo) {
        const form = document.getElementById(`form-${tipo}`);
        const nome = document.getElementById(`nome-${tipo}`);
        const email = document.getElementById(`email-${tipo}`);
        const telefone = document.getElementById(`telefone-${tipo}`);
        const senha = document.getElementById(`senha-${tipo}`);
        
        let documento;
        if (tipo === 'jogador') {
            documento = document.getElementById('cpf-jogador');
        } else {
            documento = document.getElementById('documento-anfitriao');
        }

        if (telefone) mascaraTelefone(telefone);
        if (documento && tipo === 'jogador') mascaraCPF(documento);
        if (documento && tipo === 'anfitriao') mascaraDocumento(documento);

        if (nome) nome.addEventListener("input", () => validarNome(nome));
        if (email) email.addEventListener("input", () => validarEmail(email));
        if (telefone) telefone.addEventListener("input", () => validarTelefone(telefone));
        if (documento) documento.addEventListener("input", () => {
            if (tipo === 'jogador') {
                validarCPF(documento);
            } else {
                validarDocumento(documento);
            }
        });
        if (senha) senha.addEventListener("input", () => validarSenha(senha));

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const camposValidos = [];
            
            if (nome) camposValidos.push(validarNome(nome));
            if (email) camposValidos.push(validarEmail(email));
            if (telefone) camposValidos.push(validarTelefone(telefone));
            if (documento) {
                if (tipo === 'jogador') {
                    camposValidos.push(validarCPF(documento));
                } else {
                    camposValidos.push(validarDocumento(documento));
                }
            }
            if (senha) camposValidos.push(validarSenha(senha));

            const todosValidos = camposValidos.every(campo => campo === true);

            if (todosValidos) {
                alert(`Cadastro de ${tipo} enviado com sucesso!`);
                form.reset();
            }
        });
    }

    function validarNome(campo) {
        const valor = campo.value.trim();
        const temNomeSobrenome = valor.split(' ').length >= 2;
        
        if (!valor) {
            mostrarErro(campo, "Nome é obrigatório");
            return false;
        }
        
        if (!temNomeSobrenome) {
            mostrarErro(campo, "Digite nome e sobrenome");
            return false;
        }
        
        limparErro(campo);
        return true;
    }

    function validarEmail(campo) {
        const valor = campo.value;
        const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!valor) {
            mostrarErro(campo, "E-mail é obrigatório");
            return false;
        }
        
        if (!formatoEmail.test(valor)) {
            mostrarErro(campo, "E-mail inválido");
            return false;
        }
        
        limparErro(campo);
        return true;
    }

    function validarTelefone(campo) {
        const digitos = campo.value.replace(/\D/g, "");
        
        if (!campo.value) {
            mostrarErro(campo, "Telefone é obrigatório");
            return false;
        }
        
        if (digitos.length < 10 || digitos.length > 11) {
            mostrarErro(campo, "Telefone inválido");
            return false;
        }
        
        limparErro(campo);
        return true;
    }

    function validarCPF(campo) {
        const digitos = campo.value.replace(/\D/g, "");
        
        if (!campo.value) {
            mostrarErro(campo, "CPF é obrigatório");
            return false;
        }
        
        if (digitos.length !== 11) {
            mostrarErro(campo, "CPF deve ter 11 dígitos");
            return false;
        }
        
        limparErro(campo);
        return true;
    }

    function validarDocumento(campo) {
        const digitos = campo.value.replace(/\D/g, "");
        
        if (!campo.value) {
            mostrarErro(campo, "Documento é obrigatório");
            return false;
        }
        
        if (digitos.length !== 11 && digitos.length !== 14) {
            mostrarErro(campo, "CPF deve ter 11 dígitos ou CNPJ 14 dígitos");
            return false;
        }
        
        limparErro(campo);
        return true;
    }

    function validarSenha(campo) {
        if (!campo.value) {
            mostrarErro(campo, "Senha é obrigatória");
            return false;
        }
        
        if (campo.value.length < 6) {
            mostrarErro(campo, "Senha deve ter pelo menos 6 caracteres");
            return false;
        }
        
        limparErro(campo);
        return true;
    }

    function mostrarErro(campo, mensagem) {
        let erroDiv = campo.nextElementSibling;
        if (!erroDiv || !erroDiv.classList.contains('erro')) {
            erroDiv = document.createElement('div');
            erroDiv.className = 'erro';
            campo.parentNode.insertBefore(erroDiv, campo.nextSibling);
        }
        erroDiv.textContent = mensagem;
        campo.style.borderColor = 'red';
    }

    function limparErro(campo) {
        const erroDiv = campo.nextElementSibling;
        if (erroDiv && erroDiv.classList.contains('erro')) {
            erroDiv.textContent = '';
        }
        campo.style.borderColor = '#ccc';
    }

    function mascaraTelefone(campo) {
        campo.addEventListener("input", () => {
            const digitos = campo.value.replace(/\D/g, "");
            
            if (digitos.length <= 2) {
                campo.value = digitos;
            } else if (digitos.length <= 6) {
                campo.value = `(${digitos.slice(0, 2)}) ${digitos.slice(2)}`;
            } else if (digitos.length <= 10) {
                campo.value = `(${digitos.slice(0, 2)}) ${digitos.slice(2, 6)}-${digitos.slice(6)}`;
            } else {
                campo.value = `(${digitos.slice(0, 2)}) ${digitos.slice(2, 7)}-${digitos.slice(7, 11)}`;
            }
        });
    }

    function mascaraCPF(campo) {
        campo.addEventListener("input", () => {
            const digitos = campo.value.replace(/\D/g, "");
            let valorFormatado = digitos.slice(0, 11);
            
            if (valorFormatado.length > 3) valorFormatado = valorFormatado.slice(0, 3) + "." + valorFormatado.slice(3);
            if (valorFormatado.length > 7) valorFormatado = valorFormatado.slice(0, 7) + "." + valorFormatado.slice(7);
            if (valorFormatado.length > 11) valorFormatado = valorFormatado.slice(0, 11) + "-" + valorFormatado.slice(11, 13);
            
            campo.value = valorFormatado;
        });
    }

    function mascaraDocumento(campo) {
        campo.addEventListener("input", () => {
            const digitos = campo.value.replace(/\D/g, "");
            let valorFormatado = digitos.slice(0, 14);
            
            if (digitos.length <= 11) {
                if (valorFormatado.length > 3) valorFormatado = valorFormatado.slice(0, 3) + "." + valorFormatado.slice(3);
                if (valorFormatado.length > 7) valorFormatado = valorFormatado.slice(0, 7) + "." + valorFormatado.slice(7);
                if (valorFormatado.length > 11) valorFormatado = valorFormatado.slice(0, 11) + "-" + valorFormatado.slice(11, 13);
            } else {
                if (valorFormatado.length > 2) valorFormatado = valorFormatado.slice(0, 2) + "." + valorFormatado.slice(2);
                if (valorFormatado.length > 6) valorFormatado = valorFormatado.slice(0, 6) + "." + valorFormatado.slice(6);
                if (valorFormatado.length > 10) valorFormatado = valorFormatado.slice(0, 10) + "/" + valorFormatado.slice(10);
                if (valorFormatado.length > 15) valorFormatado = valorFormatado.slice(0, 15) + "-" + valorFormatado.slice(15, 17);
            }
            
            campo.value = valorFormatado;
        });
    }

    validarFormulario('jogador');
    validarFormulario('anfitriao');
});