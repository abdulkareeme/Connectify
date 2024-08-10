import { useRef, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../Context/UserContextProvider";

const EditMyProfile = () => {
  const token = Cookies.get("userToken") || "";
  const { user, setUser } = useUserContext();

  const router = useNavigate();

  const [bio, setBio] = useState(user.bio || "");
  const [firstName, setFirstName] = useState(user.first_name || "");
  const [lastName, setLastName] = useState(user.last_name || "");
  const [imageUrl, setImageUrl] = useState(user.photo || "");
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadImage, setUploadImage] = useState(false);

  const fileInputRef = useRef(null);

  const handleFileInputChange = (e) => {
    setUploadImage(true);
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = (event) => {
      setImageUrl(event.target.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async () => {
    const userData = {
      bio,
      first_name: firstName,
      last_name: lastName,
      birth_date: user.birth_date,
      is_private: user.is_private,
    };
    setIsSubmitting(1);
    try {
      await axios.put(
        "https://abdulkareem3.pythonanywhere.com/user/update-profile",
        userData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
    } catch (err) {
      console.log(err);
      setIsSubmitting(0);
    }

    if (uploadImage) {
      try {
        await axios.put(
          "https://abdulkareem3.pythonanywhere.com/user/update-user-photo",
          {
            photo: file,
          },
          {
            headers: {
              Authorization: token,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setIsSubmitting(0);
      } catch (err) {
        console.log(err);
        setIsSubmitting(0);
      }
    }
    try {
      const res = await axios(
        `https://abdulkareem3.pythonanywhere.com/user/user/${user.username}`
      );
      setUser(res.data);
      Cookies.set("userTotalInfo", JSON.stringify(res.data), {
        expires: 30,
      });
      router(`/${user.username}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col gap-4 px-5 py-10 w-full">
      <h2 className="text-lg font-semibold">Edit Profile</h2>

      <div className="flex items-center justify-between">
        <div className="userinfo flex items-center gap-3 p-1 text-sm">
          <img
            src={imageUrl}
            className="w-12 h-12 rounded-full"
            alt={`${user.username}'s avatar`}
          />
          <span className="text-black font-bold">{user.username}</span>
        </div>
        <input
          id="file-upload"
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          style={{ display: "none" }}
        />
        <button
          onClick={handleButtonClick}
          className="bg-blue-500 text-white hover:bg-blue-700 px-4 py-1 rounded transition"
        >
          Change Photo
        </button>
      </div>

      <div className="flex gap-2 items-center w-full">
        <div className="flex flex-col gap-1 w-1/2">
          <label className="text-lg font-semibold" htmlFor="first_name">
            First Name
          </label>
          <input
            className="p-2 border border-black rounded"
            id="first_name"
            name="first_name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1 w-1/2">
          <label className="text-lg font-semibold" htmlFor="last_name">
            Last Name
          </label>
          <input
            className="p-2 border border-black rounded"
            id="last_name"
            name="last_name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-lg font-semibold" htmlFor="bio">
          Bio
        </label>
        <textarea
          id="bio"
          className="p-2 border border-black rounded"
          rows={10}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Write A Bio..."
        ></textarea>
      </div>

      <div>
        <button
          className="flex gap-2 items-center bg-blue-500 text-white hover:bg-blue-700 px-4 py-1 rounded transition"
          onClick={() => handleSubmit()}
          disabled={isSubmitting}
        >
          {isSubmitting && (
            <span className="loading loading-spinner loading-md"></span>
          )}
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditMyProfile;
