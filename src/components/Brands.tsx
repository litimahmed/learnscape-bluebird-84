import * as React from "react";
import * as Toggle from "@radix-ui/react-toggle";
import { cn } from "@/lib/utils";
import {
  SiGoogle,
  SiCoursera,
  SiUdemy,
  SiVoidlinux,
  SiLinuxfoundation,
  SiRockylinux,
  SiArtixlinux,
} from "react-icons/si";
import { useTheme } from "next-themes";

export default function Brands() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section className="w-full pt-1 pb-10 flex flex-col items-center text-center px-4 bg-background text-foreground">
      <div className="max-w-4xl">
        <section className="text-center px-4 py-12 text-foreground">
          {/* Line 1: subtle tagline */}
          <p className="text-[0.7rem] font-medium tracking-widest uppercase mb-4 text-muted-foreground">
            Consulting, Programming & Design
          </p>

          {/* Line 2: mid-sized "We support" */}
          <h2 className="text-3xl sm:text-4xl font-[500] text-foreground">
            We support
          </h2>

          <div className="flex justify-center items-center gap-2 mb-2 flex-wrap text-5xl sm:text-6xl md:text-7xl font-[500] leading-tight text-foreground">
            <span>gr</span>
            <Toggle.Root
              className={cn(
                "relative top-2 h-12 w-24 rounded-full border-[8px] border-primary bg-transparent shadow-lg cursor-default "
              )}
              disabled
              pressed={false}
            >
              <div className="h-9 w-9 relative bottom-[1px] left-11 bg-white rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.70)]" />
            </Toggle.Root>
            <span>wing</span>
          </div>

          {/* Line 4: back to chill */}
          <h3 className="text-3xl sm:text-4xl font-[500] text-foreground">
            of your business
          </h3>

          <p className="mt-4 text-sm text-muted-foreground">
            We turn great ideas into working products. <br />
            We focus on good communication and understanding your business.
          </p>
        </section>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-14">
          <button className="bg-primary hover:bg-primary/90 transition-colors text-primary-foreground px-6 py-3 rounded-full font-semibold shadow-md cursor-pointer">
            Become a partner
          </button>
          <button className="font-medium underline underline-offset-4 transition cursor-pointer text-foreground hover:text-foreground/80">
            More about us
          </button>
        </div>

        {/* Placeholder brand icons */}
        <div className="flex flex-wrap justify-center items-center gap-14 text-center">
          <div className="flex flex-col items-center">
            <SiGoogle color={isDark ? "#D1D5DB" : "#4B5563"} size={40} />
            <span className="text-sm mt-2 text-muted-foreground">
              Google
            </span>
          </div>
          <div className="flex flex-col items-center">
            <SiCoursera color={isDark ? "#D1D5DB" : "#4B5563"} size={40} />
            <span className="text-sm mt-2 text-muted-foreground">
              Coursera
            </span>
          </div>
          <div className="flex flex-col items-center">
            <SiUdemy color={isDark ? "#D1D5DB" : "#4B5563"} size={40} />
            <span className="text-sm mt-2 text-muted-foreground">
              Udemy
            </span>
          </div>
          <div className="flex flex-col items-center">
            <SiVoidlinux color={isDark ? "#D1D5DB" : "#4B5563"} size={40} />
            <span className="text-sm mt-2 text-muted-foreground">
              Void Linux
            </span>
          </div>
          <div className="flex flex-col items-center">
            <SiLinuxfoundation
              color={isDark ? "#D1D5DB" : "#4B5563"}
              size={40}
            />
            <span className="text-sm mt-2 text-muted-foreground">
              Linux Foundation
            </span>
          </div>
          <div className="flex flex-col items-center">
            <SiRockylinux color={isDark ? "#D1D5DB" : "#4B5563"} size={40} />
            <span className="text-sm mt-2 text-muted-foreground">
              Rocky Linux
            </span>
          </div>
          <div className="flex flex-col items-center">
            <SiArtixlinux color={isDark ? "#D1D5DB" : "#4B5563"} size={40} />
            <span className="text-sm mt-2 text-muted-foreground">
              Artix Linux
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}