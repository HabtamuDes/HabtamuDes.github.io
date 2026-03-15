import { BrainCircuit, Briefcase, ExternalLink, FileDown, Github, Heart, Linkedin, MapPin } from "lucide-react";
import { translations, type Language } from "@/lib/localization";

const AboutWindow = ({ language }: { language: Language }) => {
  const copy = translations[language].about;
  return (
    <div className="space-y-4 md:space-y-5 animate-fade-in">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <img
          src="/mypicture.jpg"
          alt="Habtamu Assegahegn"
          className="h-20 w-20 rounded-full border-2 border-orange-500 object-cover"
        />
        <div>
          <h2 className="text-xl font-display font-bold">Habtamu Assegahegn</h2>
          <p className="text-sm text-muted-foreground">
            {copy.role}
          </p>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground">
        {copy.paragraph1}
      </p>

      <p className="text-sm leading-relaxed text-muted-foreground">
        {copy.paragraph2}
      </p>

      <div className="grid grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:gap-3">
        <a
          href="/Habtamu-Assegahegn-CV.txt"
          download
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          <FileDown className="h-4 w-4" />
          {copy.downloadCv}
        </a>
        <a
          href="https://github.com/HabtamuDes"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-background/35 px-4 py-2 text-sm"
        >
          <Github className="h-4 w-4" />
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/habtamu-assegahegn-15a554177/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-background/35 px-4 py-2 text-sm"
        >
          <Linkedin className="h-4 w-4" />
          LinkedIn
        </a>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-border bg-secondary/40 p-4">
          <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Current Company</p>
          <p className="mt-2 text-sm font-display font-semibold">Wegagen Bank sc</p>
        </div>
        <div className="rounded-xl border border-border bg-secondary/40 p-4">
          <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Public GitHub</p>
          <a
            href="https://github.com/HabtamuDes"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-2 text-sm font-display font-semibold text-primary"
          >
            HabtamuDes
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
        <div className="rounded-xl border border-border bg-secondary/40 p-4">
          <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Public Repositories</p>
          <p className="mt-2 text-sm font-display font-semibold">64 repositories</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {[
          { icon: MapPin, label: copy.location, value: "Addis Ababa, Ethiopia" },
          { icon: Briefcase, label: copy.roleLabel, value: copy.roleValue },
          { icon: BrainCircuit, label: copy.focus, value: copy.focusValue },
          { icon: Heart, label: copy.mindset, value: copy.mindsetValue },
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
