import ProfileLayout from "../components/ProfileLayout";
import GridPostsList from "../components/GridPostsList";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import useSWR from "swr";

const token = Cookies.get("userToken") || "";

const Profile = () => {
  const { username } = useParams();

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

  const { data: allUserPosts } = useSWR(`${username}/posts`, getUserPosts);

  return (
    <div className="px-[60px] py-[40px] w-full">
      <ProfileLayout>
        <GridPostsList posts={allUserPosts} />
      </ProfileLayout>
    </div>
  );
};

export default Profile;
