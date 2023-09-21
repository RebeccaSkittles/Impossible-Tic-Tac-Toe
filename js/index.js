// Variables to store the current game state
const board = ['', '', '', '', '', '', '', '', ''];
const player = 'O'; // Player's marker
const computer = 'X'; // Computer's marker

// Function to check if the game is over
function isGameOver() {
  // Check for winning conditions
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return true; // Game is won
    }
  }

  // Check for a draw (board is full)
  if (!board.includes('')) {
    return true; // Game is a draw
  }

  return false; // Game is not over
}

// Function to check if a move is valid
function isValidMove(index) {
  // Check if the board position is empty
  return board[index] === '';
}

// Function to make the computer's move
function computerMove() {
  // Try to win if possible
  for (let i = 0; i < board.length; i++) {
    if (isValidMove(i)) {
      board[i] = computer;
      if (isGameOver()) {
        return i;
      }
      board[i] = ''; // Reset the move
    }
  }

  // Try to block the player from winning
  for (let i = 0; i < board.length; i++) {
    if (isValidMove(i)) {
      board[i] = player;
      if (isGameOver()) {
        // Block the player by taking this move
        board[i] = computer;
        return i;
      }
      board[i] = ''; // Reset the move
    }
  }

  // If no winning or blocking moves, make a random move
  while (true) {
    const randomIndex = Math.floor(Math.random() * 9);
    if (isValidMove(randomIndex)) {
      return randomIndex;
    }
  }
}

// Function to update the game state and the display
function updateGame(index, marker) {
  board[index] = marker;
  // Implement logic to update the game display here
  // For simplicity, you can add the marker text to the cell with the corresponding index
  const cellElement = document.getElementById(`cell${index + 1}`);
  if (cellElement) {
    cellElement.textContent = marker;
  }
}

function resetGame() {
    for (let i = 0; i < board.length; i++) {
      board[i] = ''; // Clear the board
      const cellElement = document.getElementById(`cell${i + 1}`);
      if (cellElement) {
        cellElement.textContent = ''; // Clear the display
      }
    }
    // Reset hint count to 3
    hintCount = 3;
    updateHintButtonText(); // Update the hint button text
    // Hide the status box
    const statusBox = document.querySelector('.status-box');
    if (statusBox) {
      statusBox.style.display = 'none';
    }
  }
  

// Hide the status box initially
const statusBox = document.querySelector('.status-box');
if (statusBox) {
  statusBox.style.display = 'none';
}

// Function to check if the game is over and update the status box
function checkGameOverAndUpdateStatus() {
    if (isGameOver()) {
      // Check for winning conditions for the player (O)
      if (
        (board[0] === player && board[1] === player && board[2] === player) ||
        (board[3] === player && board[4] === player && board[5] === player) ||
        (board[6] === player && board[7] === player && board[8] === player) ||
        (board[0] === player && board[3] === player && board[6] === player) ||
        (board[1] === player && board[4] === player && board[7] === player) ||
        (board[2] === player && board[5] === player && board[8] === player) ||
        (board[0] === player && board[4] === player && board[8] === player) ||
        (board[2] === player && board[4] === player && board[6] === player)
      ) {
        updateStatusBoxText('You have won the game!');
      }
      // Check for winning conditions for the computer (X)
      else if (
        (board[0] === computer && board[1] === computer && board[2] === computer) ||
        (board[3] === computer && board[4] === computer && board[5] === computer) ||
        (board[6] === computer && board[7] === computer && board[8] === computer) ||
        (board[0] === computer && board[3] === computer && board[6] === computer) ||
        (board[1] === computer && board[4] === computer && board[7] === computer) ||
        (board[2] === computer && board[5] === computer && board[8] === computer) ||
        (board[0] === computer && board[4] === computer && board[8] === computer) ||
        (board[2] === computer && board[4] === computer && board[6] === computer)
      ) {
        updateStatusBoxText('The computer has won...');
      } else {
        updateStatusBoxText('It\'s a draw! Nobody has won the game.');
      }
    }
  }    

// Event listener for the close button
const closeButton = document.querySelector('.close-button');
if (closeButton) {
  closeButton.addEventListener('click', () => {
    const statusBox = document.querySelector('.status-box');
    if (statusBox) {
      statusBox.style.display = 'none';
    }
  });
}

// Function to update the status box text
function updateStatusBoxText(text, backgroundColor) {
  const statusBox = document.querySelector('.status-box');
  if (statusBox) {
    statusBox.textContent = text;
    statusBox.style.backgroundColor = backgroundColor;
    statusBox.style.display = 'block';
  }
}

// Add event listeners to cells "cell1" through "cell9"
for (let i = 1; i <= 9; i++) {
  const cell = document.getElementById(`cell${i}`);
  if (cell) {
    cell.addEventListener('click', () => {
      if (isValidMove(i - 1) && !isGameOver()) {
        updateGame(i - 1, player);
        if (!isGameOver()) {
          const computerIndex = computerMove();
          updateGame(computerIndex, computer);
        }
        checkGameOverAndUpdateStatus();
      }
    });
  }
}

// Function to provide a hint to the player
let hintCount = 3; // Number of available hints

// Function to update the hint button text
function updateHintButtonText() {
  const hintButton = document.getElementById('hint-button');
  if (hintButton) {
    hintButton.textContent = `Hint (${hintCount})`; // Update the button text
    if (hintCount === 0) {
      hintButton.style.color = 'red'; // Change text color to red when hintCount is 0
      hintButton.disabled = true; // Disable the button when hintCount is 0
    } else {
      hintButton.style.color = ''; // Reset text color
      hintButton.disabled = false; // Enable the button
    }
  }
}

function provideHint() {
  if (hintCount > 0) {
    const emptyCells = [];
    for (let i = 0; i < board.length; i++) {
      if (isValidMove(i)) {
        emptyCells.push(i);
      }
    }

    if (emptyCells.length > 0) {
      const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      const hintedCell = document.getElementById(`cell${randomIndex + 1}`);
      if (hintedCell) {
        hintedCell.style.backgroundColor = 'lightgreen'; // Highlight the cell
        setTimeout(() => {
          hintedCell.style.backgroundColor = ''; // Remove the green background color after a delay
        }, 1000); // Adjust the delay time as needed
      }
      hintCount--;
      updateHintButtonText(); // Update the hint button text
    }
  }
}

// Add event listener to the Hint button
const hintButton = document.getElementById('hint-button');
if (hintButton) {
  hintButton.addEventListener('click', provideHint);
  updateHintButtonText(); // Update the hint button text initially
}

// Add an event listener to the Reset Board button
const resetButton = document.getElementById('reset-button');
if (resetButton) {
  resetButton.addEventListener('click', resetGame);
}

// Initialize the game
resetGame();
