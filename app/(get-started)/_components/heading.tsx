"use client";

import { MdKeyboardDoubleArrowRight } from "react-icons/md";

import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";

export const Heading = () => {
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl font-bold sm:text-5xl md:text-6xl">
        Do More of the Things that Matter Most. Welcome to{" "}
        <span className="underline">NextTodos</span>
      </h1>
      <h3 className="font text-base font-medium sm:text-xl md:text-2xl">
        NextTodos help you develop positive habits and achieve goals
      </h3>
      <div>
        <LoginButton>
          <Button>
            Enter NextTodos
            <MdKeyboardDoubleArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </LoginButton>
      </div>
    </div>
  );
};
