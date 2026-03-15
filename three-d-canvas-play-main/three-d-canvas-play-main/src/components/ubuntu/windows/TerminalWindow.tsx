import { useState, useEffect, useRef } from "react";

const commands: Record<string, string> = {
  help: "Available commands: whoami, skills, projects, contact, neofetch, clear, help",
  whoami: "Habtamu Assegahegn — Full Stack Developer, Embedded Systems & AI Enthusiast",
  skills: "React · TypeScript · Python · C++ · ESP32 · TensorFlow · Node.js · PostgreSQL",
  projects: "→ Smart Home IoT Hub\n→ AI Image Classifier\n→ Portfolio 3D Room\n→ Embedded Weather Station",
  contact: "📧 habtamu@example.com\n🔗 github.com/habtamu\n🔗 linkedin.com/in/habtamu",
  neofetch: `  ╔══════════════════════╗
  ║  habtamu@portfolio   ║
  ╠══════════════════════╣
  ║  OS: Ubuntu 24.04    ║
  ║  Shell: zsh 5.9      ║
  ║  IDE: VS Code        ║
  ║  Lang: TS, Python,C++║
  ║  Uptime: since 2019  ║
  ╚══════════════════════╝`,
};

interface Line {
  type: "input" | "output";
  text: string;
}

const TerminalWindow = () => {
  const [lines, setLines] = useState<Line[]>([
    { type: "output", text: 'Welcome to Habtamu\'s terminal! Type "help" for commands.' },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    const newLines: Line[] = [
      ...lines,
      { type: "input", text: `$ ${input}` },
    ];

    if (cmd === "clear") {
      setLines([]);
    } else if (commands[cmd]) {
      newLines.push({ type: "output", text: commands[cmd] });
      setLines(newLines);
    } else if (cmd) {
      newLines.push({ type: "output", text: `bash: ${cmd}: command not found. Type "help" for available commands.` });
      setLines(newLines);
    }
    setInput("");
  };

  return (
    <div
      className="h-full flex flex-col font-mono text-sm"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex-1 overflow-auto space-y-1">
        {lines.map((line, i) => (
          <div key={i} className={line.type === "input" ? "text-emerald-400" : "text-muted-foreground"}>
            <pre className="whitespace-pre-wrap">{line.text}</pre>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-2">
        <span className="text-emerald-400">$</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent outline-none text-foreground caret-primary"
          autoFocus
        />
      </form>
    </div>
  );
};

export default TerminalWindow;
