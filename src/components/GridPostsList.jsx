import PostCard from "./PostCard";

const GridPostsList = ({ posts }) => {
  return (
    <div className="posts grid grid-cols-3 gap-1">
      {posts?.map((post, index) => (
        <PostCard
          key={index}
          id={post.id}
          likes={post.likes}
          comments={post.comments}
          content={post.content}
          postTime={post.created_at}
          user={post.user}
          postImg={post.image}
          postVideo={post.vidoe}
        />
      ))}
    </div>
  );
};

export default GridPostsList;
