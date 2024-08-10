/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import UserCard from "./UserCard";
import { useParams } from "react-router-dom";
import UserSkeleton from "./UserSkeleton";
const FollowersModal = () => {
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

  useEffect(() => {
    getFollowers();
  }, []);
  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box bg-white">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>

        <h3 className="font-bold text-lg mb-3 mx-auto w-fit">Followers</h3>
        <div className="flex flex-col gap-4">
          {!allUsers &&
            Array.from({ length: 3 }).map((_, index) => (
              <UserSkeleton key={index} />
            ))}
          {allUsers?.map((user, index) => (
            <UserCard key={index} user={user} followingUser={allUsers} />
          ))}
        </div>
      </div>
    </dialog>
  );
};

export default FollowersModal;
