import { Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { AppId } from "@/pages/Index";

export interface LauncherItem {
  id: AppId;
  title: string;
  description: string;
  keywords: string[];
}

interface CommandPaletteProps {
  isOpen: boolean;
  items: LauncherItem[];
  onClose: () => void;
  onOpenApp: (id: AppId) => void;
  onShowGuide: () => void;
  copy: Record<string, string>;
}

const CommandPalette = ({ isOpen, items, onClose, onOpenApp, onShowGuide, copy }: CommandPaletteProps) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      return;
    }

    const timeout = window.setTimeout(() => inputRef.current?.focus(), 10);
    return () => window.clearTimeout(timeout);
  }, [isOpen]);

  const filteredItems = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return items;

    return items.filter((item) => {
      const haystack = [item.title, item.description, ...item.keywords].join(" ").toLowerCase();
      return haystack.includes(normalized);
    });
  }, [items, query]);

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-[150] flex items-start justify-center bg-slate-950/48 px-3 pt-14 backdrop-blur-sm sm:px-4 sm:pt-20">
      <div
        data-testid="command-palette"
        className="w-full max-w-2xl overflow-hidden rounded-[24px] border border-white/10 bg-slate-950/90 shadow-2xl backdrop-blur-2xl sm:rounded-[28px]"
      >
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-4 sm:px-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/5 sm:h-10 sm:w-10">
            <Search className="h-5 w-5 text-white/70" />
          </div>
          <div className="flex-1">
            <p className="text-[11px] uppercase tracking-[0.24em] text-orange-200/70">{copy.title}</p>
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={copy.placeholder}
              className="mt-2 w-full bg-transparent text-base text-white outline-none placeholder:text-white/35"
            />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/68 transition-colors hover:bg-white/10 hover:text-white"
          >
            Esc
          </button>
        </div>

        <div className="grid gap-4 px-4 py-4 sm:px-5 sm:gap-5 lg:grid-cols-[1fr_220px]">
          <div className="space-y-2">
            {filteredItems.slice(0, 8).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onOpenApp(item.id);
                  onClose();
                }}
                className="flex w-full items-start justify-between rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-left transition-colors hover:bg-white/10"
              >
                <div>
                  <p className="font-display text-sm font-semibold text-white">{item.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-white/62">{item.description}</p>
                </div>
                <span className="rounded-full border border-white/10 bg-black/15 px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-white/45">
                  {copy.open}
                </span>
              </button>
            ))}

            {filteredItems.length === 0 && (
              <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-6 text-sm text-white/60">
                {copy.noResults}
              </div>
            )}
          </div>

          <div className="space-y-3">
            <div className="rounded-2xl border border-white/8 bg-white/5 p-4">
              <p className="text-[10px] uppercase tracking-[0.18em] text-white/42">{copy.shortcuts}</p>
              <div className="mt-3 space-y-2 text-sm text-white/72">
                <p><strong>Ctrl/Cmd + K</strong> open launcher</p>
                <p><strong>?</strong> reopen guide</p>
                <p><strong>Esc</strong> close launcher</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                onShowGuide();
                onClose();
              }}
              className="w-full rounded-2xl border border-white/8 bg-white/5 px-4 py-4 text-left transition-colors hover:bg-white/10"
            >
              <p className="font-display text-sm font-semibold text-white">{copy.openGuide}</p>
              <p className="mt-1 text-xs leading-relaxed text-white/62">{copy.openGuideText}</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
