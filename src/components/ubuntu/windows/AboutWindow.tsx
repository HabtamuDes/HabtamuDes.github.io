import { BrainCircuit, Briefcase, Heart, MapPin } from "lucide-react";

const AboutWindow = () => {
  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center gap-4">
        <img
          src="/mypicture.jpg"
          alt="Habtamu Assegahegn"
          className="h-20 w-20 rounded-full border-2 border-orange-500 object-cover"
        />
        <div>
          <h2 className="text-xl font-display font-bold">Habtamu Assegahegn</h2>
          <p className="text-sm text-muted-foreground">
            Full Stack Developer · Embedded Systems · AI Enthusiast
          </p>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground">
        I&apos;m an energetic professional who strives for technology growth. I love to create,
        innovate, and find solutions to problems that make tasks easier for people.
      </p>

      <p className="text-sm leading-relaxed text-muted-foreground">
        I&apos;m open and ready to learn, keep myself updated, and build systems that bridge
        modern web applications, embedded hardware, and practical AI solutions.
      </p>

      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: MapPin, label: "Location", value: "Addis Ababa, Ethiopia" },
          { icon: Briefcase, label: "Role", value: "Full Stack Developer" },
          { icon: BrainCircuit, label: "Focus", value: "Embedded Systems & AI" },
          { icon: Heart, label: "Mindset", value: "Building & Learning" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-3 rounded-lg bg-secondary/50 p-3">
            <item.icon className="h-4 w-4 shrink-0 text-primary" />
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
