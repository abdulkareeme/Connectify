import PostSide from "../components/PostSide/PostSide";
import RightSide from "../components/RightSide/RightSide";
const Home = () => {
  return (
    <>
      <div className="Home ml-[30px] px-6 py-5 w-[600px]">
        <PostSide />
      </div>
      <RightSide />
    </>
  );
};

export default Home;
