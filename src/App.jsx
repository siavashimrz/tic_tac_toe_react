import { useState } from 'react';
import Board from './Board';

export default function Game() {
  // const [xIsNext, setXIsNext] = useState(true);
  const [isAscending, setIsAscending] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [moveHistory, setMoveHistory] = useState([]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  function handlePlay(nextSquares, squareId) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);

    const row = Math.floor(squareId / 3);
    const col = squareId % 3;
    const nextMoveHistory = [...moveHistory.slice(0, currentMove), [row, col]];
    setMoveHistory(nextMoveHistory);
    // setMoveHistory((prev) => [...prev, [row, col]]);
    // setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    // setXIsNext(nextMove % 2 === 0);
  }

  function handleAscending() {
    setIsAscending((prev) => !prev);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          currentMove={currentMove}
        />
      </div>
      <div className="game-info">
        <button id="order" onClick={handleAscending}>
          {isAscending ? '▼' : '▲'}
        </button>
        <ol
          style={{
            flexDirection: isAscending ? 'column' : 'column-reverse',
          }}
        >
          {history.map((squares, move) => {
            const description =
              move > 0 ? 'Go to move #' + move : 'Go to game start';
            let location;
            if (move > 0) {
              location = `(${moveHistory[move - 1][0]}, ${
                moveHistory[move - 1][1]
              })`;
            }
            let listItem = (
              <button onClick={() => jumpTo(move)}>
                {description} {location}
              </button>
            );
            if (move === currentMove) {
              listItem = move ? (
                <p>
                  You are at move #{move} {location}
                </p>
              ) : (
                <p>You are at game start</p>
              );
            }
            return <li key={move}>{listItem}</li>;
          })}
        </ol>
      </div>
    </div>
  );
}
