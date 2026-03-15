import { useState } from "react";
import { ArrowUpRight, Cpu, Database, ExternalLink, FileDown, Globe, Layers3, Mail } from "lucide-react";
import { translations, type Language } from "@/lib/localization";
import { projectContent } from "@/lib/localizedProjects";

type Project = {
  title: string;
  stack: string[];
  preview?: string;
  repoUrl?: string;
  liveUrl?: string;
  type: "Web" | "Embedded" | "Enterprise" | "Platform";
};

const projects: Project[] = [
  {
    title: "Smart Farming",
    stack: ["PHP", "Vue.js", "PostgreSQL", "Arduino", "NodeMCU"],
    preview: "/projects/smart-farming.png",
    type: "Embedded",
  },
  {
    title: "MotioSuit",
    stack: ["Python", "IMU Sensors", "Bluetooth", "Blender"],
    repoUrl: "https://github.com/HabtamuDes/MotioSuit",
    type: "Embedded",
  },
  {
    title: "Auto RC Car",
    stack: ["Python", "OpenCV", "Neural Networks", "RC Platform"],
    repoUrl: "https://github.com/HabtamuDes/AutoRCCar",
    type: "Embedded",
  },
  {
    title: "OCR",
    stack: ["Python", "OpenCV", "OCR"],
    repoUrl: "https://github.com/HabtamuDes/OCR",
    type: "Platform",
  },
  {
    title: "FetaMovies",
    stack: ["PHP", "HTML", "CSS"],
    preview: "/projects/fetamovies.jpg",
    type: "Web",
  },
  {
    title: "Learning Management System",
    stack: ["Python", "Django", "AJAX"],
    preview: "/projects/learning-management.jpg",
    repoUrl: "https://github.com/HabtamuDes/schoolmanagement",
    type: "Platform",
  },
  {
    title: "Python Car Game",
    stack: ["Python", "Pygame"],
    preview: "/projects/python-car-game.png",
    repoUrl: "https://github.com/HabtamuDes/python_game",
    type: "Web",
  },
  {
    title: "Payroll System",
    stack: ["Java", "JDBC", "Oracle"],
    preview: "/projects/payroll-system.png",
    type: "Enterprise",
  },
  {
    title: "Hospital Management",
    stack: ["React", "Next.js", "Spring Boot", "PostgreSQL"],
    type: "Enterprise",
  },
  {
    title: "Attendance System",
    stack: ["React", "Node.js", "Spring Boot"],
    type: "Platform",
  },
  {
    title: "HR System",
    stack: ["React", "ASP.NET", "SQL Server"],
    type: "Enterprise",
  },
  {
    title: "Bank Onboarding",
    stack: ["React", "Next.js", "USSD Gateway"],
    type: "Platform",
  },
  {
    title: "Logistics System",
    stack: ["React", "Next.js", "Node.js", "Docker"],
    type: "Platform",
  },
];

const typeIcon = {
  Web: Globe,
  Embedded: Cpu,
  Enterprise: Database,
  Platform: Layers3,
};

const typeTone = {
  Web: "from-sky-500 to-cyan-500",
  Embedded: "from-orange-500 to-amber-500",
  Enterprise: "from-violet-500 to-purple-500",
  Platform: "from-emerald-500 to-teal-500",
};

