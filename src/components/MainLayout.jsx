import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const MainLayout = () => {
  return (
    <div className={`App pr-5 ml-[270px] flex justify-between`}>
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
