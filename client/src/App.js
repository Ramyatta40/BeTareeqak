/* <Navbar />  هون الاصلي النافبار بامكانك حذف  */
/*ورح يختفي النافبار وتصير الصفحات لينكد بدون نافبار  من الصفحة الرئيسية  */

/*import React, { Fragment, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Navbar from "./components/Navbar/Navbar";
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
      <Navbar />
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
*/




/*   هون انه شرط يظهر النافبار في كل الصفحات ماعدا الصفحة الرئيسية  */
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
import { auth } from "./components/authentication/firebaseAuth";
import { onAuthStateChanged } from "firebase/auth";
import ProtectedRoute from "./components/authentication/ProtectedRoute";
import { AuthContextProvider } from "./components/authentication/AuthContext";

const App = () => {
const [authUser, setAuthUser] = useState(null);
const location = useLocation(); 

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

const shouldShowNavbar = location.pathname !== "/";

return (
<Fragment>
{shouldShowNavbar && <Navbar />} {}
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
</Routes>
</AuthContextProvider>
</Container>
</Fragment>
);
};

export default App;