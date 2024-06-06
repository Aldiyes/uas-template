"use client";

import { cn } from "@/lib/utils";

import { Logo } from "@/components/logo";
import { ModeToggle } from "@/components/ui/mode-toggle";

export const Navbar = () => {
  return (
    <div
      className={cn(
        "fixed top-0 z-50 flex w-full items-center bg-background p-6 dark:bg-[#1F1F1F]",
      )}
    >
      <Logo />
      <div className="flex w-full items-center justify-between gap-x-2 md:ml-auto md:justify-end">
        <ModeToggle />
      </div>
    </div>
  );
};
