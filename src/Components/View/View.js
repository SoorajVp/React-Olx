import React, { useEffect, useState, useContext } from 'react';

import './View.css';
import { PostContext } from '../../Store/PostContext';
import { FirebaseContext } from '../../Store/Context';
import { collection, query, where, getDocs, getFirestore } from 'firebase/firestore';
// import { Firebase } from '../../Firebase/Config';


function View() {

  const [ userDetails, setUserDetails] = useState([]);
  const { postDetails } = useContext(PostContext);
  const { Firebase } = useContext(FirebaseContext);

  useEffect(() => {

    const { userId } = postDetails;
    const db = getFirestore(Firebase)
    console.log(postDetails)

    getDocs(query(collection(db, "users"), where("id", "==", userId)))
      .then((querySnapshot) => {
        const details = querySnapshot.docs.map((doc) => doc.data());
        console.log(details)
        setUserDetails(details[0])
      })
      .catch((error) => {
        console.log("Error fetching documents:", error);
      });
  }, [])

  if( postDetails?.length === 0 ) {
    return <h2>Loading ...</h2>
  }

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails?.imageUrl}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails?.price} </p>
          <h5>{postDetails?.name} </h5>
          <p>{postDetails?.category}</p>
          <h7>{postDetails?.createdOn}</h7>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails?.name}</p>
          <p>{userDetails?.mobile}</p>
        </div>
      </div>
    </div>
  );
}
export default View;
