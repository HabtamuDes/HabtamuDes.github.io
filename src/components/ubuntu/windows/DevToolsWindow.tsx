import { Braces, Container, Database, GitBranch, Globe, Send, ServerCog } from "lucide-react";

type ToolId = "vscode" | "pgadmin" | "sqlserver" | "browser" | "postman" | "docker" | "gittools";

type ToolConfig = {
  icon: typeof Braces;
  title: string;
  accent: string;
  subtitle: string;
  panels: { label: string; value: string }[];
};

const toolConfig = {
  vscode: {
    icon: Braces,
    title: "Visual Studio Code",
    accent: "from-sky-500 to-blue-700",
    subtitle: "Editor workspace for frontend, backend, and full-stack product work.",
    panels: [
      { label: "Workspace", value: "portfolio-app" },
      { label: "Branch", value: "main" },
      { label: "Focus", value: "React + TypeScript + Vite" },
    ],
  },
  pgadmin: {
    icon: Database,
    title: "pgAdmin",
    accent: "from-emerald-500 to-teal-700",
    subtitle: "PostgreSQL administration view for schemas, queries, and operational inspection.",
    panels: [
      { label: "Server", value: "portfolio-db" },
      { label: "Engine", value: "PostgreSQL" },
      { label: "Typical Use", value: "Tables, queries, indexes" },
    ],
  },
  sqlserver: {
    icon: ServerCog,
    title: "SQL Server Management Studio",
    accent: "from-fuchsia-500 to-violet-700",
    subtitle: "Enterprise-style database workspace for reporting, admin, and operational data work.",
    panels: [
      { label: "Instance", value: "MSSQLDEV01" },
      { label: "Engine", value: "SQL Server" },
      { label: "Typical Use", value: "Stored procedures, admin, BI" },
    ],
  },
  browser: {
    icon: Globe,
    title: "Developer Browser",
    accent: "from-cyan-400 to-sky-700",
    subtitle: "Daily browser workspace for documentation, dashboards, testing, and deployed portfolio checks.",
    panels: [
      { label: "Open Tabs", value: "Docs, localhost, GitHub Pages" },
      { label: "Primary Use", value: "Testing and research" },
      { label: "Flow", value: "Dev server to production review" },
    ],
  },
  postman: {
    icon: Send,
    title: "Postman",
    accent: "from-orange-500 to-red-600",
    subtitle: "API client workflow for endpoint testing, payload checks, and contract validation.",
    panels: [
      { label: "Collections", value: "Auth, Projects, Contact APIs" },
      { label: "Use Case", value: "Request testing" },
      { label: "Output", value: "Headers, payloads, status" },
    ],
  },
  docker: {
    icon: Container,
    title: "Docker Desktop",
    accent: "from-blue-400 to-cyan-700",
    subtitle: "Container workflow for local services, databases, and reproducible development setups.",
    panels: [
      { label: "Services", value: "App, DB, cache" },
      { label: "Mode", value: "Local development" },
      { label: "Benefit", value: "Consistent environments" },
    ],
  },
  gittools: {
    icon: GitBranch,
    title: "Git & GitHub Tools",
    accent: "from-slate-500 to-slate-800",
    subtitle: "Version control workflow for branching, reviews, syncing, and release preparation.",
    panels: [
      { label: "Branching", value: "Feature and release flow" },
      { label: "Remote", value: "GitHub" },
      { label: "Use", value: "Commits, PRs, reviews" },
    ],
  },
} satisfies Record<ToolId, ToolConfig>;

interface DevToolsWindowProps {
  tool: ToolId;
}

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{children}</p>
);

