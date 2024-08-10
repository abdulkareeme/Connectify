import { Link } from "react-router-dom";
import "./RightSide.css";
import { useUserContext } from "../../Context/UserContextProvider";
import UserCard from "../UserCard";
import axios from "axios";
import useSWR from "swr";
import Cookies from "js-cookie";

const RightSide = () => {
  const token = Cookies.get("userToken") || "";
  const { user: userInfo } = useUserContext();

  const getAllUsers = async () => {
    try {
      const res = await axios(
        "https://abdulkareem3.pythonanywhere.com/user/users",
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const getFollowingUsers = async () => {
    try {
      const res = await axios(
        `https://abdulkareem3.pythonanywhere.com/social/following/${userInfo.username}/`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const { data: allUser } = useSWR(`/all_users`, getAllUsers);
  const { data: followingUsers } = useSWR(
    `${userInfo.username}/user_following`,
    getFollowingUsers
  );

  return (
    <div className="RightSide w-[350px] py-4 px-6">
      <div className="userinfo flex items-center gap-3 p-1 text-[14px]">
        <Link to={`/${userInfo.username}`}>
          <img
            src={userInfo.photo}
            className=" w-[50px] h-[50px] rounded-full"
            alt=""
          />
        </Link>
        <div className="flex flex-col">
          <Link to={`/${userInfo.username}`} className="text-black">
            {userInfo.username}
          </Link>
          <span className="text-gray-600">
            {userInfo.first_name} {userInfo.last_name}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <h2 className="text-[17px] w-max">Suggested for you</h2>
          <Link
            className="text-black text-[15px] hover:text-gray-700 transition"
            to=""
          >
            See All
          </Link>
        </div>
        <div className="flex flex-col gap-1">
          {allUser?.map((user, index) => (
            <>
              {user.username !== userInfo.username && index < 5 ? (
                <UserCard
                  key={index}
                  user={user}
                  followingUser={followingUsers}
                  type="suggestUser"
                />
              ) : null}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSide;
