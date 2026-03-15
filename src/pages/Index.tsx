import { useCallback, useEffect, useState } from "react";
import UbuntuTopBar from "@/components/ubuntu/UbuntuTopBar";
import UbuntuDock from "@/components/ubuntu/UbuntuDock";
import UbuntuDesktop from "@/components/ubuntu/UbuntuDesktop";
import UbuntuWindow from "@/components/ubuntu/UbuntuWindow";
import CommandPalette, { type LauncherItem } from "@/components/ubuntu/CommandPalette";
import AboutWindow from "@/components/ubuntu/windows/AboutWindow";
import SkillsWindow from "@/components/ubuntu/windows/SkillsWindow";
import ProjectsWindow from "@/components/ubuntu/windows/ProjectsWindow";
import ContactWindow from "@/components/ubuntu/windows/ContactWindow";
import TerminalWindow from "@/components/ubuntu/windows/TerminalWindow";
import NotesWindow from "@/components/ubuntu/windows/NotesWindow";
import SnakeWindow from "@/components/ubuntu/windows/SnakeWindow";
import TicTacToeWindow from "@/components/ubuntu/windows/TicTacToeWindow";
import DevToolsWindow from "@/components/ubuntu/windows/DevToolsWindow";
import SettingsWindow, { type DesktopPreferences } from "@/components/ubuntu/windows/SettingsWindow";
import FilesWindow from "@/components/ubuntu/windows/FilesWindow";
import ExperienceWindow from "@/components/ubuntu/windows/ExperienceWindow";
import { languageOptions, translations, type Language } from "@/lib/localization";

export type AppId =
  | "about"
  | "experience"
  | "skills"
  | "projects"
  | "contact"
  | "terminal"
  | "notes"
  | "snake"
  | "tictactoe"
  | "vscode"
  | "pgadmin"
  | "sqlserver"
  | "browser"
  | "postman"
  | "docker"
  | "gittools"
  | "settings"
  | "files";

export interface WindowState {
  id: AppId;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { w: number; h: number };
}

const defaultWindows: Record<AppId, Omit<WindowState, "isOpen" | "isMinimized" | "zIndex">> = {
  about: { id: "about", isMaximized: false, position: { x: 120, y: 60 }, size: { w: 650, h: 480 } },
  experience: { id: "experience", isMaximized: false, position: { x: 140, y: 72 }, size: { w: 760, h: 540 } },
  skills: { id: "skills", isMaximized: false, position: { x: 200, y: 80 }, size: { w: 700, h: 500 } },
  projects: { id: "projects", isMaximized: false, position: { x: 160, y: 50 }, size: { w: 750, h: 520 } },
  contact: { id: "contact", isMaximized: false, position: { x: 250, y: 90 }, size: { w: 600, h: 460 } },
  terminal: { id: "terminal", isMaximized: false, position: { x: 180, y: 70 }, size: { w: 700, h: 440 } },
  notes: { id: "notes", isMaximized: false, position: { x: 540, y: 120 }, size: { w: 460, h: 440 } },
  snake: { id: "snake", isMaximized: false, position: { x: 280, y: 100 }, size: { w: 520, h: 540 } },
  tictactoe: { id: "tictactoe", isMaximized: false, position: { x: 320, y: 120 }, size: { w: 460, h: 460 } },
  vscode: { id: "vscode", isMaximized: false, position: { x: 140, y: 40 }, size: { w: 840, h: 560 } },
  pgadmin: { id: "pgadmin", isMaximized: false, position: { x: 210, y: 70 }, size: { w: 760, h: 520 } },
  sqlserver: { id: "sqlserver", isMaximized: false, position: { x: 260, y: 90 }, size: { w: 780, h: 520 } },
  browser: { id: "browser", isMaximized: false, position: { x: 120, y: 36 }, size: { w: 920, h: 580 } },
  postman: { id: "postman", isMaximized: false, position: { x: 200, y: 65 }, size: { w: 780, h: 520 } },
  docker: { id: "docker", isMaximized: false, position: { x: 230, y: 75 }, size: { w: 760, h: 500 } },
  gittools: { id: "gittools", isMaximized: false, position: { x: 170, y: 55 }, size: { w: 760, h: 500 } },
  settings: { id: "settings", isMaximized: false, position: { x: 240, y: 80 }, size: { w: 820, h: 560 } },
  files: { id: "files", isMaximized: false, position: { x: 210, y: 64 }, size: { w: 880, h: 560 } },
};

