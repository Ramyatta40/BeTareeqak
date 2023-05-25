import React, { useEffect, useState } from "react";
import "./Profile.css";
import { UserAuth } from "../authentication/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  collection,
  getDoc,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../authentication/firebaseAuth";

function Profile() {
  const { logout } = UserAuth();
  // const [currentUserEmail,setCurrentUserEmail] = useState(user.email);
  const { user } = UserAuth();
  var currentUserEmail = user.email;
  var currentUserData;
  //const [] = useState();
   const usersCollectionRef = collection(db, "Users");
  const [isLoading, setIsLoading] = useState(true);
  const [phone, setPhone] = useState("");
  const [isDriver, setIsDriver] = useState(false);
  const [userId, setUserId] = useState();
  const [name, setName] = useState("user name");
 
  const [usersData, setUsersData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [plateNum, setPlateNum] = useState("");
  const [carModel, setCarModel] = useState("");
  const navigate = useNavigate();

  const [modal, setModal] = useState(false);
  const [editPhone,setEditPhone] = useState(false);
  const [newPhone,setNewPhone] = useState('');
  const [error,setError] = useState('');

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
      setIsDriver(currentUserData.driver);
      setUserId(currentUserData.id);
      setPlateNum(currentUserData.plateNum);
      setCarModel(currentUserData.carModel)
     // driverDoc = doc(db, "Users", currentUserData.id);
    }
  }, [currentUserEmail, usersData]);
  

  const getUserByEmail = (email) => {
    return usersData.find((user) => user.email === email);
  };
  const toggleModal = () => {
    setModal(!modal);
    console.log(userId);
  };
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
const handlePhoneChange = async() => {
  if (!phoneNumberIsValid(newPhone)) {
    setError("Invalid phone number. Please enter a valid phone number starting with '079', '078', or '077', followed by 7 additional digits.");
    
  }
  else {
  try {
    const newFields ={phone: newPhone};
    const userDoc = doc(db, "Users", userId);
    await updateDoc(userDoc, newFields);
    setPhone(newPhone);
    setEditPhone(false);
    //window.location.reload();
  } catch (error) {
    console.log(error.message);
  }
}
  
}
const phoneNumberIsValid = (phoneNumber) => {
  const phoneNumberRegex = /^(079|078|077)\d{7}$/;
  return phoneNumberRegex.test(phoneNumber);
};
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleSubmitDriver = () => {
    if (plateNum === "" || carModel === "") {
      alert("You have to fill All sections !");
    } else {
      try {
        
        const newFields = {
          driver: true,
          plateNum: plateNum,
          carModel: carModel,
        };
        const userDoc = doc(db, "Users", userId);
        updateDoc(userDoc, newFields);
        setIsDriver(true);
        toggleModal();
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="card-container">
      <div className="animated-bg"></div> {/* Add the animated background */}
      <div className="card">
        <div className="profile-info">
          <h1 className="username-profile">{name}</h1>
          <p className="email-profile">E-Mail Address : { currentUserEmail}</p>
          <label className="phn">Phone Number: {phone}</label>
          {!editPhone && (<button className="action-button" onClick={()=>{setEditPhone(true)}}>Change Phone Number</button> )}
{editPhone && (<div> 
  {error && <p className="warning-paragraph" style={{ color: "red" }}>{error}</p>}
  <input className="gredient_input" type="text" placeholder="new phone number" onChange={(e)=>{setNewPhone(e.target.value)}}/>
  <button className="action-button" onClick={handlePhoneChange}>Change</button>
  <button className="action-button" onClick={()=>{setEditPhone(false);setError('')}
} >Cancel</button>
</div> )}
          {isDriver && (<label className="phn">Car Plate Number: {plateNum}</label>)}
          {isDriver && ( <label className="phn">Car Model: {carModel}</label>)}
          
         
        </div>
        <div className="image-section">
          {selectedImage && (
            <div className="imageWrapper">
              <img src={selectedImage} alt="Selected" />
            </div>
          )}

         
          <input
            id="imageUpload"
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={handleImageChange}
          />
        </div>
        <div className="action-section">
          <div>
            {!isDriver && <p>DO YOU HAVE A CAR?</p>}
            {!isDriver && (
              <button
                className="action-button"
                onClick={() => {
                  toggleModal();
                }}
              >
                BECOME A DRIVER
              </button>
            )}
            <button className="action-button" onClick={handleLogout}>
              Log out
            </button>
          </div>
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
                <input
                  type="text"
                  placeholder="## - ######"
                  onChange={(e) => {
                    setPlateNum(e.target.value);
                  }}
                />
                <span></span>
              </div>
            </div>

            <div className="form-group">
              <label>Your Car Model:</label>
              <input
                id="stationExactPlace"
                type="text"
                placeholder="Car Model"
                onChange={(e) => {
                  setCarModel(e.target.value);
                }}
              />
            </div>

            <button className="submit-button" onClick={handleSubmitDriver}>
              Submit Information
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
