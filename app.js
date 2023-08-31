const Player = (name, marker, win) => {
    return{name, marker, win};
};

const player1 = Player('Player 1', 'X',false);
const player2 = Player('Player 2', 'O',false);

const gameBoard = (() => {
    let turn = player1;
    const cells = document.querySelectorAll('.cells');
    cells.forEach(cell => cell.addEventListener('click', (e) => {
        if(e.target.innerText !== '' || player1.win || player2.win){
            return
        } if(turn === player1) {
            e.target.innerText = `${player1.marker}`;
            turn = player2;
        } else if(turn === player2){
            e.target.innerText = `${player2.marker}`;
            turn = player1;
        };
    }));
})();

const gameLogic = (() => {
    const cells = document.querySelectorAll('.cells');
    const gameOverScreen = document.querySelector('.game-over');
    const winner = document.querySelector('.winner');
    const retryBtn = document.querySelector('.play-again');

    const allElementsSame = (array, x) => {
        return array.every(element => element === x);
    };

    const tie = () => {
        const cellsArray = [
            cells[0].innerText,cells[1].innerText,cells[2].innerText,
            cells[3].innerText,cells[4].innerText,cells[5].innerText,
            cells[6].innerText,cells[7].innerText,cells[8].innerText
        ];
        return cellsArray.every(element => (element === player1.marker || element === player2.marker));
    };

    const gameOver = () =>{
        gameOverScreen.classList.add('flex');
        cells.forEach(cell => cell.classList.add('blur'));
        if(player1.win) {
            winner.textContent = `${player1.name} has Won the Game`
        }else if(player2.win){
            winner.textContent = `${player2.name} has Won the Game`
        } else {
            winner.textContent = `Tied`
        }
    };
    
    const startGame = () => {
        gameOverScreen.classList.remove('flex');
        cells.forEach(cell => cell.classList.remove('blur'));
        cells.forEach(cell => cell.innerText = '');
        player1.win = false;
        player2.win = false;
    };

    retryBtn.addEventListener('click', startGame)

    const win = () => {
        if(player1.win || player2.win) return
        const winConditions = [
            [cells[0].innerText,cells[1].innerText,cells[2].innerText],
            [cells[3].innerText,cells[4].innerText,cells[5].innerText],
            [cells[6].innerText,cells[7].innerText,cells[8].innerText],
            [cells[0].innerText,cells[3].innerText,cells[6].innerText],
            [cells[1].innerText,cells[4].innerText,cells[7].innerText],
            [cells[2].innerText,cells[5].innerText,cells[8].innerText],
            [cells[0].innerText,cells[4].innerText,cells[8].innerText],
            [cells[2].innerText,cells[4].innerText,cells[6].innerText]
        ];
        for(let i = 0; i < winConditions.length; i++) {
            if(allElementsSame(winConditions[i], player1.marker)){
                player1.win = true;
                gameOver();
            } else if(allElementsSame(winConditions[i], player2.marker)){
                player2.win = true;
                gameOver();
            } else if(tie()){
                gameOver();
            };
        };
    };
    document.querySelector('#game-container').addEventListener('click', win);
})();