const WINDOWS_STORAGE_KEY = "habtamu-portfolio:windows";
const TOP_Z_STORAGE_KEY = "habtamu-portfolio:top-z";
const WORKSPACE_CARD_STORAGE_KEY = "habtamu-portfolio:workspace-card";
const NOTES_STORAGE_KEY = "habtamu-portfolio:notes";
const TICTACTOE_STORAGE_KEY = "habtamu-portfolio:tictactoe";
const SNAKE_STORAGE_KEY = "habtamu-portfolio:snake";
const GUIDE_DISMISSED_STORAGE_KEY = "habtamu-portfolio:guide-dismissed";
const PREFERENCES_STORAGE_KEY = "habtamu-portfolio:preferences";
const LANGUAGE_STORAGE_KEY = "habtamu-portfolio:language";

const defaultPreferences: DesktopPreferences = {
  theme: "midnight",
  wallpaper: "portfolio-wallpaper.svg",
};

const isSupportedLanguage = (value: string | null): value is Language =>
  value === "en" || value === "am" || value === "fr" || value === "de";

const getInitialWindows = (): WindowState[] => {
  if (typeof window === "undefined") {
    return [{ ...defaultWindows.notes, isOpen: true, isMinimized: false, zIndex: 10 }];
  }

  try {
    const raw = window.localStorage.getItem(WINDOWS_STORAGE_KEY);
    if (!raw) {
      return [{ ...defaultWindows.notes, isOpen: true, isMinimized: false, zIndex: 10 }];
    }

    const parsed = JSON.parse(raw) as WindowState[];
    if (!Array.isArray(parsed)) {
      return [{ ...defaultWindows.notes, isOpen: true, isMinimized: false, zIndex: 10 }];
    }

    return parsed.filter((item) => item && typeof item.id === "string");
  } catch {
    return [{ ...defaultWindows.notes, isOpen: true, isMinimized: false, zIndex: 10 }];
  }
};

const getInitialTopZ = () => {
  if (typeof window === "undefined") return 10;

  const raw = window.localStorage.getItem(TOP_Z_STORAGE_KEY);
  const parsed = raw ? Number(raw) : 10;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 10;
};

const getDefaultWorkspace = () => [{ ...defaultWindows.notes, isOpen: true, isMinimized: false, zIndex: 10 }];

const getInitialPreferences = (): DesktopPreferences => {
  if (typeof window === "undefined") return defaultPreferences;

  try {
    const raw = window.localStorage.getItem(PREFERENCES_STORAGE_KEY);
    if (!raw) return defaultPreferences;
    const parsed = JSON.parse(raw) as Partial<DesktopPreferences>;
    return {
      theme: parsed.theme === "aurora" || parsed.theme === "ember" || parsed.theme === "midnight" ? parsed.theme : defaultPreferences.theme,
      wallpaper:
        parsed.wallpaper === "portfolio-wallpaper-aurora.svg" ||
        parsed.wallpaper === "portfolio-wallpaper-ember.svg" ||
        parsed.wallpaper === "portfolio-wallpaper.svg"
          ? parsed.wallpaper
          : defaultPreferences.wallpaper,
    };
  } catch {
    return defaultPreferences;
  }
};

