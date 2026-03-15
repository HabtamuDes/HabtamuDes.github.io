import { useEffect, useMemo, useState } from "react";
import { Check, Trash2 } from "lucide-react";

type TodoItem = {
  id: number;
  text: string;
  done: boolean;
};

const initialTodos: TodoItem[] = [
  { id: 1, text: "Review featured projects", done: true },
  { id: 2, text: "Open the contact window", done: false },
  { id: 3, text: "Try one of the desktop games", done: false },
];

const NOTES_STORAGE_KEY = "habtamu-portfolio:notes";

type NotesState = {
  notes: string;
  todos: TodoItem[];
};

const NotesWindow = () => {
  const initialState = () => {
    if (typeof window === "undefined") {
      return {
        todos: initialTodos,
        notes: "Ideas:\n- Add real project screenshots\n- Attach resume download\n- Expand embedded systems showcase",
      };
    }

    try {
      const raw = window.localStorage.getItem(NOTES_STORAGE_KEY);
      if (!raw) {
        return {
          todos: initialTodos,
          notes: "Ideas:\n- Add real project screenshots\n- Attach resume download\n- Expand embedded systems showcase",
        };
      }

      const parsed = JSON.parse(raw) as NotesState;
      return {
        todos: Array.isArray(parsed?.todos) ? parsed.todos : initialTodos,
        notes: typeof parsed?.notes === "string"
          ? parsed.notes
          : "Ideas:\n- Add real project screenshots\n- Attach resume download\n- Expand embedded systems showcase",
      };
    } catch {
      return {
        todos: initialTodos,
        notes: "Ideas:\n- Add real project screenshots\n- Attach resume download\n- Expand embedded systems showcase",
      };
    }
  };

  const persisted = initialState();
  const [draft, setDraft] = useState("");
  const [todos, setTodos] = useState<TodoItem[]>(persisted.todos);
  const [notes, setNotes] = useState(persisted.notes);

  const remaining = useMemo(() => todos.filter((item) => !item.done).length, [todos]);

  useEffect(() => {
    window.localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify({ todos, notes }));
  }, [notes, todos]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setTodos((prev) => [...prev, { id: Date.now(), text, done: false }]);
    setDraft("");
  };

  return (
    <div className="grid h-full grid-cols-1 gap-4 lg:grid-cols-[280px_1fr]">
      <div className="rounded-2xl border border-border bg-secondary/35 p-4">
        <div className="mb-4">
          <h2 className="text-lg font-display font-bold">Todo List</h2>
          <p className="text-sm text-muted-foreground">{remaining} item(s) remaining</p>
        </div>

        <form onSubmit={addTodo} className="mb-4 flex gap-2">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Add a task"
            className="flex-1 rounded-lg border border-border bg-background/40 px-3 py-2 text-sm outline-none ring-0"
          />
          <button type="submit" className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground">
            Add
          </button>
        </form>

        <div className="space-y-2">
          {todos.map((item) => (
            <div key={item.id} className="flex items-center gap-2 rounded-xl border border-border bg-background/30 p-3">
              <button
                type="button"
                onClick={() => setTodos((prev) => prev.map((todo) => todo.id === item.id ? { ...todo, done: !todo.done } : todo))}
                className={`flex h-5 w-5 items-center justify-center rounded-md border ${item.done ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}
              >
                {item.done && <Check className="h-3.5 w-3.5" />}
              </button>
              <span className={`flex-1 text-sm ${item.done ? "text-muted-foreground line-through" : ""}`}>{item.text}</span>
              <button
                type="button"
                onClick={() => setTodos((prev) => prev.filter((todo) => todo.id !== item.id))}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-secondary/35 p-4">
        <div className="mb-3">
          <h3 className="text-lg font-display font-bold">Quick Notes</h3>
          <p className="text-sm text-muted-foreground">Editable scratchpad for ideas, reminders, and planning.</p>
        </div>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="h-[calc(100%-3rem)] min-h-[280px] w-full resize-none rounded-xl border border-border bg-black/20 p-4 text-sm leading-relaxed outline-none"
        />
      </div>
    </div>
  );
};

export default NotesWindow;
