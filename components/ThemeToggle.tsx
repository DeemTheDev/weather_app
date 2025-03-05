"use client";

import { useEffect, useState } from "react";
import { IconSun, IconMoonFilled, IconMoon } from "@tabler/icons-react";

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const darkMode = storedTheme === "dark" || (!storedTheme && prefersDark);

    setIsDark(darkMode);
    document.documentElement.classList.toggle("dark", darkMode);
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", !isDark);
    setIsDark(!isDark);
  };

  return (
    <button onClick={toggleTheme} className=" bg-transparent rounded">
      {isDark ? (
        <IconSun size={24} />
      ) : (
        <IconMoon className="fill-black" size={24} />
      )}
    </button>
  );
};
