/* eslint-disable react/no-unescaped-entities */
import { ErrorMessage, Formik } from "formik";
import { useState } from "react";
import DatePicker from "react-date-picker";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { postToAPI } from "../api/dealWithAPI";
import { useNavigate } from "react-router-dom/dist";
import { format } from "date-fns";
import Cookies from "js-cookie";

const SignInSchema = Yup.object().shape({
  first_name: Yup.string()
    .required("This Field is required")
    .min(3, "first name is too short")
    .max(15, "first name is too big"),
  last_name: Yup.string()
    .required("This Field is required")
    .min(3, "last name is too short")
    .max(15, "last name is too big"),
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
  password2: Yup.string("")
    .required("This Field is required")
    .oneOf([Yup.ref("password"), null], "")
    .required(""),
});

const Signup = () => {
  const initialValues = {
    first_name: "Omar",
    last_name: "Helal",
    email: "omarhlal00@gmail.com",
    password: "om7744&&",
    password2: "om7744&&",
  };
  const [isSubmitting, setIsSubmitting] = useState(0);
  const [gender, setGender] = useState("Male");
  const [birth_date, setBirth_date] = useState(new Date());
  const history = useNavigate();

  const submitHandler = async (values) => {
    const valuesToSend = {
      ...values,
      username: values.email.substring(0, values.email.indexOf("@")),
      gender,
      birth_date: format(birth_date, "yyyy-MM-dd"),
      is_private: false,
    };
    console.log(valuesToSend);

    try {
      setIsSubmitting(1);
      const res = await postToAPI("user/register/", valuesToSend);
      console.log(res);
      Cookies.set(
        "userInputValue",
        JSON.stringify({ email: values.email, password: values.password }),
        {
          expires: 1,
        }
      );
      history("/confirm_email");
    } catch (err) {
      console.log(err);
      if (err.response.data > 0) {
        console.log(err.response.data);
      }
    } finally {
      setIsSubmitting(0);
    }
  };

  return (
    <div className="bg-[#f1f1f1] text-[#222] px-6 py-7 rounded">
      <Formik initialValues={initialValues} validationSchema={SignInSchema}>
        {({ values, isValid, handleChange, handleBlur, errors, touched }) => (
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-4"
          >
            <h2 className="text-[20px] mx-auto mb-4">SignUp</h2>
            {/* Full Name */}
            <div className="flex items-center gap-4">
              <div className="flex justify-start flex-col gap-2">
                <input
                  id="first_name"
                  type="text"
                  placeholder="First Name"
                  name="first_name"
                  className={`${
                    touched.first_name && errors.first_name
                      ? "input-primary error"
                      : "input-primary"
                  }`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.first_name}
                />
                <p className="text-[12px] text-red-700">
                  <ErrorMessage name="first_name" />
                </p>
              </div>
              <div className="flex justify-start flex-col gap-2">
                <input
                  id="last_name"
                  type="text"
                  placeholder="Last Name"
                  name="last_name"
                  className={`${
                    touched.last_name && errors.last_name
                      ? "input-primary error"
                      : "input-primary"
                  }`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.last_name}
                />
                <p className="text-[12px] text-red-700">
                  <ErrorMessage name="last_name" />
                </p>
              </div>
            </div>
            {/* Email */}
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
            {/* Date */}
            <div>
              <DatePicker
                format="d/M/yyyy"
                onChange={setBirth_date}
                value={birth_date}
              />
            </div>
            {/* Gender */}
            <div
              className="flex gap-12 items-center"
              key="inline-radio-1"
              id="inline-radio-1"
            >
              <div className="flex items-center gap-3">
                <input
                  label="Male"
                  onChange={() => setGender("Male")}
                  type="radio"
                  name="radio-2"
                  className="radio radio-primary"
                  checked
                />
                <label htmlFor="">Male</label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  label="Female"
                  onChange={() => setGender("Female")}
                  type="radio"
                  name="radio-2"
                  className="radio radio-primary"
                />
                <label htmlFor="">Female</label>
              </div>
            </div>
            {!isSubmitting ? (
              <button
                className={!isValid ? "btn-primary disable" : "btn-primary"}
                disabled={!isValid}
                onClick={() => submitHandler(values)}
              >
                Create Account
              </button>
            ) : (
              <button
                className={`btn-primary disable`}
                disabled={!isSubmitting}
              >
                <span className="loading loading-spinner loading-md"></span>
              </button>
            )}

            <div className="w-full">
              <span className="text-[13px] text-black">
                Do you have an account ? <Link to={"/login"}>Login</Link>
              </span>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;
