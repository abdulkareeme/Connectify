/* eslint-disable react/prop-types */
import { Link, useLocation, useParams } from "react-router-dom";
import { useUserContext } from "../Context/UserContextProvider";

const PostsHeading = ({ userProfileData }) => {
  const { user: userInfo } = useUserContext();

  const { username } = useParams();

  const location = useLocation();
  const isSavedActive = location.pathname.includes("saved");
  if (userProfileData?.is_private) {
    return (
      <div className="post-sec">
        <hr className="bg-black" />
        <div className="py-3 flex gap-2 items-center justify-center h-[200px] w-max mx-auto">
          <svg
            aria-label=""
            className="x1lliihq x1n2onr6 x5n08af"
            fill="currentColor"
            height="48"
            role="img"
            viewBox="0 0 96 96"
            width="48"
          >
            <title></title>
            <circle
              cx="48"
              cy="48"
              fill="none"
              r="47"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            ></circle>
            <path
              d="M60.931 70.001H35.065a5.036 5.036 0 0 1-5.068-5.004V46.005A5.036 5.036 0 0 1 35.065 41H60.93a5.035 5.035 0 0 1 5.066 5.004v18.992A5.035 5.035 0 0 1 60.93 70ZM37.999 39.996v-6.998a10 10 0 0 1 20 0v6.998"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            ></path>
          </svg>
          <div>
            <h2 className="text-[18px] font-semibold">
              This account is private
            </h2>
            <p className="text-[#737373] text-[16px]">
              Follow to see their photos and videos.
            </p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="post-sec">
      <hr className="bg-black" />
      <div className="posts-head flex justify-center gap-2 mb-3">
        <Link
          to={`/${userInfo.username}`}
          className={`space cursor-pointer p-2 pt-3 border-t-2 border-solid text-[14px] text-[#737373] flex gap-2 items-center hover:text-black ${
            !isSavedActive ? "border-black text-black" : "border-transparent"
          }`}
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
        {username === userInfo.username ? (
          <Link
            to={`/${userInfo.username}/saved`}
            className={`cursor-pointer p-2 pt-3 text-[14px] text-[#737373] flex gap-2 items-center hover:text-black ${
              isSavedActive
                ? "border-black text-black border-t-2 border-solid"
                : ""
            }`}
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
        ) : null}
      </div>
    </div>
  );
};

export default PostsHeading;
