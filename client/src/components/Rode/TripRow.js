import React, { useState } from 'react';
import './Rode.css';
import { UserAuth } from '../authentication/AuthContext';
import { db } from "../authentication/firebaseAuth";
import { collection, getDocs, addDoc, doc, updateDoc } from "firebase/firestore"

function TripRow(props) {
    var passengersArray = [];

    const { user } = UserAuth();
    var currentUserEmail = user.email;
    const tripDoc = doc(db, "Trips", props.tripId);
    passengersArray = props.passengers;
    const [bookBtnVisibility, setBookBtnVisibility] = useState("visible");
    const [cancelBtnVisibility, setCancelBtnVisibility] = useState("hidden");




    function handleCancelButton() {
        if (passengersArray.includes(currentUserEmail)) {

            try {
                passengersArray.splice(passengersArray.indexOf(currentUserEmail), 1);
                const newFields = { passengers: passengersArray };
                updateDoc(tripDoc, newFields);

            } catch (error) {
                console.log(error.message);
            }
            setBookBtnVisibility("visible");
            setCancelBtnVisibility("hidden");
        } else {
            alert("you aren't in this trip")
        }
    }

    function handleBookButton() {
        console.log(props.tripId);

        if (passengersArray.includes(currentUserEmail)) {
            alert("already booked")
        }
        else {
            if (passengersArray.length < 3) {
                passengersArray.push(currentUserEmail);
                const newFields = { passengers: passengersArray };
                updateDoc(tripDoc, newFields);
            } else {
                alert("the trip is full ");
            }
            setBookBtnVisibility("hidden");
            setCancelBtnVisibility("visible");
        }

    }


    return (

        <tr>
            <th>{props.pickup}</th>
            <th>{props.destination}</th>
            <th>{props.time}</th>
            <th>{passengersArray}</th>
            <th><button  visibility={bookBtnVisibility} onClick={handleBookButton}  >{"book trip"}</button>
                <button  visibility={cancelBtnVisibility} onClick={handleCancelButton}  >{"cancel trip"}</button>
            </th>
        </tr>



    )
}
export default TripRow;