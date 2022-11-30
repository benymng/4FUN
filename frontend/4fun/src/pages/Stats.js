import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import { months } from "../resources/function";
import { timeFormatter } from "../resources/function";
import GraphDisplay from "../components/GraphDisplay";

export const Stats = () => {
  const [loading, setLoading] = useState(true);
  const [workoutSummary, setWorkoutSummary] = useState(null);
  const [workoutSummaryStr, setWorkoutSummaryStr] = useState("");
  const [error, setError] = useState(null);


  useEffect(() => {
    fetch("https://4fun-pi.vercel.app/get-workout-summary").then(response => {
      if (response.ok) {
        return response.json();
      } throw response;
    }).then(data => { setWorkoutSummary(data) })
      .catch(error => {
        console.log(error);
      }).finally(setLoading(false))
  }, [])

  useEffect(() => {
    if (workoutSummary) {
      let temp = ""
      workoutSummary.forEach((summary) => {
        var date = new Date(summary.timestamp);
        temp = temp + months[date.getMonth()] + " " + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + " - " + timeFormatter(summary.workoutLength) + "\n";
      })
      if (temp != workoutSummaryStr) {
        setWorkoutSummaryStr(temp);
      }
    }
  }, [workoutSummary])

  if (loading) return "loading";
  if (error) return error;
    
  return (
    <div className="h-screen bg-black p-4 grid fixed top-0 left-0 right-0">
      <div className="row-span-1">
        <h1 className="text-white text-2xl font-extrabold inline-block">History &&nbsp;</h1>
        <h1 className="text-green text-2xl font-extrabold inline-block">Statistics</h1>
      </div>
      <div className="row-span-1 text-white bg-mediumGrey rounded-3xl p-2 h-80 gap-0">
        <h1 className="text-green text-xl font-extrabold pt-4 pl-4">Most Recent Set</h1>
        <GraphDisplay className="m-0" />
      </div>
      <div className="row-span-1 grid text-white bg-mediumGrey rounded-3xl p-6 h-40 gap-2">
        <h1 className="text-green text-xl font-extrabold">Recent Sessions</h1>
          <h1 className="col-span-1 text-md font-extrabold inline-block overflow-scroll whitespace-pre-line">{workoutSummaryStr}</h1></div>
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