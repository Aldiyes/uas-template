"use client";

import { Social } from "@/components/auth/social";
import { Logo } from "@/components/logo";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const CardWrapper = () => {
  return (
    <Card className="w-[400px] bg-neutral-100 shadow-md dark:bg-neutral-900">
      <CardHeader className="flex w-full flex-col items-center justify-center gap-y-4">
        <Logo />
        <p className="text-sm text-muted-foreground">Log in to your account</p>
      </CardHeader>
      <CardContent>
        <Social />
      </CardContent>
    </Card>
  );
};
