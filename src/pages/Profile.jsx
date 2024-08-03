import ProfileLayout from "../components/ProfileLayout";
import GridPostsList from "../components/GridPostsList";

const Profile = () => {
  return (
    <div className="px-[60px] py-[40px]">
      <ProfileLayout>
        <GridPostsList />
      </ProfileLayout>
    </div>
  );
};

export default Profile;
