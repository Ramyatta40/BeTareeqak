import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,

} from "firebase/auth";
import { auth } from "./firebaseAuth";
const PICKUP_LOC_STORAGE_KEY = "pickupLoc";
const DESTINATION_LOC_STORAGE_KEY = "destinationLoc";
const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {

  const [user, setUser] = useState({});
  const [pickupLoc, setPickupLoc] = useState(localStorage.getItem(PICKUP_LOC_STORAGE_KEY) || '');
  const [destinationLoc, setDestinationLoc] = useState(localStorage.getItem(DESTINATION_LOC_STORAGE_KEY) || '');
const [currentUserData,setCurrentUserData] = useState({});
  useEffect(() => {
    localStorage.setItem(PICKUP_LOC_STORAGE_KEY, pickupLoc);
  }, [pickupLoc]);

  useEffect(() => {
    localStorage.setItem(DESTINATION_LOC_STORAGE_KEY, destinationLoc);
  }, [destinationLoc]);
  const setPickupAndDestination = (pickup, destination) => {
    setPickupLoc(pickup);
    setDestinationLoc(destination);

  };
  const getPickup = () => {
    return pickupLoc;
  };
  const getDestination = () => {
    return destinationLoc;
  };


  // Create user function for Register ------------------------------
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // Sign in ----------------------------------------------------------
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  //Log Out --------------------------------------------------------
  const logout = () => {
    return signOut(auth);

  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);

    });
    
    unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ createUser, user, logout, signIn, setPickupAndDestination, getPickup, getDestination }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