const ProjectsWindow = ({ language }: { language: Language }) => {
  const copy = translations[language].projects;
  const localizedProjects = projectContent[language] ?? projectContent.en;
  const [selected, setSelected] = useState<Project>(projects[0]);
  const SelectedIcon = typeIcon[selected.type];
  const selectedContent = localizedProjects[selected.title] ?? projectContent.en[selected.title];

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:gap-4">
        <div>
          <h2 className="text-lg font-display font-bold">{copy.title}</h2>
          <p className="text-sm text-muted-foreground">{copy.subtitle}</p>
        </div>
        <div className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-[11px] text-muted-foreground">
          {projects.length} {copy.selectedWorks}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[280px_1fr]">
        <div className="flex gap-2 overflow-x-auto pb-1 lg:block lg:space-y-2 lg:overflow-visible">
          {projects.map((project) => {
            const Icon = typeIcon[project.type];
            return (
              <button
                key={project.title}
                type="button"
                onClick={() => setSelected(project)}
                className={`w-full rounded-xl border p-3 text-left transition-all ${
                  selected.title === project.title
                    ? "border-primary bg-secondary shadow-md"
                    : "border-border bg-secondary/40 hover:bg-secondary/70"
                } min-w-[220px] lg:min-w-0`}
              >
                <div className="mb-2 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${typeTone[project.type]}`}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <span className="block text-sm font-display font-semibold">{project.title}</span>
                      <span className="text-[11px] text-muted-foreground">{localizedProjects[project.title]?.domain ?? projectContent.en[project.title].domain}</span>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">{localizedProjects[project.title]?.summary ?? projectContent.en[project.title].summary}</p>
              </button>
            );
          })}
        </div>

        <div className="rounded-2xl border border-border bg-secondary/40 p-4 md:p-5">
          <div className="mb-4 flex items-center gap-3">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${typeTone[selected.type]}`}>
              <SelectedIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-display font-bold sm:text-xl">{selected.title}</h3>
              <p className="text-sm text-muted-foreground">{selected.type} | {selectedContent.domain}</p>
            </div>
          </div>

          <div className="mb-5 overflow-hidden rounded-2xl border border-border bg-background/25">
            {selected.preview ? (
              <img src={selected.preview} alt={selected.title} className="h-40 w-full object-cover sm:h-56" />
            ) : (
              <div className={`flex h-40 items-end bg-gradient-to-br ${typeTone[selected.type]} p-4 sm:h-56 sm:p-5`}>
                <div className="rounded-2xl border border-white/15 bg-black/20 px-4 py-3 backdrop-blur-md">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-white/70">{selectedContent.domain}</p>
                  <p className="mt-2 text-xl font-display font-bold text-white">{selected.title}</p>
                </div>
              </div>
            )}
          </div>

          <div className="mb-5 grid grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:gap-3">
            <a
              href="https://github.com/habtamuDes"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              <ExternalLink className="h-4 w-4" />
              {copy.githubProfile}
            </a>
            {selected.repoUrl && (
              <a
                href={selected.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background/35 px-4 py-2 text-sm"
              >
                <ExternalLink className="h-4 w-4" />
                Repo
              </a>
            )}
            {selected.liveUrl && (
              <a
                href={selected.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background/35 px-4 py-2 text-sm"
              >
                <Globe className="h-4 w-4" />
                Live
              </a>
            )}
            <a
              href="mailto:habtamuassegahegn7@gmail.com?subject=Project%20Walkthrough%20Request"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background/35 px-4 py-2 text-sm"
            >
              <Mail className="h-4 w-4" />
              {copy.walkthrough}
            </a>
            <a
              href="/Habtamu-Assegahegn-CV.txt"
              download
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background/35 px-4 py-2 text-sm"
            >
              <FileDown className="h-4 w-4" />
              {copy.downloadCv}
            </a>
          </div>

          <div className="grid gap-4 xl:grid-cols-2">
            <div>
              <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{copy.overview}</p>
              <p className="text-sm leading-relaxed text-foreground/90">{selectedContent.summary}</p>
            </div>

            <div>
              <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{copy.challenge}</p>
              <p className="text-sm leading-relaxed text-foreground/90">{selectedContent.challenge}</p>
            </div>

            <div>
              <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{copy.whatIBuilt}</p>
              <p className="text-sm leading-relaxed text-foreground/90">{selectedContent.build}</p>
            </div>

            <div>
              <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{copy.valueDelivered}</p>
              <p className="text-sm leading-relaxed text-foreground/90">{selectedContent.impact}</p>
            </div>
          </div>

          <div className="mt-5">
            <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{copy.engineeringOutcome}</p>
            <p className="text-sm leading-relaxed text-foreground/90">{selectedContent.outcome}</p>
          </div>

          <div className="mt-5">
            <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{copy.stack}</p>
            <div className="flex flex-wrap gap-2">
              {selected.stack.map((tag) => (
                <span key={tag} className="rounded-md bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsWindow;
