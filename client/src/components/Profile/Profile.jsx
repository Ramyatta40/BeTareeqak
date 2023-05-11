import React, { useState } from "react";
import "./Profile.css";

function Profile() {
  const [selectedImage, setSelectedImage] = useState(null);

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

  return (
    <div className="profile_a">
      <h1 className="username_Profile">username</h1>
      <p className="email_Profile">email</p>
      <label htmlFor="imageUpload" className="button">
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
    </div>
  );
}

export default Profile;