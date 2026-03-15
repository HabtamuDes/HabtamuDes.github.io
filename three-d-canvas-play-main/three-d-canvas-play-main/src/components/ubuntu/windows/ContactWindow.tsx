import { Mail, Github, Linkedin, Send } from "lucide-react";

const ContactWindow = () => {
  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-lg font-display font-bold">Get in Touch</h2>
      <p className="text-sm text-muted-foreground">
        Open to discussing new projects, ideas, or collaboration opportunities.
      </p>

      <div className="space-y-2">
        {[
          { icon: Mail, label: "habtamu@example.com", href: "mailto:habtamu@example.com" },
          { icon: Github, label: "GitHub", href: "https://github.com" },
          { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-secondary/50 rounded-lg p-3 hover-scale transition-all"
          >
            <link.icon className="w-4 h-4 text-primary" />
            <span className="text-sm">{link.label}</span>
          </a>
        ))}
      </div>

      <form className="space-y-3 pt-2" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Your Name"
          className="w-full bg-secondary/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full bg-secondary/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <textarea
          placeholder="Message"
          rows={3}
          className="w-full bg-secondary/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none"
        />
        <button className="w-full py-2 rounded-lg bg-primary text-primary-foreground font-display font-medium text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
          <Send className="w-3.5 h-3.5" /> Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactWindow;
