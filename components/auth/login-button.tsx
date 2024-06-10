"use client";

import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { CardWrapper } from "./card-wrapper";

type Props = {
  children: React.ReactNode;
  mode: "modal" | "redirect";
};

export const LoginButton = ({ children, mode = "modal" }: Props) => {
  const router = useRouter();
  const onRedirect = () => {
    router.push("/auth/login");
  };
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
        <CardWrapper />
      </DialogContent>
    </Dialog>
  );
};
