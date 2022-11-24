import React, { useState, useEffect } from "react";
import { Link, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { LivePage } from "./pages/LivePage";
import { Login } from "./pages/Login";
import { Stats } from "./pages/Stats";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/live" element={<LivePage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
