import React from "react";
import { useState, useEffect } from 'react'
import Navigation from '../components/Navigation.js';

const Home = () => {

  return (
    <div className="h-screen bg-black p-4 grid grid-rows-6">
      <h1 className="text-red font-extrabold row-span-1">Home</h1>
      <div className="row-span-5"></div>
      <Navigation className="row-span-1"/>
    </div>
  );
};

export default Home;
