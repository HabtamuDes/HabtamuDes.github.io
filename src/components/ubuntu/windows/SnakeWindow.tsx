import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { snakeContent } from "@/lib/localizedApps";
import type { Language } from "@/lib/localization";

const GRID_SIZE = 14;
const SNAKE_STORAGE_KEY = "habtamu-portfolio:snake";

type Cell = { x: number; y: number };
type Direction = "up" | "down" | "left" | "right";

const sameCell = (a: Cell, b: Cell) => a.x === b.x && a.y === b.y;

const randomFood = (snake: Cell[]): Cell => {
  const freeCells: Cell[] = [];

  for (let y = 0; y < GRID_SIZE; y += 1) {
    for (let x = 0; x < GRID_SIZE; x += 1) {
      if (!snake.some((segment) => segment.x === x && segment.y === y)) {
        freeCells.push({ x, y });
      }
    }
  }

  return freeCells[Math.floor(Math.random() * freeCells.length)] ?? { x: 5, y: 5 };
};

const initialSnake = (): Cell[] => [
  { x: 5, y: 7 },
  { x: 4, y: 7 },
  { x: 3, y: 7 },
];

const SnakeWindow = ({ language }: { language: Language }) => {
  const copy = snakeContent[language];
  const [snake, setSnake] = useState<Cell[]>(initialSnake);
  const [food, setFood] = useState<Cell>({ x: 9, y: 5 });
  const [direction, setDirection] = useState<Direction>("right");
  const [running, setRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(() => {
    if (typeof window === "undefined") return 0;
    const raw = window.localStorage.getItem(SNAKE_STORAGE_KEY);
    const parsed = raw ? Number(raw) : 0;
    return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
  });

  const directionRef = useRef(direction);
  const foodRef = useRef(food);

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  useEffect(() => {
    foodRef.current = food;
  }, [food]);

  useEffect(() => {
    window.localStorage.setItem(SNAKE_STORAGE_KEY, String(highScore));
  }, [highScore]);

  const restart = useCallback(() => {
    const nextSnake = initialSnake();
    setSnake(nextSnake);
    setFood(randomFood(nextSnake));
    setDirection("right");
    setScore(0);
    setGameOver(false);
    setRunning(true);
  }, []);

  const setSafeDirection = useCallback((nextDirection: Direction) => {
    const current = directionRef.current;
    const opposite =
      (current === "up" && nextDirection === "down") ||
      (current === "down" && nextDirection === "up") ||
      (current === "left" && nextDirection === "right") ||
      (current === "right" && nextDirection === "left");

    if (!opposite) {
      directionRef.current = nextDirection;
      setDirection(nextDirection);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") setSafeDirection("up");
      if (e.key === "ArrowDown") setSafeDirection("down");
      if (e.key === "ArrowLeft") setSafeDirection("left");
      if (e.key === "ArrowRight") setSafeDirection("right");
      if (e.key === " ") {
        e.preventDefault();
        setRunning((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setSafeDirection]);

  useEffect(() => {
    if (!running || gameOver) return;

    const interval = window.setInterval(() => {
      setSnake((prev) => {
        const head = prev[0];
        const dir = directionRef.current;
        const nextHead =
          dir === "up" ? { x: head.x, y: head.y - 1 } :
          dir === "down" ? { x: head.x, y: head.y + 1 } :
          dir === "left" ? { x: head.x - 1, y: head.y } :
          { x: head.x + 1, y: head.y };

        const hitsWall =
          nextHead.x < 0 || nextHead.x >= GRID_SIZE || nextHead.y < 0 || nextHead.y >= GRID_SIZE;
        const hitsSelf = prev.some((segment) => sameCell(segment, nextHead));

        if (hitsWall || hitsSelf) {
          setRunning(false);
          setGameOver(true);
          return prev;
        }

        if (sameCell(nextHead, foodRef.current)) {
          const grownSnake = [nextHead, ...prev];
          setScore((currentScore) => {
            const nextScore = currentScore + 1;
            setHighScore((stored) => Math.max(stored, nextScore));
            return nextScore;
          });
          setFood(randomFood(grownSnake));
          return grownSnake;
        }

        return [nextHead, ...prev.slice(0, -1)];
      });
    }, 180);

    return () => window.clearInterval(interval);
  }, [gameOver, running]);

  const board = useMemo(() => {
    const snakeCells = new Set(snake.map((segment) => `${segment.x}-${segment.y}`));

    return Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, index) => {
      const x = index % GRID_SIZE;
      const y = Math.floor(index / GRID_SIZE);
      const key = `${x}-${y}`;
      const isHead = sameCell(snake[0], { x, y });
      const isFood = sameCell(food, { x, y });

      return { key, isHead, isFood, isSnake: snakeCells.has(key) };
    });
  }, [food, snake]);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-display font-bold">{copy.title}</h2>
          <p className="text-sm text-muted-foreground">{copy.subtitle}</p>
        </div>
        <div className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-[11px] text-muted-foreground">
          {copy.score}: {score}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_180px]">
        <div
          className="grid aspect-square w-full max-w-[420px] gap-1 rounded-2xl border border-border bg-black/30 p-3"
          style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}
        >
          {board.map((cell) => (
            <div
              key={cell.key}
              className={`rounded-[6px] ${
                cell.isHead ? "bg-emerald-300" :
                cell.isSnake ? "bg-emerald-500/90" :
                cell.isFood ? "bg-orange-400 shadow-[0_0_14px_rgba(251,146,60,0.55)]" :
                "bg-white/[0.04]"
              }`}
            />
          ))}
        </div>

        <div className="space-y-3 rounded-2xl border border-border bg-secondary/35 p-4">
          <div className="rounded-xl border border-border bg-background/30 px-3 py-2 text-sm text-muted-foreground">
            {copy.highScore}: <span className="font-semibold text-foreground">{highScore}</span>
          </div>
          <button
            type="button"
            onClick={() => setRunning((prev) => !prev)}
            className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            {running ? copy.pause : copy.start}
          </button>
          <button
            type="button"
            onClick={restart}
            className="w-full rounded-lg border border-border bg-background/40 px-4 py-2 text-sm"
          >
            {copy.restart}
          </button>
          <div className="grid grid-cols-3 gap-2 pt-2">
            <div />
            <button type="button" onClick={() => setSafeDirection("up")} className="rounded-lg border border-border bg-background/40 px-3 py-2 text-sm">{copy.up}</button>
            <div />
            <button type="button" onClick={() => setSafeDirection("left")} className="rounded-lg border border-border bg-background/40 px-3 py-2 text-sm">{copy.left}</button>
            <button type="button" onClick={() => setSafeDirection("down")} className="rounded-lg border border-border bg-background/40 px-3 py-2 text-sm">{copy.down}</button>
            <button type="button" onClick={() => setSafeDirection("right")} className="rounded-lg border border-border bg-background/40 px-3 py-2 text-sm">{copy.right}</button>
          </div>
          {gameOver && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
              {copy.gameOver}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SnakeWindow;
