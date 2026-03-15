import { translations, type Language } from "@/lib/localization";

const skillCategories = [
  {
    title: "Programming & Tools",
    description: "Frontend, backend, and general-purpose programming across product and enterprise work.",
    skills: ["Node.js", "React", "Next.js", "Spring Boot", "C#", "ASP.NET", "Python", "Java", "PHP", "Dart", "C++", "C"],
    gradient: "from-orange-500 to-amber-500",
  },
  {
    title: "Databases & Infrastructure",
    description: "Data storage, containerization, and deployment foundations used to support production systems.",
    skills: ["PostgreSQL", "SQL Server", "Redis", "Docker", "Oracle", "MySQL", "MongoDB", "Linux"],
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    title: "Specializations",
    description: "Areas where software intersects with hardware, analysis, and applied intelligence.",
    skills: ["Embedded Systems", "Machine Learning", "Android Development", "Data Visualization", "Image Processing"],
    gradient: "from-purple-500 to-pink-500",
  },
];

const SkillsWindow = ({ language }: { language: Language }) => {
  const copy = translations[language].skills;
  const localizedCategories = skillCategories.map((cat, index) => ({ ...cat, ...copy.categories[index] }));
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-display font-bold">{copy.title}</h2>
          <p className="text-sm text-muted-foreground">
            {copy.subtitle}
          </p>
        </div>
        <div className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-[11px] text-muted-foreground">
          {copy.coreAreas}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-border bg-secondary/40 p-4">
          <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{copy.primaryDirection}</p>
          <p className="mt-2 text-sm font-display font-semibold">{copy.primaryDirectionValue}</p>
        </div>
        <div className="rounded-xl border border-border bg-secondary/40 p-4">
          <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{copy.hardwareLayer}</p>
          <p className="mt-2 text-sm font-display font-semibold">{copy.hardwareLayerValue}</p>
        </div>
        <div className="rounded-xl border border-border bg-secondary/40 p-4">
          <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{copy.workingStyle}</p>
          <p className="mt-2 text-sm font-display font-semibold">{copy.workingStyleValue}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {localizedCategories.map((cat) => (
          <div key={cat.title} className="rounded-xl border border-border bg-secondary/50 p-4">
            <span
              className={`mb-3 inline-block rounded-full bg-gradient-to-r px-2.5 py-0.5 text-[10px] font-display font-semibold ${cat.gradient}`}
            >
              {cat.title}
            </span>
            <p className="mb-3 text-sm leading-relaxed text-muted-foreground">{cat.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {cat.skills.map((skill) => (
                <span key={skill} className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsWindow;
