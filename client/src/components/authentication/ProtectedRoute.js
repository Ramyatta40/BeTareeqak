import React, { useEffect, useState } from 'react';
import { Navigate } from "react-router-dom";
import { auth } from './firebaseAuth';
import { onAuthStateChanged } from 'firebase/auth';

const ProtectedRoute = ({children}) => {

 // user state declaration -------------------------------------------------------------------
 const [authUser, setAuthUser] = useState(null);

 useEffect(() => {
   const listen = onAuthStateChanged(auth, (user) => {
 
     if (user) {
       setAuthUser(user);
       
     } else {
       setAuthUser(null);
       
     }
 
     //return () => {
       listen();
     //};
   });
 }, []);
// user state declaration -------------------------------------------------------------------






    if (authUser){
  return (children) ;
}
else{
return <Navigate to = '/Login'/>;

}
}

export default ProtectedRoute;