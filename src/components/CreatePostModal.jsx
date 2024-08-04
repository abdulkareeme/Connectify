/* eslint-disable react/prop-types */
import Cookies from "js-cookie";
import { useRef, useState } from "react";
import axios from "axios";

const storedUser = Cookies.get("userTotalInfo") || "";
const userInfo = JSON.parse(storedUser);

const CreatePostModal = ({ id }) => {
  const token = Cookies.get("userToken") || "";
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadImage, setUploadImage] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileInputChange = (e) => {
    setUploadImage(true);
    setFile(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = (event) => {
      setImageUrl(event.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <dialog id={`my_modal_7744`} className="modal">
        <div className="modal-box bg-white w-11/12 max-w-5xl h-[500px]">
          <form method="dialog">
            <button className="btn btn-sm btn-circle absolute right-2 top-2 bg-white hover:bg-inherit focus:bg-inherit">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg mb-3 mx-auto w-fit">
            Create new post
          </h3>
          <div className="flex gap-4 px-3 h-[90%]">
            <div className="w-1/2 flex justify-center items-center border border-gray-400 border-solid">
              {!imageUrl ? (
                <>
                  <input
                    id="file-upload"
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileInputChange}
                    style={{
                      display: "none",
                    }}
                  />
                  <div className="w-full flex flex-col gap-3 justify-center items-center">
                    <svg
                      aria-label="Icon to represent media such as images or videos"
                      className="x1lliihq x1n2onr6 x5n08af"
                      fill="currentColor"
                      height="77"
                      role="img"
                      viewBox="0 0 97.6 77.3"
                      width="96"
                    >
                      <title>
                        Icon to represent media such as images or videos
                      </title>
                      <path
                        d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <h2>Drag photos and videos here</h2>
                    <button
                      onClick={() => handleButtonClick()}
                      className="bg-blue-500 text-white text-[15px] px-4 py-1"
                    >
                      Select From Computer
                    </button>
                  </div>
                </>
              ) : (
                <img
                  className="w-full h-full object-cover"
                  src={imageUrl || "/src/assets/flowers.jpg"}
                  alt=""
                />
              )}
            </div>
            <div className="w-1/2 h-full flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <img
                  className="w-[40px] h-[40px] rounded-full object-cover cursor-pointer"
                  src={userInfo?.photo}
                  alt=""
                />
                <span className="text-[15px] cursor-pointer">
                  {userInfo?.username}
                </span>
              </div>
              <textarea
                name=""
                id=""
                placeholder="Write A Caption..."
                className="p-2"
                rows={7}
              ></textarea>
              <button className="bg-blue-500 text-white text-[15px] px-4 py-1 w-max">
                Post
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default CreatePostModal;
