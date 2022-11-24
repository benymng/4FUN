import React from "react";
import Navigation from "../components/Navigation";

export const Stats = () => {
  return (
    <div className="h-screen bg-black p-4 grid grid-rows-6">
      <h1 className="text-red font-extrabold row-span-1">Stats</h1>
      <div className="row-span-5"></div>
      <Navigation className="row-span-1" />
    </div>
  );
};
