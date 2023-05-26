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
  const { user } = UserAuth();
  const [modal, setModal] = useState(false);

  // On Submit handling
  const handleSubmitReset = () => {}
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password).then((x) => {
        navigate("/Rode");
        window.location.reload();
      });
    } catch (error) {
      if (error.code == 'auth/wrong-password' || error.code == 'auth/user-not-found') {
        setError("Wrong Email or Password");
      } else {
        setError('connection error');
      }
      
      console.log(error.message);
    }
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleSend = () => {
    // هاض تبع البريد
    console.log();
  };

  return (
    
    <div className="bb">
      <div className="animated-bg"></div> {/* Add the animated background */}
      <div className="box">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <div>
          
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <label>Password</label>
          <div>
           
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
          {error && <p  style={{ color: "red", marginTop: "35px" }}>{error}</p>}
          <input type="submit" value="Login" />
        </form>
        <a href="/Register" className="sign-up">
          Sign Up
        </a>
        <a href="/" className="sign-up">
          Go Back to Home Page
        </a>
      </div>
      {modal && (
        <div className="modalForm">
          <div onClick={toggleModal} className="overlayForm"></div>
          <div className="modalForm-content">
            <h5>Enter the email to change the password</h5>
            <form onSubmit={handleSubmitReset}>
              <label className="em">Email </label>&nbsp;
              <input type="Email" placeholder=" Email" className="pp" />
            </form>
            <br />
            <button className="Lclose-modal" onClick={toggleModal}>
              CLOSE
            </button>
            <button className="sen" onClick={handleSend}>
              SEND
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
