/* eslint-disable react/prop-types */
import Cookies from "js-cookie";
import UserCard from "./UserCard";
import axios from "axios";
import UserSkeleton from "./UserSkeleton";
import useSWR from "swr";

const LikesModal = ({ id, username }) => {
  const token = Cookies.get("userToken") || "";

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
      return res.data;
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
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  const { data: allLikes, isValidating } = useSWR(
    `${username}/${id}/post_likes`,
    getPostLikes
  );
  const { data: allUsers } = useSWR(`${username}/user_followers`, getFollowers);

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
          {isValidating &&
            Array.from({ length: 3 }).map((_, index) => (
              <UserSkeleton key={index} />
            ))}
          {!isValidating &&
            allUsers &&
            allLikes &&
            allLikes.map((like, index) => {
              return (
                <UserCard
                  key={index}
                  user={like.user}
                  followingUser={allUsers}
                />
              );
            })}
          {!isValidating && allLikes && allLikes.length == 0 && (
            <div className="w-full h-full flex justify-center items-center">
              <h2 className="text-[20px] w-max mx-auto text-center">
                No likes yet. Be the first to like this!
              </h2>
            </div>
          )}
        </div>
      </div>
    </dialog>
  );
};

export default LikesModal;
