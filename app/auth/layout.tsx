import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-full dark:bg-[#1F1F1F]">
      <Link href="/" className="absolute left-4 top-4 flex items-center">
        <ArrowLeftCircle className="h-8 w-8" />
      </Link>
      <section className="flex h-full items-center justify-center">
        {children}
      </section>
    </main>
  );
}
