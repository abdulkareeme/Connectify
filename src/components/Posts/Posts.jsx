import "./Posts.css";
import Post from "../Post/Post";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
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
      {!allPosts && (
        <span className="loading loading-spinner loading-xl"></span>
      )}
      {allPosts &&
        allSavedPostsId &&
        allPosts?.map((post, id) => {
          return (
            <Post
              key={id}
              data={post}
              id={id}
              allSavedPostsId={allSavedPostsId}
            />
          );
        })}
    </div>
  );
};

export default Posts;
