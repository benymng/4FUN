import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Suggested from "../components/Suggested";
import { useLocation } from "react-router-dom";
import { IoFootstepsOutline } from "react-icons/io5";
import Tracker from "../components/Tracker";
import Navigation from "../components/Navigation";
import NavButton from "../components/NavButton";
import Motivation from "../components/Motivation";
import { BsStopFill } from "react-icons/bs";
import Button from "../components/Button";
import StopButton from "../components/StopButton";
import { goalTranslater } from "../resources/function";



export const LivePage = () => {
  const location = useLocation();
  const [goal, setGoal] = useState(location.state.goal);
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(true);
  const pause = (val) => { 
    setRunning(val);
  }

  const trackTime = (currTime) => { 
    setTime(currTime);
  }

  return <div className="h-screen bg-black p-4 grid">
    <div className="row-span-1">
      <h1 className="text-white text-2xl font-extrabold inline-block">Live&nbsp;</h1>
      <h1 className="text-green text-2xl font-extrabold inline-block">Workout</h1>
    </div>
    <div className="row-span-1 text-white">
      <h1 className="text-white text-md font-extrabold">Your goal:</h1>
      <h1 className="text-white text-md font-extrabold inline-block">{goalTranslater(goal).name}&nbsp; - &nbsp;</h1>
      <h1 className="text-green text-md font-extrabold inline-block">{goalTranslater(goal).repxsets}&nbsp;&nbsp;&nbsp;&nbsp;</h1>
    </div>
    <Tracker className="row-span-4 h-64" running={running} func={trackTime} />
    <Motivation />
    <center><StopButton className="row-span-1" pause={pause}/></center>
    <center><Button className="row-span-1" name="Exit" path="/Exit" icon={BsStopFill} func={pause} goal={goal} time={time} /></center>
    </div>
};

export default LivePage;
