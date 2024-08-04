import axios from "axios";
import GridPostsList from "../components/GridPostsList";
import ProfileLayout from "../components/ProfileLayout";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
const token = Cookies.get("userToken") || "";

const ProfileSaved = () => {
  const [allSavedPosts, setAllSavedPosts] = useState(null);

  const getSavedPosts = async () => {
    try {
      const res = await axios(
        "https://abdulkareem3.pythonanywhere.com/social/posts/",
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      console.log(res);
      setAllSavedPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSavedPosts();
  }, []);
  return (
    <div className="px-[60px] py-[40px]">
      <ProfileLayout>
        <GridPostsList posts={allSavedPosts} />
      </ProfileLayout>
    </div>
  );
};

export default ProfileSaved;
