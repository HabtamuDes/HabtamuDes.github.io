import { useRef, useCallback, useState } from "react";
import { X, Minus, Square } from "lucide-react";
import type { AppId } from "@/pages/Index";

interface UbuntuWindowProps {
  id: AppId;
  title: string;
  position: { x: number; y: number };
  size: { w: number; h: number };
  zIndex: number;
  onClose: (id: AppId) => void;
  onMinimize: (id: AppId) => void;
  onFocus: (id: AppId) => void;
  onMove: (id: AppId, pos: { x: number; y: number }) => void;
  children: React.ReactNode;
}

const UbuntuWindow = ({ id, title, position, size, zIndex, onClose, onMinimize, onFocus, onMove, children }: UbuntuWindowProps) => {
  const dragRef = useRef<{ startX: number; startY: number; posX: number; posY: number } | null>(null);
  const [isMaximized, setIsMaximized] = useState(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    onFocus(id);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      posX: position.x,
      posY: position.y,
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragRef.current) return;
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      onMove(id, {
        x: dragRef.current.posX + dx,
        y: dragRef.current.posY + dy,
      });
    };

    const handleMouseUp = () => {
      dragRef.current = null;
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  }, [id, position, onFocus, onMove]);

  const style = isMaximized
    ? { top: 32, left: 0, width: "100vw", height: "calc(100vh - 32px - 72px)", zIndex }
    : { top: position.y, left: position.x, width: size.w, height: size.h, zIndex };

  return (
    <div
      className={`ubuntu-window fixed flex flex-col animate-window-open ${isMaximized ? "!rounded-none" : ""}`}
      style={style}
      onMouseDown={() => onFocus(id)}
    >
      {/* Header */}
      <div
        className="ubuntu-window-header flex items-center h-10 px-3 rounded-t-xl cursor-grab active:cursor-grabbing shrink-0"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); onClose(id); }}
            className="w-3.5 h-3.5 rounded-full flex items-center justify-center group"
            style={{ background: "hsl(var(--window-close))" }}
          >
            <X className="w-2 h-2 opacity-0 group-hover:opacity-100 text-foreground transition-opacity" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onMinimize(id); }}
            className="w-3.5 h-3.5 rounded-full flex items-center justify-center group"
            style={{ background: "hsl(var(--window-minimize))" }}
          >
            <Minus className="w-2 h-2 opacity-0 group-hover:opacity-100 text-foreground transition-opacity" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setIsMaximized(!isMaximized); }}
            className="w-3.5 h-3.5 rounded-full flex items-center justify-center group"
            style={{ background: "hsl(var(--window-maximize))" }}
          >
            <Square className="w-1.5 h-1.5 opacity-0 group-hover:opacity-100 text-foreground transition-opacity" />
          </button>
        </div>
        <span className="flex-1 text-center text-xs font-display font-medium text-muted-foreground">
          {title}
        </span>
        <div className="w-16" /> {/* Spacer to center title */}
      </div>

      {/* Body */}
      <div className="flex-1 overflow-auto p-5">
        {children}
      </div>
    </div>
  );
};

export default UbuntuWindow;
