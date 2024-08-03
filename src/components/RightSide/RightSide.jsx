import "./RightSide.css";
import TrendCard from "../TrendCard/TrendCard";

const RightSide = () => {
  return (
    <div className="RightSide w-[300px] py-4 px-6">
      {/* <div className="navIcons">
        <img src={Home} alt="" />
        <UilSetting />
        <img src={Noti} alt="" />
        <img src={Comment} alt="" />
      </div> */}

      <TrendCard />

      {/* <button className="btn-primary" onClick={() => setModalOpened(true)}>
        Share
      </button> */}
    </div>
  );
};

export default RightSide;
