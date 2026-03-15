import { useMemo, useState } from "react";
import { ExternalLink, FileText, Folder, Github, ImageIcon, Mail, MonitorSmartphone, UserRound } from "lucide-react";
import type { AppId } from "@/pages/Index";
import { translations, type Language } from "@/lib/localization";

type Entry =
  | { id: string; kind: "app"; label: string; description: string; appId: AppId; icon: typeof Folder }
  | { id: string; kind: "link"; label: string; description: string; href: string; icon: typeof Folder };

type ExplorerSection = { id: string; entries: Entry[] };

const sections: ExplorerSection[] = [
  {
    id: "profile",
    entries: [
      { id: "about-file", kind: "app", label: "About Me.desktop", description: "Open background and role overview.", appId: "about", icon: UserRound },
      { id: "experience-file", kind: "app", label: "Experience.desktop", description: "Open the engineering timeline and work history.", appId: "experience", icon: Folder },
      { id: "contact-file", kind: "app", label: "Contact.desktop", description: "Open direct contact channels.", appId: "contact", icon: Mail },
      { id: "cv-file", kind: "link", label: "Habtamu-Assegahegn-CV.txt", description: "Download the current CV text export.", href: "/Habtamu-Assegahegn-CV.txt", icon: FileText },
    ],
  },
  {
    id: "portfolio",
    entries: [
      { id: "projects-file", kind: "app", label: "Projects.desktop", description: "Open project case studies and screenshots.", appId: "projects", icon: Folder },
      { id: "notes-file", kind: "app", label: "Notes.desktop", description: "Open the note and todo workspace.", appId: "notes", icon: FileText },
      { id: "browser-file", kind: "app", label: "LivePreview.desktop", description: "Open the browser-style deployment preview.", appId: "browser", icon: MonitorSmartphone },
      { id: "wallpaper-file", kind: "link", label: "portfolio-wallpaper.svg", description: "Open the current desktop wallpaper asset.", href: "/portfolio-wallpaper.svg", icon: ImageIcon },
    ],
  },
  {
    id: "engineering",
    entries: [
      { id: "vscode-file", kind: "app", label: "VSCode.desktop", description: "Open the editor workspace mock.", appId: "vscode", icon: Folder },
      { id: "docker-file", kind: "app", label: "Docker.desktop", description: "Open the container workspace mock.", appId: "docker", icon: Folder },
      { id: "skills-file", kind: "app", label: "Skills.desktop", description: "Open the technical skills summary.", appId: "skills", icon: Folder },
      { id: "github-file", kind: "link", label: "GitHub.url", description: "Open Habtamu's GitHub profile in a new tab.", href: "https://github.com/habtamuDes", icon: Github },
    ],
  },
];

interface FilesWindowProps {
  onOpenApp: (id: AppId) => void;
  language: Language;
}

const FilesWindow = ({ onOpenApp, language }: FilesWindowProps) => {
  const copy = translations[language].files;
  const [activeSectionId, setActiveSectionId] = useState(sections[0].id);
  const activeSection = useMemo(() => sections.find((section) => section.id === activeSectionId) ?? sections[0], [activeSectionId]);
  const sectionName = (id: string) => (id === "profile" ? copy.profile : id === "portfolio" ? copy.portfolio : copy.engineering);
  const sectionText = (id: string) => (id === "profile" ? copy.profileText : id === "portfolio" ? copy.portfolioText : copy.engineeringText);

  return (
    <div className="grid h-full grid-cols-1 gap-4 lg:grid-cols-[220px_1fr]">
      <aside className="rounded-2xl border border-border bg-secondary/35 p-4">
        <p className="mb-3 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{copy.folders}</p>
        <div className="space-y-2">
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              data-testid={`files-section-${section.id}`}
              onMouseDown={(event) => {
                event.stopPropagation();
                setActiveSectionId(section.id);
              }}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors ${activeSection.id === section.id ? "bg-primary/12 text-foreground" : "bg-background/20 text-muted-foreground hover:bg-background/35"}`}
            >
              <Folder className="h-4 w-4 shrink-0" />
              <div>
                <p className="font-display text-sm font-semibold">{sectionName(section.id)}</p>
                <p className="text-[11px] leading-relaxed opacity-80">{sectionText(section.id)}</p>
              </div>
            </button>
          ))}
        </div>
      </aside>

      <section className="rounded-2xl border border-border bg-secondary/35 p-5">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-display font-bold">{copy.title}</h2>
            <p className="text-sm text-muted-foreground">{copy.subtitle}</p>
          </div>
          <div className="rounded-full border border-border bg-background/30 px-3 py-1 text-[11px] text-muted-foreground">
            {activeSection.entries.length} {copy.items}
          </div>
        </div>

        <div className="mb-4 rounded-2xl border border-border bg-background/20 px-4 py-3">
          <p className="font-display text-base font-semibold">{sectionName(activeSection.id)}</p>
          <p className="mt-1 text-sm text-muted-foreground">{sectionText(activeSection.id)}</p>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {activeSection.entries.map((entry) => (
            <div key={entry.id} data-testid={`files-entry-${entry.id}`} className="rounded-2xl border border-border bg-background/20 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/12 text-primary">
                  <entry.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-sm font-semibold">{entry.label}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{entry.description}</p>
                </div>
              </div>

              {entry.kind === "app" ? (
                <button
                  type="button"
                  onMouseDown={(event) => {
                    event.stopPropagation();
                    onOpenApp(entry.appId);
                  }}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground"
                >
                  {copy.openApp}
                </button>
              ) : (
                <a
                  href={entry.href}
                  target={entry.href.startsWith("http") ? "_blank" : undefined}
                  rel={entry.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg border border-border bg-background/35 px-3 py-2 text-xs font-medium"
                >
                  {entry.href.startsWith("http") ? <ExternalLink className="h-3.5 w-3.5" /> : <FileText className="h-3.5 w-3.5" />}
                  {copy.openFile}
                </a>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FilesWindow;
