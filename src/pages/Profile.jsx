import ProfileLayout from "../components/ProfileLayout";
import GridPostsList from "../components/GridPostsList";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";

const token = Cookies.get("userToken") || "";

const Profile = () => {
  const { username } = useParams();
  const [allUserPosts, setAllUserPosts] = useState(null);

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
      setAllUserPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUserPosts();
  }, []);
  return (
    <div className="px-[60px] py-[40px] w-full">
      <ProfileLayout>
        <GridPostsList posts={allUserPosts} />
      </ProfileLayout>
    </div>
  );
};

export default Profile;
