import { createContext, useContext, useEffect, useState } from "react";

type ThemeColor = "teal" | "blue" | "orange" | "green" | "rose" | "default";

interface ThemeContextType {
  themeColor: ThemeColor;
  setThemeColor: (color: ThemeColor) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeColor, setThemeColor] = useState<ThemeColor>(() => {
    return (localStorage.getItem("theme-color") as ThemeColor) || "default";
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

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useThemeColor = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useThemeColor must be used within a ThemeProvider");
  }
  return context;
};
