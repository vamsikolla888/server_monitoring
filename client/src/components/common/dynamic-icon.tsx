import { cn } from "@/lib/utils";
import React, { useState, useEffect, Suspense, JSX } from "react";
import { Ban } from "lucide-react";

interface DynamicIconProps {
  icon: string;
  className: string;
  library: "lucide-react" | "react-icons";
  importPrefix: string;
  fallbackIcon?: React.ComponentType<any>;
}

const getImport = {
  "lucide-react": ({ icon }: DynamicIconProps) =>
    //@ts-ignore
    import("lucide-react").then((module) => module[icon] as JSX.Element),
  "react-icons": ({ icon, importPrefix }: DynamicIconProps) =>
    import(`react-icons/${importPrefix}`).then(
      (module) => module[icon] as JSX.Element
    ),
};

const DynamicIcon: React.FC<DynamicIconProps> = ({
  className,
  fallbackIcon,
  ...props
}) => {
  const [LoadedIcon, setLoadedIcon] = useState<React.ComponentType<any> | null>(
    null
  );
  const [loadingError, setLoadingError] = useState(false);

  const loadIcon = async () => {
    try {
      const loadedIcon = await getImport[props.library](props as DynamicIconProps);

      if (loadedIcon) {
        setLoadedIcon(() => loadedIcon);
      } else {
        throw new Error("Failed to load Icon");
      }
    } catch (error) {
      console.error("Error loading icon:", error);
      setLoadingError(true);
      if (fallbackIcon) {
        setLoadedIcon(() => fallbackIcon);
      }
    }
  };

  useEffect(() => {
    setLoadingError(false);
    loadIcon();
  }, [props.icon, props.library, props.importPrefix]);

  return (
    <Suspense fallback={<Ban />}>
      {loadingError ? (
        <span className="icon-error">Error loading icon</span>
      ) : LoadedIcon ? (
        <LoadedIcon className={cn("icon", className)} />
      ) : (
        <Ban className="size-4" />
      )}
    </Suspense>
  );
};

export default DynamicIcon;
