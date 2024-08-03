import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import * as Yup from "yup";
import { ErrorMessage, Formik } from "formik";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom/dist";
import { postToAPI } from "../api/dealWithAPI";

const EmailSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter valid email")
    .required("This Field is required"),
});
const ForgetPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(0);
  const history = useNavigate();
  const initialValues = { email: "" };
  const submitHandler = async (values) => {
    try {
      toast("Please wait", {
        duration: 2000,
        position: "top-center",
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      });
      setIsSubmitting(1);
      await postToAPI(
        "user/send-forget-password-code",
        { email: values.email },
        null
      );
      setIsSubmitting(0);
      Cookies.set("forgetPassEmail", values.email, { expires: 30 });
      setTimeout(() => {
        history("/forget_password/confirm");
      }, 1000);
    } catch (err) {
      setIsSubmitting(0);
      console.log(err);
      toast.error(err.response?.data?.detail);
    }
  };
  return (
    <section className="flex w-full h-full justify-center items-center">
      <Toaster />
      <Formik initialValues={initialValues} validationSchema={EmailSchema}>
        {({ values, isValid, handleChange, handleBlur, errors, touched }) => (
          <form
            // data-aos="fade-up"
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-[30px] w-[600px] p-[50px] bg-white mt-[80px]"
          >
            <h1 className="text-2xl w-fit mx-auto">Do you forget password ?</h1>
            <h5 className="text-xl">Enter your email below</h5>
            <div className="email flex flex-col gap-2">
              <label className="text-[17px] font-semibold text-[#222] mb-[15px]">
                Email <span className="text-red-700">*</span>
              </label>
              <input
                className={`${
                  touched.email && errors.email ? "error" : "input-primary"
                }`}
                id="email"
                name="email"
                type="email"
                required
                placeholder=""
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <p className="text-[12px] text-red-700">
                <ErrorMessage name="email" />
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

export default ForgetPassword;
