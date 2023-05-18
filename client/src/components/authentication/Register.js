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
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { createUser } = UserAuth();
  const { logout } = UserAuth();

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

      navigate("/");
    } catch (e) {
      setError(e.message);
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
      <div className="signup-form">
        <div className="image"></div>
        <h1 className="title">signup</h1>

        <form action="#" onSubmit={handleRegisterSubmit}>
          <div>
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
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>

          <div>
            <input
              type="submit"
              defaultValue="Create a Account"
              className="btn"
              name="btn-save"
            />
          </div>

          <a href="/Login"> Already Have an Account</a>
        </form>
      </div>
    </div>
  );
}
export default Register;



