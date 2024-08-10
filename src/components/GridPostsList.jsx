/* eslint-disable react/prop-types */
import PostCard from "./PostCard";

const GridPostsList = ({ posts }) => {
  return (
    <>
      {!posts && (
        <div className="w-full h-[200px] flex items-center justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
      {posts && (
        <div className="posts grid grid-cols-3 gap-1">
          {posts?.map((post, index) => (
            <PostCard
              key={index}
              data={post}
              likes={post.likes}
              comments={post.comments}
              postImg={post.image}
            />
          ))}
        </div>
      )}
      {posts?.length == 0 && (
        <div className="w-full h-[150px]  flex items-center">
          <h2 className="text-[25px] w-fit text-center mx-auto">
            There is no posts!
          </h2>
        </div>
      )}
    </>
  );
};

export default GridPostsList;
