import { useEffect, useMemo, useRef, useState } from "react";
import { Battery, CalendarDays, Gauge, LayoutGrid, Volume2, Wifi } from "lucide-react";
import type { Language } from "@/lib/localization";

interface UbuntuTopBarProps {
  onResetWorkspace: () => void;
  onShowGuide: () => void;
  onOpenLauncher: () => void;
  language: Language;
  languageOptions: { value: Language; label: string }[];
  onLanguageChange: (value: Language) => void;
  openWindowCount: number;
  currentTheme: string;
  labels: {
    workspace: string;
    launcher: string;
    guide: string;
    reset: string;
    language: string;
    shortcut: string;
  };
}

const fallbackLabels: UbuntuTopBarProps["labels"] = {
  workspace: "Habtamu Workspace",
  launcher: "Launcher",
  guide: "Guide",
  reset: "Reset",
  language: "Language",
  shortcut: "Ctrl+K",
};

const localeMap: Record<Language, string> = {
  en: "en-US",
  am: "am-ET",
  fr: "fr-FR",
  de: "de-DE",
};

const UbuntuTopBar = ({
  onResetWorkspace,
  onShowGuide,
  onOpenLauncher,
  language = "en",
  languageOptions = [],
  onLanguageChange,
  openWindowCount,
  currentTheme,
  labels = fallbackLabels,
}: UbuntuTopBarProps) => {
  const [time, setTime] = useState(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isWidgetsOpen, setIsWidgetsOpen] = useState(false);
  const safeLabels = labels ?? fallbackLabels;
  const locale = localeMap[language] ?? "en-US";
  const widgetsRef = useRef<HTMLDivElement | null>(null);

  const calendarCells = useMemo(() => {
    const year = time.getFullYear();
    const month = time.getMonth();
    const first = new Date(year, month, 1);
    const firstWeekday = first.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: Array<number | null> = [];

    for (let index = 0; index < firstWeekday; index += 1) {
      cells.push(null);
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      cells.push(day);
    }

    while (cells.length < 35) {
      cells.push(null);
    }

    return cells;
  }, [time]);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!widgetsRef.current?.contains(event.target as Node)) {
        setIsCalendarOpen(false);
        setIsWidgetsOpen(false);
      }
    };

    window.addEventListener("mousedown", handlePointerDown);
    return () => window.removeEventListener("mousedown", handlePointerDown);
  }, []);

  const formatDate = (d: Date) => {
    return d.toLocaleDateString(locale, { weekday: "short", month: "short", day: "numeric" }) +
      " " + d.toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit", hour12: true });
  };

  return (
    <div ref={widgetsRef} className="ubuntu-panel fixed top-0 left-0 right-0 h-8 z-[100] flex items-center justify-between px-4 text-xs">
      <div className="flex items-center gap-2 rounded px-3 py-1 font-display font-medium">
        <span className="h-2 w-2 rounded-full bg-primary" />
        {safeLabels.workspace}
      </div>
      <div className="flex items-center gap-3">
        <label className="sr-only" htmlFor="language-switcher">{safeLabels.language}</label>
        <select
          id="language-switcher"
          data-testid="language-select"
          value={language}
          onChange={(event) => onLanguageChange(event.target.value as Language)}
          className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-white/80 outline-none"
        >
          {languageOptions.map((option) => (
            <option key={option.value} value={option.value} className="bg-slate-900 text-white">
              {option.label}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={onOpenLauncher}
          className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          {safeLabels.launcher}
        </button>
        <button
          type="button"
          onClick={onShowGuide}
          className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          {safeLabels.guide}
        </button>
        <button
          type="button"
          onClick={onResetWorkspace}
          className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          {safeLabels.reset}
        </button>
        <span className="rounded-md border border-white/10 bg-black/10 px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-white/45">
          {safeLabels.shortcut}
        </span>
        <button
          type="button"
          onClick={() => {
            setIsWidgetsOpen((value) => !value);
            setIsCalendarOpen(false);
          }}
          className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          Widgets
        </button>
        <button
          type="button"
          data-testid="calendar-toggle"
          onClick={() => {
            setIsCalendarOpen((value) => !value);
            setIsWidgetsOpen(false);
          }}
          className="flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
        >
          <CalendarDays className="h-3.5 w-3.5" />
          <span className="font-display font-medium">{formatDate(time)}</span>
        </button>
        <Wifi className="w-3.5 h-3.5 text-foreground" />
        <Volume2 className="w-3.5 h-3.5 text-foreground" />
        <Battery className="w-3.5 h-3.5 text-foreground" />
      </div>

      {isWidgetsOpen && (
        <div className="absolute right-4 top-10 z-[120] w-72 rounded-2xl border border-white/10 bg-slate-950/94 p-4 shadow-2xl backdrop-blur-2xl" data-testid="widgets-panel">
          <div className="flex items-center gap-2">
            <LayoutGrid className="h-4 w-4 text-primary" />
            <p className="font-display text-sm font-semibold text-white">Workspace Widgets</p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-2xl border border-white/8 bg-white/5 p-3">
              <p className="text-[10px] uppercase tracking-[0.18em] text-white/45">Open Apps</p>
              <p className="mt-2 font-display text-xl text-white">{openWindowCount}</p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/5 p-3">
              <p className="text-[10px] uppercase tracking-[0.18em] text-white/45">Theme</p>
              <p className="mt-2 font-display text-base capitalize text-white">{currentTheme}</p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/5 p-3">
              <p className="text-[10px] uppercase tracking-[0.18em] text-white/45">Language</p>
              <p className="mt-2 font-display text-base text-white">{language.toUpperCase()}</p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/5 p-3">
              <div className="flex items-center gap-2">
                <Gauge className="h-3.5 w-3.5 text-primary" />
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/45">Status</p>
              </div>
              <p className="mt-2 text-xs text-white/72">Layout, notes, and desktop preferences are being saved locally.</p>
            </div>
          </div>
        </div>
      )}

      {isCalendarOpen && (
        <div className="absolute right-4 top-10 z-[120] w-80 rounded-2xl border border-white/10 bg-slate-950/94 p-4 shadow-2xl backdrop-blur-2xl" data-testid="calendar-panel">
          <p className="text-[10px] uppercase tracking-[0.2em] text-orange-200/75">Ubuntu Clock</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-white">
            {time.toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit", hour12: true })}
          </h2>
          <p className="mt-1 text-sm text-white/68">
            {time.toLocaleDateString(locale, { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </p>

          <div className="mt-4 rounded-2xl border border-white/8 bg-white/5 p-4">
            <div className="mb-3 grid grid-cols-7 text-center text-[10px] uppercase tracking-[0.18em] text-white/40">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2 text-center text-sm">
              {calendarCells.map((day, index) => {
                const isToday = day === time.getDate();
                return (
                  <span
                    key={`${day ?? "empty"}-${index}`}
                    className={`flex h-8 items-center justify-center rounded-full ${day ? "text-white/82" : "text-transparent"} ${isToday ? "bg-primary text-white" : "bg-white/0"}`}
                  >
                    {day ?? "0"}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UbuntuTopBar;
