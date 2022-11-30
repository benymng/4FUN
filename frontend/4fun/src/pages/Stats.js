import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";

export const Stats = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => { 
    fetch("https://4fun-pi.vercel.app/get-filtered-data").then(response => {
      if (response.ok) {
        return response.json();
      } throw response;
    }).then(data => { setData(data) })
      .catch(error => {
        console.log(error);
      }).finally(setLoading(false))
  }, [])

  useEffect(() => {
    console.log(data);
  }, [data])

  if (loading) return "loading";
  if (error) return error;
    
  return (
    <div className="h-screen bg-black p-4 grid">
      <div className="row-span-1">
        <h1 className="text-white text-2xl font-extrabold inline-block">History &&nbsp;</h1>
        <h1 className="text-green text-2xl font-extrabold inline-block">Statistics</h1>
      </div>
      <Navigation className="row-span-1" />
    </div>
  );
};

export default Stats;