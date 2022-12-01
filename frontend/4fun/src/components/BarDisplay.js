import React from 'react'
import { useState, useEffect } from 'react';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryTheme, VictoryTooltip, VictoryGroup, VictoryScatter } from "victory";
import RepBar from './RepBar';
import Switch from "./Switch";
import TimeBar from "./TimeBar";

export const BarDisplay = () => {
    const [selectedDisplay, setSelectedDisplay] = useState(0);
    const [displayGraph, setDisplayGraph] = useState([
        TimeBar,
        RepBar
    ]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const switchGraph = (choice) => { 
        setSelectedDisplay(choice);
    }
  return (
      <div className="w-auto m-0 grid h-40 lg:grid-cols-2 lg:h-60">
          {React.createElement(displayGraph[selectedDisplay])}
          <div className="grid grid-cols-2 place-items-center gap-0 self-center">
              <Switch className="col-span-1 inline-block" name="Time" id={0} selected={selectedDisplay} func={switchGraph} />
              <Switch className="col-span-1 inline-block" name="Reps" id={1} selected={selectedDisplay} func={switchGraph} />
          </div></div>
  )
}

export default BarDisplay;