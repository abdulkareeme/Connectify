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
import { getRelativeTime, isLikedByMe, isSavedByMe } from "../../utils";
import LikesModal from "../LikesModal";

const token = Cookies.get("userToken") || "";
const storedUser = Cookies.get("userTotalInfo") || "";
const userInfo = JSON.parse(storedUser);

const Post = ({ data, allSavedPostsId }) => {
  const [isLiked, setIsLiked] = useState(
    isLikedByMe(data.likes, userInfo.username)
  );
  console.log("PostData", data);
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
          data: {
            post_id: id,
          },
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
  const openLikesModal = (id) => {
    document.getElementById(`my_modal_${id}_${id}`).showModal();
  };

  const postDate = getRelativeTime(data.created_at);

  return (
    <div className="Post">
      <div className="userinfo flex items-center gap-3 p-1 text-[14px]">
        <img
          src={ProfileImage}
          className=" w-[40px] h-[40px] rounded-full"
          alt=""
        />
        <div className="flex gap-[3px] items-center">
          <span>{data.user}</span>
          <span className="text-[#737373] text-[11px]">•</span>
          <span className="text-[#737373]">{postDate}</span>
        </div>
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
        <span
          onClick={() => openLikesModal(data.id)}
          className="text-black text-[12px] font-bold cursor-pointer"
        >
          {likes} likes
        </span>
        <div className="flex gap-1 items-center">
          <span>
            <b>{data.user}</b>
          </span>
          <span>{data.content}</span>
        </div>
        <div
          onClick={() => openCommentsModal(data.id)}
          className="text-[14px] text-gray-500 cursor-pointer"
        >
          View all {commentNumber} comments
        </div>
      </div>
      <CommentsModal
        id={data?.id}
        commentsData={data?.comments}
        setCommentsNumber={setCommentsNumber}
      />
      <LikesModal id={data?.id} />
    </div>
  );
};

export default Post;
