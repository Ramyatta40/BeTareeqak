import React,{useState} from 'react';
import './Register.css';


function Register() {
    

    return(
      
        <div>
<div className="signup-form">
  <div className='image'></div>
  <h1 className='title' >BETAREEQAK</h1>

  <form action="#" method="post">
    <input type="text" placeholder=" User Name" className="txt" name="UserName" />
    <input type="email" placeholder=" Email" className="txt" name="Email" />
    <input type="password" placeholder=" Password" className="txt" name="Password" />
    <input type="password" placeholder=" Confirm Password" className="txt" name="Cpass" />
    <input type="submit" defaultValue="Create a Account" className="btn" name="btn-save" />
    <a href> Already Hava a Account</a>
  </form>
</div>


        </div>
        
    )
}
export default Register;