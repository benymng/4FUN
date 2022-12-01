import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import { months } from "../resources/function";
import { timeFormatter } from "../resources/function";
import GraphDisplay from "../components/GraphDisplay";
import Sessions from "../components/Sessions";
import BarDisplay from "../components/BarDisplay";
import { std } from 'mathjs'

export const Stats = () => {
  const [suggestion, setSuggestion] = useState("...");
  const [stdDev, setStdDev] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [thirdDerY, setThirdDerY] = useState(null);

  const [stability, setStability] = useState([
    { x: 0, y: 0 },
  ])

  useEffect(() => {
    fetch("https://4fun-pi.vercel.app/get-filtered-data/thirdDerY").then(response => {
      if (response.ok) {
        return response.json();
      } throw response;
    }).then(data => { setThirdDerY(data) })
      .catch(error => {
        console.log(error);
      }).finally(setLoading(false))
  }, [])

  useEffect(
    () => {
      if (thirdDerY) {
        let temp = thirdDerY[thirdDerY.length - 1]["data"];
        let stddev = std(temp);
        if (stddev != stdDev) {
          setStdDev(stddev);
        }
      }
    },
    [thirdDerY])
  
  useEffect(() => { 
    if (stdDev > 6000) {
      setSuggestion("Too Difficult");
    } else if (stdDev > 4000) {
      setSuggestion("Appropriate");
    } else {
      setSuggestion("Too Easy");
    }
  })

  if (loading) return loading;
  if (error) return error;
    
  return (
    <div className="h-screen bg-black p-4 grid fixed top-0 left-0 right-0 gap-3">
      <div className="row-span-1">
        <h1 className="text-white text-2xl font-extrabold inline-block">History &&nbsp;</h1>
        <h1 className="text-green text-2xl font-extrabold inline-block">Statistics</h1>
      </div>
      <div className="row-span-1 text-white bg-mediumGrey rounded-3xl p-2 h-76 lg:h-60 gap-0">
        <h1 className="text-green text-lg font-extrabold pt-4 pl-4">Set Information</h1>
        <GraphDisplay className="m-0 " />
      </div>
      <div className="row-span-1 text-white bg-mediumGrey rounded-3xl p-2 lg:h-60 h-60 gap-0">
        <h1 className="text-green text-lg pt-4 pl-4 font-extrabold">Recent Sessions</h1>
        <BarDisplay className="m-0" />
      </div>
      <div className="row-span-1 text-black font-extrabold w-full text-sm bg-green rounded-3xl p-2 h-9 gap-0 place-self-center"><center>Level of difficulty: {suggestion}</center></div>
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