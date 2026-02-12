const nave = document.getElementById('nave');

let posicaoNave = 0; 
const velocidade = 5;
const velocidadeMissil = 8;
const larguraMissil = 70;
const velocidadeAlien = 2;
const intervaloSpawnAlien = 1200;

const teclasPressionadas = {
    esquerda: false,
    direita: false,
    atirar: false
};

let ultimoDisparo = 0;
const intervaloDisparo = 200;  
let aliensAtivos = 0;
const aliensDisplay = document.getElementById('aliens');
const vidasDisplay = document.getElementById('vidas');
let vidas = parseInt(vidasDisplay.textContent, 10) || 3;

window.addEventListener('load', function() {
    posicaoNave = (window.innerWidth / 2) - (nave.offsetWidth / 2);
    nave.style.left = posicaoNave + 'px';
    
     /* gameloop */
    setInterval(function() {
        const larguraTela = window.innerWidth;
        const larguraNave = nave.offsetWidth;
        
        if (teclasPressionadas.esquerda) {
            posicaoNave -= velocidade;
            if (posicaoNave < 0) {
                posicaoNave = 0;
            }  
        }
        
        if (teclasPressionadas.direita) {
            posicaoNave += velocidade;
            if (posicaoNave > larguraTela - larguraNave) {
                posicaoNave = larguraTela - larguraNave;
            }
        }
        
        nave.style.left = posicaoNave + 'px';
        
        if (teclasPressionadas.atirar) {
            const agora = Date.now();
            if (agora - ultimoDisparo > intervaloDisparo) {
                dispararMisseis();
                ultimoDisparo = agora;
            }
        }
    }, 15); /* sixseven fps */

    setInterval(function() {
        spawnAliens();
    }, intervaloSpawnAlien);
});

function spawnAliens() {
    const alien = document.createElement('div');
    alien.className = 'alien';

    const larguraAlien = 100;
    const maxLeft = Math.max(0, window.innerWidth - larguraAlien);
    const posicaoX = Math.floor(Math.random() * (maxLeft + 1));

    alien.style.left = posicaoX + 'px';
    alien.style.top = '-80px';

    document.body.appendChild(alien);
    aliensAtivos += 1;
    aliensDisplay.textContent = String(aliensAtivos);

    function removerAlien() {
        if (!alien.isConnected) {
            return;
        }
        alien.remove();
        aliensAtivos = Math.max(0, aliensAtivos - 1);
        aliensDisplay.textContent = String(aliensAtivos);
    }

    const intervalo = setInterval(function() {
        let posicaoAtual = parseInt(alien.style.top, 10);
        alien.style.top = (posicaoAtual + velocidadeAlien) + 'px';

        const misseis = document.querySelectorAll('.missil');
        for (let i = 0; i < misseis.length; i += 1) {
            const missil = misseis[i];
            if (colisao(missil, alien)) {
                missil.remove();
                clearInterval(intervalo);
                removerAlien();
                return;
            }
        }

        if (colisao(nave, alien)) {
            clearInterval(intervalo);
            removerAlien();
            vidas = Math.max(0, vidas - 1);
            vidasDisplay.textContent = String(vidas);
            return;
        }

        if (posicaoAtual > window.innerHeight) {
            clearInterval(intervalo);
            removerAlien();
        }
    }, 20);
}

function dispararMisseis() {
    const larguraNave = nave.offsetWidth; 
    
    const canhaoEsquerdo = 35; 
    const canhaoDireito = 115; 
    
    const posicaoEsquerda = posicaoNave + canhaoEsquerdo - (larguraMissil / 2);
    
    const posicaoDireita = posicaoNave + canhaoDireito - (larguraMissil / 2);
    
    criarMissil(posicaoEsquerda);
    criarMissil(posicaoDireita);
}

function colisao(a, b) {
    const ra = a.getBoundingClientRect();
    const rb = b.getBoundingClientRect();
    return !(
        ra.right < rb.left ||
        ra.left > rb.right ||
        ra.bottom < rb.top ||
        ra.top > rb.bottom
    );
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
    if (evento.key === 'ArrowLeft' || evento.key === 'a') {
        teclasPressionadas.esquerda = true;
    }
    
    if (evento.key === 'ArrowRight' || evento.key === 'd') {
        teclasPressionadas.direita = true;
    }
    
    if (evento.key === ' ') {
        evento.preventDefault();
        teclasPressionadas.atirar = true;
    }
});

document.addEventListener('keyup', function(evento) {
    if (evento.key === 'ArrowLeft' || evento.key === 'a') {
        teclasPressionadas.esquerda = false;
    }
    
    if (evento.key === 'ArrowRight' || evento.key === 'd') {
        teclasPressionadas.direita = false;
    }
    
    if (evento.key === ' ') {
        evento.preventDefault();
        teclasPressionadas.atirar = false;
    }
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