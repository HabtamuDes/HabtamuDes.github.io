import { User, Code2, FolderOpen, Mail, Terminal, NotebookPen, Gamepad2, Grid3x3, Braces, Database, ServerCog, Globe, Send, Container, GitBranch, Settings2, FolderKanban, BadgeCheck } from "lucide-react";
import type { AppId } from "@/pages/Index";

interface UbuntuDockProps {
  onOpenApp: (id: AppId) => void;
  activeApps: AppId[];
  appLabels: Record<string, string>;
}

const dockItems: { id: AppId; icon: React.FC<{ className?: string }>; label: string; gradient: string }[] = [
  { id: "about", icon: User, label: "About Me", gradient: "from-orange-500 to-amber-500" },
  { id: "experience", icon: BadgeCheck, label: "Experience", gradient: "from-violet-500 to-fuchsia-600" },
  { id: "skills", icon: Code2, label: "Skills", gradient: "from-cyan-500 to-blue-500" },
  { id: "projects", icon: FolderOpen, label: "Projects", gradient: "from-yellow-500 to-orange-500" },
  { id: "vscode", icon: Braces, label: "VS Code", gradient: "from-sky-500 to-blue-700" },
  { id: "pgadmin", icon: Database, label: "pgAdmin", gradient: "from-emerald-500 to-teal-700" },
  { id: "sqlserver", icon: ServerCog, label: "SQL Server", gradient: "from-fuchsia-500 to-violet-700" },
  { id: "browser", icon: Globe, label: "Browser", gradient: "from-cyan-400 to-sky-700" },
  { id: "postman", icon: Send, label: "Postman", gradient: "from-orange-500 to-red-600" },
  { id: "docker", icon: Container, label: "Docker", gradient: "from-blue-400 to-cyan-700" },
  { id: "gittools", icon: GitBranch, label: "Git Tools", gradient: "from-slate-500 to-slate-800" },
  { id: "files", icon: FolderKanban, label: "Files", gradient: "from-amber-500 to-orange-600" },
  { id: "settings", icon: Settings2, label: "Settings", gradient: "from-neutral-500 to-zinc-700" },
  { id: "notes", icon: NotebookPen, label: "Notes", gradient: "from-amber-400 to-yellow-500" },
  { id: "snake", icon: Gamepad2, label: "Snake", gradient: "from-emerald-500 to-green-700" },
  { id: "tictactoe", icon: Grid3x3, label: "Tic-Tac-Toe", gradient: "from-fuchsia-500 to-indigo-600" },
  { id: "contact", icon: Mail, label: "Contact", gradient: "from-indigo-500 to-purple-500" },
  { id: "terminal", icon: Terminal, label: "Terminal", gradient: "from-emerald-600 to-emerald-800" },
];

const UbuntuDock = ({ onOpenApp, activeApps, appLabels }: UbuntuDockProps) => {
  return (
    <div className="fixed bottom-4 left-1/2 z-[90] flex max-w-[calc(100vw-1rem)] -translate-x-1/2 items-end gap-2 overflow-x-auto rounded-2xl px-3 py-2 ubuntu-dock">
      {dockItems.map((item) => {
        const isActive = activeApps.includes(item.id);
        return (
          <button
            key={item.id}
            type="button"
            aria-label={`${appLabels[item.id] ?? item.label} dock icon`}
            data-testid={`dock-icon-${item.id}`}
            onClick={() => onOpenApp(item.id)}
            className={`dock-icon relative w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg ${isActive ? "active" : ""}`}
          >
            <span className="dock-tooltip">{appLabels[item.id] ?? item.label}</span>
            <item.icon className="w-6 h-6 text-foreground" />
            {isActive && <span className="dock-dot" />}
          </button>
        );
      })}
    </div>
  );
};

export default UbuntuDock;
