import { FaExclamationTriangle } from "react-icons/fa";

import { CardWrapper } from "@/components/auth/card-wrapper";

export default function AuthErrorPage() {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex w-full justify-center">
        <FaExclamationTriangle className="h-10 w-10 text-rose-500" />
      </div>
    </CardWrapper>
  );
}
