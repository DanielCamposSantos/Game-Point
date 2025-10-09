

addEventListener('click', (e) => {
    if (e.target.id === 'diminuirA') {
        diminuir(document.getElementById('placarA'))
    } else if (e.target.id === 'diminuirB') {
        diminuir(document.getElementById('placarB'))
    } else if (e.target.id === 'aumentarA') {
        aumentar(document.getElementById('placarA'))
    } else if (e.target.id === 'aumentarB') {
        aumentar(document.getElementById('placarB'))
    }
})

function diminuir(alvo) {
    let valor = Number(alvo.innerText) 
    valor -= 1
    valor < 0 ? valor = 0 : valor
    alvo.innerText = valor < 10 ? `0${valor.toString()}` : valor.toString()
}

function aumentar(alvo){
    let valor = Number(alvo.innerText) 
    valor += 1
    valor < 0 ? valor = 0 : valor
    alvo.innerText = valor < 10 ? `0${valor.toString()}` : valor.toString()
}