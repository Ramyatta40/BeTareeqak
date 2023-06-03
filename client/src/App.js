
/*  هنا النافبار لن يظهر في كل من صفحة تسجيل الدخول وصفحة انشاء الحساب وصفحة الرئيسية */
import React, { Fragment, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About";
import Map from "./components/Map/Map";
import Rode from "./components/Rode/Rode";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import Profile from "./components/Profile/Profile";

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

  const location = useLocation();
  const shouldShowNavbar = !(location.pathname === "/" || location.pathname === "/Login" || location.pathname === "/Register");

  return (
    <Fragment>
      {shouldShowNavbar && <Navbar />}
      <Container className="mb-4">
        <AuthContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/Map"
              element={
                <ProtectedRoute>
                  <Map />
                </ProtectedRoute>
              }
            />

            <Route path="/Rode" element={<ProtectedRoute><Rode /></ProtectedRoute>} />
            <Route path="/about" element={<About />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Profile" element={<ProtectedRoute> <Profile /></ProtectedRoute>} />

            <Route path="/Register" element={<Register />} />
          </Routes>{" "}
        </AuthContextProvider>
      </Container>
    </Fragment>
  );
};

export default App;

