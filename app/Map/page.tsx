"use client";
import React, { useMemo, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/Sidebar";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconHomeFilled,
  IconSearch,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MapProvider } from "./context/MapContext";

// Dynamically import the SearchModal to avoid SSR issues
const DynamicSearchModal = dynamic(
  () => import("@/app/map/components/SearchModal"),
  {
    ssr: false,
  }
);

const Page = () => {
  const [open, setOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const links = [
    {
      label: "Search",
      href: "#",
      icon: (
        <IconSearch className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      onClick: () => setIsSearchModalOpen(true),
    },
    {
      label: "LinkedIn",
      icon: (
        <IconBrandLinkedin className=" text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://www.linkedin.com/in/nadeem-mohammed786",
      external: true,
    },
    {
      label: "GitHub",
      icon: (
        <IconBrandGithub className=" text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://github.com/DeemTheDev/weather_app",
      external: true,
    },
    {
      label: "Theme",
      icon: <ThemeToggle />,
      href: "#",
    },
  ];

  return (
    <MapProvider>
      <div
        className={cn(
          "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
          "h-screen"
        )}
      >
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              {open ? <Logo /> : <LogoIcon />}
              <div className="mt-8 flex flex-col gap-2">
                {links.map((link, idx) => (
                  <SidebarLink key={idx} link={link} onClick={link.onClick} />
                ))}
              </div>
            </div>
            <div>
              <SidebarLink
                link={{
                  label: "Nadeem Mohammed",
                  href: "https://nadeem-mohammed.co.za/",
                  external: true,
                  icon: (
                    <img
                      src="/profile-pic.jpg"
                      className="h-7 w-7 flex-shrink-0 rounded-full"
                      width={50}
                      height={50}
                      alt="Avatar"
                    />
                  ),
                }}
              />
            </div>
          </SidebarBody>
        </Sidebar>
        <Dashboard />

        {/* Render search modal */}
        {isMounted && isSearchModalOpen && (
          <DynamicSearchModal
            isOpen={isSearchModalOpen}
            onClose={() => setIsSearchModalOpen(false)}
          />
        )}
      </div>
    </MapProvider>
  );
};

export const Logo = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <IconHomeFilled className="h-5 w-6  dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Home
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <IconHomeFilled className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

// Dashboard display leaflet map
const Dashboard = () => {
  // Avoid SSR and import map dynamically
  const Map = useMemo(
    () =>
      dynamic(() => import("@/app/map/components/Map"), {
        loading: () => (
          <p className="flex flex-1 justify-center items-center">
            Map is loading
          </p>
        ),
        ssr: false,
      }),
    []
  );
  return (
    <div className="flex flex-1 items-center">
      <Map />
    </div>
  );
};

export default Page;
