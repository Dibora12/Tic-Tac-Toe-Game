// script.js
const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const restart = document.getElementById('restart');
let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

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

const handleCellClick = (event) => {
    const cell = event.target;
    const cellIndex = parseInt(cell.dataset.index);

    if (gameState[cellIndex] !== '' || !gameActive) {
        return;
    }

    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    handleResultValidation();
};

const handleResultValidation = () => {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningCombinations[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        status.textContent = `Player ${currentPlayer} has won!`;
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes('');
    if (roundDraw) {
        status.textContent = "It's a draw!";
        gameActive = false;
        return;
    }

    handlePlayerChange();
};

const handlePlayerChange = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
};

const handleRestartGame = () => {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    status.textContent = `Player X's turn`;
    cells.forEach(cell => {
        cell.textContent = '';
    });
};

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restart.addEventListener('click', handleRestartGame);