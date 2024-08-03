/* eslint-disable react/prop-types */
import "./Post.css";
import { FaRegComment } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa";
import ProfileImage from "../../assets/omar.jpg";
import { useState } from "react";
import CommentsModal from "../CommentsModal";
import axios from "axios";
import Cookies from "js-cookie";
import { isLikedByMe, isSavedByMe } from "../../utils";

const token = Cookies.get("userToken") || "";
const storedUser = Cookies.get("userTotalInfo") || "";
const userInfo = JSON.parse(storedUser);

const Post = ({ data, allSavedPostsId }) => {
  const [isLiked, setIsLiked] = useState(
    isLikedByMe(data.likes, userInfo.username)
  );
  const [likes, setLikes] = useState(data.likes.length);
  const [commentNumber, setCommentsNumber] = useState(data.comments.length);
  const [isSaved, setIsSaved] = useState(isSavedByMe(allSavedPostsId, data.id));

  const handleLike = async (id) => {
    try {
      setIsLiked(true);
      setLikes((likes) => likes + 1);
      const res = await axios.post(
        "https://abdulkareem3.pythonanywhere.com/social/likes/",
        {
          post: id,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      console.log(res);
    } catch (err) {
      console.log(err);
      setIsLiked(false);
      setLikes((likes) => likes - 1);
    }
  };
  const handledisLike = async (id) => {
    try {
      setIsLiked(false);
      setLikes((likes) => likes - 1);
      const res = await axios.post(
        "https://abdulkareem3.pythonanywhere.com/social/likes/",
        {
          post: id,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      console.log(res);
    } catch (err) {
      console.log(err);
      setIsLiked(true);
      setLikes((likes) => likes + 1);
    }
  };
  const handleSave = async (id) => {
    try {
      setIsSaved(true);
      const res = await axios.post(
        "https://abdulkareem3.pythonanywhere.com/social/save-post/",
        {
          post_id: id,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      console.log(res);
    } catch (err) {
      console.log(err);
      setIsSaved(false);
    }
  };
  const handleUnSave = async (id) => {
    try {
      setIsSaved(false);
      const res = await axios.delete(
        "https://abdulkareem3.pythonanywhere.com/social/unsave-post/",
        {
          post_id: id,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      console.log(res);
    } catch (err) {
      console.log(err);
      setIsSaved(true);
    }
  };

  const openCommentsModal = (id) => {
    document.getElementById(`my_modal_${id}`).showModal();
  };

  return (
    <div className="Post">
      <div className="userinfo flex items-center gap-3 p-1 text-[15px]">
        <img
          src={ProfileImage}
          className=" w-[40px] h-[40px] rounded-full"
          alt=""
        />
        {data.user}
      </div>
      <img src={data?.img} alt="" />

      <div className="postReact flex justify-between">
        <div className="flex gap-4">
          {isLiked ? (
            <FaHeart
              onClick={() => handledisLike(data.id)}
              className="text-[25px] text-red-600"
            />
          ) : (
            <FaRegHeart
              onClick={() => handleLike(data.id)}
              className="text-[25px] transtition hover:opacity-70"
            />
          )}
          <span className="translate-x-[-1]">
            <FaRegComment
              onClick={() => openCommentsModal(data.id)}
              className="text-[25px] transtition hover:opacity-70"
            />
          </span>
        </div>
        {isSaved ? (
          <FaBookmark
            onClick={() => handleUnSave(data.id)}
            className="text-[25px]"
          />
        ) : (
          <FaRegBookmark
            onClick={() => handleSave(data.id)}
            className="text-[25px] transtition hover:opacity-70"
          />
        )}
      </div>
      <div className="detail flex flex-col gap-1">
        <span className="text-black text-[12px]">{likes} likes</span>
        <div className="detail">
          <span>
            <b>{data.user}</b>
          </span>
          <span> {data.content}</span>
        </div>
        <div
          onClick={() => openCommentsModal(data.id)}
          className="text-[14px] text-gray-500 cursor-pointer"
        >
          View all {commentNumber} comments
        </div>
        <div className="text-[12px]">12 April{data.postDate}</div>
      </div>
      <CommentsModal
        id={data?.id}
        commentsData={data?.comments}
        setCommentsNumber={setCommentsNumber}
      />
    </div>
  );
};

export default Post;
