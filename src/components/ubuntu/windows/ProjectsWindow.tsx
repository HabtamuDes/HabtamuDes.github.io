const projects = [
  {
    title: "Smart Farming",
    description: "Real-time sensor data for farmers via dashboard and SMS. Hardware + software solution.",
    tags: ["PHP", "Vue.js", "PostgreSQL", "Arduino", "NodeMCU"],
  },
  {
    title: "FetaMovies",
    description: "Movie streaming site with HD content for registered users.",
    tags: ["PHP", "HTML", "CSS"],
  },
  {
    title: "Learning Management System",
    description: "Register students, add courses, and run tests online.",
    tags: ["Python", "Django", "AJAX"],
  },
  {
    title: "Python Car Game",
    description: "Car game built with the Pygame library.",
    tags: ["Python", "Pygame"],
  },
  {
    title: "Payroll System",
    description: "Management system for payroll and related business tasks.",
    tags: ["Java", "JDBC", "Oracle"],
  },
  {
    title: "Hospital Management",
    description: "End-to-end hospital management for patients, appointments, and records.",
    tags: ["React", "Next.js", "Spring Boot", "PostgreSQL"],
  },
  {
    title: "Attendance System",
    description: "Track and manage attendance with reports and dashboards.",
    tags: ["React", "Node.js", "Spring Boot"],
  },
  {
    title: "HR System",
    description: "Human resources management for employees, leave, and performance.",
    tags: ["React", "ASP.NET", "SQL Server"],
  },
  {
    title: "Bank Onboarding",
    description: "Web app, mobile app, and USSD for bank customer onboarding.",
    tags: ["React", "Next.js", "USSD Gateway"],
  },
  {
    title: "Logistics System",
    description: "Uber Freight-style logistics system for booking, tracking, and fleet management.",
    tags: ["React", "Next.js", "Node.js", "Docker"],
  },
];

const ProjectsWindow = () => {
  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-lg font-display font-bold">Projects</h2>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {projects.map((project) => (
          <div key={project.title} className="cursor-pointer rounded-lg bg-secondary/50 p-4 transition-transform hover:scale-[1.02]">
            <h3 className="mb-1 text-sm font-display font-bold">{project.title}</h3>
            <p className="mb-3 text-xs leading-relaxed text-muted-foreground">{project.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-md bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsWindow;
