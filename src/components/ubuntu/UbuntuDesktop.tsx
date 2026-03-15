import { User, Code2, FolderOpen, Mail, Terminal } from "lucide-react";
import type { AppId } from "@/pages/Index";

interface UbuntuDesktopProps {
  onOpenApp: (id: AppId) => void;
}

const desktopIcons: { id: AppId; icon: React.FC<{ className?: string }>; label: string }[] = [
  { id: "about", icon: User, label: "About Me" },
  { id: "skills", icon: Code2, label: "Skills" },
  { id: "projects", icon: FolderOpen, label: "Projects" },
  { id: "contact", icon: Mail, label: "Contact" },
  { id: "terminal", icon: Terminal, label: "Terminal" },
];

const UbuntuDesktop = ({ onOpenApp }: UbuntuDesktopProps) => {
  return (
    <div className="absolute top-10 right-4 bottom-16 flex flex-col gap-2 p-2">
      {desktopIcons.map((item) => (
        <button
          key={item.id}
          onDoubleClick={() => onOpenApp(item.id)}
          className="flex flex-col items-center gap-1 p-3 rounded-lg hover:bg-foreground/10 transition-colors w-20 group"
        >
          <div className="w-12 h-12 rounded-lg bg-secondary/60 flex items-center justify-center">
            <item.icon className="w-6 h-6 text-foreground" />
          </div>
          <span className="text-[10px] font-display text-foreground text-center leading-tight drop-shadow-md">
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default UbuntuDesktop;
