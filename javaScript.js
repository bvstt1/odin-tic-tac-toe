const formNamePlayer = document.querySelector('#name-players');
const name1 = formNamePlayer.querySelector('#name-player1');
const name2 = formNamePlayer.querySelector('#name-player2');

const sectionTictactoe = document.querySelector('#tictactoe');
const frame = document.querySelectorAll('.frame');

const turnContainer = document.querySelector('#turn-container')
const resetButton = document.querySelector('#reset-button');

function makePlayer(name, mark){
    return {
        name,
        mark,
        turn(){
            return this.name + "'s turn";
        }
    }
}

let player1, player2;


const gameController = (function(){
    let actualPlayer;
    let gameOver = false;

    function star(){
        actualPlayer = player1;
        gameOver = false;
        turnContainer.textContent = player1.name + "'s turn";
    }

    function playRound(event){
        if (gameOver){
            return; // No permitir más jugadas si ya se ganó
        } 
        if (event.target.dataset.index && !event.target.classList.contains('disabled')) {
            event.target.textContent = actualPlayer.mark;
            event.target.classList.add('disabled');

            if (winGame()) {
                turnContainer.textContent = actualPlayer.name + " wins!";
                gameOver = true;
                resetButton.classList.remove('hidden');
                resetButton.addEventListener('click', () => {
                resetButton.classList.add('hidden');
                gameController.star();
                    frame.forEach(frame => {
                    frame.textContent = '';
                    frame.classList.remove('disabled');
            });
        });
                return; // No cambiar de jugador
            }

            // Cambiar jugador solo si no ganó
            actualPlayer = (actualPlayer === player1) ? player2 : player1;
            turnContainer.textContent = actualPlayer.name + "'s turn";
        }
    }

    function winGame() {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (
                frame[a].textContent === actualPlayer.mark &&
                frame[b].textContent === actualPlayer.mark &&
                frame[c].textContent === actualPlayer.mark
            ) {
                return true; // Hay ganador
            }
        }
        return false;
    }
    function resetGame(){
        frame.forEach(frame => {
            frame.textContent = '';
            frame.classList.remove('disabled');
        });
        gameOver = false;
        star();
    }

    return {
        star,
        playRound
    }    
})();


formNamePlayer.addEventListener('submit', (e) => {
    e.preventDefault();

    // Crear jugadores y asignarlos globalmente
    player1 = makePlayer(name1.value || "Jugador 1", 'X');
    player2 = makePlayer(name2.value || "Jugador 2", 'O');

    // Mostrar la sección del juego
    formNamePlayer.classList.add('hidden');
    sectionTictactoe.classList.remove('hidden');

    // Iniciar el juego con los nuevos jugadores
    gameController.star();

    // Agregar eventos a cada casilla solo una vez
    frame.forEach(f => {
        f.textContent = ''; // limpiar si hay algo residual
        f.classList.remove('disabled');
        f.removeEventListener('click', gameController.playRound); // evitar múltiples listeners
        f.addEventListener('click', gameController.playRound);
    });
});



