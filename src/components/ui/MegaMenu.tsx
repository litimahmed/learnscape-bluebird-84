import * as React from "react";
import { ChevronDown } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/utils";
import { Skeleton } from "./skeleton";

interface MegaMenuProps {
  width?: "full" | "half" | string;
  padding?: "sm" | "md" | "lg" | string;
  children: React.ReactNode;
}

export function MegaMenu({ padding = "md", children }: MegaMenuProps) {
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(true);
  const loading = false; // Mock loading state
  const timeoutRef = React.useRef<NodeJS.Timeout>();

  // Ensure `mounted` is set to `false` after the component is mounted
  React.useEffect(() => {
    const timer = setTimeout(() => setMounted(false), 3000); // Adjust the delay as needed
    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }
    setOpen(true);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 200); // Slightly longer delay to prevent flickering
  };

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      {/* Trigger Button */}
      <DropdownMenu.Trigger asChild>
        {loading || mounted ? (
          <Skeleton
            style={{
              width: "160px",
              height: "55px",
              borderRadius: "10px",
              transform: "scale(0.7)",
            }}
          />
        ) : (
          <button
            className={cn(
              "flex items-center gap-1 px-4 py-2 mr-5 border rounded-md shadow-2xs transition",
              "bg-background border-border text-foreground hover:bg-accent"
            )}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => setOpen(!open)}
          >
            Explore
            <ChevronDown className="w-4 h-4" />
          </button>
        )}
      </DropdownMenu.Trigger>

      {/* Mega Menu Content */}
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="start"
          className={cn(
            "border shadow-lg rounded-lg max-w-5xl w-[1000px] max-h-[500px] overflow-y-auto transition bg-gray-900 border-gray-700 text-white z-50",
            padding === "sm"
              ? "p-4"
              : padding === "md"
                ? "p-6"
                : padding === "lg"
                  ? "p-8"
                  : padding,
          )}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          sideOffset={5}
        >
          <div className="grid grid-cols-4 gap-6">
            {children}
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

// Individual Column Component
MegaMenu.Column = function Column({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="font-semibold text-base mb-4 text-white">
        {title}
      </h3>
      <ul className="space-y-3">{children}</ul>
    </div>
  );
};

// Menu Item Component
MegaMenu.Item = function Item({
  label,
  href,
  highlight,
}: {
  label: string;
  href: string;
  highlight?: boolean;
}) {
  return (
    <li>
      <a
        href={href}
        className={cn(
          "text-sm transition text-gray-300 hover:text-blue-400",
          highlight && "font-semibold text-blue-400",
        )}
      >
        {label}
      </a>
    </li>
  );
};

// CTA Component
MegaMenu.CTA = function CTA({
  image,
  title,
  description,
  buttonText,
  buttonLink,
}: {
  image: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}) {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-lg transition bg-gray-800 text-white">
      <img
        src={image}
        width={200}
        height={120}
        alt={title}
        className="rounded-lg mb-4 w-full h-32 object-cover"
      />
      <h4 className="text-lg font-semibold mb-2 text-white">{title}</h4>
      <p className="text-sm mb-4 text-gray-300 leading-relaxed">
        {description}
      </p>
      <a
        href={buttonLink}
        className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition w-full"
      >
        {buttonText}
      </a>
    </div>
  );
};