import { BriefcaseBusiness, Building2, CalendarDays, MapPin } from "lucide-react";
import { translations, type Language } from "@/lib/localization";

type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  tone: string;
};

const experience: ExperienceItem[] = [
  {
    company: "Wegagen Bank sc / Enterprise Product Work",
    role: "Full Stack Software Engineer",
    period: "Recent Work",
    location: "Addis Ababa / Remote Collaboration",
    summary: "Built business-facing systems across onboarding, HR, logistics, payroll, and hospital operations using modern web stacks and API-driven workflows, with public GitHub activity showing ongoing software work from Addis Ababa.",
    highlights: [
      "Delivered product features across React, Next.js, Node.js, ASP.NET, Spring Boot, and SQL-backed systems.",
      "Worked on multi-step operational workflows where reliability, visibility, and maintainability mattered more than surface-level UI only.",
      "Contributed to platforms that supported internal teams, administrators, and end users in practical business environments.",
    ],
    tone: "from-orange-500 to-amber-500",
  },
  {
    company: "Embedded and IoT Projects",
    role: "Embedded Systems Builder",
    period: "Parallel Focus",
    location: "Project and prototype work",
    summary: "Combined software with microcontrollers, sensors, and field-style monitoring ideas to build practical hardware-connected systems.",
    highlights: [
      "Worked with Arduino, NodeMCU, and sensor-driven project flows that connect data collection to web-based visibility.",
      "Built projects where embedded hardware and application logic had to work together rather than being treated as separate domains.",
      "Used these projects to deepen systems thinking around real-world inputs, feedback loops, and operational usability.",
    ],
    tone: "from-cyan-500 to-blue-500",
  },
  {
    company: "Independent Portfolio and Learning Track",
    role: "Builder and Continuous Learner",
    period: "Ongoing",
    location: "Self-directed development",
    summary: "Expanded skills through hands-on products, interface experiments, AI-assisted workflows, and a public GitHub profile with dozens of repositories spanning web, embedded, AI, and computer vision work.",
    highlights: [
      "Practiced translating ideas into working prototypes instead of stopping at concepts or tutorials.",
      "Used personal projects to strengthen frontend polish, application structure, and shipping discipline.",
      "Focused on growing as an engineer who can move between product work, backend systems, and embedded problem solving.",
    ],
    tone: "from-emerald-500 to-teal-500",
  },
];

const ExperienceWindow = ({ language }: { language: Language }) => {
  const copy = translations[language].experience;
  return (
    <div className="space-y-4 md:space-y-5 animate-fade-in">
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:gap-4">
        <div>
          <h2 className="text-lg font-display font-bold">{copy.title}</h2>
          <p className="text-sm text-muted-foreground">
            {copy.subtitle}
          </p>
        </div>
        <div className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-[11px] text-muted-foreground">
          {copy.snapshot}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-border bg-secondary/40 p-4">
          <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{copy.primaryTrack}</p>
          <p className="mt-2 text-sm font-display font-semibold">{copy.primaryTrackValue}</p>
        </div>
        <div className="rounded-xl border border-border bg-secondary/40 p-4">
          <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{copy.secondaryTrack}</p>
          <p className="mt-2 text-sm font-display font-semibold">{copy.secondaryTrackValue}</p>
        </div>
        <div className="rounded-xl border border-border bg-secondary/40 p-4">
          <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{copy.workingStyle}</p>
          <p className="mt-2 text-sm font-display font-semibold">{copy.workingStyleValue}</p>
        </div>
      </div>

      <div className="space-y-4">
        {experience.map((item) => (
          <div key={`${item.company}-${item.role}`} className="rounded-2xl border border-border bg-secondary/35 p-4 md:p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="flex items-start gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.tone}`}>
                  <BriefcaseBusiness className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-display font-bold">{item.role}</h3>
                  <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Building2 className="h-4 w-4" />
                      {item.company}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="h-4 w-4" />
                      {item.period}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" />
                      {item.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-foreground/88">{item.summary}</p>

            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {item.highlights.map((highlight) => (
                <div key={highlight} className="rounded-xl border border-border bg-background/20 p-4 text-sm leading-relaxed text-muted-foreground">
                  {highlight}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceWindow;
