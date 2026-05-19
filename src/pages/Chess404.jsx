import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCursorHandlers } from '../context/CursorContext.jsx';
import './chess-404.css';

// Mate-in-1: White Queen on h5 + supporting pieces. Solution: Qxf7#
// Simplified 4x4 grid puzzle: place Q on highlighted square to deliver mate.
const PIECES = {
  K: '♔', Q: '♕', R: '♖', B: '♗', N: '♘', P: '♙',
  k: '♚', q: '♛', r: '♜', b: '♝', n: '♞', p: '♟',
};

const BOARD = [
  ['r', '', '', '', 'k', '', '', 'r'],
  ['p', 'p', 'p', '', '', 'p', 'p', 'p'],
  ['', '', 'n', '', '', '', '', ''],
  ['', '', '', '', '', '', '', 'Q'],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['R', 'N', 'B', '', 'K', 'B', 'N', 'R'],
];

const SOLUTION = { row: 1, col: 5 }; // f7 square — Qxf7#
const QUEEN_ORIGIN = { row: 3, col: 7 }; // h5

function isLegalQueenMove(r, c) {
  if (r === QUEEN_ORIGIN.row && c === QUEEN_ORIGIN.col) return false;
  const dr = r - QUEEN_ORIGIN.row;
  const dc = c - QUEEN_ORIGIN.col;
  return dr === 0 || dc === 0 || Math.abs(dr) === Math.abs(dc);
}

export default function Chess404() {
  const [solved, setSolved] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [highlight, setHighlight] = useState(null);
  const sq = useCursorHandlers('view', 'PLAY');
  const back = useCursorHandlers('write', 'HOME');

  useEffect(() => {
    document.title = '404 · MATE IN 1 · VV';
  }, []);

  const handleClick = (r, c) => {
    setHighlight({ r, c });
    setAttempts((a) => a + 1);
    if (r === SOLUTION.row && c === SOLUTION.col) {
      setTimeout(() => setSolved(true), 500);
    }
  };

  return (
    <main className="chess-404">
      <div className="chess-404__inner container">
        <header className="chess-404__head">
          <div className="chess-404__meta mono">
            <span>ERROR · 404 / NOT FOUND</span>
            <span>—</span>
            <span>VV / DEAD-END</span>
          </div>
          <h1 className="chess-404__title display">
            You took a wrong move.
          </h1>
          <p className="chess-404__sub display">
            <span className="lime">Mate in 1.</span> Find the mate to find your way back.
          </p>
          <p className="chess-404__hint mono">
            HINT · WHITE TO MOVE · QUEEN ON h5 · LEGAL SQUARES GLOW
            {attempts > 0 && ` · ATTEMPTS ${String(attempts).padStart(2, '0')}`}
          </p>
        </header>

        <div className="chess-404__board-wrap">
          <div className="chess-404__board">
            {BOARD.map((row, r) =>
              row.map((piece, c) => {
                const dark = (r + c) % 2 === 1;
                const isSelected = highlight && highlight.r === r && highlight.c === c;
                const isCorrect = solved && r === SOLUTION.row && c === SOLUTION.col;
                const isLegal = isLegalQueenMove(r, c);
                return (
                  <button
                    key={`${r}-${c}`}
                    type="button"
                    className={`chess-404__sq ${dark ? 'is-dark' : 'is-light'} ${isSelected ? 'is-selected' : ''} ${isCorrect ? 'is-correct' : ''} ${isLegal ? 'is-legal' : ''}`}
                    onClick={() => handleClick(r, c)}
                    {...sq}
                  >
                    {piece && (
                      <span className={`chess-404__piece ${piece === piece.toUpperCase() ? 'is-white' : 'is-black'}`}>
                        {PIECES[piece]}
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>
          <div className="chess-404__coords mono">
            <span>a b c d e f g h</span>
          </div>
        </div>

        {solved ? (
          <div className="chess-404__solved">
            <p className="chess-404__solved-text display">Qxf7# &mdash; checkmate.</p>
            <Link to="/" className="chess-404__back mono" {...back}>
              ← RETURN TO BOARD ZERO
            </Link>
          </div>
        ) : (
          <div className="chess-404__hint-row mono">
            <span>► CLICK A SQUARE TO PLACE THE QUEEN'S MOVE</span>
            {attempts > 2 && <span>TIP · TARGET F7</span>}
          </div>
        )}

        <footer className="chess-404__footer mono">
          <span>SIGNED · VISHWAS · USCF 1300 / 1800 ONLINE</span>
          <Link to="/" {...back}>SKIP PUZZLE — HOME →</Link>
        </footer>
      </div>
    </main>
  );
}
