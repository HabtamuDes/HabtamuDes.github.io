import {
  BadgeCheck,
  Braces,
  Code2,
  Container,
  Database,
  FolderKanban,
  FolderOpen,
  Gamepad2,
  GitBranch,
  Globe,
  Grid3x3,
  Mail,
  NotebookPen,
  RotateCcw,
  Send,
  ServerCog,
  Settings2,
  Terminal,
  Type,
  User,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { AppId } from "@/pages/Index";

interface UbuntuDesktopProps {
  onOpenApp: (id: AppId) => void;
  showGuide: boolean;
  onDismissGuide: () => void;
  isCompact: boolean;
  appLabels: Record<string, string>;
  copy: Record<string, string>;
}

type DesktopIconDef = {
  id: AppId;
  icon: React.FC<{ className?: string }>;
  label: string;
};

type IconLayout = {
  id: AppId;
  x: number;
  y: number;
  order: number;
};

const desktopIcons: DesktopIconDef[] = [
  { id: "about", icon: User, label: "About Me" },
  { id: "experience", icon: BadgeCheck, label: "Experience" },
  { id: "skills", icon: Code2, label: "Skills" },
  { id: "projects", icon: FolderOpen, label: "Projects" },
  { id: "vscode", icon: Braces, label: "VS Code" },
  { id: "pgadmin", icon: Database, label: "pgAdmin" },
  { id: "sqlserver", icon: ServerCog, label: "SQL Server" },
  { id: "browser", icon: Globe, label: "Browser" },
  { id: "postman", icon: Send, label: "Postman" },
  { id: "docker", icon: Container, label: "Docker" },
  { id: "gittools", icon: GitBranch, label: "Git Tools" },
  { id: "files", icon: FolderKanban, label: "Files" },
  { id: "settings", icon: Settings2, label: "Settings" },
  { id: "notes", icon: NotebookPen, label: "Notes" },
  { id: "snake", icon: Gamepad2, label: "Snake" },
  { id: "tictactoe", icon: Grid3x3, label: "Tic-Tac-Toe" },
  { id: "contact", icon: Mail, label: "Contact" },
  { id: "terminal", icon: Terminal, label: "Terminal" },
];

const WORKSPACE_CARD_STORAGE_KEY = "habtamu-portfolio:workspace-card";
const GUIDE_CARD_STORAGE_KEY = "habtamu-portfolio:guide-card";
const ICON_LAYOUT_STORAGE_KEY = "habtamu-portfolio:icon-layout";

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const getDefaultIconLayouts = (): IconLayout[] => {
  const width = typeof window === "undefined" ? 1440 : window.innerWidth;
  const primaryColumn = Math.max(24, width - 116);
  const secondaryColumn = Math.max(24, width - 210);

  return desktopIcons.map((item, index) => ({
    id: item.id,
    x: index < 9 ? primaryColumn : secondaryColumn,
    y: 72 + (index % 9) * 86,
    order: index,
  }));
};

const normalizeLayouts = (stored: IconLayout[]) => {
  const fallback = getDefaultIconLayouts();
  const fallbackMap = new Map(fallback.map((item) => [item.id, item]));

  return desktopIcons.map((item, index) => {
    const matched = stored.find((entry) => entry.id === item.id);
    const base = fallbackMap.get(item.id)!;
    return {
      id: item.id,
      x: typeof matched?.x === "number" ? matched.x : base.x,
      y: typeof matched?.y === "number" ? matched.y : base.y,
      order: typeof matched?.order === "number" ? matched.order : index,
    };
  });
};

const UbuntuDesktop = ({ onOpenApp, showGuide, onDismissGuide, isCompact, appLabels, copy }: UbuntuDesktopProps) => {
  const [cardPosition, setCardPosition] = useState(() => {
    if (typeof window === "undefined") return { x: 40, y: 80 };
    try {
      const raw = window.localStorage.getItem(WORKSPACE_CARD_STORAGE_KEY);
      if (!raw) return { x: 40, y: 80 };
      const parsed = JSON.parse(raw) as { x: number; y: number };
      return typeof parsed?.x === "number" && typeof parsed?.y === "number" ? parsed : { x: 40, y: 80 };
    } catch {
      return { x: 40, y: 80 };
    }
  });
  const [guidePosition, setGuidePosition] = useState(() => {
    if (typeof window === "undefined") return { x: 40, y: 430 };
    try {
      const raw = window.localStorage.getItem(GUIDE_CARD_STORAGE_KEY);
      if (!raw) return { x: 40, y: 430 };
      const parsed = JSON.parse(raw) as { x: number; y: number };
      return typeof parsed?.x === "number" && typeof parsed?.y === "number" ? parsed : { x: 40, y: 430 };
    } catch {
      return { x: 40, y: 430 };
    }
  });
  const [iconLayouts, setIconLayouts] = useState<IconLayout[]>(() => {
    if (typeof window === "undefined") return getDefaultIconLayouts();

    try {
      const raw = window.localStorage.getItem(ICON_LAYOUT_STORAGE_KEY);
      if (!raw) return getDefaultIconLayouts();
      const parsed = JSON.parse(raw) as IconLayout[];
      return Array.isArray(parsed) ? normalizeLayouts(parsed) : getDefaultIconLayouts();
    } catch {
      return getDefaultIconLayouts();
    }
  });

  const dragRef = useRef<{ startX: number; startY: number; x: number; y: number } | null>(null);
  const guideDragRef = useRef<{ startX: number; startY: number; x: number; y: number } | null>(null);
  const iconDragRef = useRef<{ id: AppId; startX: number; startY: number; x: number; y: number } | null>(null);

  const clampPosition = useCallback((x: number, y: number, width = 480, height = 300) => {
    const maxX = Math.max(16, window.innerWidth - width - 16);
    const maxY = Math.max(40, window.innerHeight - height - 16);
    return { x: clamp(x, 16, maxX), y: clamp(y, 48, maxY) };
  }, []);

  const clampIconPosition = useCallback((x: number, y: number) => {
    const maxX = Math.max(24, window.innerWidth - 104);
    const maxY = Math.max(72, window.innerHeight - 182);
    return { x: clamp(x, 24, maxX), y: clamp(y, 72, maxY) };
  }, []);

  const sortLayoutsByName = useCallback(() => {
    const sorted = [...desktopIcons].sort((a, b) => (appLabels[a.id] ?? a.label).localeCompare(appLabels[b.id] ?? b.label));
    const width = window.innerWidth;
    const primaryColumn = Math.max(24, width - 116);
    const secondaryColumn = Math.max(24, width - 210);

    setIconLayouts(
      sorted.map((item, index) => ({
        id: item.id,
        x: index < 9 ? primaryColumn : secondaryColumn,
        y: 72 + (index % 9) * 86,
        order: index,
      })),
    );
  }, [appLabels]);

  const resetIcons = useCallback(() => {
    setIconLayouts(getDefaultIconLayouts());
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setCardPosition((prev) => clampPosition(prev.x, prev.y));
      setGuidePosition((prev) => clampPosition(prev.x, prev.y, 448, 520));
      setIconLayouts((prev) =>
        prev.map((layout) => {
          const next = clampIconPosition(layout.x, layout.y);
          return { ...layout, ...next };
        }),
      );
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [clampIconPosition, clampPosition]);

  useEffect(() => {
    window.localStorage.setItem(WORKSPACE_CARD_STORAGE_KEY, JSON.stringify(cardPosition));
  }, [cardPosition]);

  useEffect(() => {
    window.localStorage.setItem(GUIDE_CARD_STORAGE_KEY, JSON.stringify(guidePosition));
  }, [guidePosition]);

  useEffect(() => {
    window.localStorage.setItem(ICON_LAYOUT_STORAGE_KEY, JSON.stringify(iconLayouts));
  }, [iconLayouts]);

  const orderedIcons = useMemo(() => {
    const orderMap = new Map(iconLayouts.map((item) => [item.id, item]));
    return [...desktopIcons].sort((a, b) => (orderMap.get(a.id)?.order ?? 0) - (orderMap.get(b.id)?.order ?? 0));
  }, [iconLayouts]);

  const iconLayoutMap = useMemo(
    () =>
      iconLayouts.reduce<Record<string, IconLayout>>((accumulator, item) => {
        accumulator[item.id] = item;
        return accumulator;
      }, {}),
    [iconLayouts],
  );

  const handleCardMouseDown = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    dragRef.current = { startX: event.clientX, startY: event.clientY, x: cardPosition.x, y: cardPosition.y };
    document.body.style.userSelect = "none";
    const handleMouseMove = (moveEvent: PointerEvent) => {
      if (!dragRef.current) return;
      setCardPosition(clampPosition(dragRef.current.x + (moveEvent.clientX - dragRef.current.startX), dragRef.current.y + (moveEvent.clientY - dragRef.current.startY)));
    };
    const handleMouseUp = () => {
      dragRef.current = null;
      document.body.style.userSelect = "";
      window.removeEventListener("pointermove", handleMouseMove);
      window.removeEventListener("pointerup", handleMouseUp);
    };
    window.addEventListener("pointermove", handleMouseMove);
    window.addEventListener("pointerup", handleMouseUp);
  }, [cardPosition.x, cardPosition.y, clampPosition]);

  const handleGuideMouseDown = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    guideDragRef.current = { startX: event.clientX, startY: event.clientY, x: guidePosition.x, y: guidePosition.y };
    document.body.style.userSelect = "none";
    const handleMouseMove = (moveEvent: PointerEvent) => {
      if (!guideDragRef.current) return;
      setGuidePosition(clampPosition(guideDragRef.current.x + (moveEvent.clientX - guideDragRef.current.startX), guideDragRef.current.y + (moveEvent.clientY - guideDragRef.current.startY), 448, 520));
    };
    const handleMouseUp = () => {
      guideDragRef.current = null;
      document.body.style.userSelect = "";
      window.removeEventListener("pointermove", handleMouseMove);
      window.removeEventListener("pointerup", handleMouseUp);
    };
    window.addEventListener("pointermove", handleMouseMove);
    window.addEventListener("pointerup", handleMouseUp);
  }, [clampPosition, guidePosition.x, guidePosition.y]);

  const handleIconMouseDown = useCallback((id: AppId, event: React.MouseEvent<HTMLButtonElement>) => {
    if (isCompact) return;

    const current = iconLayoutMap[id];
    if (!current) return;

    iconDragRef.current = { id, startX: event.clientX, startY: event.clientY, x: current.x, y: current.y };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!iconDragRef.current) return;

      const next = clampIconPosition(
        iconDragRef.current.x + (moveEvent.clientX - iconDragRef.current.startX),
        iconDragRef.current.y + (moveEvent.clientY - iconDragRef.current.startY),
      );

      setIconLayouts((prev) =>
        prev.map((layout) => (layout.id === id ? { ...layout, ...next } : layout)),
      );
    };

    const handleMouseUp = () => {
      iconDragRef.current = null;
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  }, [clampIconPosition, iconLayoutMap, isCompact]);

  return (
    <>
      <div className={`absolute border border-white/10 bg-slate-950/35 shadow-2xl backdrop-blur-2xl ${isCompact ? "left-3 right-3 top-16 z-[5] rounded-[24px] p-4" : "z-30 max-w-lg rounded-[28px] p-6"}`} style={isCompact ? undefined : { left: cardPosition.x, top: cardPosition.y }}>
        <div className={`mb-3 flex items-center justify-between rounded-2xl border border-white/8 bg-white/5 px-3 py-2 ${isCompact ? "" : "cursor-grab touch-none active:cursor-grabbing"}`} onPointerDown={isCompact ? undefined : handleCardMouseDown}>
          <p className="text-[11px] uppercase tracking-[0.28em] text-orange-200/75">{copy.engineerWorkspace}</p>
          {!isCompact && <span className="text-[10px] text-white/45">{copy.dragCard}</span>}
        </div>
        <h1 className={`${isCompact ? "text-2xl" : "text-3xl"} font-display font-bold text-white`}>Habtamu Assegahegn</h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-white/78">{copy.summary}</p>
        <div className={`mt-5 grid text-left ${isCompact ? "grid-cols-1 gap-2" : "grid-cols-3 gap-3"}`}>
          <div className="rounded-2xl border border-white/8 bg-white/5 px-3 py-3">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/45">{copy.focus}</p>
            <p className="mt-1 text-sm font-display font-medium text-white">{copy.focusValue}</p>
          </div>
          <div className="rounded-2xl border border-white/8 bg-white/5 px-3 py-3">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/45">{copy.hardware}</p>
            <p className="mt-1 text-sm font-display font-medium text-white">{copy.hardwareValue}</p>
          </div>
          <div className="rounded-2xl border border-white/8 bg-white/5 px-3 py-3">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/45">{copy.base}</p>
            <p className="mt-1 text-sm font-display font-medium text-white">{copy.baseValue}</p>
          </div>
        </div>
        <p className="mt-4 text-xs text-white/58">{copy.openHint}</p>
      </div>

      <div className={`absolute flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/68 px-3 py-2 backdrop-blur-xl ${isCompact ? "left-3 right-3 top-[13.75rem] z-[6] justify-between" : "right-6 top-12 z-30"}`}>
        <button
          type="button"
          onClick={sortLayoutsByName}
          className="flex items-center gap-2 rounded-xl border border-white/8 bg-white/5 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-white/72 transition-colors hover:bg-white/10 hover:text-white"
        >
          <Type className="h-3.5 w-3.5" />
          A-Z
        </button>
        <button
          type="button"
          onClick={resetIcons}
          className="flex items-center gap-2 rounded-xl border border-white/8 bg-white/5 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-white/72 transition-colors hover:bg-white/10 hover:text-white"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset Icons
        </button>
      </div>

      {isCompact ? (
        <div className="absolute left-3 right-3 top-[18rem] bottom-24 grid auto-rows-max grid-cols-3 gap-2 overflow-y-auto rounded-3xl border border-white/8 bg-slate-950/34 p-3 backdrop-blur-xl sm:grid-cols-4">
          {orderedIcons.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-label={`${appLabels[item.id] ?? item.label} desktop icon`}
              data-testid={`desktop-icon-${item.id}`}
              onClick={() => onOpenApp(item.id)}
              className="group flex w-full flex-col items-center gap-1.5 rounded-xl p-2.5 transition-colors hover:bg-foreground/10"
              style={{ order: iconLayoutMap[item.id]?.order ?? 0 }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/60 shadow-lg shadow-black/25">
                <item.icon className="h-6 w-6 text-foreground" />
              </div>
              <span className="text-center font-display text-[10px] leading-tight text-foreground/95 drop-shadow-md">{appLabels[item.id] ?? item.label}</span>
            </button>
          ))}
        </div>
      ) : (
        <div className="pointer-events-none absolute inset-0 z-10">
          {orderedIcons.map((item) => {
            const layout = iconLayoutMap[item.id];
            if (!layout) return null;

            return (
              <button
                key={item.id}
                type="button"
                aria-label={`${appLabels[item.id] ?? item.label} desktop icon`}
                data-testid={`desktop-icon-${item.id}`}
                onMouseDown={(event) => handleIconMouseDown(item.id, event)}
                onDoubleClick={() => onOpenApp(item.id)}
                className="pointer-events-auto group absolute flex w-[86px] cursor-grab flex-col items-center gap-1.5 rounded-xl p-3 transition-colors hover:bg-foreground/10 active:cursor-grabbing"
                style={{ left: layout.x, top: layout.y }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/60 shadow-lg shadow-black/25">
                  <item.icon className="h-6 w-6 text-foreground" />
                </div>
                <span className="text-center font-display text-[10px] leading-tight text-foreground/95 drop-shadow-md">{appLabels[item.id] ?? item.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {showGuide && (
        <>
          {!isCompact && <div className="guide-tooltip absolute left-[520px] top-[112px] z-20 max-w-xs rounded-2xl border border-white/10 bg-slate-950/72 p-4 text-sm text-white/75 shadow-xl backdrop-blur-xl"><p className="font-display font-semibold text-white">{copy.workspaceCard}</p><p className="mt-1">{copy.workspaceCardText}</p></div>}
          {!isCompact && <div className="guide-tooltip guide-tooltip-right absolute right-[128px] top-[132px] z-20 max-w-xs rounded-2xl border border-white/10 bg-slate-950/72 p-4 text-sm text-white/75 shadow-xl backdrop-blur-xl"><p className="font-display font-semibold text-white">{copy.desktopIcons}</p><p className="mt-1">{copy.desktopIconsText}</p></div>}
          {!isCompact && <div className="guide-tooltip absolute bottom-[118px] left-1/2 z-20 max-w-xs -translate-x-1/2 rounded-2xl border border-white/10 bg-slate-950/72 p-4 text-sm text-white/75 shadow-xl backdrop-blur-xl"><p className="font-display font-semibold text-white">{copy.dock}</p><p className="mt-1">{copy.dockText}</p></div>}

          <div className={`absolute z-40 w-full ${isCompact ? "max-w-[calc(100%-2rem)]" : "max-w-md"} rounded-[28px] border border-white/10 bg-slate-950/78 p-6 shadow-2xl backdrop-blur-2xl`} style={{ left: guidePosition.x, top: guidePosition.y }}>
            <div className="mb-3 flex cursor-grab touch-none items-start justify-between gap-4 rounded-2xl border border-white/8 bg-white/5 px-3 py-3 active:cursor-grabbing" onPointerDown={handleGuideMouseDown}>
              <div>
                <p className="text-[11px] uppercase tracking-[0.28em] text-orange-200/75">{copy.welcomeGuide}</p>
                <h2 className="mt-2 text-2xl font-display font-bold text-white">{copy.welcomeTitle}</h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-white/45">{copy.dragGuide}</span>
                <button type="button" onClick={onDismissGuide} data-testid="guide-close" className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70 transition-colors hover:bg-white/10 hover:text-white">
                  {copy.close}
                </button>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-white/72">{copy.intro}</p>

            <div className="mt-5 space-y-4">
              <div className="rounded-2xl border border-white/8 bg-white/5 p-4">
                <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-white/45">{copy.howToExplore}</p>
                <div className="space-y-2 text-sm text-white/78">
                  <p>{isCompact ? copy.howOpenIconsMobile : copy.howOpenIconsDesktop}</p>
                  <p>{copy.howDock}</p>
                  <p>{copy.howWindows}</p>
                  <p>{copy.howControls}</p>
                  <p>{copy.howLauncher}</p>
                </div>
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/5 p-4">
                <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-white/45">{copy.whatFirst}</p>
                <div className="grid gap-2 text-sm text-white/78">
                  <p>{copy.firstAbout}</p>
                  <p>{copy.firstProjects}</p>
                  <p>{copy.firstTools}</p>
                  <p>{copy.firstExtras}</p>
                </div>
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/5 p-4">
                <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-white/45">{copy.helpfulTips}</p>
                <div className="space-y-2 text-sm text-white/78">
                  <p>{copy.tipCard}</p>
                  <p>{copy.tipSaved}</p>
                  <p>{copy.tipGuide}</p>
                  <p>{copy.tipShortcuts}</p>
                  <p>{copy.tipReset}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UbuntuDesktop;
