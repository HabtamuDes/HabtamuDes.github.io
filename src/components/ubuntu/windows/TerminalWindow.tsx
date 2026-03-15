import { useEffect, useRef, useState } from "react";

const commands: Record<string, string> = {
  help: "Available commands: whoami, skills, projects, contact, location, clear, help",
  whoami: "Habtamu Assegahegn - Full Stack Developer",
  skills: "Languages: JavaScript, Python, Java, C#, PHP, C++\nFrameworks: React, Next.js, Spring Boot, ASP.NET\nDatabases: PostgreSQL, MySQL, Redis, MongoDB\nTools: Docker, Git, Linux, Arduino",
  projects: "-> Smart Farming\n-> FetaMovies\n-> Learning Management System\n-> Python Car Game\n-> Payroll System\n-> Hospital Management\n-> Attendance System\n-> HR System\n-> Bank Onboarding\n-> Logistics System",
  contact: "Email: habtamuassegahegn7@gmail.com\nGitHub: github.com/habtamuDes\nLinkedIn: linkedin.com/in/habtamu-assegahegn-15a554177",
  location: "Addis Ababa, Ethiopia",
};

interface Line {
  type: "input" | "output";
  text: string;
}

const TerminalWindow = () => {
  const [lines, setLines] = useState<Line[]>([
    { type: "output", text: 'Welcome to my portfolio terminal. Type "help" for commands.' },
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
    const nextLines: Line[] = [...lines, { type: "input", text: `$ ${input}` }];

    if (cmd === "clear") {
      setLines([]);
    } else if (commands[cmd]) {
      nextLines.push({ type: "output", text: commands[cmd] });
      setLines(nextLines);
    } else if (cmd) {
      nextLines.push({
        type: "output",
        text: `bash: ${cmd}: command not found. Type "help" for available commands.`,
      });
      setLines(nextLines);
    }

    setInput("");
  };

  return (
    <div className="flex h-full flex-col font-mono text-sm" onClick={() => inputRef.current?.focus()}>
      <div className="flex-1 space-y-1 overflow-auto">
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
          className="flex-1 bg-transparent text-foreground caret-primary outline-none"
          autoFocus
        />
      </form>
    </div>
  );
};

export default TerminalWindow;
