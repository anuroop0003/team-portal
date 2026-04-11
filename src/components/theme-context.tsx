import { createContext, useContext, useEffect, useState } from "react";

type ThemeMode = "light" | "dark";
type ThemeColor = "teal" | "blue" | "orange" | "green" | "rose" | "default";

interface ThemeContextType {
  themeColor: ThemeColor;
  setThemeColor: (color: ThemeColor) => void;
  mode: ThemeMode;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeColor, setThemeColor] = useState<ThemeColor>(() => {
    return (localStorage.getItem("theme-color") as ThemeColor) || "default";
  });

  const [mode, setMode] = useState<ThemeMode>(() => {
    return (localStorage.getItem("theme-mode") as ThemeMode) || "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(
      "theme-teal",
      "theme-blue",
      "theme-orange",
      "theme-green",
      "theme-rose",
    );
    if (themeColor !== "default") {
      root.classList.add(`theme-${themeColor}`);
    }
    localStorage.setItem("theme-color", themeColor);
  }, [themeColor]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (mode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme-mode", mode);
  }, [mode]);

  const toggleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider
      value={{ themeColor, setThemeColor, mode, toggleMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

// Keep for backward compatibility if needed, but useTheme is more general
export const useThemeColor = useTheme;
