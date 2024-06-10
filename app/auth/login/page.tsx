"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { Button } from "@/components/ui/button";
import { ArrowLeftCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  return (
    <main className="flex h-full w-full items-center justify-center">
      <Button
        onClick={() => router.back()}
        className="absolute left-4 top-4"
        variant="ghost"
      >
        <ArrowLeftCircle className="h-8 w-8" />
      </Button>
      <CardWrapper />
    </main>
  );
}
