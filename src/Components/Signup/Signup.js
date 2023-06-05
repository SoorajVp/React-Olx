import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../Store/Context';
import { getFirestore, collection, addDoc } from 'firebase/firestore/lite';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { Firebase } from '../../Firebase/Config';




export default function Signup() {

  const { Firebase } = useContext(FirebaseContext);
  const navigate = useNavigate();
  const db = getFirestore(Firebase)
  const [Username, setUsername] = useState();
  const [Email, setEmail] = useState();
  const [Mobile, setMobile] = useState();
  const [Password, setPassword] = useState();

  const [ error, setError ] = useState(null);

  const submitHandler = (e) => {

    e.preventDefault();
    if( Username && Email && Mobile && Password ){
      const auth = getAuth();
      createUserWithEmailAndPassword( auth, Email, Password )
        .then((userCredential) => {
          // Signed in 
          
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
           displayName: Username
         })
          user.displayName = Username ;
 
          addDoc(collection(db, "users"), {
           id: user?.uid,
           name: Username,
           email: Email,
           mobile: Mobile
         });
         navigate('/');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(errorCode)
          console.log(errorCode)
          // ..
        });
    } else {
      setError(" Fill all the fields required")
    }

   
  
  }


  return (
    <div>
      <div className="signupParentDiv">

        <img width="200px" height="180px" src={Logo}></img>

        <form onSubmit={submitHandler}>
          <label htmlFor="fname" className='label'>Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <label htmlFor="fname" className='label'>Email</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname" className='label'>Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            value={Mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <br />
          <label htmlFor="lname" className='label'>Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          { error && <p className='error'>{error}</p> }
          
          <br />
          <button>Signup</button><br/>
          
        </form>
        <a href='/login'>Login</a>
      </div>
    </div>
  );
}
