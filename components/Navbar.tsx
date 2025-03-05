import React from "react";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMap,
  IconHome,
} from "@tabler/icons-react";
import Image from "next/image";
import { FloatingDock } from "./ui/FloatingDock";
import { ThemeToggle } from "./ThemeToggle";

const Navbar = () => {
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/",
    },

    {
      title: "Map",
      icon: (
        <IconMap className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/Map",
    },
    {
      title: "Theme",
      icon: <ThemeToggle />,
      href: "#",
    },
    {
      title: "Aceternity UI",
      icon: (
        <Image
          src="https://assets.aceternity.com/logo-dark.png"
          width={20}
          height={20}
          alt="Aceternity Logo"
        />
      ),
      href: "https://ui.aceternity.com/",
      external: true,
    },

    {
      title: "LinkedIn",
      icon: (
        <IconBrandLinkedin className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://www.linkedin.com/in/nadeem-mohammed786",
      external: true,
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://github.com/DeemTheDev/weather_app",
      external: true,
    },
  ];
  return (
    <div className="flex items-center justify-center mt-[5rem] w-full">
      <FloatingDock items={links} />
    </div>
  );
};

export default Navbar;
