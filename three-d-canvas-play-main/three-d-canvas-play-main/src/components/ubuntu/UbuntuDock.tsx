import { User, Code2, FolderOpen, Mail, Terminal, FileText } from "lucide-react";
import type { AppId } from "@/pages/Index";

interface UbuntuDockProps {
  onOpenApp: (id: AppId) => void;
  activeApps: AppId[];
}

const dockItems: { id: AppId; icon: React.FC<{ className?: string }>; label: string; gradient: string }[] = [
  { id: "about", icon: User, label: "About Me", gradient: "from-orange-500 to-amber-500" },
  { id: "skills", icon: Code2, label: "Skills", gradient: "from-cyan-500 to-blue-500" },
  { id: "projects", icon: FolderOpen, label: "Projects", gradient: "from-yellow-500 to-orange-500" },
  { id: "contact", icon: Mail, label: "Contact", gradient: "from-indigo-500 to-purple-500" },
  { id: "terminal", icon: Terminal, label: "Terminal", gradient: "from-emerald-600 to-emerald-800" },
];

const UbuntuDock = ({ onOpenApp, activeApps }: UbuntuDockProps) => {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[90] ubuntu-dock rounded-2xl px-3 py-2 flex items-end gap-2">
      {dockItems.map((item) => {
        const isActive = activeApps.includes(item.id);
        return (
          <button
            key={item.id}
            onClick={() => onOpenApp(item.id)}
            className={`dock-icon relative w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg ${isActive ? "active" : ""}`}
          >
            <span className="dock-tooltip">{item.label}</span>
            <item.icon className="w-6 h-6 text-foreground" />
            {isActive && <span className="dock-dot" />}
          </button>
        );
      })}
    </div>
  );
};

export default UbuntuDock;
