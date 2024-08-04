/* eslint-disable react/prop-types */
import PostCard from "./PostCard";

const GridPostsList = ({ posts }) => {
  return (
    <>
      {posts?.length > 0 ? (
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
      ) : (
        <div className="w-full flex items-center">
          <h2 className="text-[20px] w-fit text-center mx-auto">
            There is no posts!
          </h2>
        </div>
      )}
    </>
  );
};

export default GridPostsList;
