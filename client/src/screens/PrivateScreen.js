import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const PrivateScreen = () => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      history.push("/login");
    }

    const fetchPrivateData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      // console.log(localStorage.getItem("authToken"))

      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_URI}/api/private/`,
          config
        );

        setPrivateData(data.data);
        console.log(privateData);
      } catch (error) {
        console.log(privateData);
        localStorage.removeItem("authToken");
        setError("You are not authorized");
      }
    };

    fetchPrivateData();
  }, [history, privateData]);

  // const logoutHandler = () => {
  //     localStorage.removeItem("authToken");
  //     history.push("/");
  // }

  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <>
      <div style={{ background: "green", color: "white" }}>{privateData}</div>
      {/* <button onClick={logoutHandler}>Logout</button> */}
    </>
  );
};

export default PrivateScreen;
