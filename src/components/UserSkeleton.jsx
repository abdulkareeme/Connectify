import Skeleton from "react-loading-skeleton";

const UserSkeleton = () => {
  return (
    <div className="flex gap-1 justify-between">
      <div className="flex gap-2 items-center">
        <Skeleton
          circle
          height={40}
          width={40}
          containerClassName="avatar-skeleton"
        />
        <Skeleton width={90} height={10} />
      </div>
      <Skeleton className="!w-[105px] !h-[30px]" />
    </div>
  );
};

export default UserSkeleton;
