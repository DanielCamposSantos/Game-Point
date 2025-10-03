document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".registration-form");
  const nome = document.getElementById("nome");
  const email = document.getElementById("email");
  const telefone = document.getElementById("telefone");
  const cpf = document.getElementById("cpf");
 

  function ensureFeedback(el) {
    let next = el.nextElementSibling;
    if (!next || !next.classList || !next.classList.contains("validation-feedback")) {
      const span = document.createElement("div");
      span.className = "validation-feedback";
      span.style.color = "#d32f2f";
      span.style.marginTop = "6px";
      span.style.fontSize = "0.9rem";
      el.insertAdjacentElement("afterend", span);
      return span;
    }
    return next;
  }

  function validarNomeCompleto(value) {
    if (!value) return { ok: false, msg: "Nome é obrigatório." };
    const partes = value.trim().split(/\s+/).filter(Boolean);
    if (partes.length < 2) return { ok: false, msg: "Informe nome e sobrenome." };
    if (partes.some(p => p.length < 2)) return { ok: false, msg: "Cada parte do nome deve ter ao menos 2 caracteres." };
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
    if (digits.length < 8 || digits.length > 11) return { ok: false, msg: "Telefone inválido." };
    return { ok: true, msg: "" };
  }

  function validarCPF(value) {
    const somaParser = (arr, multInit) => {
      return arr.reduce((acc, num, idx) => acc + Number(num) * (multInit - idx), 0);
    };
    const onlyNumbers = value.replace(/\D/g, "");
    if (!onlyNumbers) return { ok: false, msg: "CPF é obrigatório." };
    if (onlyNumbers.length !== 11) return { ok: false, msg: "CPF deve ter 11 dígitos." };
    if (/^(\d)\1+$/.test(onlyNumbers)) return { ok: false, msg: "CPF inválido." };

    const nums = onlyNumbers.split("");
    const firstNine = nums.slice(0, 9);
    const d1 = 11 - (somaParser(firstNine, 10) % 11);
    const dig1 = d1 >= 10 ? 0 : d1;
    if (Number(nums[9]) !== dig1) return { ok: false, msg: "CPF inválido." };

    const firstTen = nums.slice(0, 10);
    const d2 = 11 - (somaParser(firstTen, 11) % 11);
    const dig2 = d2 >= 10 ? 0 : d2;
    if (Number(nums[10]) !== dig2) return { ok: false, msg: "CPF inválido." };

    return { ok: true, msg: "" };
  }

  function avaliarForcaSenha(value) {
    let score = 0;
    if (!value) return { score: 0, label: "Vazia" };
    if (value.length >= 8) score++;
    if (/[A-Z]/.test(value) && /[a-z]/.test(value)) score++;
    if (/\d/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;
    let label = "Fraca";
    if (score >= 3) label = "Forte";
    else if (score === 2) label = "Média";
    return { score, label };
  }

  function atualizarFeedback(inputEl, result) {
    const fb = ensureFeedback(inputEl);
    if (result.ok) {
      fb.textContent = "";
      fb.style.display = "none";
      inputEl.style.borderColor = "#cfcfcf";
    } else {
      fb.textContent = result.msg;
      fb.style.display = "block";
      inputEl.style.borderColor = "#d32f2f";
    }
  }

  nome.addEventListener("input", () => {
    atualizarFeedback(nome, validarNomeCompleto(nome.value));
  });
  email.addEventListener("input", () => {
    atualizarFeedback(email, validarEmail(email.value));
  });
  telefone.addEventListener("input", () => {
    atualizarFeedback(telefone, validarTelefone(telefone.value));
  });
  cpf.addEventListener("input", () => {
    atualizarFeedback(cpf, validarCPF(cpf.value));
  });

  const senhaFeedback = () => {
    const meter = document.getElementById("senha-meter");
    const feedback = document.getElementById("senha-feedback");
    if (!senha) return;
    const { score, label } = avaliarForcaSenha(senha.value);
    if (meter) meter.value = score;
    if (feedback) {
      feedback.textContent = senha.value ? `Força: ${label}` : "";
      feedback.style.color = score >= 3 ? "#2e7d32" : "#d32f2f";
    }
    const fbEl = ensureFeedback(senha);
    if (score < 2) {
      fbEl.textContent = "Senha muito fraca (mínimo 8 caracteres, misturar maiúsculas/minúsculas, números).";
      senha.style.borderColor = "#d32f2f";
    } else {
      fbEl.textContent = "";
      senha.style.borderColor = "#cfcfcf";
    }
  };
  if (senha) senha.addEventListener("input", senhaFeedback);

  form.addEventListener("submit", (e) => {
    const vNome = validarNomeCompleto(nome.value);
    const vEmail = validarEmail(email.value);
    const vTel = validarTelefone(telefone.value);
    const vCPF = validarCPF(cpf.value);
    const errors = [];
    atualizarFeedback(nome, vNome); if (!vNome.ok) errors.push("nome");
    atualizarFeedback(email, vEmail); if (!vEmail.ok) errors.push("email");
    atualizarFeedback(telefone, vTel); if (!vTel.ok) errors.push("telefone");
    atualizarFeedback(cpf, vCPF); if (!vCPF.ok) errors.push("cpf");

    if (senha) {
      const { score } = avaliarForcaSenha(senha.value);
      const fb = ensureFeedback(senha);
      if (score < 2) {
        fb.textContent = "Senha insuficiente.";
        senha.style.borderColor = "#d32f2f";
        errors.push("senha");
      } else {
        fb.textContent = "";
      }
    }

    if (errors.length) {
      e.preventDefault();
      const firstErr = form.querySelector(".validation-feedback:not(:empty)");
      if (firstErr) firstErr.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
     
    }
  });

  function addSimpleMask(el, pattern) {
    el.addEventListener("input", () => {
      const digits = el.value.replace(/\D/g, "");
      if (pattern === "phone") {
        if (digits.length <= 2) el.value = digits;
        else if (digits.length <= 6) el.value = `(${digits.slice(0,2)}) ${digits.slice(2)}`;
        else if (digits.length <= 10) el.value = `(${digits.slice(0,2)}) ${digits.slice(2,6)}-${digits.slice(6)}`;
        else el.value = `(${digits.slice(0,2)}) ${digits.slice(2,7)}-${digits.slice(7,11)}`;
      } else if (pattern === "cpf") {
        let s = digits;
        if (s.length > 3) s = s.slice(0,3) + "." + s.slice(3);
        if (s.length > 7) s = s.slice(0,7) + "." + s.slice(7);
        if (s.length > 11) s = s.slice(0,11) + "-" + s.slice(11,13);
        el.value = s;
      }
    });
  }
  addSimpleMask(telefone, "phone");
  addSimpleMask(cpf, "cpf");
});
