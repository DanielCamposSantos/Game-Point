const avaliacoes = document.getElementsByClassName('avaliacao');

for (let i = 0; i < avaliacoes.length; i++) {
    const stars = '☆☆☆☆☆'.split('');
    avaliacoes[i].textContent = ''; 
    
    
    stars.forEach((star, index) => {
        const starSpan = document.createElement('span');
        starSpan.textContent = star;
        starSpan.classList.add('estrelas');
        
        starSpan.addEventListener('click', () => {
            const starsInDiv = avaliacoes[i].getElementsByClassName('estrelas');
            for (let j = 0; j < starsInDiv.length; j++) {
                if (j <= index) {
                    starsInDiv[j].textContent = '★';
                    starsInDiv[j].classList.add('full');
                    starsInDiv[j].classList.remove('empty');
                } else {
                    starsInDiv[j].textContent = '☆';
                    starsInDiv[j].classList.add('empty');
                    starsInDiv[j].classList.remove('full');
                }
            }
        });
        
        avaliacoes[i].appendChild(starSpan);
    })
}