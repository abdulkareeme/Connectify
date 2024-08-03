import GridPostsList from "../components/GridPostsList";
import ProfileLayout from "../components/ProfileLayout";

const ProfileSaved = () => {
  return (
    <div className="px-[60px] py-[40px]">
      <ProfileLayout>
        <GridPostsList />
      </ProfileLayout>
    </div>
  );
};

export default ProfileSaved;
