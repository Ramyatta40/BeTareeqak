import React, { useState } from "react";
import "./Profile.css";
import { UserAuth } from "../authentication/AuthContext";
import { useNavigate } from "react-router-dom";



function Profile() {
  const {logout} = UserAuth();
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/")
    } catch (error) {
      console.log(error.message)
    }
    
    
      };

  return (
    <div className="profile_a">
                <div className="animated-bg"></div> {/* Add the animated background */}

      <h1 className="username_Profile">username</h1>
      <p className="email_Profile">email</p>
      <label htmlFor="imageUpload" className="button profile-label">
        Select Image
      </label>
      <input
        id="imageUpload"
        type="file"
        accept=".jpg,.jpeg,.png"
        onChange={handleImageChange}
      />
      {selectedImage && (
        <div className="imageWrapper">
          <img src={selectedImage} alt="Selected" />
        </div>
      )}
      <button onClick={handleLogout}> Log out</button>
    </div>
  );
}

export default Profile;