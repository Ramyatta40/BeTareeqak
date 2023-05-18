import React, { useState, useEffect } from "react";

import "./Login.css";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "./AuthContext";

function Login() {
  const { signIn } = UserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {user} = UserAuth();
 
  const [warning,setWarning] = useState(false);


 
  // On Submit handling
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password)
      .then( x => {navigate("/");})
      ;
      setWarning(false);
    } catch (error) {
      setError(error.message);
      console.log(error.message);
      setWarning(true);
    }
    
  };


  return (
    <div className="bb">
      
      <div className="box">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <div>
            <i className="fa-solid fa-user"></i>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <label>Password</label>
          <div>
            <i className="fa-solid fa-lock"></i>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <a href="#"  className="forgot">
            Forgot Password?
          </a>
          {warning && (<p className="text-danger">wronge Email or password</p>)}
          
          <input type="submit" value="Login" />
        </form>
        <a href="/Register" className="sign-up">
          Sign Up
        </a>
      </div>
    </div>
  );
}

export default Login;
