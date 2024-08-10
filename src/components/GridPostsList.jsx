/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import PostCard from "./PostCard";
import axios from "axios";
import useSWR from "swr";

const GridPostsList = ({ posts, isLoading }) => {
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
    <>
      {isLoading && (
        <div className="w-full h-[200px] flex items-center justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
      {posts && (
        <div className="posts grid grid-cols-3 gap-1">
          {posts?.map((post, index) => (
            <PostCard
              key={index}
              data={post}
              likes={post.likes}
              comments={post.comments}
              postImg={post.image}
            />
          ))}
        </div>
      )}
      {posts?.length == 0 && !userProfileData?.is_private && (
        <div className="w-full h-[150px]  flex items-center">
          <h2 className="text-[25px] w-fit text-center mx-auto">
            There is no posts!
          </h2>
        </div>
      )}
    </>
  );
};

export default GridPostsList;
