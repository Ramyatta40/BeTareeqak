import React, { useEffect, useState } from 'react';
import './Rode.css';
import TripRow from './TripRow';
import { UserAuth } from '../authentication/AuthContext';
import { db } from "../authentication/firebaseAuth";
import { collection, getDocs, addDoc } from "firebase/firestore"
function Rode() {

  const tripsCollectionRef = collection(db, "Trips");
  const { getPickup } = UserAuth();
  const { getDestination } = UserAuth();
  const [modal, setModal] = useState(false);
  const [trips, setTrips] = useState([]);

  const [time, setTime] = useState('');
  console.log("Pick up location :  " + getPickup() + " and destination is : " + getDestination());

  // creating new trip entery ----------------------------
  const createTrip = async () => {
    await addDoc(tripsCollectionRef, { pickup: getPickup(), destination: getDestination(), time: time ,passengers: []});

  }
  // creating new trip entery ----------------------------


  function handleAddNewTrip() {
    toggleModal();
  }
  const toggleModal = () => {
    setModal(!modal);
  };
  if (modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (time === '') {
      alert("you have to fill the time section");
    } else {
      console.log(time);
      try {
        createTrip();
        toggleModal();
      }
      catch (error) {
        alert("somthing went wronge , error :" + error.message);


      }


    }
  }

  // showing Trips 
  useEffect(() => {
    const getTrips = async () => {
      const tripsData = await getDocs(tripsCollectionRef);
      setTrips(tripsData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getTrips();

  }, []);



  return (
    <div className="journeyTable">

      <h2>Journey 1</h2>
      <table>
        <thead>
          <tr>
            <th>Pick up </th>
            <th>Destination</th>
            <th>Time of beginnig</th>
            <th>Passengers</th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip) => {
            return (
              <TripRow 
              key = {trip.id}
              pickup={trip.pickup}
                destination={trip.destination}
                time={trip.time}
                passengers={trip.passengers}
                tripId={trip.id} />
            )
          })}

        </tbody>
      </table>
      <button onClick={handleAddNewTrip}>Add new Trip</button>
      <br />
      {modal && (
        <div className="modalForm">
          <div onClick={toggleModal} className="overlayForm"></div>
          <div className="modalForm-content">
            <h2>Fill the Information Below</h2>
            <form onSubmit={handleSubmit} >
              <label>Pick up label :</label>
              <input type='text' placeholder='pick up Label' />
              <br />
              <label>destination label :</label>
              <input type='text' placeholder='destination Label' />
              <br />
              <label>Pick up Place :</label>
              <input type='text' value={getPickup()} placeholder='pick up ' />
              <br />
              <label>Destination :  </label>
              <input type='text' value={getDestination()} placeholder='Destination' />
              <br />
              <label>Time of start :  </label>
              <input type='time' onChange={(e) => { console.log(e.target.value); setTime(e.target.value); }} />
              <br />
              <button type='submit' value={"submit"}   >Add new Trip</button>
            </form>
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}


    </div>
  );
}

export default Rode;
