import { cn } from "@/lib/utils";
import React, { useState, useEffect, Suspense } from "react";

// Define the types for the component props
interface DynamicIconProps {
  icon: string;
  className: string;
  library: "lucide" | "react-icons"; // Icon library
  fallbackIcon?: React.ComponentType<any>; 
}

const iconLibrary = {
  lucide: (icon: string) =>
    import("lucide-react").then((module) => module[icon]),
  reactIcons: (icon: string) =>
    import("react-icons/fa").then(
      (module) => module[icon]
    ),
};

const DynamicIcon: React.FC<DynamicIconProps> = ({ icon, library, className, fallbackIcon }) => {
  // State to store the loaded icon
  const [LoadedIcon, setLoadedIcon] = useState<React.ComponentType<any> | null>(null);

  const loadIcon = async () => {
    try {
      const loadedIcon = await iconLibrary[library](icon);
      console.log("LOADED ICON", loadedIcon)
      setLoadedIcon(() => loadedIcon);
    } catch (error) {
      console.error("Error loading icon:", error);
      if (fallbackIcon) {
        setLoadedIcon(() => fallbackIcon);
      }
    }
  };

  useEffect(() => {
    loadIcon();
  }, [icon, library]);

  return (
    <Suspense fallback={<span>Loading icon...</span>}>
      {LoadedIcon ? <LoadedIcon className={cn("icon", className)} /> : <span>Loading fallback...</span>}
    </Suspense>
  );
};

export default DynamicIcon;
