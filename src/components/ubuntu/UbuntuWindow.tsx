import { useRef, useCallback } from "react";
import { X, Minus, Square } from "lucide-react";
import type { AppId } from "@/pages/Index";

interface UbuntuWindowProps {
  id: AppId;
  title: string;
  position: { x: number; y: number };
  size: { w: number; h: number };
  isMaximized: boolean;
  zIndex: number;
  onClose: (id: AppId) => void;
  onMinimize: (id: AppId) => void;
  onToggleMaximize: (id: AppId) => void;
  onFocus: (id: AppId) => void;
  onMove: (id: AppId, pos: { x: number; y: number }) => void;
  onResize: (id: AppId, next: { position?: { x: number; y: number }; size?: { w: number; h: number } }) => void;
  children: React.ReactNode;
  isCompact: boolean;
}

const MIN_WIDTH = 360;
const MIN_HEIGHT = 260;

const UbuntuWindow = ({
  id,
  title,
  position,
  size,
  isMaximized,
  zIndex,
  onClose,
  onMinimize,
  onToggleMaximize,
  onFocus,
  onMove,
  onResize,
  children,
  isCompact,
}: UbuntuWindowProps) => {
  const dragRef = useRef<{ startX: number; startY: number; posX: number; posY: number } | null>(null);
  const resizeRef = useRef<{
    direction: string;
    startX: number;
    startY: number;
    position: { x: number; y: number };
    size: { w: number; h: number };
  } | null>(null);

  const clampPosition = useCallback((x: number, y: number, width: number, height: number) => {
    const maxX = Math.max(0, window.innerWidth - width);
    const maxY = Math.max(32, window.innerHeight - 72 - height);
    return {
      x: Math.min(Math.max(0, x), maxX),
      y: Math.min(Math.max(32, y), maxY),
    };
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (isMaximized) return;
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
      const next = clampPosition(dragRef.current.posX + dx, dragRef.current.posY + dy, size.w, size.h);
      onMove(id, next);
    };

    const handleMouseUp = () => {
      dragRef.current = null;
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  }, [clampPosition, id, isMaximized, onFocus, onMove, size.h, size.w, position]);

  const handleResizeStart = useCallback((direction: string, e: React.MouseEvent<HTMLDivElement>) => {
    if (isMaximized) return;
    e.preventDefault();
    e.stopPropagation();
    onFocus(id);

    resizeRef.current = {
      direction,
      startX: e.clientX,
      startY: e.clientY,
      position,
      size,
    };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!resizeRef.current) return;

      const dx = moveEvent.clientX - resizeRef.current.startX;
      const dy = moveEvent.clientY - resizeRef.current.startY;

      let nextX = resizeRef.current.position.x;
      let nextY = resizeRef.current.position.y;
      let nextW = resizeRef.current.size.w;
      let nextH = resizeRef.current.size.h;

      if (resizeRef.current.direction.includes("right")) {
        nextW = Math.max(MIN_WIDTH, resizeRef.current.size.w + dx);
      }
      if (resizeRef.current.direction.includes("bottom")) {
        nextH = Math.max(MIN_HEIGHT, resizeRef.current.size.h + dy);
      }
      if (resizeRef.current.direction.includes("left")) {
        nextW = Math.max(MIN_WIDTH, resizeRef.current.size.w - dx);
        nextX = resizeRef.current.position.x + (resizeRef.current.size.w - nextW);
      }
      if (resizeRef.current.direction.includes("top")) {
        nextH = Math.max(MIN_HEIGHT, resizeRef.current.size.h - dy);
        nextY = resizeRef.current.position.y + (resizeRef.current.size.h - nextH);
      }

      nextW = Math.min(nextW, window.innerWidth - nextX);
      nextH = Math.min(nextH, window.innerHeight - 72 - nextY);

      const nextPosition = clampPosition(nextX, nextY, nextW, nextH);
      onResize(id, {
        position: nextPosition,
        size: { w: nextW, h: nextH },
      });
    };

    const handleMouseUp = () => {
      resizeRef.current = null;
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  }, [clampPosition, id, isMaximized, onFocus, onResize, position, size]);

  const style = isMaximized
    ? { top: 32, left: 0, width: "100vw", height: `calc(100vh - 32px - ${isCompact ? 24 : 72}px)`, zIndex }
    : isCompact
      ? { top: 48, left: 8, width: "calc(100vw - 16px)", height: "calc(100vh - 136px)", zIndex }
      : { top: position.y, left: position.x, width: size.w, height: size.h, zIndex };

  return (
    <div
      data-testid={`window-${id}`}
      className={`ubuntu-window fixed flex flex-col animate-window-open ${isMaximized ? "!rounded-none" : ""}`}
      style={style}
      onMouseDown={() => onFocus(id)}
    >
      {/* Header */}
      <div
        className={`ubuntu-window-header flex items-center h-10 px-3 ${isCompact ? "rounded-t-xl" : "rounded-t-xl cursor-grab active:cursor-grabbing"} shrink-0`}
        onMouseDown={isCompact ? undefined : handleMouseDown}
        onDoubleClick={() => onToggleMaximize(id)}
      >
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); onClose(id); }}
            aria-label={`Close ${title}`}
            data-testid={`window-close-${id}`}
            className="w-3.5 h-3.5 rounded-full flex items-center justify-center group"
            style={{ background: "hsl(var(--window-close))" }}
          >
            <X className="w-2 h-2 opacity-0 group-hover:opacity-100 text-foreground transition-opacity" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onMinimize(id); }}
            aria-label={`Minimize ${title}`}
            data-testid={`window-minimize-${id}`}
            className="w-3.5 h-3.5 rounded-full flex items-center justify-center group"
            style={{ background: "hsl(var(--window-minimize))" }}
          >
            <Minus className="w-2 h-2 opacity-0 group-hover:opacity-100 text-foreground transition-opacity" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onToggleMaximize(id); }}
            aria-label={`Maximize ${title}`}
            data-testid={`window-maximize-${id}`}
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

      {!isMaximized && !isCompact && (
        <>
          <div className="absolute inset-y-4 left-0 w-1 cursor-ew-resize" onMouseDown={(e) => handleResizeStart("left", e)} />
          <div className="absolute inset-y-4 right-0 w-1 cursor-ew-resize" onMouseDown={(e) => handleResizeStart("right", e)} />
          <div className="absolute inset-x-4 top-0 h-1 cursor-ns-resize" onMouseDown={(e) => handleResizeStart("top", e)} />
          <div className="absolute inset-x-4 bottom-0 h-1 cursor-ns-resize" onMouseDown={(e) => handleResizeStart("bottom", e)} />
          <div className="absolute left-0 top-0 h-3 w-3 cursor-nwse-resize" onMouseDown={(e) => handleResizeStart("top-left", e)} />
          <div className="absolute right-0 top-0 h-3 w-3 cursor-nesw-resize" onMouseDown={(e) => handleResizeStart("top-right", e)} />
          <div className="absolute bottom-0 left-0 h-3 w-3 cursor-nesw-resize" onMouseDown={(e) => handleResizeStart("bottom-left", e)} />
          <div className="absolute bottom-0 right-0 h-3 w-3 cursor-nwse-resize" onMouseDown={(e) => handleResizeStart("bottom-right", e)} />
        </>
      )}
    </div>
  );
};

export default UbuntuWindow;
