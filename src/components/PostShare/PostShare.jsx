import { useState, useRef } from "react";
import "./PostShare.css";
// import { UilScenery } from "@iconscout/react-unicons";
// import { UilPlayCircle } from "@iconscout/react-unicons";
// import { UilLocationPoint } from "@iconscout/react-unicons";
// import { UilSchedule } from "@iconscout/react-unicons";
// import { UilTimes } from "@iconscout/react-unicons";
import ProfileImage from "../../assets/aroun-poul.jpg";

const PostShare = () => {
  const [image, setImage] = useState(null);
  const imageRef = useRef();

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage({
        image: URL.createObjectURL(img),
      });
    }
  };
  return (
    <div className="PostShare">
      <img src={ProfileImage} alt="" />
      {/* <div className="avatar">
        <div className="w-[3rem] rounded-full ring ring-primary ring-offset-base-100">
          <img src={ProfileImage} />
        </div>
      </div> */}
      <div>
        <input
          className="!input-primary focus:outline-none focus:!ring-0"
          type="text"
          placeholder="What's happening"
        />
        <div className="postOptions">
          <div className="option" onClick={() => imageRef.current.click()}>
            {/* <UilScenery /> */}
            Photo
          </div>
          <div className="option" style={{ color: "var(--video)" }}>
            {/* <UilPlayCircle /> */}
            Video
          </div>{" "}
          <div className="option" style={{ color: "var(--location)" }}>
            {/* <UilLocationPoint /> */}
            Location
          </div>{" "}
          <div className="option" style={{ color: "var(--shedule)" }}>
            {/* <UilSchedule /> */}
            Shedule
          </div>
          <button className="btn-primary !py-2 !px-3 !text-[13px]">
            Share
          </button>
          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
        </div>

        {image && (
          <div className="previewImage">
            {/* <UilTimes onClick={() => setImage(null)} /> */}
            <img src={image.image} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;
