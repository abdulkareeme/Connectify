import axios from "axios";
import { isFollwingByMe } from "../utils";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

/* eslint-disable react/prop-types */

const UserCard = ({ user, followingUser }) => {
  const token = Cookies.get("userToken") || "";
  const storedUser = Cookies.get("userTotalInfo") || "";
  const userInfo = JSON.parse(storedUser);
  const [isFollowing, setIsFollowing] = useState(null);

  useEffect(() => {
    followingUser &&
      setIsFollowing(isFollwingByMe(followingUser, userInfo.username));
  }, [followingUser]);

  const followRequest = async (username) => {
    try {
      setIsFollowing(true);
      const res = await axios.post(
        `https://abdulkareem3.pythonanywhere.com/social/follow/${username}/`,
        null,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      console.log(res);
    } catch (err) {
      console.log(err);
      setIsFollowing(false);
    }
  };
  const unFollowRequest = async (username) => {
    try {
      setIsFollowing(false);
      const res = await axios.delete(
        `https://abdulkareem3.pythonanywhere.com/social/follow/${username}/`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      console.log(res);
    } catch (err) {
      console.log(err);
      setIsFollowing(true);
    }
  };
  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex gap-2 items-center">
        <img
          className="w-[40px] h-[40px] rounded-full object-cover cursor-pointer"
          src={user?.photo}
          alt=""
        />
        <span className="text-[15px] cursor-pointer">{user?.username}</span>
      </div>
      <button
        onClick={() =>
          isFollowing
            ? unFollowRequest(user?.username)
            : followRequest(user?.username)
        }
        className="bg-blue-500 text-white hover:bg-blue-700 px-4 py-1 rounded transition"
      >
        {isFollowing ? "Following" : "Follow"}
      </button>
    </div>
  );
};

export default UserCard;
