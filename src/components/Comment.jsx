/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import { getRelativeTime } from "../utils";

const Comment = ({ comment, user, commentTime }) => {
  const time = commentTime !== "now" && getRelativeTime(commentTime);

  return (
    <div className="flex gap-2">
      <img
        className="w-[40px] h-[40px] rounded-full object-cover"
        src={user.photo}
        alt=""
      />
      <div className="flex flex-col">
        <p className="text-[14px]">
          <Link to={"/"} className="text-black font-bold">
            {user.username}
          </Link>{" "}
          {"  "}
          {comment}
        </p>
        <span className="text-[12px] text-gray-500">{time}</span>
      </div>
    </div>
  );
};

export default Comment;
