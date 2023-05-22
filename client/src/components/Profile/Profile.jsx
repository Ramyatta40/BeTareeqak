import React, { useEffect, useState } from "react";
import "./Profile.css";
import { UserAuth } from "../authentication/AuthContext";
import { useNavigate } from "react-router-dom";
import { collection, getDoc, getDocs,updateDoc,doc } from "firebase/firestore";
import { db } from "../authentication/firebaseAuth";



function Profile() {

  const { logout } = UserAuth();
  // const [currentUserEmail,setCurrentUserEmail] = useState(user.email);
  const { user } = UserAuth();
  var currentUserEmail = user.email;
  var currentUserData;
  const [name, setName] = useState('user name');
  const [isLoading, setIsLoading] = useState(true);
  const [phone, setPhone] = useState('');
  const [isDriver, setIsDriver] = useState(false);
  //const [] = useState();
  const usersCollectionRef = collection(db, "Users");
  const [usersData, setUsersData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [plateNum, setPlateNum] = useState('');
  const [carModel, setCarModel] = useState('');
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
var driverDoc;

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
      driverDoc = doc(db,"Users",currentUserData.id);
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
if(plateNum === '' || carModel === ''){
  alert("You have to fill All sections !");
}
else{
  try {
    setIsDriver(true)
    const newFields = {driver : isDriver,plateNum: plateNum, carModel: carModel};
updateDoc(driverDoc,newFields);
toggleModal();
  } catch (error) {
    console.log(error.message);
  }
}


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
            {!isDriver && (<p>DO YOU HAVE A CAR?</p>)}
            {!isDriver && (<button className="action-button" onClick={() => { toggleModal() }}>BECOME A DRIVER</button>)}
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
                <input type="text" placeholder="## - ######" onChange={(e)=>{setPlateNum(e.target.value)}} />
                <span></span>

              </div>
            </div>

            <div className="form-group">
              <label>Your Car Model:</label>
              <input id="stationExactPlace" type="text" placeholder="Car Model" onChange={(e)=>{setCarModel(e.target.value)}} />
            </div>

            <button className="submit-button" onClick={handleSubmitDriver} >Submit Information</button>
          </div>
        </div>
      )}
    </div>


  );
}

export default Profile;