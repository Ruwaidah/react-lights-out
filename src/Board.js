import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 6, ncols = 6, chanceLightStartsOn = 0.1 }) {
  const [board, setBoard] = useState(createBoard());
  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    initialBoard = Array.from({ length: ncols }).map((col) =>
      Array.from({ length: nrows }).map(
        (row) => chanceLightStartsOn > Math.random()
      )
    );
    return initialBoard;
  }

  function hasWon() {
    const check = board.map((x) => x.indexOf(false));
    return check.find((y) => y === 0);
  }

  function flipCellsAround(x, y) {
    const changeIndx = [
      [0, 0],
      [0, -1],
      [0, 1],
      [-1, 0],
      [1, 0],
    ];

    setBoard((oldBoard) => {
      let boardCopy = oldBoard.map((arr) => [...arr]);
      const flipCell = (indexY, indexX) => {
        // if this coord is actually on board, flip it
        if (indexX >= 0 && indexX < ncols && indexY >= 0 && indexY < nrows) {
          boardCopy[indexY][indexX] = !boardCopy[indexY][indexX];
        }
      };
      changeIndx.map((indx) => {
        flipCell(indx[0] + x, indx[1] + y);
      });
      return boardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon()) return <h1>You Won</h1>;
  else
    return (
      <table className="Board">
        {board.map((col, x) => (
          <tr>
            {col.map((row, y) => (
              <Cell
                isLit={row}
                flipCellsAroundMe={() => flipCellsAround(x, y)}
              />
            ))}
          </tr>
        ))}
      </table>
    );
}

export default Board;
