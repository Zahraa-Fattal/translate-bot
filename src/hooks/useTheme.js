import { useContext } from "react";
import { ThemeContext } from "../context/ThemContext";

export const useTheme = () => {
  // Named export
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
