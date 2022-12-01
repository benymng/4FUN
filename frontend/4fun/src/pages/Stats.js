import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import { months } from "../resources/function";
import { timeFormatter } from "../resources/function";
import GraphDisplay from "../components/GraphDisplay";
import Sessions from "../components/Sessions";
import BarDisplay from "../components/BarDisplay";

export const Stats = () => {
    
  return (
    <div className="h-screen bg-black p-4 grid fixed top-0 left-0 right-0">
      <div className="row-span-1">
        <h1 className="text-white text-2xl font-extrabold inline-block">History &&nbsp;</h1>
        <h1 className="text-green text-2xl font-extrabold inline-block">Statistics</h1>
      </div>
      <div className="row-span-1 text-white bg-mediumGrey rounded-3xl p-2 h-80 gap-0">
        <h1 className="text-green text-lg font-extrabold pt-4 pl-4">Set Information</h1>
        <GraphDisplay className="m-0" />
      </div>
      <div className="row-span-1 text-white bg-mediumGrey rounded-3xl p-2 h-60 gap-0">
        <h1 className="text-green text-lg pt-4 pl-4 font-extrabold">Recent Sessions</h1>
        <BarDisplay className="m-0" />
      </div>
      <Navigation className="row-span-1" />
    </div>
  );
};

export default Stats;

/*
1. # reps from previous 10 sets
2. rep graph from recent set (move around?)
3. acceleration graph from recent set
4. time from previous 5 sessions
*/