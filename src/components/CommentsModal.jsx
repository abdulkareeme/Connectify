/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import Comment from "./Comment";
import axios from "axios";
import Cookies from "js-cookie";
import { useUserContext } from "../Context/UserContextProvider";

const token = Cookies.get("userToken") || "";

const CommentsModal = ({ id, commentsData, setCommentsNumber }) => {
  const { user: userInfo } = useUserContext();

  const commentInputRef = useRef(null);
  const [comments, setComments] = useState(commentsData);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddComment = async () => {
    const newComment = commentInputRef.current.value;
    if (newComment.trim() === "") return;
    try {
      setIsLoading(true);
      const res = await axios.post(
        `https://abdulkareem3.pythonanywhere.com/social/posts/${id}/comments/`,
        {
          post: id,
          content: newComment,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      const now = new Date();
      const formattedNow = `${now.toISOString().split(".")[0]}.${now
        .getMilliseconds()
        .toString()
        .padStart(3, "0")}Z`;
      setComments((prevComments) => [
        ...prevComments,
        { content: newComment, user: userInfo, created_at: formattedNow },
      ]);
      setCommentsNumber((prevCommentsNumber) => prevCommentsNumber + 1);
      console.log("Comment added:", res.data);
      commentInputRef.current.value = "";
    } catch (err) {
      console.log("Error adding comment:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <dialog id={`my_modal_${id}`} className="modal">
      <div className="modal-box bg-white">
        <form method="dialog">
          <button className="btn btn-sm btn-circle absolute right-2 top-2 bg-white hover:bg-inherit focus:bg-inherit">
            ✕
          </button>
        </form>

        <h3 className="font-bold text-lg mb-3">Comments</h3>
        <div className="flex flex-col gap-4">
          {comments?.map((comment, index) => {
            return (
              <Comment
                key={index}
                comment={comment.content}
                user={comment.user}
                commentTime={comment.created_at}
              />
            );
          })}
          {comments && comments.length == 0 && (
            <div className="w-full h-full flex justify-center items-center py-3">
              <h2 className="text-[18px] w-max mx-auto text-center">
                No Comments yet. Be the first to comment on this!
              </h2>
            </div>
          )}
        </div>
        {/* Add Comment */}
        <hr className="bg-gray-800 w-full my-3 " />
        <div className="flex items-center w-full">
          <input
            ref={commentInputRef}
            type="text"
            placeholder="Add a comment"
            className="border-none outline-none shadow-none w-full focus:!ring-0"
          />
          {!isLoading ? (
            <span
              onClick={handleAddComment}
              className="font-bold text-[13px] cursor-pointer"
            >
              Post
            </span>
          ) : (
            <span className="loading loading-spinner loading-md"></span>
          )}
        </div>
      </div>
    </dialog>
  );
};

export default CommentsModal;
