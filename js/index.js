// Variables to store the current game state
const board = ['', '', '', '', '', '', '', '', ''];
const player = 'O'; // Player's marker
const computer = 'X'; // Computer's marker

// Sound Effects
const winAudio = new Audio("mp3/win.mp3");
const clickAudio = new Audio("mp3/click.mp3");
const loseAudio = new Audio("mp3/lose.mp3");
const resetAudio = new Audio("mp3/reset.mp3");
const hintAudio = new Audio("mp3/hint.mp3");
const errorAudio = new Audio("mp3/error.mp3");

// Show chnage log
// Function to show the changelog
function showChangelog() {
  const changelog = document.querySelector('.changelog');
  if (changelog) {
    changelog.style.display = 'block';
  }
}

// Add an event listener to the button with id 'txtbtn'
const txtbtn = document.getElementById('txtbtn');
if (txtbtn) {
  txtbtn.addEventListener('click', showChangelog);
}

// Save the positions of 'X' and 'O' on the board to local storage
function savePlayerWinningMove() {
    const playerXPositions = getPositionsOnBoard(board, 'X');
    const playerOPositions = getPositionsOnBoard(board, 'O');
    
    // Store these positions, you can choose how to store them (e.g., in an array)
    const playerWinningMove = {
        XPositions: playerXPositions,
        OPositions: playerOPositions,
    };

    // Retrieve the current number of wins from local storage
    const currentWinCount = localStorage.getItem('winCount') || 0;

    // Increment the win count
    const newWinCount = parseInt(currentWinCount) + 1;
    
    // Example: Storing in local storage with an incrementing key (e.g., 'win1', 'win2', etc.)
    localStorage.setItem(`win${newWinCount}`, JSON.stringify(playerWinningMove));
    localStorage.setItem('winCount', newWinCount);
}


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

function winConfetti() {
    const duration = 12 * 1000; // Duration of the confetti effect in milliseconds (5 seconds)
    const options = {
      particleCount: 600, // Number of confetti particles
      spread: 200, // Spread of the particles
    };
  
    // Trigger the confetti effect
    confetti(options);
  
    // Remove confetti after the specified duration
    setTimeout(() => {
      confetti.reset();
    }, duration);
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
        resetAudio.play();
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
        winAudio.play();
        winConfetti();
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
        loseAudio.play();
      } else {
        updateStatusBoxText('It\'s a draw! Nobody has won the game.');
        loseAudio.play();
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
        clickAudio.play();
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

// Function to check if the player can win in one move
function canPlayerWin() {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] === player && board[b] === player && isValidMove(c)) {
      return c; // Return the winning move
    }
    if (board[b] === player && board[c] === player && isValidMove(a)) {
      return a; // Return the winning move
    }
    if (board[c] === player && board[a] === player && isValidMove(b)) {
      return b; // Return the winning move
    }
  }

  return -1; // Player can't win in one move
}

