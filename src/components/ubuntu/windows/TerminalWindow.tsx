import { useEffect, useRef, useState } from "react";
import { translations, type Language } from "@/lib/localization";

interface Line {
  type: "input" | "output";
  text: string;
}

const TerminalWindow = ({ language }: { language: Language }) => {
  const copy = translations[language].terminal;
  const commands: Record<string, string> = {
    help: copy.help,
    whoami: copy.whoami,
    experience: copy.experience,
    skills: "Core: React, Next.js, Node.js, Spring Boot, ASP.NET\nLanguages: JavaScript, Python, Java, C#, PHP, C++, C\nData/Infra: PostgreSQL, SQL Server, MySQL, MongoDB, Redis, Docker, Linux\nSpecialization: Embedded systems, IoT-style builds, machine learning",
    projects: "Highlighted work:\n- Smart Farming\n- Hospital Management\n- Bank Onboarding\n- Logistics System\n- Learning Management System",
    contact: "Email: habtamuassegahegn7@gmail.com\nGitHub: github.com/habtamuDes\nLinkedIn: linkedin.com/in/habtamu-assegahegn-15a554177\nLocation: Addis Ababa, Ethiopia",
    location: copy.location,
  };
  const [lines, setLines] = useState<Line[]>([
    { type: "output", text: copy.boot1 },
    { type: "output", text: copy.boot2 },
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
        text: copy.notFound(cmd),
      });
      setLines(nextLines);
    }

    setInput("");
  };

  return (
    <div className="flex h-full flex-col font-mono text-sm" onClick={() => inputRef.current?.focus()}>
      <div className="mb-3 rounded-lg border border-border bg-secondary/30 px-3 py-2 text-xs leading-relaxed text-muted-foreground">
        {copy.intro}
      </div>
      <div className="flex-1 space-y-1 overflow-auto rounded-lg border border-border bg-black/30 p-3">
        {lines.map((line, i) => (
          <div key={i} className={line.type === "input" ? "text-emerald-400" : "text-muted-foreground"}>
            <pre className="whitespace-pre-wrap break-words text-[12px] leading-relaxed sm:text-sm">{line.text}</pre>
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
          className="min-w-0 flex-1 bg-transparent text-foreground caret-primary outline-none"
          autoFocus
        />
      </form>
    </div>
  );
};

export default TerminalWindow;
