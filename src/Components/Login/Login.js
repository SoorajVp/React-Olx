import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import Logo from '../../olx-logo.png';
import './Login.css';




function Login() {
  // const db = getFirestore(Firebase)
  const navigate = useNavigate();
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const [ error, setError ] = useState(null);



  const submitHandler = (e) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, Email, Password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("logged in Successfully ...", user.uid);
        
        navigate('/')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorCode);
        console.log("error: " + errorMessage, errorCode);
      });
  }

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>

        <form onSubmit={submitHandler}>
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
          <button>Login</button>
        </form>

        <a>Signup</a>
      </div>
    </div>
  );
}

export default Login;
