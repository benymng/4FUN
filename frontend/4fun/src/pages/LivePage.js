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



export const LivePage = () => {
  const location = useLocation();
  const [goal, setGoal] = useState(() => { 
    switch (location.state.goal) { 
      case 1:
        return { name: "Beginner", id: 1, repxsets: "3 sets x 5 reps", icon: IoFootstepsOutline, selected: true }
      case 2:
        return { name: "Intermediate", id: 2, repxsets: "4 sets x 8 reps", icon: IoFootstepsOutline, selected: false }
      case 3:
        return { name: "Advanced", id: 3, repxsets: "5 sets x 10 reps", icon: IoFootstepsOutline, selected: false }
      case 4:
        return { name: "Expert", id: 4, repxsets: "10 sets x 10 reps", icon: IoFootstepsOutline, selected: false }
      default:
        return { name: "Beginner", id: 1, repxsets: "3 sets x 5 reps", icon: IoFootstepsOutline, selected: true }
    }
  });
  const [startTime, setStartTime] = useState(location.state.startTime);
  const [running, setRunning] = useState(true);
  const pause = (val) => { 
    setRunning(val);
  }

  const stop = () => { 
    console.log("stopped");
  }

  return <div className="h-screen bg-black p-4 grid">
    <div className="row-span-1">
      <h1 className="text-white text-2xl font-extrabold inline-block">Live&nbsp;</h1>
      <h1 className="text-green text-2xl font-extrabold inline-block">Workout</h1>
    </div>
    <div className="row-span-1 text-white">
      <h1 className="text-white text-md font-extrabold">Your goal:</h1>
      <h1 className="text-white text-md font-extrabold inline-block">{goal.name}&nbsp; - &nbsp;</h1>
      <h1 className="text-green text-md font-extrabold inline-block">{goal.repxsets}&nbsp;&nbsp;&nbsp;&nbsp;</h1>
    </div>
    <Tracker className="row-span-4 h-64" startTime={startTime} running={ running } />
    <Motivation/>
    <center><Button className="row-span-1" name="Exit" path="/Exit" icon={BsStopFill} func={stop} goal={ goal } /></center>
    </div>
};

export default LivePage;
