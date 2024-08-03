import { useState } from "react";
import { profileData } from "../Data/PostsData";
import { FaHeart } from "react-icons/fa6";

const GridPostsList = () => {
  const [isHovering, setIsHovering] = useState(0);
  return (
    <div className="posts grid grid-cols-3 gap-1">
      {profileData.map((post, index) => (
        <div
          key={index}
          // onMouseOver={() => setIsHovering(1)}
          // onMouseLeave={() => setIsHovering(0)}
          className="relative h-[300px] transition hover:before:bg-black before:w-full before:h-full before:top-0 before:left-0 hover:opacity-60"
        >
          {isHovering ? (
            <span className="text-white absolute left-1/2 top-1/2 flex items-center gap-2">
              <FaHeart />
              {post.likes}
            </span>
          ) : null}

          <img src={post.img} className="w-full h-full object-cover" alt="" />
        </div>
      ))}
    </div>
  );
};

export default GridPostsList;
