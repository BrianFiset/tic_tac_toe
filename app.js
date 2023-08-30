const Player = (name, marker, win) => {
    return{name, marker};
};

const player1 = Player('Player 1', 'X',false);
const player2 = Player('Player 2', '0',false);

const gameBoard = (() => {
    let turn = player1
    const cells = document.querySelectorAll('.cells');
    cells.forEach(cell => cell.addEventListener('click', (e) => {
        if(e.target.innerText !== '' || player1.win || player2.win){
            return
        } if(turn === player1) {
            e.target.innerText = `${player1.marker}`;
            turn = player2
        } else if(turn === player2){
            e.target.innerText = `${player2.marker}`;
            turn = player1
        }
    }))
})();

const gameLogic = (() => {
    function allElementsSame(array, x){
        return array.every(element => element === x)
    }
    function win() {
        if(player1.win || player2.win) return
        const cells = document.querySelectorAll('.cells');
        const winConditions = [
            [cells[0].innerText,cells[1].innerText,cells[2].innerText],
            [cells[3].innerText,cells[4].innerText,cells[5].innerText],
            [cells[6].innerText,cells[7].innerText,cells[8].innerText],
            [cells[0].innerText,cells[3].innerText,cells[6].innerText],
            [cells[1].innerText,cells[4].innerText,cells[7].innerText],
            [cells[2].innerText,cells[5].innerText,cells[8].innerText],
            [cells[0].innerText,cells[4].innerText,cells[8].innerText],
            [cells[2].innerText,cells[4].innerText,cells[6].innerText]
        ]
        for(let i = 0; i < winConditions.length; i++) {
            if(allElementsSame(winConditions[i], player1.marker)){
                player1.win = true
                console.log(player1.name)
            } else if(allElementsSame(winConditions[i], player2.marker)){
                player2.win = true
                console.log(player2.name)
        }}
    }
    document.querySelector('#game-container').addEventListener('click', win)
})()