const Index = () => {
  const [windows, setWindows] = useState<WindowState[]>(getInitialWindows);
  const [topZ, setTopZ] = useState(getInitialTopZ);
  const [isBooting, setIsBooting] = useState(true);
  const [isCompact, setIsCompact] = useState(() => (typeof window === "undefined" ? false : window.innerWidth < 900));
  const [isLauncherOpen, setIsLauncherOpen] = useState(false);
  const [preferences, setPreferences] = useState<DesktopPreferences>(getInitialPreferences);
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === "undefined") return "en";
    const raw = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return isSupportedLanguage(raw) ? raw : "en";
  });
  const [showGuide, setShowGuide] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.localStorage.getItem(GUIDE_DISMISSED_STORAGE_KEY) !== "true";
  });

  useEffect(() => {
    window.localStorage.setItem(WINDOWS_STORAGE_KEY, JSON.stringify(windows));
  }, [windows]);

  useEffect(() => {
    window.localStorage.setItem(TOP_Z_STORAGE_KEY, String(topZ));
  }, [topZ]);

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsBooting(false), 1800);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsCompact(window.innerWidth < 900);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(GUIDE_DISMISSED_STORAGE_KEY, showGuide ? "false" : "true");
  }, [showGuide]);

  useEffect(() => {
    window.localStorage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify(preferences));
    document.documentElement.dataset.theme = preferences.theme;
  }, [preferences]);

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const tagName = target?.tagName?.toLowerCase();
      const isTypingTarget = tagName === "input" || tagName === "textarea" || target?.isContentEditable;

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsLauncherOpen(true);
        return;
      }

      if (!isTypingTarget && event.key === "?") {
        event.preventDefault();
        setShowGuide(true);
        return;
      }

      if (event.key === "Escape") {
        setIsLauncherOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const openApp = useCallback((id: AppId) => {
    setWindows((prev) => {
      const existing = prev.find((w) => w.id === id);
      if (existing) {
        if (existing.isMinimized) {
          return prev.map((w) => w.id === id ? { ...w, isMinimized: false, isMaximized: isCompact ? true : w.isMaximized, zIndex: topZ + 1 } : w);
        }
        return prev.map((w) => w.id === id ? { ...w, isMaximized: isCompact ? true : w.isMaximized, zIndex: topZ + 1 } : w);
      }
      const def = defaultWindows[id];
      return [...prev, { ...def, isOpen: true, isMinimized: false, isMaximized: isCompact, zIndex: topZ + 1 }];
    });
    setTopZ((z) => z + 1);
  }, [isCompact, topZ]);

  const closeApp = useCallback((id: AppId) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const minimizeApp = useCallback((id: AppId) => {
    setWindows((prev) => prev.map((w) => w.id === id ? { ...w, isMinimized: true } : w));
  }, []);

  const focusApp = useCallback((id: AppId) => {
    setWindows((prev) => prev.map((w) => w.id === id ? { ...w, zIndex: topZ + 1 } : w));
    setTopZ((z) => z + 1);
  }, [topZ]);

  const moveWindow = useCallback((id: AppId, pos: { x: number; y: number }) => {
    setWindows((prev) => prev.map((w) => w.id === id ? { ...w, position: pos } : w));
  }, []);

  const resizeWindow = useCallback((id: AppId, next: Partial<Pick<WindowState, "position" | "size">>) => {
    setWindows((prev) =>
      prev.map((w) => w.id === id ? { ...w, ...next, position: next.position ?? w.position, size: next.size ?? w.size } : w),
    );
  }, []);

  const toggleMaximize = useCallback((id: AppId) => {
    setWindows((prev) => prev.map((w) => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w));
  }, []);

  const copy = translations[language] ?? translations.en;

  const resetWorkspace = useCallback(() => {
    if (!window.confirm((translations[language] ?? translations.en).resetConfirm)) {
      return;
    }

    [
      WINDOWS_STORAGE_KEY,
      TOP_Z_STORAGE_KEY,
      WORKSPACE_CARD_STORAGE_KEY,
      GUIDE_DISMISSED_STORAGE_KEY,
      NOTES_STORAGE_KEY,
      TICTACTOE_STORAGE_KEY,
      SNAKE_STORAGE_KEY,
      PREFERENCES_STORAGE_KEY,
      LANGUAGE_STORAGE_KEY,
    ].forEach((key) => window.localStorage.removeItem(key));

    setWindows(getDefaultWorkspace());
    setTopZ(10);
    window.location.reload();
  }, [language]);

  const openAppIds = windows.filter((w) => !w.isMinimized).map((w) => w.id);
  const windowTitles: Record<AppId, string> = {
    about: copy.appLabels.about,
    experience: copy.appLabels.experience,
    skills: copy.appLabels.skills,
    projects: copy.appLabels.projects,
    contact: copy.appLabels.contact,
    terminal: copy.appLabels.terminal,
    notes: copy.appLabels.notes,
    snake: copy.appLabels.snake,
    tictactoe: copy.appLabels.tictactoe,
    vscode: copy.appLabels.vscode,
    pgadmin: copy.appLabels.pgadmin,
    sqlserver: copy.appLabels.sqlserver,
    browser: copy.appLabels.browser,
    postman: copy.appLabels.postman,
    docker: copy.appLabels.docker,
    gittools: copy.appLabels.gittools,
    settings: copy.appLabels.settings,
    files: copy.appLabels.files,
  };
  const launcherItems: LauncherItem[] = [
    { id: "about", title: copy.appLabels.about, description: "Background, role, location, and engineering focus.", keywords: ["profile", "bio", "intro"] },
    { id: "experience", title: copy.appLabels.experience, description: "Timeline of engineering work across product, enterprise, and embedded systems.", keywords: ["timeline", "career", "work history"] },
    { id: "skills", title: copy.appLabels.skills, description: "Technical stack across frontend, backend, embedded, and tools.", keywords: ["stack", "tech", "capabilities"] },
    { id: "projects", title: copy.appLabels.projects, description: "Case studies, screenshots, outcomes, and engineering context.", keywords: ["portfolio", "case studies", "work"] },
    { id: "contact", title: copy.appLabels.contact, description: "Direct contact details and collaboration routes.", keywords: ["email", "hire", "reach out"] },
    { id: "terminal", title: copy.appLabels.terminal, description: "Terminal-style portfolio interaction and command output.", keywords: ["shell", "cli", "console"] },
    { id: "notes", title: copy.appLabels.notes, description: "Editable scratchpad and task list with persistence.", keywords: ["todo", "tasks", "memo"] },
    { id: "snake", title: copy.appLabels.snake, description: "Playable snake game inside the desktop shell.", keywords: ["game", "arcade"] },
    { id: "tictactoe", title: copy.appLabels.tictactoe, description: "Simple interactive board game for visitors.", keywords: ["game", "board"] },
    { id: "vscode", title: copy.appLabels.vscode, description: "Mock editor workspace showing software engineering flow.", keywords: ["editor", "coding", "development"] },
    { id: "pgadmin", title: copy.appLabels.pgadmin, description: "PostgreSQL-style admin panel with schema and query layout.", keywords: ["database", "postgres", "sql"] },
    { id: "sqlserver", title: copy.appLabels.sqlserver, description: "Enterprise-style SQL management workspace.", keywords: ["database", "mssql", "queries"] },
    { id: "browser", title: copy.appLabels.browser, description: "Mock browser showing deployment and preview workflow.", keywords: ["preview", "web", "testing"] },
    { id: "postman", title: copy.appLabels.postman, description: "API request and response workflow.", keywords: ["api", "http", "testing"] },
    { id: "docker", title: copy.appLabels.docker, description: "Container workflow for local services and reproducible setups.", keywords: ["containers", "compose", "infra"] },
    { id: "gittools", title: copy.appLabels.gittools, description: "Branch, commit, and working tree developer workflow.", keywords: ["git", "github", "version control"] },
    { id: "settings", title: copy.appLabels.settings, description: "Theme presets, wallpaper switching, language, and desktop personalization.", keywords: ["theme", "wallpaper", "preferences"] },
    { id: "files", title: copy.appLabels.files, description: "Portfolio file explorer with quick shortcuts and downloads.", keywords: ["explorer", "folders", "documents"] },
  ];
  const windowContent: Record<AppId, React.FC> = {
    about: () => <AboutWindow language={language} />,
    experience: () => <ExperienceWindow language={language} />,
    skills: () => <SkillsWindow language={language} />,
    projects: () => <ProjectsWindow language={language} />,
    contact: () => <ContactWindow language={language} />,
    terminal: () => <TerminalWindow language={language} />,
    notes: () => <NotesWindow language={language} />,
    snake: () => <SnakeWindow language={language} />,
    tictactoe: () => <TicTacToeWindow language={language} />,
    vscode: () => <DevToolsWindow tool="vscode" />,
    pgadmin: () => <DevToolsWindow tool="pgadmin" />,
    sqlserver: () => <DevToolsWindow tool="sqlserver" />,
    browser: () => <DevToolsWindow tool="browser" />,
    postman: () => <DevToolsWindow tool="postman" />,
    docker: () => <DevToolsWindow tool="docker" />,
    gittools: () => <DevToolsWindow tool="gittools" />,
    settings: () => <SettingsWindow preferences={preferences} onChange={setPreferences} language={language} onLanguageChange={setLanguage} />,
    files: () => <FilesWindow onOpenApp={openApp} language={language} />,
  };

  return (
    <div className="h-screen w-screen overflow-hidden relative select-none">
      {/* Wallpaper */}
      <img src={`/${preferences.wallpaper}`} alt="" className="absolute inset-0 h-full w-full object-cover" />

      {/* Top bar */}
      <UbuntuTopBar
        onResetWorkspace={resetWorkspace}
        onShowGuide={() => setShowGuide(true)}
        onOpenLauncher={() => setIsLauncherOpen(true)}
        isCompact={isCompact}
        language={language}
        languageOptions={languageOptions}
        onLanguageChange={setLanguage}
        openWindowCount={openAppIds.length}
        currentTheme={preferences.theme}
        labels={copy.topbar}
      />

      {/* Desktop area */}
      <UbuntuDesktop onOpenApp={openApp} showGuide={showGuide && !isBooting} onDismissGuide={() => setShowGuide(false)} isCompact={isCompact} appLabels={copy.appLabels} copy={copy.desktop} />

      <CommandPalette
        isOpen={isLauncherOpen && !isBooting}
        items={launcherItems}
        onClose={() => setIsLauncherOpen(false)}
        onOpenApp={openApp}
        onShowGuide={() => setShowGuide(true)}
        copy={copy.launcher}
      />

      {/* Windows */}
      {windows.map((win) => {
        if (win.isMinimized) return null;
        const Content = windowContent[win.id];
        return (
          <UbuntuWindow
            key={win.id}
            id={win.id}
            title={windowTitles[win.id]}
            position={win.position}
            size={win.size}
            isMaximized={win.isMaximized}
            zIndex={win.zIndex}
            onClose={closeApp}
            onMinimize={minimizeApp}
            onToggleMaximize={toggleMaximize}
            onFocus={focusApp}
            onMove={moveWindow}
            onResize={resizeWindow}
            isCompact={isCompact}
          >
            <Content />
          </UbuntuWindow>
        );
      })}

      {/* Dock */}
      <UbuntuDock onOpenApp={openApp} activeApps={openAppIds} appLabels={copy.appLabels} />

      {isBooting && (
        <div className="boot-overlay absolute inset-0 z-[140] flex items-center justify-center">
          <div className="w-full max-w-xl rounded-[32px] border border-white/10 bg-slate-950/78 px-8 py-8 shadow-2xl backdrop-blur-2xl">
            <p className="text-[11px] uppercase tracking-[0.28em] text-orange-200/70">{copy.boot.label}</p>
            <h2 className="mt-3 text-3xl font-display font-bold text-white">{copy.boot.title}</h2>
            <p className="mt-2 text-sm text-white/68">{copy.boot.description}</p>
            <div className="mt-6 overflow-hidden rounded-full border border-white/10 bg-white/5">
              <div className="boot-progress h-2 rounded-full bg-gradient-to-r from-orange-500 via-sky-400 to-cyan-300" />
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3 text-sm">
              <div className="rounded-2xl border border-white/8 bg-white/5 px-3 py-3 text-white/78">{copy.boot.loadingApps}</div>
              <div className="rounded-2xl border border-white/8 bg-white/5 px-3 py-3 text-white/78">{copy.boot.restoringState}</div>
              <div className="rounded-2xl border border-white/8 bg-white/5 px-3 py-3 text-white/78">{copy.boot.preparingDesktop}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
