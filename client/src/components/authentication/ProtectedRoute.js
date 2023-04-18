import React, { useEffect, useState } from 'react';
import { Navigate } from "react-router-dom";
import { auth } from './firebaseAuth';
import { onAuthStateChanged } from 'firebase/auth';
import { UserAuth } from './AuthContext';

const ProtectedRoute = ({children}) => {

 // user state declaration -------------------------------------------------------------------
const {user } = UserAuth();


// user state declaration -------------------------------------------------------------------






    if (user){
  return (children) ;
}
else{
return <Navigate to = '/Login'/>;

}
}

export default ProtectedRoute;