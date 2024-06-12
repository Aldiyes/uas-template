"use client";

import { BackButton } from "@/components/auth/back-button";
import { Logo } from "@/components/logo";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

type Props = {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
};

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
}: Props) => {
  return (
    <Card className="w-[400px] bg-neutral-100 shadow-md dark:bg-neutral-900">
      <CardHeader className="flex w-full flex-col items-center justify-center gap-y-4">
        <Logo />
        <p className="text-sm text-muted-foreground">{headerLabel}</p>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};
