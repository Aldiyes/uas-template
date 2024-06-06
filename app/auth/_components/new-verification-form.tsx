"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormError } from "@/components/auth/form-error";
import { FormSuccess } from "@/components/auth/form-success";
import { newVerification } from "@/lib/actions/auth-action";

export const NewVerificationForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Missing Token");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      {!error && !success && (
        <div className="flex w-full items-center justify-center">
          <div className="dark:hidden">
            <BeatLoader />
          </div>
          <div className="hidden dark:block">
            <BeatLoader color="white" />
          </div>
        </div>
      )}
      {!success && <FormError message={error} />}
      <FormSuccess message={success} />
    </CardWrapper>
  );
};
