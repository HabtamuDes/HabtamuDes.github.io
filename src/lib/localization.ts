export type Language = "en" | "am" | "fr" | "de";

export const languageOptions: { value: Language; label: string }[] = [
  { value: "en", label: "English" },
  { value: "am", label: "አማርኛ" },
  { value: "fr", label: "Français" },
  { value: "de", label: "Deutsch" },
];

type LocaleShape = {
  appLabels: Record<string, string>;
  topbar: Record<string, string>;
  boot: Record<string, string>;
  desktop: Record<string, string>;
  launcher: Record<string, string>;
  about: Record<string, string>;
  skills: {
    title: string;
    subtitle: string;
    coreAreas: string;
    primaryDirection: string;
    primaryDirectionValue: string;
    hardwareLayer: string;
    hardwareLayerValue: string;
    workingStyle: string;
    workingStyleValue: string;
    categories: { title: string; description: string }[];
  };
  experience: Record<string, string>;
  projects: Record<string, string>;
  contact: Record<string, string>;
  settings: Record<string, string>;
  files: Record<string, string>;
  terminal: {
    intro: string;
    boot1: string;
    boot2: string;
    help: string;
    whoami: string;
    experience: string;
    location: string;
    notFound: (cmd: string) => string;
  };
  resetConfirm: string;
};

