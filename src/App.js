import React, { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Map from "./components/Map";

const App = () => {
  return (
    <Fragment>
    <Navbar />
    <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Map" element={<Map />} />
          <Route path="/about" element={<About />} />
        </Routes>
        </Container>
        
        </Fragment>
  );
};

export default App;
