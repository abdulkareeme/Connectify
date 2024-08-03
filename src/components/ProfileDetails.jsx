import ProfileImage from "../assets/omar.jpg";
import UsersModal from "./UsersModal";
import Cookies from "js-cookie";

const ProfileDetails = () => {
  const storedUser = Cookies.get("userTotalInfo");
  // const userToken = Cookies.get("userToken");
  const userInfo = storedUser ? JSON.parse(storedUser) : null;
  const getUserInfo = () => {};
  return (
    <div className="flex flex-wrap justify-center gap-20">
      <img
        src={userInfo?.photo}
        className="w-[150px] h-[150px] object-cover rounded-full"
        alt=""
      />
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-[25px]">omarhlal00</span>
          <button className="bg-gray-500 rounded py-1 px-2 text-white font-bold">
            Edit Profile
          </button>
        </div>
        <div className="text-[15px] text-black font-bold flex gap-5 items-center">
          <span>4 posts</span>
          <span
            onClick={() => document.getElementById("my_modal_1").showModal()}
            className="cursor-pointer"
          >
            398 followers
          </span>
          <span className="cursor-pointer">214 following</span>
        </div>
        {/* Name */}
        <span className="text-[16px] font-bold text-black">Omar Helal</span>
        {/* desc */}
        <p className="text-black font-bold text-[14px]">
          Hi I am omar Helal <br /> from Syria,latakia
        </p>
        {/* followed by */}
        <div className="text-[13px] text-gray-500">Followed by</div>
      </div>
      <UsersModal type={"Followers"} />
    </div>
  );
};

export default ProfileDetails;
