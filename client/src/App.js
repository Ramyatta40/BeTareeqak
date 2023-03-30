import React, { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Map from "./components/Map/Map";
import Rode from "./components/Rode/Rode";


const App = () => {
  return (

    <Fragment>
      <Navbar />
      <Container className="mb-4">

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Map" element={<Map />} />


          <Route path="/Rode" element={<Rode />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Container>

    </Fragment>

  );
};

export default App;
