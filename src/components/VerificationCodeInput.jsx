import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { postToAPI } from "../api/dealWithAPI";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const VerificationCodeInput = () => {
  const storedUser = Cookies.get("userInputValue");
  const userInputValue = storedUser ? JSON.parse(storedUser) : null;
  const forgetPassEmail = Cookies.get("forgetPassEmail");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const history = useNavigate();
  const { pathname } = useLocation();

  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const checkFields = () => {
    for (let i = 0; i < inputRefs.length; i++) {
      if (inputRefs[i].current.value === "") return false;
    }
    return true;
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "ArrowLeft") {
      // Move focus to the previous input field when ArrowLeft is pressed
      if (index > 0) {
        inputRefs[index - 1].current.focus();
      }
    } else if (e.key === "ArrowRight") {
      // Move focus to the next input field when ArrowRight is pressed
      if (index < inputRefs.length - 1) {
        inputRefs[index + 1].current.focus();
      }
    } else if (e.key === "Backspace") {
      inputRefs[index].current.value = "";
      if (index > 0) {
        inputRefs[index - 1].current.focus();
      }
    }
  };

  const handleCodeChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]*$/.test(value)) inputRefs[index].current.value = "";
    else {
      if (value.length === 1) {
        if (index < inputRefs.length - 1) {
          // Move focus to the next input field when a character is entered
          inputRefs[index + 1].current.focus();
        }
      }
    }
  };

  const getCode = () => {
    let code = [];
    for (let i = 0; i < inputRefs.length; i++) {
      code.push(inputRefs[i].current.value);
    }
    return code.join("");
  };

  let inputFields = [];
  for (let i = 0; i < 6; i++) {
    inputFields.push(
      <input
        key={i}
        type="text"
        className="w-12 h-12 md:w-10 md:h-10 border border-gray-300 rounded-md text-center text-lg focus:outline-none focus:border-blue-500"
        maxLength="1"
        onChange={(e) => handleCodeChange(e, i)}
        onKeyDown={(e) => handleKeyDown(e, i)}
        ref={inputRefs[i]}
      />
    );
  }

  const handleSubmit = async (e) => {
    const code = getCode();
    e.preventDefault();
    if (checkFields()) {
      const confirmData = {
        confirmation_code: code,
        email: userInputValue.email,
      };
      setIsSubmitting(1);
      try {
        const res = await postToAPI("user/confirm-email", confirmData);
        toast.success("Verification code is right!");
        console.log(res);
        Cookies.set("userTotalInfo", JSON.stringify(res?.user_info), {
          expires: 30,
        });
        Cookies.set(
          "userToken",
          "Token " + res?.token[0],
          {
            expires: 30,
          },
          { secure: true }
        );
        history("/");
      } catch (err) {
        console.log(err);
        if (err?.response.data.detail) {
          toast.error(err.response.data.detail);
        }
      } finally {
        setIsSubmitting(0);
      }
    } else {
      alert("Wrong fill!");
    }
  };

  const handleSubmitForForgetPassword = async (e) => {
    e.preventDefault();
    const code = getCode();
    if (checkFields()) {
      console.log(code);
      const confirmData = {
        forget_password_code: code,
        email: forgetPassEmail,
      };
      toast("Please wait", {
        duration: 3000,
        position: "top-center",
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      });
      setIsSubmitting(true);
      try {
        await postToAPI("user/check-forget_password-code", confirmData);
        toast.success(
          "The verification code is right, please wait until move to reset password page",
          {
            duration: 5000,
            position: "top-center",
            ariaProps: {
              role: "status",
              "aria-live": "polite",
            },
          }
        );
        Cookies.set("forgetPassCode", code, { expires: 30 });
        setTimeout(() => {
          history("/forget_password/reset");
        }, 1000);
      } catch (err) {
        console.log(err);
        if (err.response?.data?.detail) {
          toast.error(err.response?.data?.detail);
        }
      } finally {
        setIsSubmitting(0);
      }
    } else {
      alert("Wrong fill!");
    }
  };

  useEffect(() => {
    inputRefs[0].current.focus();
  }, []);
  return (
    <form
      className="mt-5 mb-5 flex flex-col gap-5"
      onSubmit={(e) => {
        pathname.includes("forget_password")
          ? handleSubmitForForgetPassword(e)
          : handleSubmit(e);
      }}
    >
      <div className="flex justify-center items-center gap-3">
        {inputFields}
      </div>
      {!isSubmitting ? (
        <button
          hidden={isSubmitting}
          type="submit"
          className="px-4 py-2 rounded-md text-white bg-blue-500 w-40 mx-auto"
        >
          Send
        </button>
      ) : (
        <button
          className={`flex items-center justify-center px-4 py-2 rounded-md text-white bg-blue-500 w-40 mx-auto disable`}
          disabled={!isSubmitting}
        >
          <span className="loading loading-spinner loading-md"></span>
        </button>
      )}
    </form>
  );
};

export default VerificationCodeInput;
