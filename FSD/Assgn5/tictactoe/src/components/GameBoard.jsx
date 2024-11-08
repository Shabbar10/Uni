import React, { useState } from 'react'
import O from './O'
import X from './X'

function GameBoard() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState('O')
  const [gameOver, setGameOver] = useState(false)
  const [winner, setWinner] = useState(null);

  const checkWin = (squares) => {
    const lines = [
      // Check horizontals
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // Check verticals
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // Check diagonals
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        setGameOver(true)
        return squares[a];
      }
    }
    return null;
  }

  const handleClick = (index) => {
    if (board[index] || gameOver) return;

    const newBoard = board.slice();
    newBoard[index] = turn;

    setBoard(newBoard);
    const winningPlayer = checkWin(newBoard);
    if (winningPlayer) {
      setWinner(winningPlayer);
    }
    setTurn(turn === 'O' ? 'X' : 'O');
  };

  const status = winner ? `${winner} wins!` : `Next turn: ${turn}`;

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-3 gap-2">
        {
          board.map((value, index) => (
            <div
              key={index}
              className="w-16 h-16 border border-gray-300 rounded flex items-center justify-center bg-white shadow-md hover:bg-gray-200 cursor-pointer"
              onClick={() => handleClick(index)}
            >
              {value === 'O' ? <O /> : value === 'X' ? <X /> : ''}
            </div>
          ))
        }
      </div>
      {gameOver && <div className="mt-4 text-center w-full">{status}</div>}
    </div>
  )
}

export default GameBoard
