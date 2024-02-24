import React, { useEffect } from "react";
import { useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import Video from "../assets/star-wars.webm";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const HeroSection = () => {
  const [hover, setHover] = useState(false)
  const onHover = () => {
    setHover(!hover);
  };
  useEffect(() => {
    Aos.init({ duration: 1500 });
  });

  const navigate = useNavigate()

  return (
    <div
      className="bg-black flex justify-center items-center h-screen relative z-10 overflow-hidden"
      data-aos="fade-in"
      id="home"
    >
      <video
        className="custom-css-video"
        autoPlay
        loop
        muted
        src={Video}
        type="video/
          mp4"
      />
      <div className="bg-transparent z-10 max-w-7xl absolute py-2 px-6 flex flex-col items-center">
        <div
          className="bg-transparent text-white text-5xl font-semibold text-center font-Montserrat custom-css-hero-h1"
          data-aos="fade-in"
        >
          Explore the Star Wars{" "}
          <span
            className=" bg-gradient-to-r bg-clip-text  text-transparent
    from-cyan-500 via-purple-500 to-indigo-500
    animate-text"
          >
            Galaxy
          </span>
        </div>
        <div className="mt-6 bg-transparent text-white text-2xl text-center max-w-xl font-montserrat custom-css-hero-p" data-aos="fade-in">
          Explore a comprehensive directory of Star Wars planets, their residents, and appearances in the films.
        </div>
        <div className="mt-8 flex flex-col items-center">
          <button onClick={() => navigate('/planets')} data-aos="fade-in" type="button" class="text-white bg-gray-800 flex gap-4 items-center hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-lg px-6 py-3 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
            <span>Start your journey</span><FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
