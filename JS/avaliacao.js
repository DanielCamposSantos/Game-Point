const avaliacoes = document.getElementsByClassName('avaliacao');

for (let i = 0; i < avaliacoes.length; i++) {
    const estrelas = '☆☆☆☆☆'.split('');
    avaliacoes[i].textContent = ''; 
    
    
    estrelas.forEach((star, index) => {
        const estrelasSpan = document.createElement('span');
        estrelasSpan.textContent = star;
        estrelasSpan.classList.add('estrelas');
        
        estrelasSpan.addEventListener('click', () => {
            const estrelasnaDiv = avaliacoes[i].getElementsByClassName('estrelas');
            for (let j = 0; j < estrelasnaDiv.length; j++) {
                if (j <= index) {
                    estrelasnaDiv[j].textContent = '★';
                    estrelasnaDiv[j].classList.add('full');
                    estrelasnaDiv[j].classList.remove('empty');
                } else {
                    estrelasnaDiv[j].textContent = '☆';
                    estrelasnaDiv[j].classList.add('empty');
                    estrelasnaDiv[j].classList.remove('full');
                }
            }
        });
        
        avaliacoes[i].appendChild(estrelasSpan);
    })
}