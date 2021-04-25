import React, { useContext } from "react";
//assets
import AuthContext from "../context/AuthContext";
//components
import Sidebar from "../components/sidebar/Sidebar";
import PrivateScreen from "../screens/PrivateScreen";

const DashboardScreen = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Sidebar user={user} />
      <PrivateScreen />
    </div>
  );
};

export default DashboardScreen;
