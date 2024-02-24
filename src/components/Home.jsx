
import React, { useState } from "react";
import HeroSection from "./HeroSection";
import Navbar from "../components/Navbar"

function Home() {

  return (
    <>
      <div className="bg-black">
        <Navbar/>
        <div className="bg-black overflow-hidden">
          <HeroSection />
        </div>
      </div>
    </>
  );
}

export default Home;
