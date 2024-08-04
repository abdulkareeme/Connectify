import PostsHeading from "./PostsHeading";
import ProfileDetails from "./ProfileDetails";

// eslint-disable-next-line react/prop-types
const ProfileLayout = ({ children }) => {
  return (
    <div>
      <div className="flex flex-col gap-20 w-full">
        <ProfileDetails />
        <PostsHeading />
      </div>
      {children}
    </div>
  );
};

export default ProfileLayout;
