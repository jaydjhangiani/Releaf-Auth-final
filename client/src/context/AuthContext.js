import axios from "axios";
import { createContext, useEffect, useState } from "react";
const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [user, setUser] = useState("");

  const getUserDetails = async (e) => {
    if (localStorage.getItem("authToken")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        console.log("hi");
        const { data } = await axios.get(
          `${process.env.REACT_APP_URI}/api/private/user`,
          config
        );
        setUser(data.data);
      } catch (error) {
        // localStorage.removeItem("authToken");
        setUser("");
        console.log(error);
      }
    }
  };

  const userLogout = () => {
    localStorage.removeItem("authToken");
    setUser("");
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  // console.log(user)

  return (
    <AuthContext.Provider value={{ user, getUserDetails, userLogout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

export { AuthContextProvider };
