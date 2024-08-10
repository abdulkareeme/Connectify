/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

const initialValue = {};
const UserContext = createContext(initialValue);

export function useUserContext() {
  return useContext(UserContext);
}

const UserContextProvider = ({ children }) => {
  const storedUser = Cookies.get("userTotalInfo") || "";
  const userInfo = storedUser && JSON.parse(storedUser);
  const [user, setUser] = useState(userInfo || {});
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
