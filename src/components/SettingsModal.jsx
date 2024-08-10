import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const token = Cookies.get("userToken") || "";

const SettingsModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useNavigate();

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        "https://abdulkareem3.pythonanywhere.com/user/logout/",
        null,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      console.log(res);
      Cookies.remove("userTotalInfo");
      Cookies.remove("userToken");
      history("/login");
    } catch (err) {
      console.log(err);
      if (err.response.data > 0) {
        console.log(err.response.data);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <dialog id="my_modal_4477" className="modal">
      <div className="modal-box !p-0 !py-4">
        <div className="flex flex-col">
          <button onClick={() => handleLogout()} className="settingitem">
            {isLoading && (
              <span className="loading loading-spinner loading-sm"></span>
            )}
            Logout
          </button>
          <hr />
          <form method="dialog">
            <button className="settingitem">Cancel</button>
          </form>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default SettingsModal;
