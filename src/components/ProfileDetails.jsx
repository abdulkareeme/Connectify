import { useEffect, useState } from "react";
// import ProfileImage from "../assets/omar.jpg";
import UsersModal from "./UsersModal";
import Cookies from "js-cookie";
import axios from "axios";
import { useParams } from "react-router-dom";

const storedUser = Cookies.get("userTotalInfo") || "";
const userInfo = JSON.parse(storedUser);
const token = Cookies.get("userToken") || "";

const ProfileDetails = () => {
  const { username } = useParams();
  const isMyProfile = username === userInfo.username;
  const followHim = false;

  const [userProfileData, setUserProfileData] = useState(userInfo);
  const [userProfileFNumber, setUserProfileFNumber] = useState(null);
  const [userProfilePosts, setUserProfilePosts] = useState(null);

  const [modalType, setModalType] = useState("");

  const getUserInfo = async () => {
    try {
      const res = await axios(
        `https://abdulkareem3.pythonanywhere.com/user/user/${username}`
      );
      console.log(res);
      setUserProfileData(res.data);
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
      setUserProfileFNumber(res.data);
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
      setUserProfilePosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleShowModal = (type) => {
    setModalType(type);
    document.getElementById("my_modal_1").showModal();
  };

  useEffect(() => {
    !isMyProfile && getUserInfo();
    getUserFollowerAndFollowingNumber();
    getUserPosts();
  }, [username]);
  return (
    <div className="flex flex-wrap justify-center gap-20 w-full">
      <img
        src={userProfileData?.photo}
        className="w-[150px] h-[150px] object-cover rounded-full"
        alt=""
      />
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-[25px]">{userProfileData.username}</span>
          {isMyProfile ? (
            <button className="bg-[#efefef] rounded py-1 px-2 text-white font-bold ">
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                className={`${
                  followHim
                    ? "bg-[#efefef] text-black"
                    : "bg-blue-500 text-white"
                }  font-bold px-4 py-1 rounded transition`}
              >
                {followHim ? "Following" : "Follow"}
              </button>
              <button className="bg-[#efefef] text-black font-bold px-4 py-1 rounded transition">
                Message
              </button>
            </div>
          )}
        </div>
        <div className="text-[15px] text-black font-bold flex gap-5 items-center">
          <span>{userProfilePosts?.length} posts</span>
          <span
            onClick={() => handleShowModal("Followers")}
            className="cursor-pointer"
          >
            {userProfileFNumber?.followers_count} followers
          </span>
          <span
            onClick={() => handleShowModal("Following")}
            className="cursor-pointer"
          >
            {userProfileFNumber?.following_count} following
          </span>
        </div>
        {/* Name */}
        <span className="text-[16px] font-bold text-black">
          {userProfileData.first_name} {userProfileData.last_name}
        </span>
        {/* desc */}
        <p className="text-black font-bold text-[14px]">
          {userProfileData.bio
            ? userProfileData.bio
            : "Hi I am omar Helal from Syria,latakia"}
        </p>
        {/* followed by */}
        <div className="text-[13px] text-gray-500">Followed by</div>
      </div>
      <UsersModal type={modalType} />
    </div>
  );
};

export default ProfileDetails;
