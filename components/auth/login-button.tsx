"use client";

import { useRouter } from "next/navigation";

import { LoginForm } from "@/app/auth/_components/login-form";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

type Props = {
  children: React.ReactNode;
  isAuthenticated: boolean;
  mode: "modal" | "redirect";
};

export const LoginButton = ({
  children,
  mode = "modal",
  isAuthenticated,
}: Props) => {
  const router = useRouter();

  const onRedirect = () => {
    router.push("/auth/login");
  };

  const onAuthenticated = () => {
    router.push("/my-day");
  };

  if (isAuthenticated) {
    return (
      <span onClick={onAuthenticated} className="cursor-pointer">
        {children}
      </span>
    );
  }

  if (mode === "redirect") {
    return (
      <span onClick={onRedirect} className="cursor-pointer">
        {children}
      </span>
    );
  }
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-auto border-none bg-transparent p-0">
        <LoginForm />
      </DialogContent>
    </Dialog>
  );
};
