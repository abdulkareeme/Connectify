/* eslint-disable react/prop-types */
import Cookies from "js-cookie";
import axios from "axios";
import UserCard from "./UserCard";
import { useParams } from "react-router-dom";
import UserSkeleton from "./Skeleton/UserSkeleton";
import useSWR from "swr";
const FollowingModal = () => {
  const { username } = useParams();

  const token = Cookies.get("userToken") || "";

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
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const { data: allUsers } = useSWR(`${username}/following`, getFollowing);
  return (
    <dialog id="my_modal_2" className="modal">
      <div className="modal-box bg-white">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>

        <h3 className="font-bold text-lg mb-3 mx-auto w-fit">Following</h3>
        <div className="flex flex-col gap-4">
          {!allUsers &&
            Array.from({ length: 3 }).map((_, index) => (
              <UserSkeleton key={index} />
            ))}
          {allUsers?.map((user, index) => (
            <UserCard key={index} user={user} />
          ))}
        </div>
      </div>
    </dialog>
  );
};

export default FollowingModal;
