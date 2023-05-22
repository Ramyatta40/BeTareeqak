import React, { useEffect, useState } from "react";
import "./Profile.css";
import { UserAuth } from "../authentication/AuthContext";
import { useNavigate } from "react-router-dom";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "../authentication/firebaseAuth";



function Profile() {
  const { user } = UserAuth();
  const { logout } = UserAuth();
  // const [currentUserEmail,setCurrentUserEmail] = useState(user.email);
  var currentUserEmail = user.email;
  var currentUserData;
  const [name, setName] = useState('user name');
  const [isLoading, setIsLoading] = useState(true);
  const [phone, setPhone] = useState('');
  const [] = useState();
  const usersCollectionRef = collection(db, "Users");
  const [usersData, setUsersData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);


  useEffect(() => {

    const getUsersData = async () => {
      try {

        const data = await getDocs(usersCollectionRef);
        setUsersData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));



      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }

    };

    getUsersData();



    console.log(currentUserEmail);

  }, []);
  useEffect(() => {
    currentUserData = getUserByEmail(currentUserEmail);
    console.log(currentUserEmail);
    console.log(currentUserData);
    if (currentUserData) {
      setName(currentUserData.name);
      setPhone(currentUserData.phone);


    }

  }, [currentUserEmail, usersData])


  const getUserByEmail = (email) => {

    return usersData.find(user => user.email === email);

  }
  const toggleModal = () => {

    setModal(!modal);
  }
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
const handleSubmitDriver = () => {



}

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="card-container">
      <div className="animated-bg"></div> {/* Add the animated background */}

  <div className="card">
  <div className="animated-bg"></div> {/* Add the animated background */}

        <div className="profile-info">
          <h1 className="username-profile">{name}</h1>
          <p className="email-profile">{currentUserEmail}</p>
          <label className="phn">
            phone number: {phone}
          </label>
        </div>

        <div className="image-section">
          {selectedImage && (
            <div className="imageWrapper">
              <img src={selectedImage} alt="Selected" />
            </div>

          )}

          <label htmlFor="imageUpload" className="button profile-label">
            Select Image
          </label>
          <input
            id="imageUpload"
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={handleImageChange}
          />
        </div>

        <div className="action-section">
          <div>
          <p>DO YOU HAVE A CAR?</p>
          <button className="action-button" onClick={() => { toggleModal() }}>BECOME A DRIVER</button>
          <button className="action-button" onClick={handleLogout}>Log out</button></div>
        </div>
      </div>
      {modal && (
  <div className="modalForm">
    <div onClick={toggleModal} className="overlayForm"></div>
    <div className="modalForm-content">
      <button className="pclose-modal" onClick={toggleModal}>
        CLOSE
      </button>
      <h2>Register as a Driver</h2>

      <div className="form-group">
        <label>Your Car Plate Number:</label>
        <div className="input-group">
          <input type="text" placeholder="##" />
          <span></span>
          
        </div>
      </div>

      <div className="form-group">
        <label>Your Car Model:</label>
        <input id="stationExactPlace" type="text" placeholder="Station exact Place:" />
      </div>

      <button className="submit-button">Submit Information</button>
    </div>
  </div>
)}

    </div>


  );
}

export default Profile;