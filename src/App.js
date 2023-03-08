import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Map from "./components/Map";

const App = () => {
  return (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Map" element={<Map />} />
          <Route path="/about" element={<About />} />
        </Routes>
  );
};

export default App;
