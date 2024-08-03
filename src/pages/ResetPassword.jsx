import { ErrorMessage, Formik } from "formik";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import * as Yup from "yup";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom/dist";
import { postToAPI } from "../api/dealWithAPI";

const newPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required("This Field is required")
    .min(8, "password should be atleast 8 character")
    .matches(
      /^[A-Za-z\d@$!%*#?&]{8,60}$/,
      "password should have 8 to 60 English character"
    ),
  password2: Yup.string()
    .required("This Field is required")
    .oneOf([Yup.ref("password"), null], ""),
});
const ResetPassword = () => {
  // const [isPasswordVisible, setPasswordVisible] = useState(false);
  // const [isPasswordVisible2, setPasswordVisible2] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(0);
  const history = useNavigate();

  const initialValues = {
    password: "",
    password2: "",
  };

  const submitHandler = async (values) => {
    const code = Cookies.get("forgetPassCode");
    const email = Cookies.get("forgetPassEmail");
    const payload = {
      email: email,
      forget_password_code: code,
      new_password: values.password,
      new_password2: values.password2,
    };
    try {
      toast.loading("Please waiting", {
        duration: 3000,
        position: "top-center",
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      });
      setIsSubmitting(1);
      const res = await postToAPI("user/forget-password-reset", payload);
      Cookies.remove("forgetPassCode");
      Cookies.remove("forgetPassEmail");
      toast.success("Success!", {
        duration: 3000,
        position: "top-center",
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      });
      setTimeout(() => {
        history("/login");
      }, 2000);
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmitting(0);
    }
  };

  useEffect(() => {
    const code = Cookies.get("forgetPassCode");
    if (!code || code === "") history(-1);
  }, []);

  return (
    <section className="min-h-screen w-full mt-6 flex justify-center items-center">
      <Toaster />
      <Formik
        initialValues={initialValues}
        validationSchema={newPasswordSchema}
      >
        {({ values, isValid, handleChange, handleBlur, errors, touched }) => (
          <form
            data-aos="fade-up"
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-[30px] w-[600px] p-[50px] bg-white mt-[80px]"
          >
            <h1 className="w-max">Resign your Password</h1>
            {/* Password */}
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
            {/* Confirm Password  */}
            <div className="flex flex-col gap-2">
              <input
                id="password2"
                type="password"
                placeholder="Confirm Password"
                name="password2"
                className={`${
                  touched.password2 && errors.password2
                    ? "input-primary error"
                    : "input-primary"
                }`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password2}
              />
              <p className="text-[12px] text-red-700">
                <ErrorMessage name="password2" />
              </p>
            </div>
            {!isSubmitting ? (
              <button
                className={!isValid ? "btn-primary disable" : "btn-primary"}
                disabled={!isValid}
                onClick={() => submitHandler(values)}
              >
                Send
              </button>
            ) : (
              <button
                className={`btn-primary disable`}
                disabled={!isSubmitting}
              >
                <span className="loading loading-spinner loading-md"></span>
              </button>
            )}
          </form>
        )}
      </Formik>
    </section>
  );
};

export default ResetPassword;