// Function to provide a hint to the player
function provideHint() {
    if (hintCount > 0) {
      // Priority 1: Check if the player can win, and give the player a winning move
      const playerWinningMove = canPlayerWin();
      if (playerWinningMove !== -1) {
        const hintedCell = document.getElementById(`cell${playerWinningMove + 1}`);
        if (hintedCell) {
          hintedCell.style.backgroundColor = 'lightgreen'; // Highlight the cell
          setTimeout(() => {
            hintedCell.style.backgroundColor = ''; // Remove the green background color after a delay
          }, 1000); // Adjust the delay time as needed
        }
        hintCount--;
        updateHintButtonText(); // Update the hint button text
        return; // Exit the function
        }
    // Priority 2: If the computer is in a winning position, block it
    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (board[a] === computer && board[b] === computer && isValidMove(c)) {
        const hintedCell = document.getElementById(`cell${c + 1}`);
        if (hintedCell) {
          hintedCell.style.backgroundColor = 'lightgreen'; // Highlight the cell
          setTimeout(() => {
            hintedCell.style.backgroundColor = ''; // Remove the green background color after a delay
          }, 1000); // Adjust the delay time as needed
        }
        hintCount--;
        updateHintButtonText(); // Update the hint button text
        return; // Exit the function
      }
      if (board[b] === computer && board[c] === computer && isValidMove(a)) {
        const hintedCell = document.getElementById(`cell${a + 1}`);
        if (hintedCell) {
          hintedCell.style.backgroundColor = 'lightgreen'; // Highlight the cell
          setTimeout(() => {
            hintedCell.style.backgroundColor = ''; // Remove the green background color after a delay
          }, 1000); // Adjust the delay time as needed
        }
        hintCount--;
        updateHintButtonText(); // Update the hint button text
        return; // Exit the function
      }
      if (board[c] === computer && board[a] === computer && isValidMove(b)) {
        const hintedCell = document.getElementById(`cell${b + 1}`);
        if (hintedCell) {
          hintedCell.style.backgroundColor = 'lightgreen'; // Highlight the cell
          setTimeout(() => {
            hintedCell.style.backgroundColor = ''; // Remove the green background color after a delay
          }, 1000); // Adjust the delay time as needed
        }
        hintCount--;
        updateHintButtonText(); // Update the hint button text
        return; // Exit the function
      }
    }

    // Priority 3: If there are 2 or more winning possibilities for the computer, choose randomly
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
        hintAudio.play();
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

// Function to detect controller connection
function detectController() {
    const gamepads = navigator.getGamepads();
    for (const gamepad of gamepads) {
        if (gamepad) {
            // A controller is connected
            return gamepad;
        }
    }
    return null; // No controller detected
}

let lastButtonPressTime = 0; // Variable to track the time of the last button press
const buttonPressDelay = 500; // Delay time in milliseconds (0.5 seconds)

let highlightedCell = 4; // Start with cell 5 (middle)
let joystickEnabled = true; // Enable joystick input

let lastJoystickMoveTime = 0; // Variable to track the time of the last joystick movement
const joystickMoveDelay = 200; // Delay time in milliseconds (0.2 seconds)
const joystickThreshold = 0.5; // Adjust the threshold as needed
const cellHighlightColor = '#d1bd9b'; // Cell highlight color

// Function to highlight the current cell
function highlightCurrentCell() {
    // Implement highlighting logic here
    // Change the background color of the cell to cellHighlightColor
    const currentHighlightedCell = document.getElementById(`cell${highlightedCell + 1}`);
    if (currentHighlightedCell) {
        currentHighlightedCell.style.backgroundColor = cellHighlightColor;
    }
}

// Function to clear cell highlighting
function clearCellHighlight() {
    // Implement clearing highlighting logic here
    // Reset the background color of all cells
    for (let i = 0; i < 9; i++) {
        const cell = document.getElementById(`cell${i + 1}`);
        if (cell) {
            cell.style.backgroundColor = '';
        }
    }
}

// Handle Controller Input
function handleControllerInput() {
    const controller = detectController();
    let hintButtonPressed = false; // Track if the B button was pressed

    if (controller) {
        // Handle input from the controller
        const leftJoystickX = controller.axes[0];
        const leftJoystickY = controller.axes[1];

        // Check if the joystick is moved in the X-axis
        if (leftJoystickX > joystickThreshold && joystickEnabled) {
            // Move the highlighted cell to the right
            highlightedCell = (highlightedCell + 1) % 9;
            clearCellHighlight(); // Clear previous highlighting
            highlightCurrentCell(); // Highlight the current cell
            joystickEnabled = false; // Disable joystick for a moment
            setTimeout(() => {
                joystickEnabled = true; // Re-enable joystick after a delay
            }, joystickMoveDelay); // Adjust the delay time in milliseconds (e.g., 200ms)
        } else if (leftJoystickX < -joystickThreshold && joystickEnabled) {
            // Move the highlighted cell to the left
            highlightedCell = (highlightedCell - 1 + 9) % 9;
            clearCellHighlight(); // Clear previous highlighting
            highlightCurrentCell(); // Highlight the current cell
            joystickEnabled = false; // Disable joystick for a moment
            setTimeout(() => {
                joystickEnabled = true; // Re-enable joystick after a delay
            }, joystickMoveDelay); // Adjust the delay time in milliseconds (e.g., 200ms)
        }

        // Check if the joystick is moved in the Y-axis (inverted)
        if (leftJoystickY < -joystickThreshold && joystickEnabled) {
            // Move the highlighted cell upward
            highlightedCell = (highlightedCell - 3 + 9) % 9;
            clearCellHighlight(); // Clear previous highlighting
            highlightCurrentCell(); // Highlight the current cell
            joystickEnabled = false; // Disable joystick for a moment
            setTimeout(() => {
                joystickEnabled = true; // Re-enable joystick after a delay
            }, joystickMoveDelay); // Adjust the delay time in milliseconds (e.g., 200ms)
        } else if (leftJoystickY > joystickThreshold && joystickEnabled) {
            // Move the highlighted cell downward
            highlightedCell = (highlightedCell + 3) % 9;
            clearCellHighlight(); // Clear previous highlighting
            highlightCurrentCell(); // Highlight the current cell
            joystickEnabled = false; // Disable joystick for a moment
            setTimeout(() => {
                joystickEnabled = true; // Re-enable joystick after a delay
            }, joystickMoveDelay); // Adjust the delay time in milliseconds (e.g., 200ms)
        }

        // Get the current time
        const currentTime = Date.now();

        // Check for button presses (e.g., A, X, B)
        if (controller.buttons[0].pressed) {
            // A button pressed, place O
    if (currentTime - lastButtonPressTime >= buttonPressDelay) {
        const selectedCellIndex = highlightedCell;
        if (isValidMove(selectedCellIndex) && !isGameOver()) {
            // Place the "O" marker for the player
            updateGame(selectedCellIndex, player);

            // Check if the game is over
            if (!isGameOver()) {
                // Computer's turn
                const computerIndex = computerMove();
                updateGame(computerIndex, computer);

                // Check if the game is over after the computer's move
                if (!isGameOver()) {
                    // Player's turn, you can highlight the initial cell here
                    // For simplicity, we'll just use the same cell again
                    clearCellHighlight();
                    highlightCurrentCell();
                }
            }

            // Update the last button press time
            lastButtonPressTime = currentTime;
        }
    }
        } else if (controller.buttons[2].pressed) {
            // X button pressed, reset the board
            if (currentTime - lastButtonPressTime >= buttonPressDelay) {
                resetGame();
                lastButtonPressTime = currentTime;
            }
        } else if (controller.buttons[1].pressed && !hintButtonPressed) {
            // B button pressed and not previously pressed, trigger the hint function
            hintButtonPressed = true; // Set the flag to indicate the button was pressed
            if (currentTime - lastButtonPressTime >= buttonPressDelay) {
                provideHint();
                lastButtonPressTime = currentTime;
            }
        } else if (!controller.buttons[1].pressed) {
            // Reset the hint button flag when B button is released
            hintButtonPressed = false;
        }
    }

    // Repeat this function to continuously check for input
    requestAnimationFrame(handleControllerInput);
}

// Start monitoring controller input
handleControllerInput();
  
// Initialize the game
resetGame();
