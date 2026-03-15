import { useState } from "react";
import { ArrowUpRight, Cpu, Database, ExternalLink, FileDown, Globe, Layers3, Mail } from "lucide-react";
import { translations, type Language } from "@/lib/localization";

type Project = {
  title: string;
  domain: string;
  summary: string;
  challenge: string;
  build: string;
  impact: string;
  outcome: string;
  stack: string[];
  preview?: string;
  repoUrl?: string;
  liveUrl?: string;
  type: "Web" | "Embedded" | "Enterprise" | "Platform";
};

const projects: Project[] = [
  {
    title: "Smart Farming",
    domain: "IoT Monitoring",
    summary: "Real-time sensor data platform for farmers using dashboards and SMS notifications.",
    challenge: "Field monitoring is difficult when data is scattered and decisions rely on delayed manual observation.",
    build: "Connected sensor inputs to a web dashboard and notification flow so farm conditions could be monitored more practically.",
    impact: "Bridged hardware and software to help field monitoring and decision making.",
    outcome: "Combined microcontroller data collection with a web dashboard for practical field visibility.",
    stack: ["PHP", "Vue.js", "PostgreSQL", "Arduino", "NodeMCU"],
    preview: "/projects/smart-farming.png",
    type: "Embedded",
  },
  {
    title: "MotioSuit",
    domain: "Wearable Motion Capture",
    summary: "Low-cost motion capture suit project that reads IMU data in real time and sends it to Blender over Bluetooth.",
    challenge: "Motion capture work is usually expensive and hardware-heavy, so the challenge was building a more accessible pipeline with practical real-time feedback.",
    build: "Worked with IMU-based inputs, Bluetooth communication, and software-side integration concepts for live motion data workflows.",
    impact: "Shows the ability to work across sensors, hardware communication, and applied visualization workflows.",
    outcome: "Represents a strong hardware-plus-software project direction for embedded and interactive systems.",
    stack: ["Python", "IMU Sensors", "Bluetooth", "Blender"],
    repoUrl: "https://github.com/HabtamuDes/MotioSuit",
    type: "Embedded",
  },
  {
    title: "Auto RC Car",
    domain: "Computer Vision Robotics",
    summary: "Autonomous RC car project using OpenCV and neural-network-driven processing in Python.",
    challenge: "Autonomous behavior requires perception, control flow, and reliable real-time response from a constrained physical platform.",
    build: "Used Python and OpenCV in an RC car workflow to connect vision processing with autonomous movement ideas.",
    impact: "Demonstrates applied AI/computer-vision work moving beyond dashboards into hardware behavior.",
    outcome: "Strengthened practical understanding of embedded autonomy, real-time pipelines, and model-driven interaction with the physical world.",
    stack: ["Python", "OpenCV", "Neural Networks", "RC Platform"],
    repoUrl: "https://github.com/HabtamuDes/AutoRCCar",
    type: "Embedded",
  },
  {
    title: "OCR",
    domain: "Applied Computer Vision",
    summary: "Optical character recognition experiments using Python and OpenCV.",
    challenge: "Extracting readable text from images requires image preprocessing, recognition logic, and practical handling of imperfect visual inputs.",
    build: "Explored OCR-focused image processing workflows with Python and OpenCV to turn visual input into usable text output.",
    impact: "Shows practical work at the intersection of AI, image processing, and software utility.",
    outcome: "Expanded capability in computer vision pipelines and document/image understanding tasks.",
    stack: ["Python", "OpenCV", "OCR"],
    repoUrl: "https://github.com/HabtamuDes/OCR",
    type: "Platform",
  },
  {
    title: "FetaMovies",
    domain: "Consumer Web",
    summary: "Movie streaming experience built for registered users with a content-focused frontend.",
    challenge: "The goal was to deliver a simple consumer-facing browsing experience centered on media discovery and account access.",
    build: "Created a content-oriented web flow with authentication and structured movie browsing for registered users.",
    impact: "Delivered a consumer-facing web product with authentication and media browsing.",
    outcome: "Focused on a clean browsing flow and account-based access to entertainment content.",
    stack: ["PHP", "HTML", "CSS"],
    preview: "/projects/fetamovies.jpg",
    type: "Web",
  },
  {
    title: "Learning Management System",
    domain: "Education Platform",
    summary: "Student registration, course management, and online testing in one system.",
    challenge: "Academic workflows often become fragmented across registration, learning, and assessment tools.",
    build: "Unified registration, course handling, and testing into a single platform with Django and AJAX-based interactions.",
    impact: "Centralized core academic workflows into a single learning platform.",
    outcome: "Reduced fragmented manual processes by bringing administration and assessments together.",
    stack: ["Python", "Django", "AJAX"],
    preview: "/projects/learning-management.jpg",
    repoUrl: "https://github.com/HabtamuDes/schoolmanagement",
    type: "Platform",
  },
  {
    title: "Python Car Game",
    domain: "Interactive Software",
    summary: "Arcade-style car game built with Pygame.",
    challenge: "The focus was on strengthening event-driven logic, rendering feedback, and collision handling in a game loop.",
    build: "Implemented a lightweight driving game to practice state updates, player feedback, and frame-based interaction.",
    impact: "Strengthened game logic, rendering, and event-driven programming skills.",
    outcome: "Improved practical understanding of loops, animation, collision handling, and player feedback.",
    stack: ["Python", "Pygame"],
    preview: "/projects/python-car-game.png",
    repoUrl: "https://github.com/HabtamuDes/python_game",
    type: "Web",
  },
  {
    title: "Payroll System",
    domain: "Business Operations",
    summary: "Business-focused payroll management system for salary and related processes.",
    challenge: "Payroll work is repetitive, error-prone, and operationally expensive when handled manually.",
    build: "Structured salary workflows and payroll-related records into a database-driven application for business operations.",
    impact: "Automated repetitive payroll workflows and business record handling.",
    outcome: "Turned salary management into a structured system with clearer operational control.",
    stack: ["Java", "JDBC", "Oracle"],
    preview: "/projects/payroll-system.png",
    type: "Enterprise",
  },
  {
    title: "Hospital Management",
    domain: "Healthcare Systems",
    summary: "Full hospital workflow system for patients, appointments, and records.",
    challenge: "Healthcare operations require coordination across appointments, records, and administrative flows.",
    build: "Used a modern web stack to manage patient-facing and internal hospital workflows in one platform.",
    impact: "Supported core healthcare administration through a modern web stack.",
    outcome: "Improved how appointments, records, and patient flows could be managed in one place.",
    stack: ["React", "Next.js", "Spring Boot", "PostgreSQL"],
    type: "Enterprise",
  },
  {
    title: "Attendance System",
    domain: "Workforce Tracking",
    summary: "Attendance tracking platform with reporting and dashboards.",
    challenge: "Administrators need simple visibility into attendance trends without relying on fragmented reporting.",
    build: "Created dashboards and reporting-oriented attendance workflows for easier monitoring and review.",
    impact: "Made attendance monitoring easier for administrators and staff.",
    outcome: "Delivered better visibility and reporting around staff presence and attendance history.",
    stack: ["React", "Node.js", "Spring Boot"],
    type: "Platform",
  },
  {
    title: "HR System",
    domain: "People Operations",
    summary: "Employee, leave, and performance management in one HR workflow.",
    challenge: "HR operations span multiple workflows that are hard to coordinate when managed in separate systems.",
    build: "Centralized employee, leave, and performance handling with a structured web-based workflow.",
    impact: "Improved visibility across HR operations with centralized data handling.",
    outcome: "Brought multiple HR processes into a single system instead of isolated manual steps.",
    stack: ["React", "ASP.NET", "SQL Server"],
    type: "Enterprise",
  },
  {
    title: "Bank Onboarding",
    domain: "Digital Onboarding",
    summary: "Onboarding product spanning web, mobile, and USSD channels.",
    challenge: "Customer onboarding needs to serve both modern digital channels and constrained low-bandwidth environments.",
    build: "Extended onboarding flows across multiple delivery channels to broaden accessibility.",
    impact: "Expanded customer onboarding reach across digital and low-bandwidth channels.",
    outcome: "Supported broader customer access by covering both modern and constrained channels.",
    stack: ["React", "Next.js", "USSD Gateway"],
    type: "Platform",
  },
  {
    title: "Logistics System",
    domain: "Operations Platform",
    summary: "Freight-style logistics platform for booking, tracking, and fleet management.",
    challenge: "Logistics operations become hard to manage when booking, tracking, and fleet coordination are spread across separate processes.",
    build: "Connected the operational workflow into one platform covering tracking, booking, and fleet visibility.",
    impact: "Connected multi-step logistics workflows into a single operational system.",
    outcome: "Made fragmented logistics workflows easier to track, coordinate, and manage centrally.",
    stack: ["React", "Next.js", "Node.js", "Docker"],
    type: "Platform",
  },
];

