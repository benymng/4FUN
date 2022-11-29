import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Suggested from "../components/Suggested";
import { useLocation } from "react-router-dom";
import { IoFootstepsOutline } from "react-icons/io5";
import Tracker from "../components/Tracker";
import Navigation from "../components/Navigation";
import NavButton from "../components/NavButton";
import Motivation from "../components/Motivation";


export const Exit = (props) => {
    const location = useLocation();
    console.log(location);
    // const [goal, setGoal] = useState(() => {return (location.state.goal) ? 1 : 0 });
    // console.log(location);
    // const [startTime, setStartTime] = useState(location.state.startTime);
    // const [running, setRunning] = useState(true);
    // const pause = (val) => {
    //     setRunning(val);
    // }

    return <div className="h-screen bg-black p-4 grid">
        {/* //     <div className="row-span-1">
    //         <h1 className="text-white text-2xl font-extrabold inline-block">Live&nbsp;</h1>
    //         <h1 className="text-green text-2xl font-extrabold inline-block">Workout</h1>
    //     </div>
    //     <div className="row-span-1 text-white">
    //         <h1 className="text-white text-md font-extrabold">Your goal:</h1>
    //         <h1 className="text-white text-md font-extrabold inline-block">{goal.name}&nbsp; - &nbsp;</h1>
    //         <h1 className="text-green text-md font-extrabold inline-block">{goal.repxsets}&nbsp;&nbsp;&nbsp;&nbsp;</h1>
    //     </div>
    //     {/* <Tracker className="row-span-4 h-64" startTime={startTime} running={running} /> */
    //      <StopButton pause={pause} /> 
    /* //     <Motivation />
//     <NavButton name="Exit" path="" /> */}
    </div>
};

export default Exit;
