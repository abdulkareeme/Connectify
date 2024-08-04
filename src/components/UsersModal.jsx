/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Pic from "../assets/aroun-poul.jpg";
import Cookies from "js-cookie";
import axios from "axios";
import UserCard from "./UserCard";
import { useParams } from "react-router-dom";
const UsersModal = ({ type }) => {
  const { username } = useParams();

  const token = Cookies.get("userToken") || "";
  const [allUsers, setAllUsers] = useState(null);

  const getFollowers = async () => {
    try {
      const res = await axios(
        `https://abdulkareem3.pythonanywhere.com/social/followers/${username}/`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      console.log(res);
      setAllUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getFollowing = async () => {
    try {
      const res = await axios(
        `https://abdulkareem3.pythonanywhere.com/social/following/${username}/`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      console.log(res);
      setAllUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    type === "Followers" && getFollowers();
    type === "Following" && getFollowing();
  }, [type]);
  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box bg-white">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>

        <h3 className="font-bold text-lg mb-3 mx-auto w-fit">{type}</h3>
        <div className="flex flex-col gap-4">
          {allUsers?.map((user, index) => (
            <UserCard key={index} user={user} followingUser={allUsers} />
          ))}
          {/* item */}
          <div className="flex justify-between">
            <div className="flex gap-2 justify-center items-center">
              <img
                className="w-[40px] h-[40px] rounded-full object-cover"
                src={Pic}
                alt=""
              />
              <span className="text-black font-bold">bassamhlal21</span>
            </div>
            <button className="btn-primary text-[15px] px-3 py-2">
              Following
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default UsersModal;