const typeIcon = {
  Web: Globe,
  Embedded: Cpu,
  Enterprise: Database,
  Platform: Layers3,
};

const typeTone = {
  Web: "from-sky-500 to-cyan-500",
  Embedded: "from-orange-500 to-amber-500",
  Enterprise: "from-violet-500 to-purple-500",
  Platform: "from-emerald-500 to-teal-500",
};

const ProjectsWindow = ({ language }: { language: Language }) => {
  const copy = translations[language].projects;
  const [selected, setSelected] = useState<Project>(projects[0]);
  const SelectedIcon = typeIcon[selected.type];

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-display font-bold">{copy.title}</h2>
          <p className="text-sm text-muted-foreground">{copy.subtitle}</p>
        </div>
        <div className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-[11px] text-muted-foreground">
          {projects.length} {copy.selectedWorks}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[280px_1fr]">
        <div className="space-y-2">
          {projects.map((project) => {
            const Icon = typeIcon[project.type];
            return (
              <button
                key={project.title}
                type="button"
                onClick={() => setSelected(project)}
                className={`w-full rounded-xl border p-3 text-left transition-all ${
                  selected.title === project.title
                    ? "border-primary bg-secondary shadow-md"
                    : "border-border bg-secondary/40 hover:bg-secondary/70"
                }`}
              >
                <div className="mb-2 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${typeTone[project.type]}`}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <span className="block text-sm font-display font-semibold">{project.title}</span>
                      <span className="text-[11px] text-muted-foreground">{project.domain}</span>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">{project.summary}</p>
              </button>
            );
          })}
        </div>

        <div className="rounded-2xl border border-border bg-secondary/40 p-5">
          <div className="mb-4 flex items-center gap-3">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${typeTone[selected.type]}`}>
              <SelectedIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-display font-bold">{selected.title}</h3>
              <p className="text-sm text-muted-foreground">{selected.type} | {selected.domain}</p>
            </div>
          </div>

          <div className="mb-5 overflow-hidden rounded-2xl border border-border bg-background/25">
            {selected.preview ? (
              <img src={selected.preview} alt={selected.title} className="h-56 w-full object-cover" />
            ) : (
              <div className={`flex h-56 items-end bg-gradient-to-br ${typeTone[selected.type]} p-5`}>
                <div className="rounded-2xl border border-white/15 bg-black/20 px-4 py-3 backdrop-blur-md">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-white/70">{selected.domain}</p>
                  <p className="mt-2 text-xl font-display font-bold text-white">{selected.title}</p>
                </div>
              </div>
            )}
          </div>

          <div className="mb-5 flex flex-wrap gap-3">
            <a
              href="https://github.com/habtamuDes"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              <ExternalLink className="h-4 w-4" />
              {copy.githubProfile}
            </a>
            {selected.repoUrl && (
              <a
                href={selected.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-background/35 px-4 py-2 text-sm"
              >
                <ExternalLink className="h-4 w-4" />
                Repo
              </a>
            )}
            {selected.liveUrl && (
              <a
                href={selected.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-background/35 px-4 py-2 text-sm"
              >
                <Globe className="h-4 w-4" />
                Live
              </a>
            )}
            <a
              href="mailto:habtamuassegahegn7@gmail.com?subject=Project%20Walkthrough%20Request"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-background/35 px-4 py-2 text-sm"
            >
              <Mail className="h-4 w-4" />
              {copy.walkthrough}
            </a>
            <a
              href="/Habtamu-Assegahegn-CV.txt"
              download
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-background/35 px-4 py-2 text-sm"
            >
              <FileDown className="h-4 w-4" />
              {copy.downloadCv}
            </a>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <div>
              <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{copy.overview}</p>
              <p className="text-sm leading-relaxed text-foreground/90">{selected.summary}</p>
            </div>

            <div>
              <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{copy.challenge}</p>
              <p className="text-sm leading-relaxed text-foreground/90">{selected.challenge}</p>
            </div>

            <div>
              <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{copy.whatIBuilt}</p>
              <p className="text-sm leading-relaxed text-foreground/90">{selected.build}</p>
            </div>

            <div>
              <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{copy.valueDelivered}</p>
              <p className="text-sm leading-relaxed text-foreground/90">{selected.impact}</p>
            </div>
          </div>

          <div className="mt-5">
            <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{copy.engineeringOutcome}</p>
            <p className="text-sm leading-relaxed text-foreground/90">{selected.outcome}</p>
          </div>

          <div className="mt-5">
            <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{copy.stack}</p>
            <div className="flex flex-wrap gap-2">
              {selected.stack.map((tag) => (
                <span key={tag} className="rounded-md bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsWindow;
