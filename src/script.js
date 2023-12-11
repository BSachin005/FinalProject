document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const startBtn = document.getElementById('startBtn');
    const newGameBtn = document.getElementById('newGameBtn');
    const timer = document.getElementById('timer');
    const container = document.getElementById('container');
    const gridSize = 5;
    let intervalId;
    let seconds = 0;

    // Create the initial board
    createBoard();

    // Function to create the initial board
    function createBoard() {
        for (let i = 0; i < gridSize * gridSize; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.addEventListener('click', () => toggleCell(cell));
            board.appendChild(cell);
        }
    }

    // Function to toggle the state of a cell
    function toggleCell(cell) {
        cell.classList.toggle('is-off');
        toggleNeighbors(cell);
        checkWin();
    }

    // Function to toggle the state of neighboring cells
    function toggleNeighbors(cell) {
        const index = Array.from(board.children).indexOf(cell);
        const row = Math.floor(index / gridSize);
        const col = index % gridSize;

        const neighbors = [
            { row: row, col: col },
            { row: row - 1, col: col },
            { row: row + 1, col: col },
            { row: row, col: col - 1 },
            { row: row, col: col + 1 }
        ];

        neighbors.forEach(neighbor => {
            const neighborIndex = neighbor.row * gridSize + neighbor.col;
            const neighborCell = board.children[neighborIndex];
            if (neighborCell) {
                neighborCell.classList.toggle('is-off');
            }
        });
    }

    // Function to randomize the board while keeping it solvable
    function randomizeBoard() {
        for (let i = 0; i < gridSize * gridSize; i++) {
            if (Math.random() > 0.5) {
                const cell = board.children[i];
                toggleCell(cell);
            }
        }
    }

    // Function to check if the player has won
    function checkWin() {
        const cells = board.getElementsByClassName('cell');
        const isSolved = Array.from(cells).every(cell => !cell.classList.contains('is-off'));
        if (isSolved) {
            clearInterval(intervalId);
            window.alert(`You win! Time taken: ${seconds} seconds`);
            // Optionally, reset the board or perform other actions
        }
    }

    // Event listener for the "Start Game" button
    startBtn.addEventListener('click', () => {
        resetBoard();
        resetTimer();
        startTimer();
        randomizeBoard();
    });

    // Event listener for the "New Game" button
    newGameBtn.addEventListener('click', () => {
        resetBoard();
        resetTimer();
    });

    // Function to reset the board
    function resetBoard() {
        const cells = board.getElementsByClassName('cell');
        Array.from(cells).forEach(cell => cell.classList.remove('is-off'));
    }

    // Function to start the timer
    function startTimer() {
        intervalId = setInterval(() => {
            seconds++;
            timer.textContent = `Time: ${seconds}s`;
        }, 1000);
    }

    // Function to reset the timer
    function resetTimer() {
        clearInterval(intervalId);
        seconds = 0;
        timer.textContent = `Time: ${seconds}s`;
    }
});
