import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ThemeToggleProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export function ThemeToggle({ isDark, toggleTheme }: ThemeToggleProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="w-9 h-9 p-0 border border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}