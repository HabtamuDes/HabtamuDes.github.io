import { languageOptions, translations, type Language } from "@/lib/localization";

type ThemePreset = "midnight" | "aurora" | "ember";
type WallpaperPreset = "portfolio-wallpaper.svg" | "portfolio-wallpaper-aurora.svg" | "portfolio-wallpaper-ember.svg";

export interface DesktopPreferences {
  theme: ThemePreset;
  wallpaper: WallpaperPreset;
}

interface SettingsWindowProps {
  preferences: DesktopPreferences;
  onChange: (next: DesktopPreferences) => void;
  language: Language;
  onLanguageChange: (language: Language) => void;
}

const themeOptions: { id: ThemePreset; swatches: string[] }[] = [
  { id: "midnight", swatches: ["#0b1020", "#f97316", "#38bdf8"] },
  { id: "aurora", swatches: ["#071a22", "#14b8a6", "#38bdf8"] },
  { id: "ember", swatches: ["#140d08", "#fb923c", "#f59e0b"] },
];

const wallpaperOptions: WallpaperPreset[] = [
  "portfolio-wallpaper.svg",
  "portfolio-wallpaper-aurora.svg",
  "portfolio-wallpaper-ember.svg",
];

const SettingsWindow = ({ preferences, onChange, language, onLanguageChange }: SettingsWindowProps) => {
  const copy = translations[language].settings;

  const themeName = (id: ThemePreset) => (
    id === "midnight" ? copy.midnight : id === "aurora" ? copy.aurora : copy.ember
  );
  const themeText = (id: ThemePreset) => (
    id === "midnight" ? copy.midnightText : id === "aurora" ? copy.auroraText : copy.emberText
  );
  const wallpaperName = (id: WallpaperPreset) => (
    id === "portfolio-wallpaper.svg" ? copy.blueprint : id === "portfolio-wallpaper-aurora.svg" ? copy.auroraGrid : copy.emberHorizon
  );
  const wallpaperText = (id: WallpaperPreset) => (
    id === "portfolio-wallpaper.svg" ? copy.blueprintText : id === "portfolio-wallpaper-aurora.svg" ? copy.auroraGridText : copy.emberHorizonText
  );

  return (
    <div className="space-y-4 md:space-y-5 animate-fade-in">
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:gap-4">
        <div>
          <h2 className="text-lg font-display font-bold">{copy.title}</h2>
          <p className="text-sm text-muted-foreground">{copy.subtitle}</p>
        </div>
        <div className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-[11px] text-muted-foreground">{copy.savedLocally}</div>
      </div>

      <div className="rounded-2xl border border-border bg-secondary/35 p-3 md:p-4">
        <p className="mb-3 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{copy.themePresets}</p>
        <div className="grid gap-3 md:grid-cols-3">
          {themeOptions.map((option) => {
            const isActive = preferences.theme === option.id;
            return (
              <button
                key={option.id}
                type="button"
                data-testid={`theme-option-${option.id}`}
                onMouseDown={(event) => {
                  event.stopPropagation();
                  onChange({ ...preferences, theme: option.id });
                }}
                className={`rounded-2xl border p-4 text-left transition-colors ${isActive ? "border-primary bg-primary/10" : "border-border bg-background/25 hover:bg-background/40"}`}
              >
                <div className="flex items-center gap-2">
                  {option.swatches.map((swatch) => (
                    <span key={swatch} className="h-4 w-4 rounded-full border border-white/10" style={{ backgroundColor: swatch }} />
                  ))}
                </div>
                <p className="mt-3 font-display text-sm font-semibold">{themeName(option.id)}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{themeText(option.id)}</p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-secondary/35 p-3 md:p-4">
        <p className="mb-3 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{copy.wallpaper}</p>
        <div className="grid gap-3 md:grid-cols-3">
          {wallpaperOptions.map((option) => {
            const isActive = preferences.wallpaper === option;
            return (
              <button
                key={option}
                type="button"
                data-testid={`wallpaper-option-${option}`}
                onMouseDown={(event) => {
                  event.stopPropagation();
                  onChange({ ...preferences, wallpaper: option });
                }}
                className={`overflow-hidden rounded-2xl border text-left transition-colors ${isActive ? "border-primary bg-primary/10" : "border-border bg-background/25 hover:bg-background/40"}`}
              >
                <img src={`/${option}`} alt="" className="h-20 w-full object-cover sm:h-28" />
                <div className="p-4">
                  <p className="font-display text-sm font-semibold">{wallpaperName(option)}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{wallpaperText(option)}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-secondary/35 p-3 md:p-4">
        <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{copy.language}</p>
        <p className="mb-3 text-sm text-muted-foreground">{copy.languageSubtitle}</p>
        <div className="grid gap-3 md:grid-cols-4">
          {languageOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              data-testid={`language-option-${option.value}`}
              onMouseDown={(event) => {
                event.stopPropagation();
                onLanguageChange(option.value);
              }}
              className={`rounded-xl border px-3 py-3 text-sm transition-colors ${language === option.value ? "border-primary bg-primary/10" : "border-border bg-background/25 hover:bg-background/40"}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsWindow;
