const emailInput = document.getElementById('email')
const senhaInput = document.getElementById('senha')
const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
const email = emailInput.value
const senha = senhaInput.value

addEventListener('click',(e)=>{
    if (e.target.id === 'entrar'){
        alert(email)
    }
})