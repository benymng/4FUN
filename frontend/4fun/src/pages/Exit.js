import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Suggested from "../components/Suggested";
import { useLocation } from "react-router-dom";
import { GiPartyPopper } from "react-icons/gi";
import { AiOutlineCheck } from "react-icons/ai";
import Tracker from "../components/Tracker";
import Navigation from "../components/Navigation";
import Motivation from "../components/Motivation";
import { timeFormatter } from "../resources/function";
import NavButton from "../components/NavButton";
import { goalTranslater } from "../resources/function";


export const Exit = (props) => {
    var ran = false;
    const location = useLocation();
    const [goal, setGoal] = useState(location.state.goal);
    const [time, setTime] = useState(location.state.time);

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [postId, setPostId] = useState(null);

    useEffect(() => { 
        if (!ran) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "workoutLength": time,
                    "timestamp": Date.now()
                })
            };
            fetch('https://4fun-pi.vercel.app/send-workout-summary', requestOptions)
                .then(response => response.json())
                .then(data => setPostId(data.id))
                .catch(error => {
                    console.log(error);
                }).finally(setLoading(false));
            ran = true;
        }
    }, [])

    return <div className="h-screen bg-black p-4 grid">
        <div className="row-span-1">
        <h1 className="text-white text-2xl font-extrabold inline-block">Workout&nbsp;</h1>
        <h1 className="text-green text-2xl font-extrabold inline-block">Completed</h1>
        </div>
        <div className="row-span-1 bg-mediumGrey rounded-3xl pb-2 p-6">
            <GiPartyPopper className="text-7xl text-white"/>
            <h1 className="text-white text-2xl font-extrabold">Congratulations!&nbsp;</h1>
            <h1 className="text-white text-lg font-extrabold">You completed your workout!</h1>
        </div>
        <div className="row-span-1 mt-8"><hr /></div>
        <div className="row-span-1"><h1 className="text-white text-lg font-extrabold inline-block">Below is your&nbsp;</h1>
            <h1 className="text-green text-lg font-extrabold inline-block">Session Summary</h1></div>
    <div className="row-span-1 grid text-white bg-mediumGrey rounded-3xl p-6 h-36">
        <h1 className="text-white text-xl font-extrabold">Your Goal</h1>
            <h1 className="text-white text-xl font-extrabold">#{goalTranslater(goal).name}</h1>
            <h1 className="text-green text-2xl font-extrabold">{goalTranslater(goal).repxsets}&nbsp;&nbsp;&nbsp;&nbsp;</h1>
        </div>
        <div className="row-span-1 grid text-white bg-mediumGrey rounded-3xl p-6 h-28">
            <h1 className="text-white text-xl font-extrabold">Your Session Lasted</h1>
            <h1 className="text-green text-2xl font-extrabold inline-block">{timeFormatter(time)}</h1>
        </div>
        <center><NavButton name="Complete" path="/" icon={AiOutlineCheck} color={true} /></center>
    </div>
};

export default Exit;