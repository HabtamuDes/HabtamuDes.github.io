import { Facebook, Github, Linkedin, Mail, MapPin, Twitter } from "lucide-react";

const links = [
  { icon: Mail, label: "habtamuassegahegn7@gmail.com", href: "mailto:habtamuassegahegn7@gmail.com" },
  { icon: Linkedin, label: "linkedin.com/in/habtamu-assegahegn-15a554177", href: "https://www.linkedin.com/in/habtamu-assegahegn-15a554177/" },
  { icon: Github, label: "github.com/habtamuDes", href: "https://github.com/habtamuDes" },
  { icon: Facebook, label: "facebook.com/habtamuassegahegn", href: "https://www.facebook.com/habtamuassegahegn" },
  { icon: Twitter, label: "twitter.com/habtamuassegah1", href: "https://twitter.com/habtamuassegah1" },
];

const ContactWindow = () => {
  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-lg font-display font-bold">Contact</h2>
      <p className="text-sm text-muted-foreground">
        Open to discussing new projects, software engineering work, and collaboration opportunities.
      </p>

      <div className="space-y-2">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg bg-secondary/50 p-3 transition-transform hover:scale-[1.01]"
          >
            <link.icon className="h-4 w-4 text-primary" />
            <span className="text-sm">{link.label}</span>
          </a>
        ))}
        <div className="flex items-center gap-3 rounded-lg bg-secondary/50 p-3">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="text-sm">Addis Ababa, Ethiopia</span>
        </div>
      </div>
    </div>
  );
};

export default ContactWindow;
