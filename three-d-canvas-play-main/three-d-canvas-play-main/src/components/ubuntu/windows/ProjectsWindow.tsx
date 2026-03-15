import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Smart Home IoT Hub",
    description: "Complete IoT platform with ESP32 sensors, MQTT broker, and React dashboard.",
    tags: ["React", "ESP32", "MQTT", "Node.js"],
  },
  {
    title: "AI Image Classifier",
    description: "Deep learning model for real-time image classification with FastAPI backend.",
    tags: ["Python", "TensorFlow", "FastAPI"],
  },
  {
    title: "Portfolio 3D Room",
    description: "Interactive 3D portfolio environment built with Three.js.",
    tags: ["Three.js", "React", "WebGL"],
  },
  {
    title: "Embedded Weather Station",
    description: "Raspberry Pi weather station with sensor arrays and cloud visualization.",
    tags: ["Raspberry Pi", "Python", "PostgreSQL"],
  },
];

const ProjectsWindow = () => {
  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-lg font-display font-bold">What I've Built</h2>
      <div className="grid grid-cols-2 gap-3">
        {projects.map((project) => (
          <div key={project.title} className="bg-secondary/50 rounded-lg p-4 hover-scale cursor-pointer group">
            <h3 className="font-display font-bold text-sm mb-1">{project.title}</h3>
            <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{project.description}</p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {project.tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 rounded-md bg-muted text-[10px] text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Github className="w-3.5 h-3.5 text-primary" />
              <ExternalLink className="w-3.5 h-3.5 text-primary" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsWindow;
