import React,{useState} from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseAuth';
import './Login.css';





function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  
  
    };





  return (
    <div className="bb">
      <div className="box">
        <h1>Login</h1>
        <form onSubmit={signIn}>
          <label>Email</label>
          <div>
            <i className="fa-solid fa-user"></i>
            <input type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} />
          </div>
          <label>Password</label>
          <div>
            <i className="fa-solid fa-lock"></i>
            <input type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} />
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