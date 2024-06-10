import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { signIn } from "next-auth/react";

export const Social = () => {
  const onLogin = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <div className="flex w-full flex-col items-center gap-y-4">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onLogin("google")}
      >
        <span>Login with</span>
        <FcGoogle className="ml-2 h-5 w-5" />
      </Button>
      <div className="relative flex w-full items-center justify-center">
        <h1 className="z-10 bg-neutral-100 px-4 dark:bg-neutral-900">OR</h1>
        <div className="absolute w-full border-2 border-b dark:border-white" />
      </div>
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onLogin("github")}
      >
        <span>Login with</span>
        <FaGithub className="ml-2 h-5 w-5" />
      </Button>
    </div>
  );
};
