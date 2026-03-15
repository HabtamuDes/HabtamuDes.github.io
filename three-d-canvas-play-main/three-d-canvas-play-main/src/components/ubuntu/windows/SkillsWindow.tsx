const skillCategories = [
  {
    title: "Frontend",
    skills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Framer Motion"],
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    title: "Backend",
    skills: ["Node.js", "Python", "FastAPI", "PostgreSQL", "REST APIs"],
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    title: "Embedded & IoT",
    skills: ["Arduino", "ESP32", "Raspberry Pi", "C/C++", "MQTT"],
    gradient: "from-orange-500 to-amber-500",
  },
  {
    title: "AI / ML",
    skills: ["TensorFlow", "PyTorch", "OpenCV", "NLP", "Computer Vision"],
    gradient: "from-purple-500 to-pink-500",
  },
];

const SkillsWindow = () => {
  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-lg font-display font-bold">What I Know</h2>
      <div className="grid grid-cols-2 gap-3">
        {skillCategories.map((cat) => (
          <div key={cat.title} className="bg-secondary/50 rounded-lg p-4">
            <span className={`inline-block px-2.5 py-0.5 rounded-full bg-gradient-to-r ${cat.gradient} text-[10px] font-display font-semibold mb-3`}>
              {cat.title}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {cat.skills.map((skill) => (
                <span key={skill} className="px-2 py-1 rounded-md bg-muted text-xs text-muted-foreground">
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
