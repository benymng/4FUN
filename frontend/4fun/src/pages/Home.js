import React from "react";
import Navigation from '../components/Navigation.js';
import Suggested from "../components/Suggested.js";
import Motivation from "../components/Motivation.js";
import Button from "../components/Button.js";

const Home = () => {

  return (
    <div className="h-screen bg-black p-4 grid grid-rows-10">
      <div className="row-span-1">
        <h1 className="text-white text-2xl font-extrabold inline-block">Start Your&nbsp;</h1>
        <h1 className="text-green text-2xl font-extrabold inline-block">Workout</h1>
      </div>
      <div className="row-span-1">
        <h1 className="text-white text-md font-extrabold inline-block">What is your&nbsp;</h1>
        <h1 className="text-green text-md font-extrabold inline-block">goal&nbsp;</h1>
        <h1 className="text-white text-md font-extrabold inline-block"> for today's workout?</h1>
      </div>
      <Suggested className="row-span-3" />
      <Motivation className="row-span-4" />
      <center><Button name="START" path="/live" className="row-span-1" /></center>
      <Navigation className="row-span-1 h-20"/>
    </div>
  );
};

export default Home;
