import React, { useState } from "react";
import "./Register.css";

import { UserAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { db } from "../authentication/firebaseAuth";
import { collection, getDocs, addDoc } from "firebase/firestore";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [error2, setError2] = useState('');
  const navigate = useNavigate();
  const usersCollectionRef = collection(db, "Users");
  const { createUser } = UserAuth();
  const { logout } = UserAuth();



  const addNewUserData = async ()=> {
    try {
      await addDoc(usersCollectionRef,{
        name: userName,
        email: email.toLowerCase(),
        phone: phone,
        driver: false,
  
      });
    } catch (error) {
      console.log(error);
    }
 


  }
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!userName) {
      setError("Full name is required");
      return;
    }

    if (!emailIsValid(email)) {
      setError("Invalid email format");
      return;
    }

    if (!passwordIsValid(password)) {
      setError("Password should be at least 6 characters");
      return;
    }

    if (password !== confPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!phoneNumberIsValid(phone)) {
      setError("Invalid phone number. Please enter a valid phone number starting with '079', '078', or '077', followed by 7 additional digits.");
      return;
    }

    try {
      await createUser(email, password);
      await addNewUserData();
      navigate("/Rode");
      window.location.reload();
    } catch (e) {
      setError2(e.massage);
      if (e.code === 'auth/email-already-in-use') {
        setError('This Email Already Signed Up');
      }
      else{
        setError('Network connection Error');
      }

      
      console.log(e.message);
    }
  };

  const emailIsValid = (email) => {
    // Use regular expression for email format validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };

  const passwordIsValid = (password) => {
    return password.length >= 6;
  };

  const phoneNumberIsValid = (phoneNumber) => {
    const phoneNumberRegex = /^(079|078|077)\d{7}$/;
    return phoneNumberRegex.test(phoneNumber);
  };

  return (
    <div className="ss">
          <div className="animated-bg"></div> {/* Add the animated background */}

      <div className="signup-form">
        <div className="image"></div>
        <h1 className="title">signup</h1>

        <form action="#" onSubmit={handleRegisterSubmit}>
          <div>
            <label>User Full Name</label>
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
         
          <label>Email</label>

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
            <label>Password</label>
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
          <label>Confirm Password</label>

          <div>
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
          <label>Phone Number</label>

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
            {error && <p className="warning-paragraph" style={{ color: "red" }}>{error}</p>}
          </div>

          <div>
            <input
              type="submit"
              defaultValue="Create a Account"
              className="btn btn-submit"
              name="btn-save"
            />
          </div>

          <a href="/Login"> Already Have an Account</a>
          <a href="/"> Go Back to Home Page</a>
        </form>
      </div>
    </div>
  );
}
export default Register;



