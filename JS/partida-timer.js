const meter = document.getElementById('meter-partida')
const previsao = document.getElementById('previsao')
const iniciarBtt = document.getElementById('iniciar')
const encerrarBtt = document.getElementById('encerrar')
const pausarBtt = document.getElementById('pausar')
const min = document.getElementById('min')
const seg = document.getElementById('seg')
const containerTempo = document.getElementById('tempo-container')

let segundos = 0
let minutos = 0
let intervalo = null
let pausado = false
let meterValue = 100 


meter.value = meterValue
meter.max = 100

function iniciar(){
    iniciarBtt.onclick = null;
    pausado = false;
    
    intervalo = setInterval(()=>{
        if (!pausado) {
            segundos += 1
            seg.innerText = segundos < 10 ? `0${segundos}` : segundos
            
            if(segundos >= 60){
                segundos = 0
                minutos += 1
                min.innerText = minutos < 10 ? `0${minutos}` : minutos
            }

        
            meterValue = Math.max(0, 100 - (minutos * 100 / 90))
            meter.value = meterValue
            
            if(meterValue <= 0){
                encerrar()
                return
            }

            if(minutos >= 90){
                encerrar()
            }
        }
    },1000)
}

function encerrar(){
    clearInterval(intervalo) 
    intervalo = null
    encerrarBtt.onclick = null
    pausarBtt.onclick = null
    seg.innerText = segundos < 10 ? `0${segundos}` : segundos
    min.innerText = minutos < 10 ? `0${minutos}` : minutos

    let item = document.createElement('div')
    item.innerText = "Partida Encerrada"
    item.classList.add('encerrar')
    containerTempo.appendChild(item)
}

function pausar(){
    pausado = !pausado 
    
    if (pausado) {
        pausarBtt.innerText= 'Retomar'
        seg.innerText = segundos < 10 ? `0${segundos}` : segundos
        min.innerText = minutos < 10 ? `0${minutos}` : minutos
    } else{
        pausarBtt.innerText= 'Pausar'
    }
}