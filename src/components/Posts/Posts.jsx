import "./Posts.css";
import Post from "../Post/Post";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import PostSkeleton from "../PostSkeleton";
const token = Cookies.get("userToken") || "";

const Posts = () => {
  const [allPosts, setAllPosts] = useState(null);
  const [allSavedPostsId, setAllSavedPostsId] = useState(null);

  const getAllPosts = async () => {
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
      setAllPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getAllSavedPosts = async () => {
    try {
      const res = await axios(
        "https://abdulkareem3.pythonanywhere.com/social/saved-posts/",
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      console.log(res);
      const postIds = res.data.map((post) => post.id);
      setAllSavedPostsId(postIds);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllPosts();
    getAllSavedPosts();
  }, []);
  return (
    <div className="Posts">
      {!allPosts &&
        Array.from({ length: 4 }).map((_, index) => (
          <>
            <PostSkeleton key={index} />
            {index < 3 && <hr className="bg-[#efefef]" />}
          </>
        ))}
      {allPosts &&
        allSavedPostsId &&
        allPosts?.map((post, index) => {
          return (
            <>
              <Post key={index} data={post} allSavedPostsId={allSavedPostsId} />
              {index < allPosts.length - 1 && <hr className="bg-[#efefef]" />}
            </>
          );
        })}
    </div>
  );
};

export default Posts;
