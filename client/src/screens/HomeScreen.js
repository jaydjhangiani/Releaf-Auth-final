import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
//components
import HeroSection from "../components/home/HeroSection";
import InfoSection from "../components/home/InfoSection";
import UpdateSection from "../components/home/UpdateSection";
import AuthContext from "../context/AuthContext";

const HomeScreen = () => {
  const { user } = useContext(AuthContext);
  const history = useHistory();
  if (user) {
    history.push("/user/dashboard");
  }
  return (
    <div>
      <HeroSection />
      <InfoSection />
      <UpdateSection />
    </div>
  );
};

export default HomeScreen;
