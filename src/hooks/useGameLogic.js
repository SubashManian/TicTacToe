import { useState, useCallback } from 'react';

const WINNING_COMBINATIONS = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left col
  [1, 4, 7], // middle col
  [2, 5, 8], // right col
  [0, 4, 8], // diagonal
  [2, 4, 6], // anti-diagonal
];

function checkWinner(board) {
  for (const combo of WINNING_COMBINATIONS) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: combo };
    }
  }
  if (board.every(cell => cell !== null)) {
    return { winner: 'draw', line: null };
  }
  return null;
}

export default function useGameLogic() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [result, setResult] = useState(null); // { winner, line }
  const [scores, setScores] = useState({ X: 0, O: 0, draw: 0 });

  const handlePress = useCallback(
    (index) => {
      if (board[index] || result) return;

      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);

      const gameResult = checkWinner(newBoard);
      if (gameResult) {
        setResult(gameResult);
        setScores((prev) => ({
          ...prev,
          [gameResult.winner]: prev[gameResult.winner] + 1,
        }));
      } else {
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      }
    },
    [board, currentPlayer, result]
  );

  const resetGame = useCallback(() => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setResult(null);
  }, []);

  const resetAll = useCallback(() => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setResult(null);
    setScores({ X: 0, O: 0, draw: 0 });
  }, []);

  return {
    board,
    currentPlayer,
    result,
    scores,
    handlePress,
    resetGame,
    resetAll,
  };
}
