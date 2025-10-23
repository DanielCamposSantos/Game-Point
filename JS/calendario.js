const calendario = document.getElementById('calendario')
const avancarMes = document.getElementById('avancar')
const voltarMes = document.getElementById('voltar')
const mesAno = document.getElementById('mes-ano')
const data = new Date()
const diaSemana = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"]
const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]


let mesAtual = data.getMonth()
let anoAtual = data.getFullYear()
let datasIndisponiveis = new Map()

addEventListener('DOMContentLoaded', () => {
    gerarIndisponibilidadeAleatoria()
    atualizarData()
    atualizarCalendario()
    criarCaixaHorarios()
})

function atualizarData() {
    mesAno.innerHTML = `${meses[mesAtual]} ${anoAtual}`
}

function avancar() {
    mesAtual += 1
    if (mesAtual > 11) {
        anoAtual += 1
        mesAtual = 0
    }
    atualizarData()
    atualizarCalendario()
}

function voltar() {
    mesAtual -= 1
    if (mesAtual < 0) {
        anoAtual -= 1
        mesAtual = 11
    }
    atualizarData()
    atualizarCalendario()
}

function gerarIndisponibilidadeAleatoria() {
    const ultimoDia = new Date(anoAtual, mesAtual + 1, 0).getDate()
    const qtdIndisponivel = Math.floor(Math.random() * 6) + 5
    
    for (let i = 0; i < qtdIndisponivel; i++) {
        const dia = Math.floor(Math.random() * ultimoDia) + 1
        const horariosIndisponiveis = []
        const qtdHorariosIndisponiveis = Math.floor(Math.random() * 3) + 1
        const horarios = ["08:00", "11:00", "14:00", "17:00"]
        
        for (let j = 0; j < qtdHorariosIndisponiveis; j++) {
            const indiceAleatorio = Math.floor(Math.random() * horarios.length)
            horariosIndisponiveis.push(horarios.splice(indiceAleatorio, 1)[0])
        }
        
        datasIndisponiveis.set(`${mesAtual}-${dia}`, horariosIndisponiveis)
    }
}

function atualizarCalendario() {
    calendario.innerHTML = ''
    const dataMes = new Date(anoAtual, mesAtual)
    const ultimoDia = new Date(anoAtual, mesAtual + 1, 0).getDate()

    for (let i = 0; i < 7; i++) {
        let item = document.createElement('div')
        item.textContent = diaSemana[i]
        calendario.appendChild(item)
    }

    for (let i = 0; i < 42; i++) {
        let item = document.createElement('div')
        const diaAtual = i - dataMes.getDay() + 1
        
        item.setAttribute('id', `dia-${diaAtual}`)
        item.addEventListener('click', seletorData)
        
        if (diaAtual <= 0 || diaAtual > ultimoDia) {
            item.classList.add("vazio")
        } else {
            const chaveData = `${mesAtual}-${diaAtual}`
            if (datasIndisponiveis.has(chaveData)) {
                item.classList.add("dia-indisponivel")
            } else {
                item.classList.add("dia-disponivel")
            }
            item.textContent = diaAtual
        }
        
        calendario.appendChild(item)
    }
}

function criarCaixaHorarios() {
    const caixaHorarios = document.createElement('section')
    caixaHorarios.id = 'reserva-box'
    caixaHorarios.style.display = 'none'
    
    caixaHorarios.innerHTML = `
        <h3>Selecione um horário</h3>
        <ul id="horarios"></ul>
        <button>Fazer reserva</button>
    `
    
    calendario.parentNode.appendChild(caixaHorarios)
}

function atualizarHorarios(diaSelecionado) {
    const listaHorarios = document.querySelector('#horarios')
    const chaveData = `${mesAtual}-${diaSelecionado}`
    const horariosIndisponiveis = datasIndisponiveis.get(chaveData) || []
    const horarios = ["08:00", "11:00", "14:00", "17:00"]
    
    listaHorarios.innerHTML = ''
    
    horarios.forEach(horario => {
        const itemLista = document.createElement('li')
        const estaIndisponivel = horariosIndisponiveis.includes(horario)
        itemLista.textContent = horario
        itemLista.className = estaIndisponivel ? 'horario-indisponivel' : 'horario-disponivel'
        
        if (!estaIndisponivel) {
            itemLista.addEventListener('click', seletorHorario)
        }
        
        listaHorarios.appendChild(itemLista)
    })
}

function seletorHorario(evento) {
    const horarios = document.querySelectorAll('#horarios li')
    horarios.forEach(horario => {
        horario.classList.remove('horario-selecionado')
    })
    evento.target.classList.remove('horario-disponivel')
    evento.target.classList.add('horario-selecionado')
}

function seletorData(evento) {
    if (!evento.target.classList.contains('dia-disponivel')) return
    
    const diasSelecionados = calendario.querySelectorAll('.dia-selecionado')
    diasSelecionados.forEach(dia => {
        dia.classList.remove('dia-selecionado')
    })
    
    evento.target.classList.add('dia-selecionado')
    
    const caixaReserva = document.getElementById('reserva-box')
    caixaReserva.style.display = 'flex'
    
    atualizarHorarios(evento.target.textContent)
}











