import Link from "next/link";

import { FaArrowLeft } from "react-icons/fa";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-full dark:bg-[#1F1F1F]">
      <Link href="/" className="absolute left-4 top-4 flex items-center">
        <FaArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Link>
      <section className="flex h-full items-center justify-center">
        {children}
      </section>
    </main>
  );
}
