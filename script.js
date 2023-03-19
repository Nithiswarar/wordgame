const grid = document.getElementById("grid");
const cells = [];

for (let i = 0; i < 100; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cells.push(cell);
  grid.appendChild(cell);
}

let currentPlayer = 1;

grid.addEventListener("mousedown", function(e) {
  if (!e.target.classList.contains("cell")) {
    return;
  }

  if (e.button === 0) {
    // Left mouse button
    e.target.contentEditable = "true";
    e.target.focus();
  } else if (e.button === 2) {
    // Right mouse button
    e.target.textContent = "";
  }
});

grid.addEventListener("contextmenu", function(e) {
  e.preventDefault();
});

function toggleStrike(cell) {
  cell.classList.toggle("strike");
}

function undo() {
  const lastCell = cells.pop();
  if (lastCell) {
    toggleStrike(lastCell);
  }
}

function redo() {
  const nextCell = cells[cells.length - 1];
  if (nextCell && !nextCell.classList.contains("strike")) {
    cells.pop();
    toggleStrike(nextCell);
  }
}

function clearGrid() {
  cells.forEach(function(cell) {
    cell.textContent = "";
    cell.classList.remove("strike");
    cell.contentEditable = "inherit";
  });
}

function switchPlayer() {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
}

const redButton = document.getElementById("red-button");
redButton.addEventListener("click", function() {
  clearGrid();
});

const greenButton = document.getElementById("green-button");
greenButton.addEventListener("click", function() {
  switchPlayer();
});

const blueButton = document.getElementById("blue-button");
blueButton.addEventListener("click", function() {
  redo();
});

const orangeButton = document.getElementById("orange-button");
orangeButton.addEventListener("click", function() {
  undo();
});
