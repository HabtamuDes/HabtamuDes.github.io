import { MapPin, Briefcase, GraduationCap, Heart } from "lucide-react";

const AboutWindow = () => {
  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-display font-bold">
          H
        </div>
        <div>
          <h2 className="text-xl font-display font-bold">Habtamu Assegahegn</h2>
          <p className="text-sm text-muted-foreground">Full Stack Developer · Embedded Systems · AI Enthusiast</p>
        </div>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed">
        I'm a passionate developer with expertise in embedded systems and AI. 
        I love building innovative solutions that bridge hardware and software, creating 
        seamless experiences from low-level firmware to beautiful web interfaces.
      </p>

      <p className="text-sm text-muted-foreground leading-relaxed">
        With a strong foundation in computer science and hands-on experience in IoT, 
        machine learning, and web development, I bring ideas to life through clean, 
        efficient code and thoughtful design.
      </p>

      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: MapPin, label: "Location", value: "Ethiopia" },
          { icon: Briefcase, label: "Role", value: "Full Stack Developer" },
          { icon: GraduationCap, label: "Education", value: "Computer Science" },
          { icon: Heart, label: "Passion", value: "Building & Learning" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-3 bg-secondary/50 rounded-lg p-3">
            <item.icon className="w-4 h-4 text-primary shrink-0" />
            <div>
              <p className="text-[10px] text-muted-foreground">{item.label}</p>
              <p className="text-xs font-display font-medium">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutWindow;
