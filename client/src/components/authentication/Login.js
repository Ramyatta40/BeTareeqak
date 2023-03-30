import React from 'react';
import './Login.css';

function Login() {
  return (
    <div className="bb">
      <div className="box">
        <h1>Login</h1>
        <form>
          <label>Username</label>
          <div>
            <i className="fa-solid fa-user"></i>
            <input type="text" placeholder="Enter Username" />
          </div>
          <label>Password</label>
          <div>
            <i className="fa-solid fa-lock"></i>
            <input type="password" placeholder="Enter Password" />
          </div>
          <a href="#" className="forgot">
            Forgot Password?
          </a>
          <input type="submit" value="Login" />
        </form>
        <a href="#" className="sign-up">
          Sign Up
        </a>
      </div>
    </div>
  );
}

export default Login;