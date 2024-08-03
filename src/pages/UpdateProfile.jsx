import React, { useRef, useState } from "react";
import UserPhoto from "../assets/user.png";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import { putToAPI } from "../api/dealWithAPI";

const UpdateProfile = () => {
  const storedUser = Cookies.get("userTotalInfo");
  const userToken = Cookies.get("userToken");
  const userInfo = storedUser ? JSON.parse(storedUser) : null;
  const [bio, setBio] = useState(userInfo?.bio || "");
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(userInfo?.photo);
  const [isSubmitting, setIsSubmitting] = useState(0);
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

  const handleSubmit = async () => {
    setIsSubmitting(1);
    toast.loading("Updating photo...", {
      duration: 3000,
      position: "top-center",
      ariaProps: {
        role: "status",
        "aria-live": "polite",
      },
    });
    try {
      await putToAPI(
        "user/update-user-photo",
        {
          photo: file,
        },
        {
          headers: {
            Authorization: userToken,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Success!");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data?.detail, {
        duration: 3000,
        position: "top-center",
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      });
    } finally {
      setIsSubmitting(0);
    }
  };

  console.log(userToken);
  return (
    <div className="my-6 mx-12 w-full">
      <Toaster />
      <h1 className="mb-8 text-4xl">Edit Profile</h1>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <img
              className="w-[50px] h-[50px] rounded-full"
              src={imageUrl || UserPhoto}
              alt=""
            />
            <div className="flex flex-col gap-2">
              <span className="font-bold">{userInfo?.username}</span>
              <span className="text-[15px] text-gray-500">
                {userInfo?.first_name + " " + userInfo?.last_name}
              </span>
            </div>
          </div>
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
          <button
            onClick={handleButtonClick}
            className="btn-primary text-[14px]"
          >
            change Photo
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-2xl">bio</h2>
          <textarea
            className="input-primary"
            onChange={(e) => setBio(e.target.value)}
            name="bio"
            id=""
            rows="9"
          >
            {bio}
          </textarea>
        </div>

        {/* Submit button */}
        <div className="w-full flex justify-end">
          {!isSubmitting ? (
            <button
              className={"btn-primary w-fit "}
              // disabled={!isValid}
              onClick={handleSubmit}
            >
              Submit
            </button>
          ) : (
            <button className={`btn-primary disable`} disabled={!isSubmitting}>
              <span className="loading loading-spinner loading-md"></span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
