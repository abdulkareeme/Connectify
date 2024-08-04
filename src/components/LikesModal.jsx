/* eslint-disable react/prop-types */
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { useParams } from "react-router-dom";

const LikesModal = ({ id }) => {
  const { username } = useParams();

  const token = Cookies.get("userToken") || "";
  const [allLikes, setAllLikes] = useState(null);
  const [allUsers, setAllUsers] = useState(null);

  const getPostLikes = async () => {
    try {
      const res = await axios(
        `https://abdulkareem3.pythonanywhere.com/social/posts/${id}/likes/`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      console.log(res);
      setAllLikes(res.data);
    } catch (err) {
      console.log(err);
    }
  };
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
    getPostLikes();
    getFollowers();
  }, []);

  return (
    <dialog id={`my_modal_${id}_${id}`} className="modal">
      <div className="modal-box bg-white">
        <form method="dialog">
          <button className="btn btn-sm btn-circle absolute right-2 top-2 bg-white hover:bg-inherit focus:bg-inherit">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg mb-3 mx-auto w-fit">Likes</h3>
        <div className="flex flex-col gap-4 overflow-y-auto h-52 px-3">
          {allLikes?.map((like, index) => {
            return (
              <UserCard key={index} user={like.user} followingUser={allUsers} />
            );
          })}
        </div>
      </div>
    </dialog>
  );
};

export default LikesModal;
