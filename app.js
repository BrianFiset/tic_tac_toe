const Player = (name, marker, ai) => {
    return{name, marker, win: false, ai: ai};
};

const player1 = Player('Player 1', 'X');
const player2 = Player('Player 2', 'O', 'easy');

const gameBoard = (() => {
    let playerTurn = player1;
    const cells = document.querySelectorAll('.cells');
    cells.forEach(cell => cell.addEventListener('click', (e) => {
        if(e.target.innerText !== '' || player1.win || player2.win){
            return
        } if(playerTurn === player1) {
            e.target.innerText = `${player1.marker}`;
            playerTurn = player2;
            gameLogic.win();
            if(player1.win || player2.win) return
            if(player2.ai === 'easy'){
                gameAi.easyMode();
                playerTurn = player1;
            };
        } else if(playerTurn === player2){
            console.log(playerTurn)
            e.target.innerText = `${player2.marker}`;
            playerTurn = player1;
        };
    }));
    return{cells, playerTurn}
})();

const gameAi = (() => {
    const cellsArray = Array.prototype.slice.call(gameBoard.cells);
    const randomNumber = (x) => {
        return Math.floor(Math.random() * x);
    }
    const easyMode = () => {
        const emptyCells = cellsArray.filter(cell => cell.innerText === '');
        if(emptyCells.length === 0) return
        emptyCells[randomNumber(emptyCells.length)].innerText = player2.marker;
        gameLogic.win();
    }

    return{easyMode}
})()


const gameLogic = (() => {
    const cells = document.querySelectorAll('.cells');
    const gameOverScreen = document.querySelector('.game-over');
    const winner = document.querySelector('.winner');
    const retryBtn = document.querySelector('.play-again');

    const allElementsSame = (array, x) => {
        return array.every(element => element === x);
    };

    const randomNumber = (number) => {
        return Math.floor(Math.random() * number)
    };

    const cellsArray = () => {
        const cellArray = [
            cells[0].innerText,cells[1].innerText,cells[2].innerText,
            cells[3].innerText,cells[4].innerText,cells[5].innerText,
            cells[6].innerText,cells[7].innerText,cells[8].innerText
        ];
        return cellArray
    }

    const tie = () => {
        return cellsArray().every(element => (element === player1.marker || element === player2.marker));
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
    return {cellsArray,allElementsSame, randomNumber, win}
})();