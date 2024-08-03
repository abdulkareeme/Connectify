/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const Comment = ({ comment, user }) => {
  console.log("DATA Comment", comment, user);
  return (
    <div className="flex gap-2">
      {/* <img
        className="w-[40px] h-[40px] rounded-full object-cover"
        src={commentData.pic}
        alt=""
      /> */}
      <div className="flex flex-col">
        <p className="text-[14px]">
          <Link to={"/"} className="text-black font-bold">
            {user}
          </Link>{" "}
          {"  "}
          {comment}
        </p>
        <span className="text-[12px] text-gray-500">12 hours</span>
      </div>
    </div>
  );
};

export default Comment;
