import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Profile from "./pages/Profile";
import Sidebar from "./components/Sidebar/Sidebar";
import ProfileSaved from "./pages/ProfileSaved";
import Home from "./pages/Home";
import LoginAuth from "./pages/LoginAuth";
import SignupAuth from "./pages/SignupAuth";
import ConfirmEmail from "./pages/ConfirmEmail";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import ConfirmForForgetPassword from "./pages/ConfirmForForgetPassword";
import UpdateProfile from "./pages/UpdateProfile";

function App() {
  const { pathname } = useLocation();
  console.log(pathname);
  // const checkPath = () => {
  //   if (pathname === "/login" || pathname === "/signup") return 0;
  //   else return 1;
  // };
  return (
    <div
      className={`App pr-5 ${
        pathname !== "/login" &&
        pathname !== "/signup" &&
        pathname !== "/forget_password" &&
        pathname !== "/forget_password/confirm" &&
        pathname !== "/forget_password/reset" &&
        pathname !== "/confirm_email"
          ? "ml-[270px]"
          : ""
      } flex justify-between`}
    >
      {/* <div className="blur" style={{ top: "-18%", right: "0" }}></div> */}
      {/* <div className="blur" style={{ top: "36%", left: "-8rem" }}></div> */}
      {pathname !== "/login" &&
      pathname !== "/signup" &&
      pathname !== "/forget_password" &&
      pathname !== "/forget_password/reset" &&
      pathname !== "/forget_password/confirm" &&
      pathname !== "/confirm_email" ? (
        <Sidebar />
      ) : null}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:username" element={<Profile />} />
        <Route path="/:username/saved" element={<ProfileSaved />} />
        <Route path="/login" element={<LoginAuth />} />
        <Route path="/signup" element={<SignupAuth />} />
        <Route path="/confirm_email" element={<ConfirmEmail />} />
        <Route path="/forget_password" element={<ForgetPassword />} />
        <Route
          path="/forget_password/confirm"
          element={<ConfirmForForgetPassword />}
        />
        <Route path="/forget_password/reset" element={<ResetPassword />} />
        <Route path="/user/update_profile" element={<UpdateProfile />} />
      </Routes>

      {/* <Profile /> */}
      {/* <Auth /> */}
    </div>
  );
}

export default App;
