/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

var WIDTH = 7;
var HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for (let y = 0; y < HEIGHT; y++) {
    board.push(Array.from({ length: WIDTH }));
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const  htmlBoard = document.getElementById('board');
  // TODO: add comment for this code
  const top = document.createElement("tr"); // Adds the top row 
  top.setAttribute("id", "column-top"); // Creates the id to the Top Column
  top.addEventListener("click", handleClick); // Adds the action of clicking the top row

  for (let x = 0; x < WIDTH; x++) { // Selects all of the top row
    const headCell = document.createElement("td"); // Creates the "td" for specifically the top row
    headCell.setAttribute("id", x); //Adds the "td" id to each of the top row cells
    top.append(headCell); // Adds the new element to the top row
  }
  htmlBoard.append(top);

  // TODO: add comment for this code
  for (let y = 0; y < HEIGHT; y++) { // Selects each Row
    const row = document.createElement("tr"); // Makes the Element "tr" for each row

    for (let x = 0; x < WIDTH; x++) { // Selects each cell in the current row
      const cell = document.createElement("td"); // Create variable to create the "td" id
      cell.setAttribute("id", `${y}-${x}`); // Adds the id to the specific cell
      row.append(cell); // Adds the cell onto the row
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for (let y = HEIGHT - 1; y >= 0; y--) { // Looks at each row starting from one from the top and goes downwards
    if (!board[y][x]) { // If it's not in the given column AND in the given rown, it continues.
      return y; // Returns the row position in the given column
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement("div") // Makes the Pieces
  piece.classList.add('piece'); // Adds to classify it as a piece
  piece.classList.add(`p${currPlayer}`); // Adds to classify which piece belongs to which player
  piece.style.top = -50 * (y + 2); // CSS inline positioning

  const spot = document.getElementById(`${y}-${x}`); // Variable to locate the position
  spot.append(piece); // Adds the player's piece to the spot
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (board.every(row => row.every(cell => cell))) { // The parameter for the "if" statement goes to every cell in every row to see if they are all return "truthy" values, if so then it returns true / Tie
    return endGame('Tie!');
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2 : 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) { // Goes through the rows
    for (let x = 0; x < WIDTH; x++) { // Goes through the columns
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]]; // Gets four in a row horizontally
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]]; // Gets four in a row vertically
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]]; // Gets four in a row diagonally to the right
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]]; // Gets four in a row diagonally to the left

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) { // If the horizontal, vertical, or either diagonals results in a win, turns true
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
