"use client";

import { BackButton } from "@/components/auth/back-button";
import { Social } from "@/components/auth/social";
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
  showSocial?: boolean;
};

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: Props) => {
  return (
    <Card className="w-[400px] bg-neutral-100 shadow-md dark:bg-neutral-900">
      <CardHeader className="flex w-full flex-col items-center justify-center gap-y-4">
        <Logo />
        <p className="text-sm text-muted-foreground">{headerLabel}</p>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};
