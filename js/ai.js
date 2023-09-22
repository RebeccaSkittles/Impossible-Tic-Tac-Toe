// Define your initial board and other necessary variables
let winningMoves = [];

// Function to get the winning combinations
function getWinningCombos(marker) {
    const combos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6], // Diagonals
        [2, 1, 0], [5, 4, 3], [8, 7, 6], // Reverse Rows
        [6, 3, 0], [7, 4, 1], [8, 5, 2], // Reverse Columns
        [8, 4, 0], [6, 4, 2] // Reverse Diagonals
    ];

    // Filter out combos that do not contain the marker
    return combos.filter(combo => combo.every(index => board[index] === marker));
}

// Function to check if a move is valid
function isValidMove(index) {
    // Check if the board position is empty
    return board[index] === '';
}

// Function to update winning moves for the computer based on 'O' positions
function updateWinningMovesForComputer() {
    // Get the current positions of 'O' on the board
    const oPositions = [];
    for (let i = 0; i < board.length; i++) {
        if (board[i] === 'O') {
            oPositions.push(i);
        }
    }

    // Define the player's marker
    const playerMarker = (computer === 'X') ? 'O' : 'X';

    // Function to check if a move leads to a win
    function isWinningMove(index, marker) {
        const boardCopy = [...board];
        boardCopy[index] = marker;
        return isGameOver(boardCopy, marker);
    }

    // Iterate through each winning combo
    for (const combo of getWinningCombos(computer)) {
        let emptyCell = -1; // Initialize as an invalid value
        let oCount = 0; // Count of 'O' in the current combination

        // Check each cell in the combo
        for (const cellIndex of combo) {
            if (board[cellIndex] === playerMarker) {
                // If player marker is in the combo, it's not a winning move for the computer
                return;
            } else if (board[cellIndex] === 'O') {
                oCount++;
            } else if (board[cellIndex] === '') {
                emptyCell = cellIndex;
            }
        }

        // If there are two 'O's in the combo and an empty cell, it's a possible winning move
        if (oCount === 2 && emptyCell !== -1) {
            // Check if it's already a winning move for the computer
            if (!isWinningMove(emptyCell, computer)) {
                winningMoves.push(emptyCell);
            }
        }
    }
}

// Function to make the computer's move
function computerMove() {
    // Call the function to update winning moves for the computer based on 'O' positions
    updateWinningMovesForComputer();

    // Define the player's marker
    const playerMarker = (computer === 'X') ? 'O' : 'X';

    // Function to check if a move leads to a win
    function isWinningMove(index, marker) {
        const boardCopy = [...board];
        boardCopy[index] = marker;
        return isGameOver(boardCopy, marker);
    }

    // Function to check if a move leads to a fork
    function isForkMove(index, marker) {
        const boardCopy = [...board];
        boardCopy[index] = marker;
        const winningCombos = getWinningCombos(marker);

        let forkCount = 0;
        for (const combo of winningCombos) {
            if (combo.filter((i) => boardCopy[i] === '').length === 2) {
                forkCount++;
            }
        }

        return forkCount >= 2;
    }

    // Function to predict the player's winning move and counter it
    function predictAndCounterWinningMove(playerMarker) {
        for (let i = 0; i < board.length; i++) {
            if (isValidMove(i)) {
                board[i] = playerMarker;
                if (isWinningMove(i, playerMarker)) {
                    // Counter the player's winning move by taking this move
                    board[i] = computer;
                    return i;
                }
                board[i] = ''; // Reset the move
            }
        }
        return -1; // No winning move to counter
    }

    // Predict and counter the player's winning move if possible
    const counterMove = predictAndCounterWinningMove(playerMarker);
    if (counterMove !== -1) {
        return counterMove;
    }

    // Try to win if possible
    for (let i = 0; i < board.length; i++) {
        if (isValidMove(i)) {
            board[i] = computer;
            if (isWinningMove(i, computer)) {
                return i;
            }
            board[i] = ''; // Reset the move
        }
    }

    // Try to block the player from winning
    for (let i = 0; i < board.length; i++) {
        if (isValidMove(i)) {
            board[i] = playerMarker;
            if (isWinningMove(i, playerMarker)) {
                // Block the player by taking this move
                board[i] = computer;
                return i;
            }
            board[i] = ''; // Reset the move
        }
    }

    // Try to create a fork for the computer
    for (let i = 0; i < board.length; i++) {
        if (isValidMove(i)) {
            board[i] = computer;
            if (isForkMove(i, computer)) {
                return i;
            }
            board[i] = ''; // Reset the move
        }
    }

    // Try to block the player from creating a fork
    for (let i = 0; i < board.length; i++) {
        if (isValidMove(i)) {
            board[i] = playerMarker;
            if (isForkMove(i, playerMarker)) {
                // Block the player by taking this move
                board[i] = computer;
                return i;
            }
            board[i] = ''; // Reset the move
        }
    }

    // If the center cell is empty, take it
    if (isValidMove(4)) {
        return 4;
    }

    // If no winning, blocking, or forking moves, make a random move
    while (true) {
        const randomIndex = Math.floor(Math.random() * 9);
        if (isValidMove(randomIndex)) {
            return randomIndex;
        }
    }
}
