import { useState, useEffect } from "react";
import { Wifi, Volume2, Battery } from "lucide-react";

const UbuntuTopBar = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatDate = (d: Date) => {
    return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }) +
      " " + d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
  };

  return (
    <div className="ubuntu-panel fixed top-0 left-0 right-0 h-8 z-[100] flex items-center justify-between px-4 text-xs">
      <button className="font-display font-medium hover:bg-foreground/10 px-3 py-1 rounded transition-colors">
        Activities
      </button>
      <span className="font-display font-medium">{formatDate(time)}</span>
      <div className="flex items-center gap-3">
        <Wifi className="w-3.5 h-3.5 text-foreground" />
        <Volume2 className="w-3.5 h-3.5 text-foreground" />
        <Battery className="w-3.5 h-3.5 text-foreground" />
      </div>
    </div>
  );
};

export default UbuntuTopBar;
