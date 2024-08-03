import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom/dist";
import VerificationCodeInput from "../components/VerificationCodeInput";
import { postToAPI } from "../api/dealWithAPI";

const ConfirmForForgetPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [forgetPassEmail, setForgetPassEmail] = useState(false);
  const history = useNavigate();
  useEffect(() => {
    const email = Cookies.get("forgetPassEmail");
    if (!email || email === "") history(-1);
    setForgetPassEmail(email);
  }, []);

  const resendCode = () => {
    setIsSubmitting(true);
    toast("Please wait", {
      duration: 3000,
      position: "top-center",
      ariaProps: {
        role: "status",
        "aria-live": "polite",
      },
    });
    postToAPI("user/resend-email-code", { email: forgetPassEmail })
      .then((res) => {
        console.log(res);
        setIsSubmitting(false);
        toast.success("Resend Code successed!", {
          duration: 3000,
          position: "top-center",
          ariaProps: {
            role: "status",
            "aria-live": "polite",
          },
        });
      })
      .catch((err) => {
        console.log(err);
        setIsSubmitting(false);
      });
  };

  return (
    <section className="min-h-screen w-full mt-6 flex justify-center items-center">
      <Toaster />
      <div className="container w-fit flex flex-col gap-2">
        <h1 className="w-max mx-auto">Reset Password</h1>
        <p className="text-[15px] w-fit text-center mx-auto">
          {" "}
          Please check your inbox and find your email that contains the
          verification code
        </p>
        <VerificationCodeInput />
        <div className="flex gap-1">
          <span className="w-fit">
            Haven't received the verification code yet?
          </span>
          {/* <span
            className="cursor-pointer"
            onClick={() => (!isSubmitting ? resendCode() : null)}
          >
            Resend
          </span> */}
          {!isSubmitting ? (
            <Link onClick={() => (!isSubmitting ? resendCode() : null)}>
              Resend
            </Link>
          ) : (
            <span className="loading loading-spinner loading-md"></span>
          )}
        </div>
      </div>
    </section>
  );
};

export default ConfirmForForgetPassword;
