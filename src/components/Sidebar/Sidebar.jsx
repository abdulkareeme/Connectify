import { Link, NavLink, useLocation } from "react-router-dom";
// import { sidebarLinks } from "../../constants";
import { FaRegHeart } from "react-icons/fa";
import { FaRegSquarePlus } from "react-icons/fa6";
import { GoHomeFill } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";
import ProfileImage from "../../assets/aroun-poul.jpg";
import Cookies from "js-cookie";

const storedUser = Cookies.get("userTotalInfo") || "";
const userInfo = JSON.parse(storedUser);

const Sidebar = () => {
  const { pathname } = useLocation();
  const sidebarLinks = [
    {
      icon: <GoHomeFill />,
      route: "/",
      label: "Home",
    },
    {
      icon: <FaSearch />,
      route: "/search",
      label: "Search",
    },
    {
      icon: <FaRegHeart />,
      route: "/all-users",
      label: "Notifications",
    },
    {
      icon: <FaBookmark />,
      route: "/saved",
      label: "Saved",
    },
    {
      icon: <FaRegSquarePlus />,
      route: "/create-post",
      label: "Create Post",
    },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen bg-white px-3 py-6 min-w-[270px]">
      <Link
        to="/"
        className="p-4 text-black font-normal italic text-[24px] hover:text-black"
      >
        Connectify
      </Link>
      <ul className="mt-4 flex flex-col gap-6">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.route;
          return (
            <li
              key={link.label}
              className={`font-bold text-[17px] ${
                isActive && "bg-primary-500"
              }`}
            >
              <NavLink
                to={link.route}
                className="text-black flex gap-4 items-center opacity-80 rounded transition p-4 hover:bg-gray-100 hover:text-black hover:opacity-100"
              >
                <span className="text-[25px]">{link.icon}</span>
                {link.label}
              </NavLink>
            </li>
          );
        })}
        <li className={`font-bold text-[17px]`}>
          <NavLink
            to={`/${userInfo.username}`}
            className="text-black flex gap-4 items-center opacity-80 rounded transition p-4 hover:bg-gray-100 hover:text-black hover:opacity-100"
          >
            <img
              src={ProfileImage}
              className=" w-[40px] h-[40px] rounded-full border border-solid border-black"
              alt=""
            />
            Profile
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
