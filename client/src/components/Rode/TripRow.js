import React, { useState } from 'react';
import './Rode.css';
import { UserAuth } from '../authentication/AuthContext';
import { db } from "../authentication/firebaseAuth";
import { collection, getDocs, addDoc, doc, updateDoc } from "firebase/firestore"

function TripRow(props) {
    const {user} = UserAuth();
        var currentUserEmail = user.email;
      
    
    
    if (currentUserEmail !=null) {
      console.log(currentUserEmail);
    } else {
      console.log("currentUserEmail is null")
    }



function handleBookButton() {
    console.log(props.tripId);
const tripDoc = doc(db, "Trips",props.tripId);
var passengersArray = [];
passengersArray =  props.passengers;

if (passengersArray.length < 3) {
    passengersArray.push(currentUserEmail);
    const newFields = {passengers: passengersArray};
updateDoc(tripDoc,newFields);
} else {
    alert("the trip is full ");
}


}


    return (
        
<tr>
            <th>{props.pickup}</th>
            <th>{props.destination}</th>
            <th>{props.time}</th>
            <th>{props.passengers}</th>
            <th><button type='submit' onClick={handleBookButton}  >book this trip</button></th>
          </tr>
        


    )
}
export default TripRow;