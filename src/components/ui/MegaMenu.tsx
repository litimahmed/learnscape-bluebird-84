import * as React from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MegaMenuProps {
  width?: "sm" | "md" | "lg" | "xl" | "full";
  padding?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

interface MegaMenuColumnProps {
  title: string;
  children: React.ReactNode;
}

interface MegaMenuItemProps {
  label: string;
  href: string;
  highlight?: boolean;
}

interface MegaMenuCTAProps {
  image: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

function MegaMenuRoot({ children }: MegaMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        className="flex items-center gap-1 text-foreground hover:text-primary"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        Explore
        <ChevronDown className="h-4 w-4" />
      </Button>
      
      {isOpen && (
        <div
          className="absolute top-full left-0 z-50 mt-2 bg-background border border-border rounded-lg shadow-lg p-6 grid grid-cols-4 gap-6 w-[800px]"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {children}
        </div>
      )}
    </div>
  );
}

function MegaMenuColumn({ title, children }: MegaMenuColumnProps) {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-sm text-foreground">{title}</h3>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );
}

function MegaMenuItem({ label, href, highlight }: MegaMenuItemProps) {
  return (
    <Link
      to={href}
      className={`block text-sm transition-colors hover:text-primary ${
        highlight ? "text-primary font-medium" : "text-muted-foreground"
      }`}
    >
      {label}
    </Link>
  );
}

function MegaMenuCTA({ image, title, description, buttonText, buttonLink }: MegaMenuCTAProps) {
  return (
    <div className="bg-muted rounded-lg p-4 space-y-3">
      <img src={image} alt={title} className="w-full h-24 object-cover rounded" />
      <h4 className="font-semibold text-sm">{title}</h4>
      <p className="text-xs text-muted-foreground">{description}</p>
      <Button size="sm" className="w-full">
        <Link to={buttonLink}>{buttonText}</Link>
      </Button>
    </div>
  );
}

export const MegaMenu = Object.assign(MegaMenuRoot, {
  Column: MegaMenuColumn,
  Item: MegaMenuItem,
  CTA: MegaMenuCTA,
});