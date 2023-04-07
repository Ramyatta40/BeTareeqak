import React,{useState} from 'react';
import './Register.css';


function Register() {
    

    return(
        <div>
<div>
  
  {/* custome css  */}
  <link rel="stylesheet" href="./style.css" />
  <title>Registration</title>
  <div className="main-parent">
    <div className="form-wrap">
      <form action>
        <h1><span>betareeqak</span></h1>
        <div className="single-input">
          <input id="fname" type="text" placeholder="First name" required />
        </div>
        <div className="single-input">
          <input id="lname" type="text" placeholder="Last name" required />
        </div>
        <div className="single-input">
          <input id="email" type="email" placeholder="Email Address" required />
        </div>
        <div className="single-input">
          <input id="pass" type="password" placeholder="Password" required />
        </div>
        <div className="single-input">
          <input id="cpass" type="password" placeholder="Confirm Password" required />
        </div>
        <div className="submit-button">
          <button className="button">Submit</button>
        </div>
        <div className="account-have">
          <a href>Forget Password</a>
          <a href>Have an account please Login</a>
        </div>
      </form>
    </div>
  </div>
</div>

        </div>
    )
}
export default Register;