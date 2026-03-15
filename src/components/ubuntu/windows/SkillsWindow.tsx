const skillCategories = [
  {
    title: "Programming & Tools",
    skills: ["Node.js", "React", "Next.js", "Spring Boot", "C#", "ASP.NET", "Python", "Java", "PHP", "Dart", "C++", "C"],
    gradient: "from-orange-500 to-amber-500",
  },
  {
    title: "Databases & Infrastructure",
    skills: ["PostgreSQL", "SQL Server", "Redis", "Docker", "Oracle", "MySQL", "MongoDB", "Linux"],
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    title: "Specializations",
    skills: ["Embedded Systems", "Machine Learning", "Android Development", "Data Visualization", "Image Processing"],
    gradient: "from-purple-500 to-pink-500",
  },
];

const SkillsWindow = () => {
  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-lg font-display font-bold">Skills</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {skillCategories.map((cat) => (
          <div key={cat.title} className="rounded-lg bg-secondary/50 p-4">
            <span
              className={`mb-3 inline-block rounded-full bg-gradient-to-r px-2.5 py-0.5 text-[10px] font-display font-semibold ${cat.gradient}`}
            >
              {cat.title}
            </span>
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
