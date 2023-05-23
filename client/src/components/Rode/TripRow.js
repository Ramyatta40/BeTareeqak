import React, { useEffect, useState } from 'react';
import './Rode.css';
import { UserAuth } from '../authentication/AuthContext';
import { db } from "../authentication/firebaseAuth";
import { collection, getDocs, addDoc, doc, updateDoc } from "firebase/firestore"
import { useNavigate } from 'react-router-dom';

function TripRow(props) {
    var passengersArray = [];
    var passengersNames = [];
    const { user } = UserAuth();

    var currentUserEmail = user.email;
    var currentUserData;
    const [name, setName] = useState('user name');
    const [isLoading, setIsLoading] = useState(true);
    const [phone, setPhone] = useState('');
    const [isDriver, setIsDriver] = useState(false);
    const [] = useState();
    const usersCollectionRef = collection(db, "Users");
    const [usersData, setUsersData] = useState([]);
    const tripDoc = doc(db, "Trips", props.tripId);
    passengersArray = props.passengers;
    passengersNames = props.passengersNames;
    const [bookBtnVisibility, setBookBtnVisibility] = useState(!passengersArray.includes(currentUserEmail));
    const [cancelBtnVisibility, setCancelBtnVisibility] = useState(passengersArray.includes(currentUserEmail));
    const [time, setTime] = useState('');
    const navigate = useNavigate();
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
        // console.log(currentUserEmail);
    }, []);

    useEffect(() => {
        currentUserData = getUserByEmail(currentUserEmail);
        // console.log(currentUserEmail);
        //console.log(currentUserData);
        if (currentUserData) {
            setName(currentUserData.name);
            setPhone(currentUserData.phone);
            setIsDriver(currentUserData.driver);
        }

    }, [currentUserEmail, usersData])


    const getUserByEmail = (email) => {

        return usersData.find(user => user.email === email);

    }

    function handleCancelButton() {
        if (passengersArray.includes(currentUserEmail)) {

            try {
                passengersArray.splice(passengersArray.indexOf(currentUserEmail), 1);
                passengersNames.splice(passengersNames.indexOf(name),1)
                const newFields = { passengers: passengersArray };
                updateDoc(tripDoc, newFields);
                setBookBtnVisibility(true);
                setCancelBtnVisibility(false);
            } catch (error) {
                console.log(error.message);
            }

        } else {
            alert("you are not in this trip")
        }
    }

    function handleBookButton() {
        console.log(props.tripId);

        if (passengersArray.includes(currentUserEmail)) {
            alert("already booked")
        }
        else {

            try {
                if (passengersArray.length < 3) {
                    passengersArray.push(currentUserEmail);
                    passengersNames.push(name);
                    const newFields = { passengers: passengersArray,passengersNames :passengersNames };
                    updateDoc(tripDoc, newFields);
                    setBookBtnVisibility(false);
                    setCancelBtnVisibility(true);


                } else {
                    alert("the trip is full ");
                }

            } catch (error) {
                console.log(error.message);
            }

        }

    }
    function handleCalculateRoute() {
        navigate("/Map", { state: { pickup: props.pickup, destination: props.destination } });
    }

    return (

        <tr>
            <th>{props.pickup}</th>
            <th>{props.destination}</th>
            <th>{props.time.split('T').join(' ')}</th>
            <th>{props.driver}</th>
            <th>{props.driverPhone}</th>
            <th>{props.plateNum}</th>
            <th>{props.carModel}</th>
            <th>{props.price}</th>
            <th>{passengersNames.join(' - ')}</th>

            <th>
                {bookBtnVisibility && (<button onClick={handleBookButton}  >{"book trip"}</button>)}

                {cancelBtnVisibility && (<button onClick={handleCancelButton}  >{"cancel trip"}</button>)}
                <button onClick={handleCalculateRoute} >Calculate Route</button>

            </th>
        </tr>



    )
}
export default TripRow;