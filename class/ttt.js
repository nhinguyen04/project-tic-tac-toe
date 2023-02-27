const Screen = require("./screen");
const Cursor = require("./cursor");

class TTT {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' '],
                 [' ',' ',' '],
                 [' ',' ',' ']]

    this.cursor = new Cursor(3, 3);

    // Initialize a 3x3 tic-tac-toe grid
    Screen.initialize(3, 3);
    Screen.setGridlines(true);

    // Replace this with real commands
    Screen.addCommand('t', 'test command (remove)', TTT.testCommand);

    Screen.render();
  }

  // Remove this
  static testCommand() {
    console.log("TEST COMMAND");
  }

  static checkWin(grid) {
  const fullGrid = this._checkFullGrid(grid);

    // Return 'T' if the game is a tie
    if (fullGrid) {
      return "T";
    }

    // Return 'X' if player X wins
    const horizontalWin = this._checkHorizontal(grid);
    const verticalWin = this._checkVertical(grid);
    const diagonalWin = this._checkDiagonal(grid);

    if(horizontalWin === "X" || verticalWin === "X" || diagonalWin === "X") {
      return "X";
    }

    // Return 'O' if player O wins
    if(horizontalWin === "O" || verticalWin === "O" || diagonalWin === "O") {
      return "O";
    }

    // Return false if the game has not ended
    if (!fullGrid) {
      return false;
    }
  }

  static _checkFullGrid(grid) {
    let full = true;

    for (let row = 0; row < grid.length; row++) {
      let column = grid[row];
      for (let col = 0; col < column.length; col++) {
        if (grid[row][col] === " ") {
          full = false;
        }
      }
    }

    return full;
  }

  static _checkHorizontal(grid) {
    for (let row = 0; row < grid.length; row++) {
      const checkWin = this._allEqual(grid[row]);

      if (checkWin && grid[row][0] === "X") {
        // if X wins, return "X"
        return "X"
      } else if (checkWin && grid[row][0] === "O") {
        // if O wins, return "O"
        return "O";
      }
    }

    // no win
    return false;
  }

  static _checkVertical(grid) {
    const getColumn = (array, col) => array.map((row) => row[col]);


    for (let col = 0; col < grid.length; col++) {
      const checkWin = this._allEqual(getColumn(grid, col));

      if (checkWin && grid[0][col] === "X") {
        // if X wins, return "X"
        return "X"
      } else if (checkWin && grid[0][col] === "O") {
        // if O wins, return "O"
        return "O";
      }
    }

    // no win
    return false;
  }

  static _checkDiagonal(grid) {
    // grid[row][col]
    // brute force
    if (grid[1][1] === "X") {
      const scenarioOne = grid[0][0] === "X" && grid[2][2] === "X";
      const scenarioTwo = grid[2][0] === "X" && grid[0][2] === "X";
      if (scenarioOne || scenarioTwo) {
        return "X";
      }
    } else if (grid[1][1] === "O") {
      const scenarioOne = grid[0][0] === "O" && grid[2][2] === "O";
      const scenarioTwo = grid[2][0] === "O" && grid[0][2] === "O";

      if (scenarioOne || scenarioTwo) {
        return "O";
      }
    } else {
      return false;
    }
  }

  static _allEqual(array) {
    return array.every((value) => value === array[0]);
  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

// let grid =
// [[' ',' ',' '],
// [' ',' ',' '],
// [' ',' ',' '],
// [],
// []]

// console.log(grid.length);

module.exports = TTT;
