import React from 'react'
import { useState, useEffect } from 'react';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryTheme, VictoryTooltip, VictoryGroup, VictoryScatter } from "victory";
import DistanceGraph from './DistanceGraph';
import AccelGraph from './AccelGraph';
import Switch from "./Switch";
import StabilityGraph from './StabilityGraph';

export const GraphDisplay = () => {
    const [selectedDisplay, setSelectedDisplay] = useState(0);
    const [displayGraph, setDisplayGraph] = useState([
        DistanceGraph,
        AccelGraph,
        StabilityGraph,
    ]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const switchGraph = (choice) => { 
        setSelectedDisplay(choice);
    }
  return (
      <div className="w-auto m-0 grid h-60 lg:grid-cols-2">
          {React.createElement(displayGraph[selectedDisplay])}
          <div className="grid grid-cols-3 place-items-center gap-1 self-center">
              <Switch className="col-span-1 inline-block" name="Distance" id={ 0} selected={selectedDisplay} func={switchGraph} />
              <Switch className="col-span-1 inline-block" name="Acceleration" id={1} selected={selectedDisplay} func={switchGraph} />
              <Switch className="col-span-1 inline-block" name="Stability" id={2} selected={selectedDisplay} func={switchGraph} />
          </div></div>
  )
}

export default GraphDisplay;