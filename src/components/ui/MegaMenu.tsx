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
          className="absolute top-full left-0 z-50 mt-2 bg-gray-900 border border-gray-800 rounded-lg shadow-2xl p-8 grid grid-cols-4 gap-8 w-[900px]"
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
    <div className="space-y-4">
      <h3 className="font-semibold text-base text-white">{title}</h3>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
}

function MegaMenuItem({ label, href, highlight }: MegaMenuItemProps) {
  return (
    <Link
      to={href}
      className={`block text-sm transition-colors hover:text-blue-400 ${
        highlight ? "text-blue-400 font-medium" : "text-gray-300"
      }`}
    >
      {label}
    </Link>
  );
}

function MegaMenuCTA({ image, title, description, buttonText, buttonLink }: MegaMenuCTAProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 space-y-4">
      <img src={image} alt={title} className="w-full h-32 object-cover rounded-lg" />
      <h4 className="font-semibold text-lg text-white">{title}</h4>
      <p className="text-sm text-gray-300 leading-relaxed">{description}</p>
      <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium">
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