// Define the size of the grid
const gridSize = 10;

// Create an empty grid of letters
let grid = [];
for (let i = 0; i < gridSize; i++) {
  grid[i] = [];
  for (let j = 0; j < gridSize; j++) {
    grid[i][j] = '';
  }
}

// Create a variable to keep track of the current player
let currentPlayer = 1;

// Create a stack to keep track of previous actions for undo and redo
let actionStack = [];

// Create a function to fill in a cell with a letter
function fillCell(x, y, letter) {
  actionStack.push({x, y, value: grid[x][y]});
  grid[x][y] = letter;
}

// Create a function to empty a cell
function emptyCell(x, y) {
  actionStack.push({x, y, value: grid[x][y]});
  grid[x][y] = '';
}

// Create a function to strike out a cell
function strikeCell(x, y) {
  actionStack.push({x, y, value: grid[x][y]});
  grid[x][y] = '-';
}

// Create a function to check if a cell is empty
function isEmptyCell(x, y) {
  return grid[x][y] === '';
}

// Create a function to check if a cell is struck out
function isStrikeCell(x, y) {
  return grid[x][y] === '-';
}

// Create a function to combine adjacent strike cells into a single line
function combineStrikeCells() {
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (isStrikeCell(i, j)) {
        let startX = i;
        let startY = j;
        let endX = i;
        let endY = j;
        // Check if there are adjacent strike cells to the right
        while (endY < gridSize - 1 && isStrikeCell(i, endY + 1)) {
          endY++;
        }
        // Check if there are adjacent strike cells below
        while (endX < gridSize - 1 && isStrikeCell(endX + 1, j)) {
          endX++;
        }
        // Fill in the cells between the start and end of the line
        for (let x = startX; x <= endX; x++) {
          for (let y = startY; y <= endY; y++) {
            fillCell(x, y, '-');
          }
        }
      }
    }
  }
}

// Create a function to check if a word can be placed in a given position
function canPlaceWord(word, x, y, direction) {
  if (direction === 'horizontal') {
    if (y + word.length > gridSize) {
      return false; // The word goes out of bounds
    }
    for (let i = 0; i < word.length; i++) {
      if (!isEmptyCell(x, y + i) && grid[x][y + i] !== word[i]) {
        return false; // The word conflicts with existing letters
      }
    }
  } else {
    if (x + word.length > gridSize) {
      return false; // The word goes out of bounds
    }
    for (let i = 0; i < word.length; i++) {
      if (!isEmptyCell(x + i, y) && grid[x + i][y] !== word[i]) {
        return false; // The word conflicts with


// Create a function to place a word on the grid
function placeWord(word, x, y, direction) {
  for (let i = 0; i < word.length; i++) {
    let letter = word[i];
    if (direction === 'horizontal') {
      fillCell(x, y + i, letter);
    } else {
      fillCell(x + i, y, letter);
    }
  }
}

// Create a function to switch players
function switchPlayers() {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  actionStack = [];
}

// Create a function to empty the grid
function emptyGrid() {
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      emptyCell(i, j);
    }
  }
  actionStack = [];
}

// Create a function to redo the last action
function redo() {
  if (actionStack.length > 0) {
    let {x, y, value} = actionStack.pop();
    fillCell(x, y, value);
  }
}

// Create a function to undo the last action
function undo() {
  if (actionStack.length > 0) {
    let {x, y, value} = actionStack.pop();
    if (value === '-') {
      // If the last action was striking out a cell, unstrike it
      fillCell(x, y, '');
    } else {
      // Otherwise, empty the cell
      emptyCell(x, y);
    }
  }
}

// Create a function to handle button clicks
function handleButtonClick(button) {
  switch (button) {
    case 'red':
      emptyGrid();
      break;
    case 'green':
      switchPlayers();
      break;
    case 'blue':
      redo();
      break;
    case 'orange':
      undo();
      break;
  }
}

// Add event listeners for the buttons
document.getElementById('red-button').addEventListener('click', () => {
  handleButtonClick('red');
});
document.getElementById('green-button').addEventListener('click', () => {
  handleButtonClick('green');
});
document.getElementById('blue-button').addEventListener('click', () => {
  handleButtonClick('blue');
});
document.getElementById('orange-button').addEventListener('click', () => {
  handleButtonClick('orange');
});
