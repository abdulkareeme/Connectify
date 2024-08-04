import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const storedUser = Cookies.get("userTotalInfo") || "";
const userInfo = JSON.parse(storedUser);

const PostsHeading = () => {
  return (
    <div className="post-sec">
      <hr className="bg-black" />
      <div className="posts-head flex justify-center gap-2 mb-3">
        <Link
          to={`/${userInfo.username}`}
          className="space cursor-pointer p-2 border-t-2 border-solid border-black text-[14px] text-black flex gap-2 items-center hover:text-black"
        >
          <svg
            aria-label=""
            className="x1lliihq x1n2onr6 x5n08af"
            fill="currentColor"
            height="12"
            role="img"
            viewBox="0 0 24 24"
            width="12"
          >
            <title></title>
            <rect
              fill="none"
              height="18"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              width="18"
              x="3"
              y="3"
            ></rect>
            <line
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              x1="9.015"
              x2="9.015"
              y1="3"
              y2="21"
            ></line>
            <line
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              x1="14.985"
              x2="14.985"
              y1="3"
              y2="21"
            ></line>
            <line
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              x1="21"
              x2="3"
              y1="9.015"
              y2="9.015"
            ></line>
            <line
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              x1="21"
              x2="3"
              y1="14.985"
              y2="14.985"
            ></line>
          </svg>
          POSTS
        </Link>
        <Link
          to={`/${userInfo.username}/saved`}
          className="cursor-pointer p-2 text-[14px] text-black flex gap-2 items-center hover:text-black"
        >
          <svg
            aria-label=""
            className="x1lliihq x1n2onr6 x1roi4f4"
            fill="currentColor"
            height="12"
            role="img"
            viewBox="0 0 24 24"
            width="12"
          >
            <title></title>
            <polygon
              fill="none"
              points="20 21 12 13.44 4 21 4 3 20 3 20 21"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            ></polygon>
          </svg>
          SAVED
        </Link>
      </div>
    </div>
  );
};

export default PostsHeading;
