import React from "react";
import HeroSection from "../components/home/HeroSection";
import InfoSection from "../components/home/InfoSection";
import UpdateSection from "../components/home/UpdateSection";

const HomeScreen = () => {
  return (
    <div>
      <HeroSection />
      <InfoSection />
      <UpdateSection />
    </div>
  );
};

export default HomeScreen;
