import Skeleton from "react-loading-skeleton";

const ProfileSkeleton = () => {
  return (
    <div className="flex flex-wrap justify-center gap-20">
      <Skeleton circle height={100} width={100} />
      <div className="flex flex-col gap-3">
        <Skeleton width={200} height={10} />
        <Skeleton width={150} height={10} />
        <Skeleton width={100} height={10} />
      </div>
    </div>
  );
};

export default ProfileSkeleton;
