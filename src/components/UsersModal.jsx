/* eslint-disable react/prop-types */
import Pic from "../assets/aroun-poul.jpg";
const UsersModal = ({ type }) => {
  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box bg-white">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>

        <h3 className="font-bold text-lg mb-3">{type}</h3>
        <div className="flex flex-col gap-4">
          {/* item */}
          <div className="flex justify-between">
            <div className="flex gap-2 justify-center items-center">
              <img
                className="w-[40px] h-[40px] rounded-full object-cover"
                src={Pic}
                alt=""
              />
              <span className="text-black font-bold">bassamhlal21</span>
            </div>
            <button className="btn-primary text-[15px] px-3 py-2">
              Following
            </button>
          </div>
          {/* item */}
          <div className="flex justify-between">
            <div className="flex gap-2 justify-center items-center">
              <img
                className="w-[40px] h-[40px] rounded-full object-cover"
                src={Pic}
                alt=""
              />
              <span className="text-black font-bold">bassamhlal21</span>
            </div>
            <button className="btn-primary text-[15px] px-3 py-2">
              Following
            </button>
          </div>
          {/* item */}
          <div className="flex justify-between">
            <div className="flex gap-2 justify-center items-center">
              <img
                className="w-[40px] h-[40px] rounded-full object-cover"
                src={Pic}
                alt=""
              />
              <span className="text-black font-bold">bassamhlal21</span>
            </div>
            <button className="btn-primary text-[15px] px-3 py-2">
              Following
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default UsersModal;
