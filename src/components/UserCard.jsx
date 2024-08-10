import axios from "axios";
import { isFollwingByMe } from "../utils";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useUserContext } from "../Context/UserContextProvider";
import useSWR from "swr";

/* eslint-disable react/prop-types */

const UserCard = ({ user, type }) => {
  const [isLoading, setIsLoading] = useState(false);

  const token = Cookies.get("userToken") || "";
  const { user: userInfo } = useUserContext();

  const getFollowing = async () => {
    try {
      const res = await axios(
        `https://abdulkareem3.pythonanywhere.com/social/following/${userInfo.username}/`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      console.log(res);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const { data: allUsers } = useSWR(
    `${userInfo.username}/following`,
    getFollowing
  );

  const [isFollowing, setIsFollowing] = useState(null);

  useEffect(() => {
    if (user && allUsers) {
      setIsFollowing(isFollwingByMe(allUsers, user));
    }
  }, [user, allUsers]);

  const followRequest = async (username) => {
    try {
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };
  const unFollowRequest = async (username) => {
    try {
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
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
      {type === "suggestUser" ? (
        <span
          onClick={() =>
            isFollowing
              ? unFollowRequest(user?.username)
              : followRequest(user?.username)
          }
          className="text-[13px] text-[#0095f6] cursor-pointer"
        >
          {isFollowing ? "Following" : "Follow"}
        </span>
      ) : (
        <button
          onClick={() =>
            isFollowing
              ? unFollowRequest(user?.username)
              : followRequest(user?.username)
          }
          disabled={isLoading}
          className="flex gap-2 bg-blue-500 text-white hover:bg-blue-700 px-4 py-1 rounded transition"
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : null}
          {isFollowing ? "Following" : "Follow"}
        </button>
      )}
    </div>
  );
};

export default UserCard;
