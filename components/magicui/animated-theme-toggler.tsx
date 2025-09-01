"use client";

import { Moon, SunDim } from "lucide-react";
import { useRef } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

type props = {
  className?: string;
};

export const AnimatedThemeToggler = ({ className }: props) => {
  const { theme, setTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  
  const changeTheme = async () => {
    if (!buttonRef.current) return;

    const newTheme = theme === "dark" ? "light" : "dark";

    // Check if browser supports View Transitions
    if (!document.startViewTransition) {
      // Fallback for browsers without View Transitions support
      setTheme(newTheme);
      return;
    }

    await document.startViewTransition(() => {
      flushSync(() => {
        setTheme(newTheme);
      });
    }).ready;

    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect();
    const y = top + height / 2;
    const x = left + width / 2;

    const right = window.innerWidth - left;
    const bottom = window.innerHeight - top;
    const maxRad = Math.hypot(Math.max(left, right), Math.max(top, bottom));

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRad}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 700,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  };

  return (
    <button 
      ref={buttonRef} 
      onClick={changeTheme} 
      className={cn(
        "p-2 rounded-lg transition-colors hover:bg-accent hover:text-accent-foreground",
        className
      )}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? <SunDim className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
};