const MockVscode = () => (
  <div className="grid min-h-[360px] grid-cols-[56px_220px_1fr] overflow-hidden rounded-2xl border border-border bg-[#111827]">
    <div className="flex flex-col items-center gap-4 border-r border-white/5 bg-[#0d1117] py-4 text-white/45">
      <span>EX</span>
      <span>FI</span>
      <span>SR</span>
      <span>SC</span>
      <span>RN</span>
      <span>ST</span>
    </div>
    <div className="border-r border-white/5 bg-[#161b22] p-3">
      <SectionLabel>Explorer</SectionLabel>
      <div className="space-y-2 text-sm text-white/80">
        <div className="rounded-lg bg-white/5 px-3 py-2">src</div>
        <div className="pl-3 text-white/60">components</div>
        <div className="pl-6 text-sky-300">ubuntu/UbuntuWindow.tsx</div>
        <div className="pl-6 text-white/60">windows/ProjectsWindow.tsx</div>
        <div className="pl-3 text-white/60">pages/Index.tsx</div>
        <div className="rounded-lg border border-white/5 bg-black/20 px-3 py-2 text-emerald-300">main build passing</div>
      </div>
    </div>
    <div className="flex flex-col bg-[#0f172a]">
      <div className="flex gap-1 border-b border-white/5 bg-[#111827] px-3 pt-2 text-xs text-white/65">
        <div className="rounded-t-lg bg-white/5 px-3 py-2 text-white">UbuntuWindow.tsx</div>
        <div className="rounded-t-lg px-3 py-2">ProjectsWindow.tsx</div>
        <div className="rounded-t-lg px-3 py-2">Index.tsx</div>
      </div>
      <div className="grid flex-1 grid-cols-[48px_1fr] font-mono text-sm">
        <div className="border-r border-white/5 bg-black/15 py-4 text-right text-white/25">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((line) => (
            <div key={line} className="px-3 leading-7">{line}</div>
          ))}
        </div>
        <div className="py-4 text-white/80">
          {[
            "const UbuntuWindow = ({ title, children }) => {",
            "  return (",
            "    <div className=\"ubuntu-window\">",
            "      <header className=\"ubuntu-window-header\">",
            "        <span>{title}</span>",
            "      </header>",
            "      <main>{children}</main>",
            "    </div>",
            "  );",
            "};",
          ].map((code) => (
            <div key={code} className="px-4 leading-7">{code}</div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const MockDatabase = ({ engine }: { engine: "pg" | "sql" }) => (
  <div className="grid min-h-[360px] grid-cols-[280px_1fr] overflow-hidden rounded-2xl border border-border bg-slate-950/70">
    <div className="border-r border-border bg-secondary/40 p-4">
      <SectionLabel>{engine === "pg" ? "Browser" : "Object Explorer"}</SectionLabel>
      <div className="space-y-2 text-sm text-foreground/85">
        <div className="rounded-lg bg-background/40 px-3 py-2">{engine === "pg" ? "portfolio-db" : "MSSQLDEV01"}</div>
        <div className="pl-3">Schemas</div>
        <div className="pl-6 text-primary">public</div>
        <div className="pl-6">tables</div>
        <div className="pl-9 text-muted-foreground">projects</div>
        <div className="pl-9 text-muted-foreground">skills</div>
        <div className="pl-9 text-muted-foreground">contacts</div>
        <div className="pl-6">views</div>
        <div className="pl-6">functions</div>
      </div>
    </div>
    <div className="flex flex-col">
      <div className="border-b border-border bg-background/30 px-4 py-3 font-mono text-sm text-emerald-300">
        SELECT title, stack FROM projects ORDER BY updated_at DESC;
      </div>
      <div className="flex-1 p-4">
        <SectionLabel>Result Grid</SectionLabel>
        <div className="overflow-hidden rounded-xl border border-border">
          <div className="grid grid-cols-3 bg-secondary/50 px-3 py-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
            <span>Title</span>
            <span>Stack</span>
            <span>Status</span>
          </div>
          {[
            ["Smart Farming", "Vue.js / Arduino", "Active"],
            ["Hospital Management", "Next.js / Spring Boot", "Delivered"],
            ["Logistics System", "React / Node.js", "In Progress"],
          ].map((row) => (
            <div key={row[0]} className="grid grid-cols-3 border-t border-border px-3 py-3 text-sm text-foreground/85">
              <span>{row[0]}</span>
              <span>{row[1]}</span>
              <span>{row[2]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const MockBrowser = () => (
  <div className="overflow-hidden rounded-2xl border border-border bg-slate-950/75">
    <div className="flex items-center gap-3 border-b border-border bg-secondary/35 px-4 py-3">
      <div className="flex gap-2 text-xs text-white/60">
        <span className="h-3 w-3 rounded-full bg-red-400" />
        <span className="h-3 w-3 rounded-full bg-yellow-400" />
        <span className="h-3 w-3 rounded-full bg-emerald-400" />
      </div>
      <div className="flex-1 rounded-full border border-white/10 bg-background/40 px-4 py-2 text-sm text-white/70">
        https://habtamudes.github.io
      </div>
    </div>
    <div className="grid min-h-[360px] grid-cols-[220px_1fr]">
      <div className="border-r border-border bg-background/20 p-4">
        <SectionLabel>Open Tabs</SectionLabel>
        <div className="space-y-2 text-sm">
          <div className="rounded-lg bg-primary/15 px-3 py-2 text-primary">Portfolio</div>
          <div className="rounded-lg bg-white/5 px-3 py-2 text-foreground/75">OpenAI Docs</div>
          <div className="rounded-lg bg-white/5 px-3 py-2 text-foreground/75">GitHub Actions</div>
          <div className="rounded-lg bg-white/5 px-3 py-2 text-foreground/75">Playwright Report</div>
        </div>
      </div>
      <div className="p-5">
        <div className="rounded-2xl border border-border bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-6">
          <p className="text-[11px] uppercase tracking-[0.22em] text-sky-200/70">Live Preview</p>
          <h3 className="mt-3 text-2xl font-display font-bold">Habtamu Assegahegn</h3>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            GitHub Pages check, responsive validation, and final browser-based review before deployment.
          </p>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {["Desktop Ready", "Interactive Apps", "Deployment Checked"].map((item) => (
              <div key={item} className="rounded-xl border border-white/8 bg-white/5 px-3 py-3 text-sm">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const MockPostman = () => (
  <div className="grid min-h-[360px] grid-cols-[240px_1fr] overflow-hidden rounded-2xl border border-border bg-slate-950/75">
    <div className="border-r border-border bg-secondary/35 p-4">
      <SectionLabel>Collections</SectionLabel>
      <div className="space-y-2 text-sm">
        <div className="rounded-lg bg-primary/15 px-3 py-2 text-primary">Portfolio API</div>
        <div className="pl-3 text-foreground/75">GET /projects</div>
        <div className="pl-3 text-foreground/75">GET /skills</div>
        <div className="pl-3 text-foreground/75">POST /contact</div>
        <div className="rounded-lg bg-white/5 px-3 py-2 text-foreground/70">Auth Sandbox</div>
      </div>
    </div>
    <div className="flex flex-col">
      <div className="flex items-center gap-3 border-b border-border px-4 py-3">
        <div className="rounded-md bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300">POST</div>
        <div className="flex-1 rounded-lg border border-white/10 bg-background/40 px-3 py-2 text-sm text-foreground/75">
          /api/contact
        </div>
        <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Send</button>
      </div>
      <div className="grid flex-1 grid-cols-2 gap-4 p-4">
        <div className="rounded-xl border border-border bg-background/30 p-4">
          <SectionLabel>Request Body</SectionLabel>
          <pre className="whitespace-pre-wrap font-mono text-sm text-foreground/80">{`{\n  "name": "Habtamu",\n  "email": "habtamuassegahegn7@gmail.com",\n  "message": "Interested in collaboration"\n}`}</pre>
        </div>
        <div className="rounded-xl border border-border bg-background/30 p-4">
          <SectionLabel>Response</SectionLabel>
          <div className="mb-3 rounded-lg bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">200 OK</div>
          <pre className="whitespace-pre-wrap font-mono text-sm text-foreground/80">{`{\n  "status": "queued",\n  "channel": "email",\n  "timestamp": "2026-03-15T10:14:00Z"\n}`}</pre>
        </div>
      </div>
    </div>
  </div>
);

const MockDocker = () => (
  <div className="overflow-hidden rounded-2xl border border-border bg-slate-950/75">
    <div className="grid min-h-[360px] grid-cols-[1fr_280px]">
      <div className="p-4">
        <SectionLabel>Containers</SectionLabel>
        <div className="space-y-3">
          {[
            ["portfolio-web", "Up 2h", "3000:3000", "healthy"],
            ["postgres-db", "Up 2h", "5432:5432", "healthy"],
            ["redis-cache", "Up 2h", "6379:6379", "healthy"],
          ].map((row) => (
            <div key={row[0]} className="grid grid-cols-4 rounded-xl border border-border bg-background/30 px-4 py-3 text-sm">
              <span>{row[0]}</span>
              <span className="text-muted-foreground">{row[1]}</span>
              <span className="text-muted-foreground">{row[2]}</span>
              <span className="text-emerald-300">{row[3]}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="border-l border-border bg-secondary/35 p-4">
        <SectionLabel>Compose Stack</SectionLabel>
        <pre className="whitespace-pre-wrap rounded-xl border border-border bg-background/30 p-4 font-mono text-sm text-foreground/80">{`services:\n  web:\n    build: .\n    ports:\n      - "3000:3000"\n  db:\n    image: postgres:16\n  cache:\n    image: redis:7`}</pre>
      </div>
    </div>
  </div>
);

const MockGit = () => (
  <div className="grid min-h-[360px] grid-cols-[260px_1fr] overflow-hidden rounded-2xl border border-border bg-slate-950/75">
    <div className="border-r border-border bg-secondary/35 p-4">
      <SectionLabel>Branches</SectionLabel>
      <div className="space-y-2 text-sm">
        <div className="rounded-lg bg-primary/15 px-3 py-2 text-primary">main</div>
        <div className="rounded-lg bg-white/5 px-3 py-2 text-foreground/75">feature/workstation-ui</div>
        <div className="rounded-lg bg-white/5 px-3 py-2 text-foreground/75">feature/games</div>
      </div>
      <SectionLabel>Recent Commits</SectionLabel>
      <div className="space-y-2 text-sm text-foreground/75">
        <div className="rounded-lg bg-background/30 px-3 py-2">add developer tool windows</div>
        <div className="rounded-lg bg-background/30 px-3 py-2">persist desktop layout</div>
        <div className="rounded-lg bg-background/30 px-3 py-2">improve portfolio shell</div>
      </div>
    </div>
    <div className="p-4">
      <SectionLabel>Working Tree</SectionLabel>
      <div className="overflow-hidden rounded-xl border border-border">
        <div className="grid grid-cols-[110px_1fr] bg-secondary/45 px-4 py-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
          <span>Status</span>
          <span>File</span>
        </div>
        {[
          ["M", "src/components/ubuntu/windows/DevToolsWindow.tsx"],
          ["M", "src/components/ubuntu/UbuntuDesktop.tsx"],
          ["M", "src/components/ubuntu/UbuntuDock.tsx"],
          ["A", "src/components/ubuntu/windows/NotesWindow.tsx"],
        ].map((row) => (
          <div key={row[1]} className="grid grid-cols-[110px_1fr] border-t border-border px-4 py-3 text-sm">
            <span className={row[0] === "A" ? "text-emerald-300" : "text-amber-300"}>{row[0]}</span>
            <span className="text-foreground/80">{row[1]}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const renderWorkspace = (tool: ToolId) => {
  switch (tool) {
    case "vscode":
      return <MockVscode />;
    case "pgadmin":
      return <MockDatabase engine="pg" />;
    case "sqlserver":
      return <MockDatabase engine="sql" />;
    case "browser":
      return <MockBrowser />;
    case "postman":
      return <MockPostman />;
    case "docker":
      return <MockDocker />;
    case "gittools":
      return <MockGit />;
  }
};

const DevToolsWindow = ({ tool }: DevToolsWindowProps) => {
  const config = toolConfig[tool];
  const Icon = config.icon;

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${config.accent}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-display font-bold">{config.title}</h2>
            <p className="text-sm text-muted-foreground">{config.subtitle}</p>
          </div>
        </div>
        <div className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-[11px] text-muted-foreground">
          Dev Tool
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {config.panels.map((panel) => (
          <div key={panel.label} className="rounded-xl border border-border bg-secondary/40 p-4">
            <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{panel.label}</p>
            <p className="mt-2 text-sm font-display font-semibold">{panel.value}</p>
          </div>
        ))}
      </div>

      {renderWorkspace(tool)}
    </div>
  );
};

export default DevToolsWindow;
