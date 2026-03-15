import { useEffect, useMemo, useState } from "react";

type Player = "X" | "O";

const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const TICTACTOE_STORAGE_KEY = "habtamu-portfolio:tictactoe";

const TicTacToeWindow = () => {
  const [board, setBoard] = useState<(Player | null)[]>(() => {
    if (typeof window === "undefined") return Array(9).fill(null);

    try {
      const raw = window.localStorage.getItem(TICTACTOE_STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) as { board?: (Player | null)[] } : null;
      return Array.isArray(parsed?.board) && parsed.board.length === 9 ? parsed.board : Array(9).fill(null);
    } catch {
      return Array(9).fill(null);
    }
  });
  const [current, setCurrent] = useState<Player>(() => {
    if (typeof window === "undefined") return "X";

    try {
      const raw = window.localStorage.getItem(TICTACTOE_STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) as { current?: Player } : null;
      return parsed?.current === "O" ? "O" : "X";
    } catch {
      return "X";
    }
  });

  const winner = useMemo(() => {
    const line = winningLines.find(([a, b, c]) => board[a] && board[a] === board[b] && board[b] === board[c]);
    return line ? board[line[0]] : null;
  }, [board]);

  const isDraw = !winner && board.every(Boolean);

  useEffect(() => {
    window.localStorage.setItem(TICTACTOE_STORAGE_KEY, JSON.stringify({ board, current }));
  }, [board, current]);

  const handleMove = (index: number) => {
    if (board[index] || winner) return;
    setBoard((prev) => prev.map((cell, cellIndex) => (cellIndex === index ? current : cell)));
    setCurrent((prev) => (prev === "X" ? "O" : "X"));
  };

  const reset = () => {
    setBoard(Array(9).fill(null));
    setCurrent("X");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-display font-bold">Tic-Tac-Toe</h2>
          <p className="text-sm text-muted-foreground">A simple desktop game to make the portfolio more interactive.</p>
        </div>
        <div className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-[11px] text-muted-foreground">
          {winner ? `Winner: ${winner}` : isDraw ? "Draw" : `Turn: ${current}`}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_180px]">
        <div className="grid aspect-square w-full max-w-[360px] grid-cols-3 gap-3">
          {board.map((cell, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleMove(index)}
              className="rounded-2xl border border-border bg-secondary/35 text-4xl font-bold text-foreground transition-colors hover:bg-secondary/60"
            >
              {cell}
            </button>
          ))}
        </div>

        <div className="space-y-3 rounded-2xl border border-border bg-secondary/35 p-4">
          <p className="text-sm text-muted-foreground">
            Play locally in the browser. This window is draggable, resizable, minimizable, and maximizable like the others.
          </p>
          <button
            type="button"
            onClick={reset}
            className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            New Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicTacToeWindow;
