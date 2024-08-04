/* eslint-disable react/prop-types */
const UserCard = ({ user }) => {
  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex gap-2 items-center">
        <img
          className="w-8 h-8 rounded-full object-cover cursor-pointer"
          src=""
          alt=""
        />
        <span className="text-[15px] cursor-pointer">{user}</span>
      </div>
      <button className="bg-blue-500 text-white hover:bg-blue-700 px-4 py-1 rounded transition">
        Follow
      </button>
    </div>
  );
};

export default UserCard;
