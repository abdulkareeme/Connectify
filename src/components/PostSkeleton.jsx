import Skeleton from "react-loading-skeleton";

const PostSkeleton = () => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-2 items-center">
        <Skeleton
          circle
          height={40}
          width={40}
          containerClassName="avatar-skeleton"
        />
        <Skeleton width={100} height={10} />
      </div>
      <Skeleton className="!w-[550px] !h-[350px]" />
      <div className="flex flex-col">
        <Skeleton width={50} height={10} />
        <Skeleton className="!w-[550px]" height={10} />
        <Skeleton className="!w-[550px]" height={10} />
      </div>
    </div>
  );
};

export default PostSkeleton;
