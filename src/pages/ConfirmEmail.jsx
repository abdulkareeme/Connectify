/* eslint-disable react/no-unescaped-entities */
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import VerificationCodeInput from "../components/VerificationCodeInput";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { postToAPI } from "../api/dealWithAPI";

const ConfirmEmail = () => {
  const storedUser = Cookies.get("userInputValue");
  const userInputValue = storedUser ? JSON.parse(storedUser) : null;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resendCode = async () => {
    setIsSubmitting(1);
    try {
      await postToAPI("user/resend-email-code", {
        email: userInputValue.email,
      });
      toast.success("Verification code has been successfully resent", {
        duration: 3000,
        position: "top-center",
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      });
    } catch (err) {
      console.log(err);
      setIsSubmitting(0);
    } finally {
      setIsSubmitting(0);
    }
  };

  return (
    <section className="w-screen h-screen flex justify-center items-center">
      <Toaster />
      <div className="container mx-auto w-fit flex flex-col gap-2">
        <h1 className="w-fit text-center">Please confirm your email address</h1>
        <h2 className="text-xl mx-auto w-fit">
          Thank you for signing up on our website
        </h2>
        <p className="text-[15px] mx-auto w-fit">
          Please check your inbox and find your email that contains the
          verification code
        </p>
        <VerificationCodeInput />
        <div className="flex gap-1">
          <span>Haven't received the verification code yet?</span>
          <div className="flex gap-4 items-center">
            {!isSubmitting ? (
              <Link onClick={() => (!isSubmitting ? resendCode() : null)}>
                Resend
              </Link>
            ) : (
              <span className="loading loading-spinner loading-md"></span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConfirmEmail;
