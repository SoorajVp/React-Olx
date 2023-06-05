import React, { useEffect, useContext } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import './App.css';
import Signup from './Components/Signup/Signup';
import Login from './Components/Login/Login'
import { getAuth, onAuthStateChanged } from "firebase/auth";
/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import ViewPost from './Pages/ViewPost';
import { AuthContext } from './Store/Context';
import Create from './Pages/Create';

function App() {

  const { setUser } = useContext(AuthContext)
  // const { Firebase } = useContext(FirebaseContext)

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (userDetails) => {
      if (userDetails) {
        setUser(userDetails)
        console.log(userDetails)

      } else {
        console.log(" No User ...")
      } 
    });

  }, [])

  return (
    <div>
      <Home />
    </div>
  );
}

export const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  }, {
    path: 'signup',
    element: <Signup />
  }, {
    path: 'login',
    element: <Login />
  },{
    path: 'create',
    element: <Create />
  },{
    path: 'view',
    element: <ViewPost />
  }
])

// export default App;
