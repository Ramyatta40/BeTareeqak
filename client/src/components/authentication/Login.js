import React,{useState,useEffect} from 'react';
import { signInWithEmailAndPassword,onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseAuth';
import './Login.css';
import { useNavigate } from 'react-router-dom';




function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // user state declaration -------------------------------------------------------------------
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
  
      if (user) {
        setAuthUser(user);
        
      } else {
        setAuthUser(null);
        
      }
  
      return () => {
        listen();
      };
    });
  }, []);
// user state declaration -------------------------------------------------------------------

  // onClick 
  const navigate = useNavigate();
  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        //window.location.href = '/Map';
        navigate('/Map');
      })
      .catch((error) => {
        console.log(error.message);
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
        <a href="/Register" className="sign-up">
          Sign Up
        </a>
      </div>
    </div>
  );
}

export default Login;