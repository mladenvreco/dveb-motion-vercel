"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "Light" | "Dark" | "System";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("Light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem("theme") as Theme;
    if (storedTheme) {
      setTheme(storedTheme);
      applyTheme(storedTheme);
    } else {
      applyTheme("Light");
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      applyTheme(theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme, mounted]);

  const applyTheme = (theme: Theme) => {
    const root = document.documentElement;
    console.log("🎨 Applying theme:", theme);
    console.log("📋 Classes before:", root.classList.toString());

    if (theme === "Dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    console.log("📋 Classes after:", root.classList.toString());
    console.log(
      "🎯 Computed bg color:",
      getComputedStyle(root).getPropertyValue("--bg")
    );
  };

  // Don't render children until mounted to avoid hydration mismatch
  if (!mounted) return null;

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
