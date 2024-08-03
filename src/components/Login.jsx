/* eslint-disable react/no-unescaped-entities */
import { ErrorMessage, Formik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { postToAPI } from "../api/dealWithAPI";
import { useNavigate } from "react-router-dom/dist";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";

const LoginInSchema = Yup.object().shape({
  email: Yup.string("")
    .email("Enter a valid email")
    .required("This Field is required"),
  password: Yup.string("")
    .required("This Field is required")
    .min(8, "password should be atleast 8 character")
    .matches(
      /^[A-Za-z\d@$!%*#?&]{8,60}$/,
      "password should have 8 to 60 English character"
    ),
});

const Login = () => {
  const initialValues = { email: "", password: "" };
  const [isSubmitting, setIsSubmitting] = useState(0);
  const history = useNavigate();
  const submitHandler = async (values) => {
    try {
      setIsSubmitting(1);
      const res = await postToAPI("user/login/", values);
      Cookies.set(
        "userInputValue",
        JSON.stringify({ email: values.email, password: values.password }),
        {
          expires: 1,
        }
      );
      console.log(res);
      history("/confirm_email");
    } catch (err) {
      err?.response?.data?.email && toast.error(err?.response?.data?.email);
      err?.response?.data?.password &&
        toast.error(err?.response?.data?.password);
      err?.response?.data?.detail && toast.error(err?.response?.data?.detail);
      console.log(err);
    } finally {
      setIsSubmitting(0);
    }
  };

  return (
    <div className="bg-white px-6 py-7 rounded">
      <Formik initialValues={initialValues} validationSchema={LoginInSchema}>
        {({ values, isValid, handleChange, handleBlur, errors, touched }) => (
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-4"
          >
            <Toaster />
            <h2 className="text-[20px] mx-auto mb-4">Log In</h2>

            <div className="flex justify-start flex-col gap-2">
              <input
                id="email"
                type="email"
                placeholder="Email"
                name="email"
                className={`${
                  touched.email && errors.email
                    ? "input-primary error"
                    : "input-primary"
                }`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <p className="text-[12px] text-red-700">
                <ErrorMessage name="email" />
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <input
                id="password"
                type="password"
                placeholder="Password"
                name="password"
                className={`${
                  touched.password && errors.password
                    ? "input-primary error"
                    : "input-primary"
                }`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              <p className="text-[12px] text-red-700">
                <ErrorMessage name="password" />
              </p>
            </div>
            {!isSubmitting ? (
              <button
                className={!isValid ? "btn-primary disable" : "btn-primary"}
                disabled={!isValid}
                onClick={() => submitHandler(values)}
              >
                Login
              </button>
            ) : (
              <button
                className={`btn-primary disable`}
                disabled={!isSubmitting}
              >
                <span className="loading loading-spinner loading-md"></span>
              </button>
            )}
            <div className="w-full flex flex-col justify-start gap-2">
              <Link className="text-[12px]" to={"/forget_password"}>
                Forget your password?
              </Link>
              <span className="text-[12px] text-black">
                Don't have an account <Link to={"/signup"}>Sign up</Link>
              </span>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
