import useSWR from "swr";
import PostsHeading from "./PostsHeading";
import ProfileDetails from "./ProfileDetails";
import axios from "axios";
import { useParams } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProfileLayout = ({ children }) => {
  const { username } = useParams();

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
  const { data: userProfileData } = useSWR(
    `${username}/user_info`,
    getUserInfo
  );
  return (
    <div>
      <div className="flex flex-col gap-20 w-full">
        <ProfileDetails userProfileData={userProfileData} />
        <PostsHeading userProfileData={userProfileData} />
      </div>
      {children}
    </div>
  );
};

export default ProfileLayout;
