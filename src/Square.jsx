export default function Square({ value, onSquareClick, isWinnerSquare }) {
  let textColor = '#70d6ff';
  if (value === 'X') {
    textColor = '	#e9ff70';
  }

  return (
    <button
      className="square"
      onClick={onSquareClick}
      style={{
        backgroundColor: isWinnerSquare ? 'green' : 'rgb(7, 68, 27)',
        color: textColor,
      }}
    >
      {value}
    </button>
  );
}
