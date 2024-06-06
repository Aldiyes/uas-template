import { Poppins } from "next/font/google";
import Image from "next/image";

import { cn } from "@/lib/utils";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600"] });

export const Logo = () => {
  return (
    <div className="hidden items-center gap-x-2 md:flex">
      <Image
        src="/logo.svg"
        height="20"
        width="20"
        alt="Logo"
        className="dark:hidden"
        priority
      />
      <Image
        src="/logo-dark.svg"
        height="20"
        width="20"
        alt="Logo"
        className="hidden dark:block"
        priority
      />
      <p className={cn("font-semibold", poppins.className)}>NextTodos</p>
    </div>
  );
};
