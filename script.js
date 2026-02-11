
const nave = document.getElementById('nave');


let posicaoNave = (window.innerWidth / 2) - (nave.offsetWidth / 2); 
const velocidade = 10;


nave.style.left = posicaoNave + 'px';


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