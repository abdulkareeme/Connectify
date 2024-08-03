import { Link } from "react-router-dom";
// import GridPostsList from "./GridPostsList";

const PostsHeading = () => {
  return (
    <div className="post-sec">
      <hr className="bg-black" />
      <div className="posts-head flex justify-center gap-2">
        <Link
          to={"/profile"}
          className="cursor-pointer p-2 border-t-2 border-solid border-black text-[20px] text-black flex gap-2 items-center hover:text-black"
        >
          posts
        </Link>
        <Link
          to={"/profile/saved"}
          className="cursor-pointer p-2 text-[20px] text-black flex gap-2 items-center hover:text-black"
        >
          saved
        </Link>
      </div>
    </div>
  );
};

export default PostsHeading;
