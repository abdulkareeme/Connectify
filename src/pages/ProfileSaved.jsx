import axios from "axios";
import GridPostsList from "../components/GridPostsList";
import ProfileLayout from "../components/ProfileLayout";
import Cookies from "js-cookie";
import useSWR from "swr";
const token = Cookies.get("userToken") || "";

const ProfileSaved = () => {
  const getSavedPosts = async () => {
    try {
      const res = await axios(
        "https://abdulkareem3.pythonanywhere.com/social/saved-posts/",
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

  const { data: allSavedPosts } = useSWR(`profile/saved_posts`, getSavedPosts);

  return (
    <div className="px-[60px] py-[40px] w-full">
      <ProfileLayout>
        <GridPostsList posts={allSavedPosts} />
      </ProfileLayout>
    </div>
  );
};

export default ProfileSaved;
