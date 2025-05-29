const formNamePlayer = document.querySelector('#name-players');
const name1 = formNamePlayer.querySelector('#name-player1');
const name2 = formNamePlayer.querySelector('#name-player2');

const sectionTictactoe = document.querySelector('#tictactoe');
const frame = document.querySelectorAll('.frame');

const turnContainer = document.querySelector('#turn-container')

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

    function star(){
        actualPlayer = player1;
        turnContainer.textContent = player1.name + "'s turn";
    }

    function playRound(event){
        if (event.target.dataset.index){
                event.target.textContent = actualPlayer.mark;
                event.target.classList.add('disabled');

                if(winGame()){
                    turnContainer.textContent = actualPlayer.name + " wins!";
                    frame.forEach(frame => {
                        frame.removeEventListener('click', gameController.playRound);
                    });
                    return;
                };

                if (actualPlayer === player1){
                    actualPlayer = player2
                    turnContainer.textContent = player2.name + "'s turn";
                } else{
                    actualPlayer = player1
                    turnContainer.textContent = player1.name + "'s turn";
                }
                
        }
    }
    function winGame() {
        const winningCombinations = [
            ["0", "1", "2"],
            ["3", "4", "5"],
            ["6", "7", "8"],
            ["0", "3", "6"],
            ["1", "4", "7"],
            ["2", "5", "8"],
            ["0", "4", "8"],
            ["2", "4", "6"]
        ];
    
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (
                frame[a].textContent === actualPlayer.mark &&
                frame[b].textContent === actualPlayer.mark &&
                frame[c].textContent === actualPlayer.mark
            ) {
                alert(actualPlayer.name + " wins!");
            }
        }
    }
    return{
        star,
        playRound,
    }    
})();

formNamePlayer.addEventListener('submit', (e) => {
    e.preventDefault();
    player1 = makePlayer(name1.value, 'X');
    player2 = makePlayer(name2.value, 'O');
    formNamePlayer.classList.add('hidden');
    sectionTictactoe.classList.remove('hidden');
    gameController.star(player1, player2);
    frame.forEach(frame => {
        frame.addEventListener('click', gameController.playRound);
      });
});



