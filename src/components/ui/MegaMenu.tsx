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

  // Ensure `mounted` is set to `false` after the component is mounted
  React.useEffect(() => {
    const timer = setTimeout(() => setMounted(false), 3000); // Adjust the delay as needed
    return () => clearTimeout(timer); // Cleanup the timer
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
              backgroundColor: "#D6D9DB", // Add a visible color for light theme
            }}
          />
        ) : (
          <button
            className={cn(
              "flex items-center gap-1 px-4 py-2 mr-5 border rounded-md shadow-sm transition-colors",
              "bg-background border-border text-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            Explore
            <ChevronDown className="w-4 h-4" />
          </button>
        )}
      </DropdownMenu.Trigger>

      {/* Mega Menu Content */}
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="center"
          sideOffset={0}
          className={cn(
            "border shadow-lg max-w-6xl w-[95vw] sm:w-[90vw] lg:w-[80vw] transition-all duration-200 z-50 bg-background border-border text-foreground mx-auto left-1/2 transform translate-x-[25%]",
            padding === "sm"
              ? "p-4"
              : padding === "md"
                ? "p-6"
                : padding === "lg"
                  ? "p-8"
                  : padding,
          )}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
      <h3 className="font-semibold text-sm mb-4 text-foreground">
        {title}
      </h3>
      <ul className="space-y-2">{children}</ul>
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
          "text-sm transition-colors text-muted-foreground hover:text-primary",
          highlight && "font-semibold text-primary",
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
    <div className="flex flex-col items-center text-center p-6 rounded-lg transition-colors bg-accent border border-border">
      <img
        src={image}
        width={200}
        height={120}
        alt={title}
        className="rounded-lg mb-4 w-full h-32 object-cover"
      />
      <h4 className="text-lg font-semibold mb-2 text-foreground">{title}</h4>
      <p className="text-sm mb-4 text-muted-foreground leading-relaxed">
        {description}
      </p>
      <a
        href={buttonLink}
        className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors w-full"
      >
        {buttonText}
      </a>
    </div>
  );
};