const Player = (name, marker) => {
    return{name, marker};
};

const player1 = Player('Player 1', 'X');
const player2 = Player('Player 2', '0');

const gameBoard = (() => {
    let turn = player1
    const cells = document.querySelectorAll('.cells');
    cells.forEach(cell => cell.addEventListener('click', (e) => {
        if(e.target.innerText !== ''){
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