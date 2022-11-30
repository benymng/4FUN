import React, { useEffect, useState } from "react";
import Navigation from '../components/Navigation.js';
import Suggested from "../components/Suggested.js";
import Motivation from "../components/Motivation.js";
import Button from "../components/Button.js";
import { goalTranslater } from "../resources/function.js";

const Home = () => {
  const [selectedGoal, setSelectedGoal] = useState(1);
  return (
    <div className="h-screen bg-black p-4 grid">
      <div className="row-span-1">
        <h1 className="text-white text-2xl font-extrabold inline-block">Start Your&nbsp;</h1>
        <h1 className="text-green text-2xl font-extrabold inline-block">Workout</h1>
      </div>
      <div className="row-span-1">
        <h1 className="text-white text-md font-extrabold inline-block">What is your&nbsp;</h1>
        <h1 className="text-green text-md font-extrabold inline-block">goal&nbsp;</h1>
        <h1 className="text-white text-md font-extrabold inline-block"> for today's workout?</h1>
      </div>
      <Suggested className="row-span-3" setGoal={setSelectedGoal} />
      <Motivation className="row-span-4" />
      <center><Button name="START" path="/live" className="row-span-1" goal={selectedGoal} time={0}/></center>
      <Navigation className="row-span-1 h-20"/>
    </div>
  );
};

export default Home;
