import { Link } from "react-router-dom";
import "./RightSide.css";
import { useUserContext } from "../../Context/UserContextProvider";
const RightSide = () => {
  const { user } = useUserContext();

  return (
    <div className="RightSide w-[300px] py-4 px-6">
      <div className="userinfo flex items-center gap-3 p-1 text-[14px]">
        <Link to={`/${user.username}`}>
          <img
            src={user.photo}
            className=" w-[50px] h-[50px] rounded-full"
            alt=""
          />
        </Link>
        <div className="flex flex-col">
          <Link to={`/${user.username}`} className="text-black">
            {user.username}
          </Link>
          <span className="text-gray-600">
            {user.first_name} {user.last_name}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="text-[17px]">Suggested for you</h2>
        <div className="flex flex-col gap-1">
          <div className="userinfo flex items-center gap-3 p-1 text-[14px]">
            <Link to={`/${user.username}`}>
              <img
                src={user.photo}
                className=" w-[50px] h-[50px] rounded-full"
                alt=""
              />
            </Link>
            <div className="flex flex-col">
              <Link to={`/${user.username}`} className="text-black">
                {user.username}
              </Link>
              <span className="text-gray-600">
                {user.first_name} {user.last_name}
              </span>
            </div>
          </div>
          <div className="userinfo flex items-center gap-3 p-1 text-[14px]">
            <Link to={`/${user.username}`}>
              <img
                src={user.photo}
                className=" w-[50px] h-[50px] rounded-full"
                alt=""
              />
            </Link>
            <div className="flex flex-col">
              <Link to={`/${user.username}`} className="text-black">
                {user.username}
              </Link>
              <span className="text-gray-600">
                {user.first_name} {user.last_name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSide;
