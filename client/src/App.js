import React, { Fragment, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./components/Home/Home";
import About from "./components/About";
import Map from "./components/Map/Map";
import Rode from "./components/Rode/Rode";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import { auth } from "./components/authentication/firebaseAuth";
import { onAuthStateChanged } from "firebase/auth";
import ProtectedRoute from "./components/authentication/ProtectedRoute";
import { AuthContextProvider } from "./components/authentication/AuthContext";
const App = () => {
  // user state declaration -------------------------------------------------------------------
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }

      
    });
    return () => {
      listen();
    };
  }, []);
  // user state declaration -------------------------------------------------------------------

  return (
    <Fragment>
      <Container className="mb-4">
        <AuthContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/Map"
              element={
                //<ProtectedRoute>
                  <Map />
                //</ProtectedRoute>
              }
            />

            <Route path="/Rode" element={<Rode />} />
            <Route path="/about" element={<About />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
          </Routes>{" "}
        </AuthContextProvider>
      </Container>
    </Fragment>
  );
};

export default App;
