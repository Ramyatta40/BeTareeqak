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
  const [modal, setModal] = useState(false)




  // On Submit handling
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password)
      .then( x => {navigate("/");})
      ;
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }

    
  };
const toggleModal = () => {
    setModal(!modal);
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
          <a href="#" onClick={toggleModal} className="forgot">
            Forgot Password?
          </a>
          <input type="submit" value="Login" />
        </form>
        <a href="/Register" className="sign-up">
          Sign Up
        </a>
      </div>
      {modal && (
        <div className="modalForm">
          <div onClick={toggleModal} className="overlayForm"></div>
          <div className="modalForm-content">
            <h2>Enter the email to change the password</h2>
            <form onSubmit={handleSubmit}>
              <label>Email</label>
              <br/>
            <input type="email" placeholder=" Email" />
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
            <button className="send modal"></button>
            </form>
            
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
