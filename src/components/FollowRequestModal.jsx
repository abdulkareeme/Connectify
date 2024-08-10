import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
const token = Cookies.get("userToken") || "";

const FollowRequestModal = () => {
  const [allUsers, setAllUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const getFollowRequests = async () => {
    try {
      const res = await axios(
        `https://abdulkareem3.pythonanywhere.com/social/follow-requests/`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      console.log("getFollowRequests", res.data);
      setAllUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const approveRequest = async (username) => {
    try {
        setIsLoading(true);
      const res = await axios.post(
        `https://abdulkareem3.pythonanywhere.com/social/approve-follow/${username}/`,
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
      setIsLoading(false);
    }
  };

  const cancelRequest = async (username) => {
    try {
        setIsLoading(true);
      const res = await axios.delete(
        `https://abdulkareem3.pythonanywhere.com/social/approve-follow/${username}/`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      console.log(res);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFollowRequests();
  }, []);

  return (
    <dialog id="my_modal_8899" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>

        <h3 className="font-bold text-lg mb-3 mx-auto w-fit">
          Follow Requests
        </h3>
        <div className="flex flex-col gap-4">
          {allUsers?.map((user, index) => (
            <div
              key={index}
              className="flex justify-between items-center w-full"
            >
              <div className="flex gap-2 items-center">
                <img
                  className="w-[40px] h-[40px] rounded-full object-cover cursor-pointer"
                  src={user.follower?.photo}
                  alt=""
                />
                <span className="text-[15px] cursor-pointer">
                  {user?.follower.username}
                </span>
              </div>
              <div className="flex items-center gap-2">
              <button
                onClick={()=> approveRequest(user?.follower.username)}
                className="bg-blue-500 text-white hover:bg-blue-700 px-4 py-1 rounded transition"
              >
                {isLoading ? <span className="loading loading-spinner loading-md"></span> : "Confirm"}
              </button>
              <button
                onClick={()=> cancelRequest(user?.follower.username)}
                className="bg-gray-400 text-white px-4 py-1 rounded transition"
              >
                {isLoading ? <span className="loading loading-spinner loading-md"></span> : "Delete"}
              </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default FollowRequestModal;
