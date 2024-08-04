/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaHeart } from "react-icons/fa6";
import { FaComment } from "react-icons/fa6";
import PostModal from "./PostModal";

const PostCard = ({ data, postImg, likes, comments }) => {
  const [isHovering, setIsHovering] = useState(0);
  const openPostModal = (id) => {
    document.getElementById(`my_modal_${id}_${id}_${id}`).showModal();
  };

  return (
    <div
      onMouseOver={() => setIsHovering(1)}
      onMouseLeave={() => setIsHovering(0)}
      onClick={() => openPostModal(data?.id)}
      className="relative h-[300px] transition hover:before:bg-black before:w-full before:h-full before:top-0 before:left-0 hover:opacity-60 cursor-pointer"
    >
      {isHovering ? (
        <div className="text-white absolute left-[35%] top-1/2 flex items-center gap-8">
          <span className="flex items-center gap-2 text-[20px]">
            <FaHeart />
            {likes.length}
          </span>
          <span className="flex items-center gap-2 text-[20px]">
            <FaComment />
            {comments.length}
          </span>
        </div>
      ) : null}

      <img
        src={postImg ? postImg : "/src/assets/flowers.jpg"}
        className="w-full h-full object-cover"
        alt=""
      />
      <PostModal data={data} id={data.id} />
    </div>
  );
};

export default PostCard;
