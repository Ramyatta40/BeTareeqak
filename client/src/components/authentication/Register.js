import React, { useState } from "react";
import "./Register.css";

import { UserAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [userName, setUserName] = useState("");
const [phone,setPhone] = useState(-1);
const [] = useState(false);
const [error, setError] = useState("");
  const navigate = useNavigate();

  const { createUser } = UserAuth();
  const { logout } = UserAuth();

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await createUser(email, password);


      navigate("/");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };


  return (
   
    
    <div className="ss">
      <div className="signup-form">
        <div className="image"></div>
        <h1 className="title">signup</h1>

        <form action="#" onSubmit={handleRegisterSubmit}>
          <div>
           <label>user name</label>
            <input
              type="text"
              placeholder=" Full Name"
              className="txt"
              name="UserName"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            
          </div>

          <label>your email</label>
            <input
              type="email"
              placeholder=" Email"
              className="txt"
              name="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />


          <div>
            <label className="pass" >password</label>
            <input
              type="password"
              placeholder=" Password"
              className="txt"
              name="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <div>
            <label>Confirm password</label>
            <input
              type="password"
              placeholder=" Confirm Password"
              className="txt"
              name="Cpass"
              onChange={(e) => {
                setConfPassword(e.target.value);
              }}
            />
          </div>

          <div>
          <label>phone</label>
            <input
              type="text"
              placeholder=" phone number"
              className="phonenumber"
              name="phone"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </div>

          <div>
            <input
              type="submit"
              defaultValue="Create a Account"
              className="btn"
              name="btn-save"
            />
          </div>

          <a href="/Login"> Already Hava a Account</a>
        </form>
      </div>
    </div>
    

  );
}
export default Register;
