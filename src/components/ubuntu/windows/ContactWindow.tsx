import { Facebook, FileDown, Github, Linkedin, Mail, MapPin, Twitter } from "lucide-react";
import { translations, type Language } from "@/lib/localization";

const links = [
  { icon: Mail, label: "habtamuassegahegn7@gmail.com", href: "mailto:habtamuassegahegn7@gmail.com" },
  { icon: Linkedin, label: "linkedin.com/in/habtamu-assegahegn-15a554177", href: "https://www.linkedin.com/in/habtamu-assegahegn-15a554177/" },
  { icon: Github, label: "github.com/habtamuDes", href: "https://github.com/habtamuDes" },
  { icon: Facebook, label: "facebook.com/habtamuassegahegn", href: "https://www.facebook.com/habtamuassegahegn" },
  { icon: Twitter, label: "twitter.com/habtamuassegah1", href: "https://twitter.com/habtamuassegah1" },
];

const ContactWindow = ({ language }: { language: Language }) => {
  const copy = translations[language].contact;
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
          {copy.availableRemotely}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-border bg-secondary/40 p-4">
          <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{copy.bestChannel}</p>
          <p className="mt-2 text-sm font-display font-semibold">{copy.bestChannelValue}</p>
        </div>
        <div className="rounded-xl border border-border bg-secondary/40 p-4">
          <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{copy.focusAreas}</p>
          <p className="mt-2 text-sm font-display font-semibold">{copy.focusAreasValue}</p>
        </div>
        <div className="rounded-xl border border-border bg-secondary/40 p-4">
          <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{copy.location}</p>
          <p className="mt-2 text-sm font-display font-semibold">{copy.locationValue}</p>
        </div>
      </div>

      <div className="space-y-2">
        <a
          href="/Habtamu-Assegahegn-CV.txt"
          download
          className="flex items-center gap-3 rounded-xl border border-border bg-primary/15 p-3 transition-transform hover:scale-[1.01]"
        >
          <FileDown className="h-4 w-4 text-primary" />
          <span className="text-sm">{copy.downloadCv}</span>
        </a>
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl border border-border bg-secondary/50 p-3 transition-transform hover:scale-[1.01]"
          >
            <link.icon className="h-4 w-4 text-primary" />
            <span className="text-sm">{link.label}</span>
          </a>
        ))}
        <div className="flex items-center gap-3 rounded-xl border border-border bg-secondary/50 p-3">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="text-sm">{copy.locationValue}</span>
        </div>
      </div>
    </div>
  );
};

export default ContactWindow;
