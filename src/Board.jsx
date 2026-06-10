import { useState } from 'react';
import Square from './Square';

export default function Board({ xIsNext, squares, onPlay, currentMove }) {
  // const [xIsNext, setXIsNext] = useState(true);
  // const [squares, setSquares] = useState(Array(9).fill(null));
  const [winner, winnerSquares] = calculateWinner(squares);

  function handleClick(id) {
    if (squares[id] || winner) {
      return;
    } else {
      // setXIsNext((prev) => !prev);
      // // console.log(xIsNext);
      // setSquares((prev) => {
      //   const prevCopy = prev.slice();
      //   prevCopy[id] = xIsNext ? "X" : "O";
      //   return prevCopy;
      // });
      const nextSquares = squares.slice();
      nextSquares[id] = xIsNext ? 'X' : 'O';
      onPlay(nextSquares, id);
    }
  }

  function createBoard() {
    return [0, 1, 2].map((_, index) => (
      <div className="board-row" key={index}>
        {[3 * index, 1 + 3 * index, 2 + 3 * index].map((squareIndex) => {
          return (
            <Square
              key={squareIndex}
              value={squares[squareIndex]}
              onSquareClick={() => handleClick(squareIndex)}
              isWinnerSquare={winnerSquares.includes(squareIndex)}
            />
          );
        })}
      </div>
    ));
  }

  function creatBoardWithGrid() {
    return Array(9)
      .fill(null)
      .map((_, squareIndex) => (
        <Square
          key={squareIndex}
          value={squares[squareIndex]}
          onSquareClick={() => handleClick(squareIndex)}
          isWinnerSquare={winnerSquares.includes(squareIndex)}
        />
      ));
  }

  return (
    <>
      <div className="status">
        {winner
          ? 'Winner is ' + winner
          : currentMove === 9
          ? 'Draw!'
          : 'Next player: ' + (xIsNext ? 'X' : 'O')}
      </div>
      {/* {createBoard()} */}
      <div className="board-container">{creatBoardWithGrid()}</div>
      {/* <div className="board-row">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div> */}
      {/* <button
          onClick={() => {
            setSquares(Array(9).fill(null));
            setXIsNext(true);
          }}
        >
          Reset
        </button> */}
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], [a, b, c]];
    }
  }
  return [null, []];
}
