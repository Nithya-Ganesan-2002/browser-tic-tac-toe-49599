import React, { useState, useEffect } from 'react';
import './App.css';

// Utility to check for winner (returns 'X', 'O', or null)
function calculateWinner(squares) {
  const lines = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// PUBLIC_INTERFACE
function App() {
  // Theme logic (retained)
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // Tic Tac Toe states
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [status, setStatus] = useState('');
  
  useEffect(() => {
    const winner = calculateWinner(squares);
    if (winner) {
      setStatus(`🎉 Player ${winner} wins!`);
      setGameOver(true);
    } else if (squares.every(Boolean)) {
      setStatus("It's a draw!");
      setGameOver(true);
    } else {
      setStatus(`Turn: Player ${xIsNext ? "X" : "O"}`);
      setGameOver(false);
    }
  }, [squares, xIsNext]);

  // PUBLIC_INTERFACE
  function handleSquareClick(idx) {
    if (gameOver || squares[idx]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[idx] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  // PUBLIC_INTERFACE
  function handleReset() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setGameOver(false);
    setStatus(`Turn: Player X`);
  }

  // Render the tic-tac-toe board as a 3x3 grid
  return (
    <div className="App ttt__app">
      <header className="App-header ttt__header">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
        <h1 className="ttt__title">Tic Tac Toe</h1>
        <div className="ttt__game-container">
          <div className="ttt__board">
            {squares.map((square, idx) => (
              <button
                key={idx}
                className={`ttt__square${square ? ' ttt__square--filled' : ''}`}
                onClick={() => handleSquareClick(idx)}
                aria-label={`Cell ${idx + 1}: ${square || 'empty'}`}
                disabled={!!square || gameOver}
              >
                {square}
              </button>
            ))}
          </div>
        </div>
        <div className="ttt__info">
          <div className={`ttt__status${gameOver ? ' ttt__status--finished' : ''}`}>
            {status}
          </div>
          <button className="ttt__reset-btn" onClick={handleReset} aria-label="Reset game">
            Reset Game
          </button>
        </div>
        <footer className="ttt__footer">
          <span className="ttt__credits">
            Built with <span aria-label="love">❤️</span> React • Modern UI
          </span>
        </footer>
      </header>
    </div>
  );
}

export default App;
