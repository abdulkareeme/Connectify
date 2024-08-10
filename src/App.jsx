import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Profile from "./pages/Profile";
import ProfileSaved from "./pages/ProfileSaved";
import Home from "./pages/Home";
import LoginAuth from "./pages/LoginAuth";
import SignupAuth from "./pages/SignupAuth";
import ConfirmEmail from "./pages/ConfirmEmail";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import ConfirmForForgetPassword from "./pages/ConfirmForForgetPassword";
import MainLayout from "./components/MainLayout";
import EditMyProfile from "./pages/EditMyProfile";
import UserContextProvider from "./Context/UserContextProvider";
import Search from "./pages/Search";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginAuth />,
  },
  {
    path: "/signup",
    element: <SignupAuth />,
  },
  {
    path: "/confirm_email",
    element: <ConfirmEmail />,
  },
  {
    path: "/forget_password",
    element: <ForgetPassword />,
  },
  {
    path: "/forget_password/reset",
    element: <ResetPassword />,
  },
  {
    path: "/forget_password/confirm",
    element: <ConfirmForForgetPassword />,
  },
  {
    path: "/",
    element: <MainLayout />,
    errorElement: (
      <h1 className="text-black text-[30px]">Page Not Found 404</h1>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: ":username",
        element: <Profile />,
      },
      {
        path: ":username/saved",
        element: <ProfileSaved />,
      },
      {
        path: "my_profile/edit",
        element: <EditMyProfile />,
      },
      {
        path: "search",
        element: <Search />,
      },
    ],
  },
]);

function App() {
  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
}

export default App;