export const translations: Record<Language, LocaleShape> = {
  en: {
    appLabels: {
      about: "About Me",
      experience: "Experience",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
      terminal: "Terminal",
      notes: "Notes",
      snake: "Snake",
      tictactoe: "Tic-Tac-Toe",
      vscode: "VS Code",
      pgadmin: "pgAdmin",
      sqlserver: "SQL Server",
      browser: "Browser",
      postman: "Postman",
      docker: "Docker",
      gittools: "Git Tools",
      settings: "Settings",
      files: "Files",
    },
    topbar: {
      workspace: "Habtamu Workspace",
      launcher: "Launcher",
      guide: "Guide",
      reset: "Reset",
      language: "Language",
      shortcut: "Ctrl+K",
    },
    boot: {
      title: "Habtamu Workspace",
      label: "System Boot",
      description: "Initializing desktop environment, developer tools, and interactive portfolio workspace.",
      loadingApps: "Loading apps",
      restoringState: "Restoring state",
      preparingDesktop: "Preparing desktop",
    },
    desktop: {
      engineerWorkspace: "Engineer Workspace",
      dragCard: "Drag card",
      summary: "Building full-stack platforms, embedded prototypes, and practical AI-assisted products with a focus on usable engineering.",
      focus: "Focus",
      focusValue: "Full Stack",
      hardware: "Hardware",
      hardwareValue: "Embedded + IoT",
      base: "Base",
      baseValue: "Addis Ababa",
      openHint: "Open a window from the desktop icons or the dock below. This card can be repositioned.",
      workspaceCard: "Workspace Card",
      workspaceCardText: "Start here for your role, focus, and a quick overview. You can drag this card anywhere.",
      desktopIcons: "Desktop Icons",
      desktopIconsText: "Double-click any icon to open that app. Projects, VS Code, Browser, and Notes are good first stops.",
      dock: "Dock",
      dockText: "Use the dock for quick access. Open apps show an active dot, and you can keep multiple windows open.",
      welcomeGuide: "Welcome Guide",
      welcomeTitle: "Welcome to Habtamu's workspace",
      dragGuide: "Drag guide",
      close: "Close",
      intro: "This desktop is an interactive portfolio. Explore it like a real developer machine by opening apps, resizing windows, and moving around the workspace.",
      howToExplore: "How To Explore",
      howOpenIconsDesktop: "Double-click the desktop icons on the right to open apps.",
      howOpenIconsMobile: "Tap the desktop icons below to open apps.",
      howDock: "Use the dock at the bottom for quick access to the same apps.",
      howWindows: "Drag windows by the title bar. Resize them from the edges or corners.",
      howControls: "Use minimize, maximize, and close controls like a normal desktop.",
      howLauncher: "Press Ctrl/Cmd + K to launch apps from the keyboard.",
      whatFirst: "What To Open First",
      firstAbout: "About Me for background and focus areas.",
      firstProjects: "Projects for case studies, screenshots, and CV links.",
      firstTools: "VS Code / Docker / Postman to see the developer workstation feel.",
      firstExtras: "Notes, Snake, and Tic-Tac-Toe for interactive extras.",
      helpfulTips: "Helpful Tips",
      tipCard: "The workspace card can be dragged anywhere on the desktop.",
      tipSaved: "Your layout, notes, and some app state are saved automatically.",
      tipGuide: "Use the Guide button in the top bar to reopen this at any time.",
      tipShortcuts: "Use ? to reopen the guide and Esc to close the launcher.",
      tipReset: "Use Reset in the top bar if you want a clean desktop again.",
    },
    launcher: {
      title: "Launcher",
      placeholder: "Search apps, tools, projects, notes...",
      shortcuts: "Shortcuts",
      openGuide: "Open Guide",
      openGuideText: "Bring back the first-time walkthrough and exploration tips.",
      noResults: "No matching app found. Try searching for projects, VS Code, terminal, Docker, or settings.",
      open: "Open",
    },
    about: {
      role: "Full Stack Developer | Embedded Systems | AI Enthusiast",
      paragraph1: "I build software that solves practical problems, from internal business platforms and user-facing web products to embedded systems connected to real-world sensors and devices.",
      paragraph2: "My strongest interest is where modern web engineering, embedded hardware, and AI-assisted workflows meet. I care about systems that are reliable, useful, and grounded in real user needs.",
      downloadCv: "Download CV",
      location: "Location",
      roleLabel: "Role",
      roleValue: "Full Stack Developer",
      focus: "Focus",
      focusValue: "Embedded Systems & AI",
      mindset: "Mindset",
      mindsetValue: "Building & Learning",
    },
    skills: {
      title: "Skills",
      subtitle: "Practical engineering experience across web platforms, business systems, and embedded work.",
      coreAreas: "3 core areas",
      primaryDirection: "Primary Direction",
      primaryDirectionValue: "Full-stack product engineering",
      hardwareLayer: "Hardware Layer",
      hardwareLayerValue: "Embedded systems and sensor-based projects",
      workingStyle: "Working Style",
      workingStyleValue: "Business-focused, practical, and adaptable",
      categories: [
        { title: "Programming & Tools", description: "Frontend, backend, and general-purpose programming across product and enterprise work." },
        { title: "Databases & Infrastructure", description: "Data storage, containerization, and deployment foundations used to support production systems." },
        { title: "Specializations", description: "Areas where software intersects with hardware, analysis, and applied intelligence." },
      ],
    },
    experience: {
      title: "Experience",
      subtitle: "Timeline-style overview of practical engineering work across product software, enterprise systems, and embedded projects.",
      snapshot: "Career snapshot",
      primaryTrack: "Primary Track",
      primaryTrackValue: "Full-stack software engineering",
      secondaryTrack: "Secondary Track",
      secondaryTrackValue: "Embedded and hardware-connected builds",
      workingStyle: "Working Style",
      workingStyleValue: "Practical, systems-minded, delivery focused",
    },
    projects: {
      title: "Projects",
      subtitle: "Full-stack, enterprise, and embedded work presented as compact case studies.",
      selectedWorks: "selected works",
      githubProfile: "GitHub Profile",
      walkthrough: "Request Walkthrough",
      downloadCv: "Download CV",
      overview: "Overview",
      challenge: "Challenge",
      whatIBuilt: "What I Built",
      valueDelivered: "Value Delivered",
      engineeringOutcome: "Engineering Outcome",
      stack: "Stack",
    },
    contact: {
      title: "Contact",
      subtitle: "Open to software engineering roles, collaboration, and practical product work.",
      availableRemotely: "Available remotely",
      bestChannel: "Best Channel",
      bestChannelValue: "Email or LinkedIn",
      focusAreas: "Focus Areas",
      focusAreasValue: "Full stack, enterprise, embedded",
      location: "Location",
      locationValue: "Addis Ababa, Ethiopia",
      downloadCv: "Download CV",
    },
    settings: {
      title: "Settings",
      subtitle: "Personalize the desktop theme, wallpaper, and language like a real workstation environment.",
      savedLocally: "Saved locally",
      themePresets: "Theme Presets",
      wallpaper: "Wallpaper",
      language: "Language",
      languageSubtitle: "Choose the desktop language. Your selection is saved locally.",
      midnight: "Midnight Ubuntu",
      midnightText: "Dark slate desktop with orange accents and a focused engineering look.",
      aurora: "Aurora Neon",
      auroraText: "Cool blue-green lighting for a more futuristic workstation feel.",
      ember: "Ember Lab",
      emberText: "Warm amber and copper tones for a more atmospheric studio setup.",
      blueprint: "Blueprint Glow",
      blueprintText: "Balanced default wallpaper for the main workstation.",
      auroraGrid: "Aurora Grid",
      auroraGridText: "Cooler gradient lighting with a neon-like developer mood.",
      emberHorizon: "Ember Horizon",
      emberHorizonText: "Warmer orange-red studio backdrop with depth and contrast.",
    },
    files: {
      title: "Files",
      subtitle: "Portfolio explorer for projects, profile details, and workstation shortcuts.",
      folders: "Folders",
      items: "items",
      profile: "Profile",
      profileText: "Identity, background, contact routes, and portfolio documents.",
      portfolio: "Portfolio",
      portfolioText: "Project work, screenshots, engineering notes, and interactive desktop artifacts.",
      engineering: "Engineering",
      engineeringText: "Developer workstation apps and supporting tools.",
      openApp: "Open app",
      openFile: "Open file",
    },
    terminal: {
      intro: "Interactive terminal view for quick portfolio lookup.",
      boot1: "habtamu@portfolio:~$ system boot complete",
      boot2: 'Type "help" to explore skills, projects, experience, and contact details.',
      help: 'Available commands: whoami, experience, skills, projects, contact, location, clear, help',
      whoami: "Habtamu Assegahegn\nFull-stack software engineer focused on practical systems, embedded work, and AI-assisted problem solving.",
      experience: "Experience areas:\n- Enterprise product systems\n- Full-stack platform delivery\n- Embedded and IoT-style project work\n- Continuous self-directed product building",
      location: "Addis Ababa, Ethiopia",
      notFound: (cmd: string) => `bash: ${cmd}: command not found. Type "help" for available commands.`,
    },
    resetConfirm: "Reset the desktop layout, notes, language, theme, and saved game state?",
  },
  am: {
    appLabels: {
      about: "ስለ እኔ",
      experience: "ልምድ",
      skills: "ክህሎቶች",
      projects: "ፕሮጀክቶች",
      contact: "አድራሻ",
      terminal: "ተርሚናል",
      notes: "ማስታወሻ",
      snake: "ስኔክ",
      tictactoe: "ቲክ-ታክ-ቶ",
      vscode: "ቪኤስ ኮድ",
      pgadmin: "ፒጂአድሚን",
      sqlserver: "SQL ሰርቨር",
      browser: "ብራውዘር",
      postman: "ፖስትማን",
      docker: "ዶከር",
      gittools: "Git መሳሪያዎች",
      settings: "ቅንብሮች",
      files: "ፋይሎች",
    },
    topbar: { workspace: "የሀብታሙ የስራ ቦታ", launcher: "አስጀማሪ", guide: "መመሪያ", reset: "ዳግም ጀምር", language: "ቋንቋ", shortcut: "Ctrl+K" },
    boot: { title: "የሀብታሙ የስራ ቦታ", label: "ስርዓት መነሻ", description: "የዴስክቶፕ አካባቢ፣ የገንቢ መሳሪያዎች እና ፖርትፎሊዮ እየተነሱ ነው።", loadingApps: "መተግበሪያዎች በመጫን ላይ", restoringState: "ሁኔታ በመመለስ ላይ", preparingDesktop: "ዴስክቶፕ በማዘጋጀት ላይ" },
    desktop: {
      engineerWorkspace: "የመሐንዲስ የስራ ቦታ", dragCard: "ካርዱን ጎትት", summary: "ተግባራዊ የሶፍትዌር መፍትሄዎች፣ ኤምቤድድ ፕሮቶታይፖች እና AI የተገዘ ምርቶችን እገነባለሁ።",
      focus: "ትኩረት", focusValue: "ፉል ስታክ", hardware: "ሀርድዌር", hardwareValue: "ኤምቤድድ + IoT", base: "መሠረት", baseValue: "አዲስ አበባ",
      openHint: "መስኮት ከዴስክቶፕ አይኮኖች ወይም ከታች ካለው ዶክ ይክፈቱ።", workspaceCard: "የስራ ቦታ ካርድ", workspaceCardText: "ሚናዎን እና ፈጣን እይታ እዚህ ይጀምሩ።", desktopIcons: "የዴስክቶፕ አይኮኖች", desktopIconsText: "አይኮኑን ሁለት ጊዜ በመጫን ይክፈቱ።", dock: "ዶክ", dockText: "ለፈጣን መድረሻ ዶኩን ይጠቀሙ።",
      welcomeGuide: "የእንኳን ደህና መጡ መመሪያ", welcomeTitle: "ወደ ሀብታሙ የስራ ቦታ እንኳን ደህና መጡ", dragGuide: "መመሪያውን ጎትት", close: "ዝጋ", intro: "ይህ ዴስክቶፕ ተግባራዊ ፖርትፎሊዮ ነው።",
      howToExplore: "እንዴት መመልከት እንደሚቻል", howOpenIconsDesktop: "በቀኝ ያሉ አይኮኖችን ሁለት ጊዜ ይጫኑ።", howOpenIconsMobile: "ከታች ያሉ አይኮኖችን ይጫኑ።", howDock: "በታች ያለውን ዶክ ይጠቀሙ።", howWindows: "መስኮቶችን ከርዕስ አሞሌ ይጎትቱ።", howControls: "ማሳነስ፣ ማበርታት እና መዝጋት ይጠቀሙ።", howLauncher: "Ctrl/Cmd + K በመጫን መተግበሪያ ይክፈቱ።",
      whatFirst: "መጀመሪያ የሚከፈቱ", firstAbout: "ስለ እኔ ለጀርባ መረጃ።", firstProjects: "ፕሮጀክቶች ለኬዝ ስታዲ እና ስክሪንሾቶች።", firstTools: "VS Code / Docker / Postman ለየገንቢ ስራ አካባቢ።", firstExtras: "ማስታወሻ፣ Snake እና Tic-Tac-Toe ለተጨማሪ ተግባራዊነት።",
      helpfulTips: "ጠቃሚ ምክሮች", tipCard: "ካርዱ በዴስክቶፕ ላይ የትም ሊንቀሳቀስ ይችላል።", tipSaved: "አቀማመጥ እና ማስታወሻዎች በራስ-ሰር ይቀመጣሉ።", tipGuide: "Guide በመጠቀም እንደገና ይክፈቱ።", tipShortcuts: "? ለመመሪያ፣ Esc ለአስጀማሪው።", tipReset: "ንጹህ ዴስክቶፕ ለማግኘት Reset ይጠቀሙ።",
    },
    launcher: { title: "አስጀማሪ", placeholder: "መተግበሪያዎች፣ መሳሪያዎች፣ ፕሮጀክቶችን ፈልግ...", shortcuts: "አቋራጮች", openGuide: "መመሪያ ክፈት", openGuideText: "የመጀመሪያ ጊዜ መመሪያውን እንደገና አምጣ።", noResults: "ተመሳሳይ መተግበሪያ አልተገኘም።", open: "ክፈት" },
    about: { role: "ፉል ስታክ ገንቢ | ኤምቤድድ ሲስተሞች | AI ፍላጎት", paragraph1: "የተግባራዊ ችግሮችን የሚፈቱ ሶፍትዌሮችን እገነባለሁ።", paragraph2: "ዘመናዊ የድር ምህንድስና፣ ኤምቤድድ ሀርድዌር እና AI የተገዘ የስራ ሂደቶች ላይ እተኩራለሁ።", downloadCv: "CV አውርድ", location: "አካባቢ", roleLabel: "ሚና", roleValue: "ፉል ስታክ ገንቢ", focus: "ትኩረት", focusValue: "ኤምቤድድ ሲስተሞች እና AI", mindset: "አመለካከት", mindsetValue: "መገንባት እና መማር" },
    skills: { title: "ክህሎቶች", subtitle: "በድር፣ ቢዝነስ እና ኤምቤድድ ስራዎች ላይ ተግባራዊ ልምድ።", coreAreas: "3 ዋና ክፍሎች", primaryDirection: "ዋና አቅጣጫ", primaryDirectionValue: "ፉል ስታክ የምርት ምህንድስና", hardwareLayer: "የሀርድዌር ክፍል", hardwareLayerValue: "ኤምቤድድ ሲስተሞች እና ሴንሰር ፕሮጀክቶች", workingStyle: "የስራ ቅጥ", workingStyleValue: "ተግባራዊ እና ተስማሚ", categories: [{ title: "ፕሮግራሚንግ እና መሳሪያዎች", description: "ፍሮንትኤንድ፣ ባክኤንድ እና አጠቃላይ ፕሮግራሚንግ።" }, { title: "ዳታቤዞች እና ኢንፍራ", description: "ማከማቻ፣ ኮንቴይነር እና ማሰማራት መሠረቶች።" }, { title: "ልዩ ትኩረቶች", description: "ሶፍትዌር ከሀርድዌር እና ተግባራዊ ብልህነት ጋር የሚገናኝበት ክፍል።" }] },
    experience: { title: "ልምድ", subtitle: "በምርት ሶፍትዌር፣ ኢንተርፕራይዝ ሲስተሞች እና ኤምቤድድ ፕሮጀክቶች ላይ እይታ።", snapshot: "የስራ እይታ", primaryTrack: "ዋና መንገድ", primaryTrackValue: "ፉል ስታክ ሶፍትዌር ምህንድስና", secondaryTrack: "ሁለተኛ መንገድ", secondaryTrackValue: "ኤምቤድድ እና ከሀርድዌር ጋር የተያያዙ ግንባታዎች", workingStyle: "የስራ ቅጥ", workingStyleValue: "ተግባራዊ እና ማቅረብ ላይ የተመረከተ" },
    projects: { title: "ፕሮጀክቶች", subtitle: "ፉል ስታክ፣ ኢንተርፕራይዝ እና ኤምቤድድ ስራዎች እንደ ኬዝ ስታዲ ቀርበዋል።", selectedWorks: "የተመረጡ ስራዎች", githubProfile: "GitHub ፕሮፋይል", walkthrough: "የማብራሪያ ጥያቄ", downloadCv: "CV አውርድ", overview: "አጠቃላይ እይታ", challenge: "ችግር", whatIBuilt: "የገነባሁት", valueDelivered: "የተሰጠ እሴት", engineeringOutcome: "የምህንድስና ውጤት", stack: "ቴክ ስታክ" },
    contact: { title: "አድራሻ", subtitle: "ለሶፍትዌር ምህንድስና ስራዎች እና ትብብር ዝግጁ ነኝ።", availableRemotely: "በርቀት የሚሰራ", bestChannel: "የተሻለ መንገድ", bestChannelValue: "ኢሜይል ወይም LinkedIn", focusAreas: "የትኩረት ክፍሎች", focusAreasValue: "ፉል ስታክ፣ ኢንተርፕራይዝ፣ ኤምቤድድ", location: "አካባቢ", locationValue: "አዲስ አበባ፣ ኢትዮጵያ", downloadCv: "CV አውርድ" },
    settings: { title: "ቅንብሮች", subtitle: "ጭብጥ፣ ዋልፔፐር እና ቋንቋ ያስተካክሉ።", savedLocally: "በአካባቢው ተቀምጧል", themePresets: "የጭብጥ ምርጫዎች", wallpaper: "ዋልፔፐር", language: "ቋንቋ", languageSubtitle: "የዴስክቶፕ ቋንቋን ይምረጡ።", midnight: "የሌሊት ኡቡንቱ", midnightText: "ጨለማ ዴስክቶፕ ከብርቱካናማ ቀለም ጋር።", aurora: "አውሮራ ኒዮን", auroraText: "ቀዝቃዛ ሰማያዊ-አረንጓዴ ብርሃን።", ember: "ኤምበር ላብ", emberText: "ሞቃት አምበር እና ኮፐር ቀለሞች።", blueprint: "ብሉፕሪንት ግሎው", blueprintText: "ሚዛናዊ ነባሪ ዋልፔፐር።", auroraGrid: "አውሮራ ግሪድ", auroraGridText: "ቀዝቃዛ ግራዲየንት ብርሃን።", emberHorizon: "ኤምበር ሆራይዘን", emberHorizonText: "ሞቃት የስቱዲዮ ጀርባ።" },
    files: { title: "ፋይሎች", subtitle: "ለፕሮጀክቶች፣ የፕሮፋይል ዝርዝሮች እና አቋራጮች ኤክስፕሎረር።", folders: "ፎልደሮች", items: "ንጥሎች", profile: "ፕሮፋይል", profileText: "ማንነት፣ ጀርባ እና ሰነዶች።", portfolio: "ፖርትፎሊዮ", portfolioText: "የፕሮጀክት ስራ፣ ስክሪንሾቶች እና ማስታወሻዎች።", engineering: "ምህንድስና", engineeringText: "የገንቢ መተግበሪያዎች እና መሳሪያዎች።", openApp: "መተግበሪያ ክፈት", openFile: "ፋይል ክፈት" },
    terminal: { intro: "ለፈጣን ፖርትፎሊዮ ፍለጋ የተርሚናል እይታ።", boot1: "habtamu@portfolio:~$ ስርዓቱ ተነስቷል", boot2: '"help" በመጻፍ ክህሎቶችን፣ ፕሮጀክቶችን እና ልምድን ይመልከቱ።', help: 'ያሉ ትዕዛዞች: whoami, experience, skills, projects, contact, location, clear, help', whoami: "ሀብታሙ አሰጋኸኝ\nፉል ስታክ ሶፍትዌር ምህንድስ።", experience: "የልምድ ክፍሎች:\n- የኢንተርፕራይዝ ሲስተሞች\n- ፉል ስታክ መድረክ ማቅረብ\n- ኤምቤድድ እና IoT ፕሮጀክቶች", location: "አዲስ አበባ፣ ኢትዮጵያ", notFound: (cmd: string) => `bash: ${cmd}: ትዕዛዙ አልተገኘም። "help" ይጠቀሙ።` },
    resetConfirm: "የዴስክቶፕ አቀማመጥ፣ ማስታወሻዎች፣ ቋንቋ፣ ጭብጥ እና የተቀመጠ የጨዋታ ሁኔታ ይደምሱ?",
  },
  fr: {
    appLabels: { about: "À propos", experience: "Expérience", skills: "Compétences", projects: "Projets", contact: "Contact", terminal: "Terminal", notes: "Notes", snake: "Snake", tictactoe: "Morpion", vscode: "VS Code", pgadmin: "pgAdmin", sqlserver: "SQL Server", browser: "Navigateur", postman: "Postman", docker: "Docker", gittools: "Outils Git", settings: "Paramètres", files: "Fichiers" },
    topbar: { workspace: "Espace de travail Habtamu", launcher: "Lanceur", guide: "Guide", reset: "Réinitialiser", language: "Langue", shortcut: "Ctrl+K" },
    boot: { title: "Espace de travail Habtamu", label: "Démarrage système", description: "Initialisation du bureau, des outils développeur et du portfolio interactif.", loadingApps: "Chargement des apps", restoringState: "Restauration de l'état", preparingDesktop: "Préparation du bureau" },
    desktop: { engineerWorkspace: "Espace ingénieur", dragCard: "Déplacer la carte", summary: "Je construis des plateformes full-stack, des prototypes embarqués et des produits pratiques assistés par l'IA.", focus: "Focus", focusValue: "Full Stack", hardware: "Matériel", hardwareValue: "Embarqué + IoT", base: "Base", baseValue: "Addis-Abeba", openHint: "Ouvrez une fenêtre depuis les icônes du bureau ou le dock ci-dessous.", workspaceCard: "Carte d'espace de travail", workspaceCardText: "Commencez ici pour le rôle, le focus et un aperçu rapide.", desktopIcons: "Icônes du bureau", desktopIconsText: "Double-cliquez sur une icône pour ouvrir l'application.", dock: "Dock", dockText: "Utilisez le dock pour un accès rapide.", welcomeGuide: "Guide de bienvenue", welcomeTitle: "Bienvenue dans l'espace de travail de Habtamu", dragGuide: "Déplacer le guide", close: "Fermer", intro: "Ce bureau est un portfolio interactif.", howToExplore: "Comment explorer", howOpenIconsDesktop: "Double-cliquez les icônes à droite.", howOpenIconsMobile: "Touchez les icônes ci-dessous.", howDock: "Utilisez le dock en bas pour un accès rapide.", howWindows: "Déplacez les fenêtres par la barre de titre.", howControls: "Utilisez réduire, agrandir et fermer.", howLauncher: "Appuyez sur Ctrl/Cmd + K pour lancer les apps.", whatFirst: "À ouvrir en premier", firstAbout: "À propos pour le contexte.", firstProjects: "Projets pour les études de cas.", firstTools: "VS Code / Docker / Postman pour l'environnement développeur.", firstExtras: "Notes, Snake et Morpion pour les extras.", helpfulTips: "Conseils utiles", tipCard: "La carte d'espace de travail peut être déplacée.", tipSaved: "La disposition et les notes sont sauvegardées.", tipGuide: "Utilisez Guide pour rouvrir ceci.", tipShortcuts: "? rouvre le guide et Esc ferme le lanceur.", tipReset: "Utilisez Réinitialiser pour repartir d'un bureau propre." },
    launcher: { title: "Lanceur", placeholder: "Rechercher apps, outils, projets, notes...", shortcuts: "Raccourcis", openGuide: "Ouvrir le guide", openGuideText: "Afficher à nouveau le guide de première visite.", noResults: "Aucune application correspondante trouvée.", open: "Ouvrir" },
    about: { role: "Développeur Full Stack | Systèmes embarqués | Passionné d'IA", paragraph1: "Je construis des logiciels qui résolvent des problèmes concrets.", paragraph2: "Mon intérêt principal se situe à l'intersection du web moderne, du matériel embarqué et des workflows assistés par l'IA.", downloadCv: "Télécharger le CV", location: "Lieu", roleLabel: "Rôle", roleValue: "Développeur Full Stack", focus: "Focus", focusValue: "Systèmes embarqués & IA", mindset: "Approche", mindsetValue: "Construire & apprendre" },
    skills: { title: "Compétences", subtitle: "Expérience pratique d'ingénierie sur des plateformes web, systèmes métier et travaux embarqués.", coreAreas: "3 domaines clés", primaryDirection: "Direction principale", primaryDirectionValue: "Ingénierie produit full-stack", hardwareLayer: "Couche matérielle", hardwareLayerValue: "Systèmes embarqués et projets à capteurs", workingStyle: "Style de travail", workingStyleValue: "Pragmatique et adaptable", categories: [{ title: "Programmation & outils", description: "Frontend, backend et programmation générale." }, { title: "Bases de données & infrastructure", description: "Stockage, conteneurisation et déploiement." }, { title: "Spécialisations", description: "Là où le logiciel rencontre le matériel et l'intelligence appliquée." }] },
    experience: { title: "Expérience", subtitle: "Vue chronologique du travail concret en logiciel produit, systèmes d'entreprise et projets embarqués.", snapshot: "Aperçu de carrière", primaryTrack: "Axe principal", primaryTrackValue: "Ingénierie logicielle full-stack", secondaryTrack: "Axe secondaire", secondaryTrackValue: "Constructions embarquées et connectées au matériel", workingStyle: "Style de travail", workingStyleValue: "Pratique et orienté livraison" },
    projects: { title: "Projets", subtitle: "Travaux full-stack, entreprise et embarqués en études de cas compactes.", selectedWorks: "travaux sélectionnés", githubProfile: "Profil GitHub", walkthrough: "Demander une présentation", downloadCv: "Télécharger le CV", overview: "Vue d'ensemble", challenge: "Défi", whatIBuilt: "Ce que j'ai construit", valueDelivered: "Valeur livrée", engineeringOutcome: "Résultat d'ingénierie", stack: "Stack" },
    contact: { title: "Contact", subtitle: "Ouvert aux rôles d'ingénierie logicielle et à la collaboration.", availableRemotely: "Disponible à distance", bestChannel: "Meilleur canal", bestChannelValue: "Email ou LinkedIn", focusAreas: "Domaines de focus", focusAreasValue: "Full stack, entreprise, embarqué", location: "Lieu", locationValue: "Addis-Abeba, Éthiopie", downloadCv: "Télécharger le CV" },
    settings: { title: "Paramètres", subtitle: "Personnalisez le thème, le fond d'écran et la langue.", savedLocally: "Sauvegardé localement", themePresets: "Préréglages de thème", wallpaper: "Fond d'écran", language: "Langue", languageSubtitle: "Choisissez la langue du bureau.", midnight: "Minuit Ubuntu", midnightText: "Bureau sombre avec accents orange.", aurora: "Aurore néon", auroraText: "Lumière bleu-vert plus futuriste.", ember: "Laboratoire ember", emberText: "Tons chauds ambrés et cuivrés.", blueprint: "Lueur blueprint", blueprintText: "Fond d'écran équilibré pour le poste principal.", auroraGrid: "Grille aurore", auroraGridText: "Éclairage plus froid avec ambiance néon.", emberHorizon: "Horizon ember", emberHorizonText: "Fond de studio plus chaud avec profondeur." },
    files: { title: "Fichiers", subtitle: "Explorateur du portfolio pour projets, profil et raccourcis.", folders: "Dossiers", items: "éléments", profile: "Profil", profileText: "Identité, contexte et documents.", portfolio: "Portfolio", portfolioText: "Travaux, captures et notes d'ingénierie.", engineering: "Ingénierie", engineeringText: "Apps développeur et outils.", openApp: "Ouvrir l'app", openFile: "Ouvrir le fichier" },
    terminal: { intro: "Vue terminal interactive pour une consultation rapide.", boot1: "habtamu@portfolio:~$ démarrage système terminé", boot2: 'Tapez "help" pour explorer compétences, projets et expérience.', help: 'Commandes disponibles: whoami, experience, skills, projects, contact, location, clear, help', whoami: "Habtamu Assegahegn\nIngénieur logiciel full-stack.", experience: "Domaines d'expérience:\n- Systèmes produit d'entreprise\n- Livraison de plateformes full-stack\n- Projets embarqués de type IoT", location: "Addis-Abeba, Éthiopie", notFound: (cmd: string) => `bash: ${cmd}: commande introuvable. Tapez "help".` },
    resetConfirm: "Réinitialiser la disposition du bureau, les notes, la langue, le thème et l'état des jeux ?",
  },
  de: {
    appLabels: { about: "Über mich", experience: "Erfahrung", skills: "Fähigkeiten", projects: "Projekte", contact: "Kontakt", terminal: "Terminal", notes: "Notizen", snake: "Snake", tictactoe: "Tic-Tac-Toe", vscode: "VS Code", pgadmin: "pgAdmin", sqlserver: "SQL Server", browser: "Browser", postman: "Postman", docker: "Docker", gittools: "Git-Werkzeuge", settings: "Einstellungen", files: "Dateien" },
    topbar: { workspace: "Habtamu Arbeitsbereich", launcher: "Starter", guide: "Anleitung", reset: "Zurücksetzen", language: "Sprache", shortcut: "Ctrl+K" },
    boot: { title: "Habtamu Arbeitsbereich", label: "Systemstart", description: "Desktop-Umgebung, Entwicklerwerkzeuge und Portfolio werden initialisiert.", loadingApps: "Apps laden", restoringState: "Status wiederherstellen", preparingDesktop: "Desktop vorbereiten" },
    desktop: { engineerWorkspace: "Ingenieur-Arbeitsbereich", dragCard: "Karte ziehen", summary: "Ich entwickle Full-Stack-Plattformen, Embedded-Prototypen und praktische KI-gestützte Produkte.", focus: "Fokus", focusValue: "Full Stack", hardware: "Hardware", hardwareValue: "Embedded + IoT", base: "Standort", baseValue: "Addis Abeba", openHint: "Öffne ein Fenster über die Desktop-Symbole oder das Dock unten.", workspaceCard: "Arbeitsbereichskarte", workspaceCardText: "Starte hier mit Rolle, Fokus und Schnellüberblick.", desktopIcons: "Desktop-Symbole", desktopIconsText: "Doppelklicke ein Symbol, um die App zu öffnen.", dock: "Dock", dockText: "Nutze das Dock für schnellen Zugriff.", welcomeGuide: "Willkommenshilfe", welcomeTitle: "Willkommen in Habtamus Arbeitsbereich", dragGuide: "Guide ziehen", close: "Schließen", intro: "Dieser Desktop ist ein interaktives Portfolio.", howToExplore: "So erkundest du ihn", howOpenIconsDesktop: "Doppelklicke die Symbole rechts.", howOpenIconsMobile: "Tippe auf die Symbole unten.", howDock: "Nutze das Dock unten.", howWindows: "Ziehe Fenster über die Titelleiste.", howControls: "Nutze Minimieren, Maximieren und Schließen.", howLauncher: "Drücke Ctrl/Cmd + K, um Apps per Tastatur zu starten.", whatFirst: "Zuerst öffnen", firstAbout: "Über mich für Hintergrund und Schwerpunkt.", firstProjects: "Projekte für Fallstudien und Screenshots.", firstTools: "VS Code / Docker / Postman für das Entwickler-Setup.", firstExtras: "Notizen, Snake und Tic-Tac-Toe für Extras.", helpfulTips: "Hilfreiche Tipps", tipCard: "Die Arbeitsbereichskarte kann verschoben werden.", tipSaved: "Layout und Notizen werden automatisch gespeichert.", tipGuide: "Nutze Anleitung, um dies erneut zu öffnen.", tipShortcuts: "? öffnet die Hilfe, Esc schließt den Starter.", tipReset: "Mit Zurücksetzen erhältst du einen sauberen Desktop." },
    launcher: { title: "Starter", placeholder: "Apps, Werkzeuge, Projekte, Notizen suchen...", shortcuts: "Kurzbefehle", openGuide: "Anleitung öffnen", openGuideText: "Die Einführung erneut anzeigen.", noResults: "Keine passende App gefunden.", open: "Öffnen" },
    about: { role: "Full-Stack-Entwickler | Embedded Systems | KI-Enthusiast", paragraph1: "Ich entwickle Software, die praktische Probleme löst.", paragraph2: "Mein Fokus liegt auf moderner Webtechnik, Embedded-Hardware und KI-gestützten Workflows.", downloadCv: "CV herunterladen", location: "Ort", roleLabel: "Rolle", roleValue: "Full-Stack-Entwickler", focus: "Fokus", focusValue: "Embedded Systems & KI", mindset: "Arbeitsweise", mindsetValue: "Bauen & Lernen" },
    skills: { title: "Fähigkeiten", subtitle: "Praktische Engineering-Erfahrung über Webplattformen, Business-Systeme und Embedded-Arbeit.", coreAreas: "3 Kernbereiche", primaryDirection: "Hauptrichtung", primaryDirectionValue: "Full-Stack-Produktentwicklung", hardwareLayer: "Hardware-Ebene", hardwareLayerValue: "Embedded Systems und sensorbasierte Projekte", workingStyle: "Arbeitsstil", workingStyleValue: "Pragmatisch und anpassungsfähig", categories: [{ title: "Programmierung & Tools", description: "Frontend, Backend und allgemeine Programmierung." }, { title: "Datenbanken & Infrastruktur", description: "Speicherung, Containerisierung und Deployment." }, { title: "Spezialisierungen", description: "Software trifft auf Hardware und angewandte Intelligenz." }] },
    experience: { title: "Erfahrung", subtitle: "Zeitstrahlartige Übersicht über praktische Arbeit in Produktsoftware, Enterprise-Systemen und Embedded-Projekten.", snapshot: "Karriereüberblick", primaryTrack: "Primärer Pfad", primaryTrackValue: "Full-Stack-Softwareentwicklung", secondaryTrack: "Sekundärer Pfad", secondaryTrackValue: "Embedded- und hardwarebezogene Entwicklungen", workingStyle: "Arbeitsstil", workingStyleValue: "Praktisch und lieferfokussiert" },
    projects: { title: "Projekte", subtitle: "Full-Stack-, Enterprise- und Embedded-Arbeit als kompakte Fallstudien.", selectedWorks: "ausgewählte Arbeiten", githubProfile: "GitHub-Profil", walkthrough: "Einführung anfragen", downloadCv: "CV herunterladen", overview: "Überblick", challenge: "Herausforderung", whatIBuilt: "Was ich gebaut habe", valueDelivered: "Gelieferter Wert", engineeringOutcome: "Engineering-Ergebnis", stack: "Stack" },
    contact: { title: "Kontakt", subtitle: "Offen für Software-Engineering-Rollen und Zusammenarbeit.", availableRemotely: "Remote verfügbar", bestChannel: "Bester Kanal", bestChannelValue: "E-Mail oder LinkedIn", focusAreas: "Fokusbereiche", focusAreasValue: "Full Stack, Enterprise, Embedded", location: "Ort", locationValue: "Addis Abeba, Äthiopien", downloadCv: "CV herunterladen" },
    settings: { title: "Einstellungen", subtitle: "Passe Thema, Hintergrundbild und Sprache an.", savedLocally: "Lokal gespeichert", themePresets: "Themenvorgaben", wallpaper: "Hintergrundbild", language: "Sprache", languageSubtitle: "Wähle die Desktop-Sprache.", midnight: "Mitternacht Ubuntu", midnightText: "Dunkler Desktop mit orangefarbenen Akzenten.", aurora: "Aurora Neon", auroraText: "Kühles Blau-Grün mit futuristischem Gefühl.", ember: "Ember Lab", emberText: "Warme Bernstein- und Kupfertöne.", blueprint: "Blueprint Glow", blueprintText: "Ausgewogenes Standard-Hintergrundbild.", auroraGrid: "Aurora Grid", auroraGridText: "Kühlere Farbverläufe mit Neon-Stimmung.", emberHorizon: "Ember Horizon", emberHorizonText: "Wärmerer Studiountergrund mit Tiefe." },
    files: { title: "Dateien", subtitle: "Portfolio-Explorer für Projekte, Profil und Verknüpfungen.", folders: "Ordner", items: "Elemente", profile: "Profil", profileText: "Identität, Hintergrund und Dokumente.", portfolio: "Portfolio", portfolioText: "Projektarbeit, Screenshots und Notizen.", engineering: "Engineering", engineeringText: "Entwickler-Apps und Werkzeuge.", openApp: "App öffnen", openFile: "Datei öffnen" },
    terminal: { intro: "Interaktive Terminalansicht für schnellen Portfolio-Zugriff.", boot1: "habtamu@portfolio:~$ Systemstart abgeschlossen", boot2: 'Gib "help" ein, um Fähigkeiten, Projekte und Erfahrung zu erkunden.', help: 'Verfügbare Befehle: whoami, experience, skills, projects, contact, location, clear, help', whoami: "Habtamu Assegahegn\nFull-Stack-Softwareingenieur.", experience: "Erfahrungsbereiche:\n- Enterprise-Produktsysteme\n- Full-Stack-Plattformlieferung\n- Embedded- und IoT-Projektarbeit", location: "Addis Abeba, Äthiopien", notFound: (cmd: string) => `bash: ${cmd}: Befehl nicht gefunden. Gib "help" ein.` },
    resetConfirm: "Desktop-Layout, Notizen, Sprache, Thema und gespeicherte Spielstände zurücksetzen?",
  },
};
