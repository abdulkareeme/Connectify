import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import SettingsModal from "./SettingsModal";
import FollowersModal from "./FollowersModal";
import FollowingModal from "./FollowingModal";
import useSWR from "swr";
import { useUserContext } from "../Context/UserContextProvider";

const token = Cookies.get("userToken") || "";

const ProfileDetails = () => {
  const { username } = useParams();
  const { user: userInfo } = useUserContext();

  const router = useNavigate();
  const isMyProfile = username === userInfo?.username;
  const [isFollowing, setIsFollowing] = useState(false);

  const getUserInfo = async () => {
    try {
      const res = await axios(
        `https://abdulkareem3.pythonanywhere.com/user/user/${username}`
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const getUserFollowerAndFollowingNumber = async () => {
    try {
      const res = await axios(
        `https://abdulkareem3.pythonanywhere.com/social/follow-count/${username}/`,
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

  const getUserPosts = async () => {
    try {
      const res = await axios(
        `https://abdulkareem3.pythonanywhere.com/social/posts/user/${username}/`,
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

  const showFollowersModal = () => {
    document.getElementById("my_modal_1").showModal();
  };
  const showFollowingModal = () => {
    document.getElementById("my_modal_2").showModal();
  };

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

  const openCreateSettingsModal = () => {
    document.getElementById(`my_modal_4477`).showModal();
  };

  const { data: userProfileData } = useSWR(
    `${username}/user_info`,
    getUserInfo
  );
  const { data: userProfilePosts } = useSWR(
    `${username}/user_posts`,
    getUserPosts
  );
  const { data: userProfileFNumber } = useSWR(
    `${username}/user_following&followers_number`,
    getUserFollowerAndFollowingNumber
  );

  return (
    <div className="flex flex-wrap justify-center gap-20 w-full">
      <img
        src={userProfileData?.photo}
        className="w-[150px] h-[150px] object-cover rounded-full"
        alt=""
      />
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-[25px]">{userProfileData?.username}</span>
          {isMyProfile ? (
            <>
              <button
                onClick={() => router("/my_profile/edit")}
                className="bg-[#F0F2F5] text-[#000000] font-semibold rounded py-1 px-4 "
              >
                Edit Profile
              </button>
              <button onClick={openCreateSettingsModal}>
                <svg
                  aria-label="Options"
                  className="x1lliihq x1n2onr6 x5n08af"
                  fill="currentColor"
                  height="24"
                  role="img"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <title>Options</title>
                  <circle
                    cx="12"
                    cy="12"
                    fill="none"
                    r="8.635"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></circle>
                  <path
                    d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096"
                    fill="none"
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>
                </svg>
              </button>
            </>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() =>
                  isFollowing
                    ? unFollowRequest(username)
                    : followRequest(username)
                }
                className={`${
                  isFollowing
                    ? "bg-[#efefef] text-black"
                    : "bg-blue-500 text-white"
                }  font-bold px-4 py-1 rounded transition`}
              >
                {isFollowing ? "Following" : "Follow"}
              </button>
              <button className="bg-[#efefef] text-black font-bold px-4 py-1 rounded transition">
                Message
              </button>
            </div>
          )}
        </div>
        <div className="text-[15px] text-black font-bold flex gap-5 items-center">
          <span>{userProfilePosts?.length} posts</span>
          <span onClick={() => showFollowersModal()} className="cursor-pointer">
            {userProfileFNumber?.followers_count} followers
          </span>
          <span onClick={() => showFollowingModal()} className="cursor-pointer">
            {userProfileFNumber?.following_count} following
          </span>
        </div>
        {/* Name */}
        <span className="text-[16px] font-bold text-black">
          {userProfileData?.first_name} {userProfileData?.last_name}
        </span>
        {/* desc */}
        <p className="text-black font-bold text-[14px]">
          {userProfileData?.bio
            ? userProfileData.bio
            : "Hi I am omar Helal from Syria,latakia"}
        </p>
        {/* followed by */}
        {/* <div className="text-[13px] text-gray-500">Followed by</div> */}
      </div>
      <FollowersModal />
      <FollowingModal />
      <SettingsModal />
    </div>
  );
};

export default ProfileDetails;
