import { useState, useCallback } from "react";
import UbuntuTopBar from "@/components/ubuntu/UbuntuTopBar";
import UbuntuDock from "@/components/ubuntu/UbuntuDock";
import UbuntuDesktop from "@/components/ubuntu/UbuntuDesktop";
import UbuntuWindow from "@/components/ubuntu/UbuntuWindow";
import AboutWindow from "@/components/ubuntu/windows/AboutWindow";
import SkillsWindow from "@/components/ubuntu/windows/SkillsWindow";
import ProjectsWindow from "@/components/ubuntu/windows/ProjectsWindow";
import ContactWindow from "@/components/ubuntu/windows/ContactWindow";
import TerminalWindow from "@/components/ubuntu/windows/TerminalWindow";
import wallpaper from "@/assets/ubuntu-wallpaper.jpg";

export type AppId = "about" | "skills" | "projects" | "contact" | "terminal";

export interface WindowState {
  id: AppId;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { w: number; h: number };
}

const defaultWindows: Record<AppId, Omit<WindowState, "isOpen" | "isMinimized" | "zIndex">> = {
  about: { id: "about", position: { x: 120, y: 60 }, size: { w: 650, h: 480 } },
  skills: { id: "skills", position: { x: 200, y: 80 }, size: { w: 700, h: 500 } },
  projects: { id: "projects", position: { x: 160, y: 50 }, size: { w: 750, h: 520 } },
  contact: { id: "contact", position: { x: 250, y: 90 }, size: { w: 600, h: 460 } },
  terminal: { id: "terminal", position: { x: 180, y: 70 }, size: { w: 700, h: 440 } },
};

const windowContent: Record<AppId, React.FC> = {
  about: AboutWindow,
  skills: SkillsWindow,
  projects: ProjectsWindow,
  contact: ContactWindow,
  terminal: TerminalWindow,
};

const windowTitles: Record<AppId, string> = {
  about: "About Me",
  skills: "Skills",
  projects: "Projects",
  contact: "Contact",
  terminal: "Terminal",
};

const Index = () => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [topZ, setTopZ] = useState(10);

  const openApp = useCallback((id: AppId) => {
    setWindows((prev) => {
      const existing = prev.find((w) => w.id === id);
      if (existing) {
        if (existing.isMinimized) {
          return prev.map((w) => w.id === id ? { ...w, isMinimized: false, zIndex: topZ + 1 } : w);
        }
        return prev.map((w) => w.id === id ? { ...w, zIndex: topZ + 1 } : w);
      }
      const def = defaultWindows[id];
      return [...prev, { ...def, isOpen: true, isMinimized: false, zIndex: topZ + 1 }];
    });
    setTopZ((z) => z + 1);
  }, [topZ]);

  const closeApp = useCallback((id: AppId) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const minimizeApp = useCallback((id: AppId) => {
    setWindows((prev) => prev.map((w) => w.id === id ? { ...w, isMinimized: true } : w));
  }, []);

  const focusApp = useCallback((id: AppId) => {
    setWindows((prev) => prev.map((w) => w.id === id ? { ...w, zIndex: topZ + 1 } : w));
    setTopZ((z) => z + 1);
  }, [topZ]);

  const moveWindow = useCallback((id: AppId, pos: { x: number; y: number }) => {
    setWindows((prev) => prev.map((w) => w.id === id ? { ...w, position: pos } : w));
  }, []);

  const openAppIds = windows.filter((w) => !w.isMinimized).map((w) => w.id);

  return (
    <div className="h-screen w-screen overflow-hidden relative select-none">
      {/* Wallpaper */}
      <img src={wallpaper} alt="" className="absolute inset-0 w-full h-full object-cover" />

      {/* Top bar */}
      <UbuntuTopBar />

      {/* Desktop area */}
      <UbuntuDesktop onOpenApp={openApp} />

      {/* Windows */}
      {windows.map((win) => {
        if (win.isMinimized) return null;
        const Content = windowContent[win.id];
        return (
          <UbuntuWindow
            key={win.id}
            id={win.id}
            title={windowTitles[win.id]}
            position={win.position}
            size={win.size}
            zIndex={win.zIndex}
            onClose={closeApp}
            onMinimize={minimizeApp}
            onFocus={focusApp}
            onMove={moveWindow}
          >
            <Content />
          </UbuntuWindow>
        );
      })}

      {/* Dock */}
      <UbuntuDock onOpenApp={openApp} activeApps={openAppIds} />
    </div>
  );
};

export default Index;
