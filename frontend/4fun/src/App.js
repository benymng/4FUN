// import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { LivePage } from "./pages/LivePage";
import { Login } from "./pages/Login";
import { Stats } from "./pages/Stats";
import { Exit } from "./pages/Exit";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/live" element={<LivePage />} />
          <Route path="/exit" element={<Exit />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
