import React from 'react'
import Timer from './Timer'
import { HiFire } from "react-icons/hi";
import { useState, useEffect } from 'react';
import { BsFillPauseFill } from "react-icons/bs"

export const Tracker = (props) => {
    const css1 = `
    #parent {
        position:relative;
    }
    #gradientoutline {
        position:absolute;
        width: 300px;
        height:300px;
        max-width:80vw;
        max-height:auto;
        top:0;
        left:0;
        margin-left:auto;
        right:0;
        margin-right:auto;
        text-align: center;

        --angle: 0deg;
        animation:spin 20s linear infinite;
        border: double 10px transparent;
        border-radius: 100%;
        background-image: linear-gradient(#1A1C1E, #1A1C1E), radial-gradient(ellipse at top right, #ED7F7B, #B8F993);
        background-origin: border-box;
        background-clip: padding-box, border-box;
    }
    @keyframes spin { 
        100% { 
            -webkit-transform: rotate(360deg); 
            transform:rotate(360deg); 
        } 
    }`

    const css2 = `
    #parent {
        position:relative;
    }
    #gradientoutline {
        position:absolute;
        width: 300px;
        height:300px;
        max-width:80vw;
        max-height:auto;
        top:0;
        left:0;
        margin-left:auto;
        right:0;
        margin-right:auto;
        text-align: center;

        --angle: 0deg;
        animation:spin 20s linear infinite;
        border: double 10px transparent;
        border-radius: 100%;
        background-image: linear-gradient(transparent, transparent), radial-gradient(ellipse at top right, #ED7F7B, #B8F993);
        background-origin: border-box;
        background-clip: padding-box, border-box;
    }
    @keyframes spin { 
        100% { 
            -webkit-transform: rotate(360deg); 
            transform:rotate(360deg); 
        } 
    }`

    const [startTime, setStartTime] = useState(props.startTime);

    const [tracker, setTracker] = useState({
        animate: "animate-bounce",
        running: props.running,
        icon: HiFire,
        css: css1
    });

    useEffect(() => {
        if (props.running) {
            setTracker(tracker => ({ ...tracker, ...{ animate: "animate-bounce", running: props.running, icon: HiFire, css:css1 } }));
        }
        else {
            setTracker(tracker => ({ ...tracker, ...{ animate: "", running: props.running, icon: BsFillPauseFill, css:css2} }));
        }
    }, [props.running]);

  return (
      <div className="justify-self-center place-items-center h-72 w-72 overflow-hidden" id="parent">
          <div className="grid justify-items-center pt-16 gap-2">
              <h1 className="row-span-1 text-white text-lg font-extrabold z-50">{tracker.running ? "Lat Pulldown" : "Workout Paused"}</h1>
              <Timer className="row-span-2 z-50" startTime={startTime} running={tracker.running} />
              <div className={`row-span-1 h-20 w-20 mt-3 z-50 text-red place-self-center ` + tracker.animate}><center>{React.createElement(tracker.icon, { style: { fontSize: "5rem" } })}</center></div>
          </div>
          <div id="gradientoutline"><style>{tracker.css}</style></div>
      </div>
  )
}

export default Tracker;