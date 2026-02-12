const nave = document.getElementById('nave');

let posicaoNave = 0; 
const velocidade = 10;
const velocidadeMissil = 8;
const larguraMissil = 70; 

window.addEventListener('load', function() {
    posicaoNave = (window.innerWidth / 2) - (nave.offsetWidth / 2);
    nave.style.left = posicaoNave + 'px';
});

function dispararMisseis() {
    const larguraNave = nave.offsetWidth; 
    
    const canhaoEsquerdo = 35; 
    const canhaoDireito = 115; 
    
    const posicaoEsquerda = posicaoNave + canhaoEsquerdo - (larguraMissil / 2);
    
    const posicaoDireita = posicaoNave + canhaoDireito - (larguraMissil / 2);
    
    criarMissil(posicaoEsquerda);
    criarMissil(posicaoDireita);
}

function criarMissil(posicaoX) {
    const missil = document.createElement('div');
    missil.className = 'missil';
    
    missil.style.left = posicaoX + 'px';
    missil.style.bottom = nave.offsetHeight + 20 + 'px';
    
    document.body.appendChild(missil);
    
    const intervalo = setInterval(function() {
        let posicaoAtual = parseInt(missil.style.bottom);
        missil.style.bottom = (posicaoAtual + velocidadeMissil) + 'px';
        
        if (posicaoAtual > window.innerHeight) {
            clearInterval(intervalo);
            missil.remove();
        }
    }, 20);
}

document.addEventListener('keydown', function(evento) {
    const larguraTela = window.innerWidth;
    const larguraNave = nave.offsetWidth;
    
    if (evento.key === 'ArrowLeft' || evento.key === 'a') {
        posicaoNave -= velocidade;
        if (posicaoNave < 0) {
            posicaoNave = 0;
        }
    }
    
    if (evento.key === 'ArrowRight' || evento.key === 'd') {
        posicaoNave += velocidade;
        if (posicaoNave > larguraTela - larguraNave) {
            posicaoNave = larguraTela - larguraNave;
        }
    }
    
    if (evento.key === ' ') {
        evento.preventDefault();
        dispararMisseis();
    }
    
    nave.style.left = posicaoNave + 'px';
});

let segundos = 0;
const tempoDisplay = document.getElementById('tempo');

setInterval(function() {
    segundos++;
    
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const segs = segundos % 60;
    
    tempoDisplay.textContent = 
        String(horas).padStart(2, '0') + ':' +
        String(minutos).padStart(2, '0') + ':' +
        String(segs).padStart(2, '0');
}, 1000);