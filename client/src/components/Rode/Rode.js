import React, { useEffect, useRef, useState } from "react";
import "./Rode.css";
import TripRow from "./TripRow";
import { UserAuth } from "../authentication/AuthContext";
import { db } from "../authentication/firebaseAuth";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import { Input, HStack } from '@chakra-ui/react'


const libraries = ['places'];

function Rode() {
  // const [] = useState();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDkvayJNjcKUagFyd9BU6PY-ewXwcLlu68",
    libraries,
  })
  //const stationsCollectionRef = collection(db, "Stations");
  const tripsCollectionRef = collection(db, "Trips");
const [pickupLoc,setPickupLoc]=useState('');
const[destinationLoc,setDestinationLoc]=useState('');
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [trips, setTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const currentDatetime = new Date().toISOString().slice(0, 16);
  const [stationAdd, setStationAdd] = useState('');
  const [stationLabelAdd, setStationLabelAdd] = useState('');
  const [stationList, setStationList] = useState([]);
  const { user } = UserAuth();
  var currentUserEmail = user.email;
  var currentUserData;
  const [name, setName] = useState('user name');
  const [phone, setPhone] = useState('');
  const [time, setTime] = useState("");
  const usersCollectionRef = collection(db, "Users");
  const [usersData, setUsersData] = useState([]);
  const [isDriver,setIsDriver] = useState(false);
  const [price,setPrice] = useState();

  // console.log(
  //   "Pick up location :  " +
  //   getPickup() +
  //   " and destination is : " +
  //   getDestination()
  // );

  useEffect(() => {

    const getUsersData = async () => {
      try {

        const data = await getDocs(usersCollectionRef);
        setUsersData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.log(error);
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
    }

  }, [currentUserEmail, usersData])

  const getUserByEmail = (email) => {

    return usersData.find(user => user.email === email);

  }
// creating new trip entery ----------------------------
  const createTrip = async () => {
    await addDoc(tripsCollectionRef, {
      pickup: pickupLoc,
      destination:destinationLoc,
      time: time,
      passengers: [],
      passengersNames:[]
    });
  };
  // creating new trip entery ----------------------------



  function handleAddNewTrip() {
    toggleModal();
  }

  const toggleModal = () => {
    setModal(!modal);
  };
  const toggleModal2 = () => {
    setModal2(!modal2);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (time === "" || pickupLoc===''|| destinationLoc === '') {
      alert("you have to fill All sectios");
    } else {
      console.log(time);
      try {
        createTrip();
        toggleModal();
      } catch (error) {
        console.log(error.message)
        alert("somthing went wronge , error :" + error.message);
      }
    }
  }
  // adding new station --------------------------------------------------
  function handleAddStation(e) {
    e.preventDefault();
    try {

      if (stationLabelAdd === '' || stationAdd === '') {
        alert("You have to fill all sections!")

      } else {


        console.log(stationAdd + '--- ' + stationLabelAdd);
        //createStation();
        toggleModal2();
      }

    } catch (error) {
      console.log(error.message);
    }


  }


  // showing Trips
  useEffect(() => {
    const getTrips = async () => {
      const tripsData = await getDocs(tripsCollectionRef);
      setTrips(tripsData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))   );

    };
    getTrips();

   

  }, []);

  return (
    <div className="journeyTable">
      <div className="animated-bg"></div> {/* Add the animated background */}

      <button className="ADD" onClick={handleAddNewTrip}>Add new Trip</button>
      {/* <button onClick={toggleModal2}>Add new Station</button> */}
      <br />
      <h2>All Available Trips</h2>
      

      <table>
        <thead>
          <tr>
            <th>Pick up </th>
            <th>Destination</th>
            <th>Time of beginning</th>
            <th>Passengers</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip) => {
            return (
              <TripRow
                key={trip.id}
                pickup={trip.pickup}
                destination={trip.destination}
                time={trip.time}
                passengers={trip.passengers}
                tripId={trip.id}
                passengersNames = {trip.passengersNames}
              />
            );
          })}
        </tbody>
      </table>

      {modal && (
        <div className="modalForm">
          <div onClick={toggleModal} className="overlayForm"></div>
          <div className="modalForm-content">
            <h2>Fill the Information Below</h2>
            <form onSubmit={handleSubmit}>

              <label>Pick up Place :</label>
              <Autocomplete>
                <input type="text" placeholder="pick up " onChange={(e)=>{setPickupLoc(e.target.value)}}/>
              </Autocomplete>
              <br />
              <label>Destination : </label>
              <Autocomplete>
                <input
                  type="text"
                  onChange={(e)=>{setDestinationLoc(e.target.value)}}
                  placeholder="Destination"
                />
              </Autocomplete>

              <br />
              <label>Time of start : </label>
              <input
                type="datetime-local"
                min={currentDatetime}
                onChange={(e) => {
                  console.log(e.target.value);
                  setTime(e.target.value);
                }}
              />
              <br />
              <button className="add" type="submit" value={"submit"}>
                ADD NEW TRIP
              </button>
            </form>
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
            
          </div>
        </div>
      )}
      {modal2 && (
        <div className="modalForm">
          <div onClick={toggleModal2} className="overlayForm"></div>
          <div className="modalForm-content">
            <button className="close-modal" onClick={toggleModal2}>
              close
            </button>
            <h2>Add new Station </h2>

            {/* <form onSubmit={handleAddStation}> */}

            <label>Station label :</label>
            <input id="stationLabel" type="text" placeholder="Station Label" onChange={(e) => { setStationLabelAdd(e.target.value) }} />
            <br />
            <HStack>
              <label>Station exact Place :</label>
              <Autocomplete>
                <Input id="stationExactPlace" type="text" placeholder="Station exact Place :" onChange={(e) => { setStationAdd(e.target.value) }} />
                {/* onChange={(e)=>{setStationAdd(e.target.value)}  } */}
              </Autocomplete></HStack>
            <br />
            <button onClick={handleAddStation} >
              Add new Station
            </button>

            {/* </form> */}
            

          </div>
        </div>
      )}
    </div>
  );
}

export default Rode;
