import React,{useState} from 'react';
import './Register.css';

import { UserAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [userName,setUserName]= useState('');
const navigate = useNavigate();


    const {createUser} = UserAuth();
    const {logout} = UserAuth();

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  try{
await createUser(email,password);
navigate('/');
  }
catch(e){
  setError(e.message);
  console.log(e.message);
}

}
const signOutHandle = () => {
try {
  logout();
  console.log("loged out succesfully");
} catch (error) {
  console.log(error.message);
}


};


    return(
      
        <div>
<div className="signup-form">
  <div className='image'></div>
  <h1 className='title' >signup</h1>

  <form action="#" onSubmit={handleSubmit}>
    <input type="text" placeholder=" Full Name" className="txt" name="UserName" onChange={(e) => {setUserName(e.target.value)}} />
    <input type="email" placeholder=" Email" className="txt" name="Email"  onChange={(e) => {setEmail(e.target.value)}}/>
    <input type="password" placeholder=" Password" className="txt" name="Password" onChange={(e) => {setPassword(e.target.value)}} />
    <input type="password" placeholder=" Confirm Password" className="txt" name="Cpass" />
    <input type="number" placeholder=" phone number" className="phonenumber" name="Cpass" />

    <input type="submit" defaultValue="Create a Account" className="btn" name="btn-save" />
    <a href='/Login'> Already Hava a Account</a>
    
  </form>

</div>


        </div>
        
    )
}
export default Register;