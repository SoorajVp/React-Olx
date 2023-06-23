import React, { Fragment, useContext, useState, useEffect } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Firebase } from '../../Firebase/Config';
import { AuthContext } from '../../Store/Context';


const Create = () => {

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { setUser } = useContext(AuthContext)

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null)
  
  const date = new Date();

  const db = getFirestore(Firebase)


  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (userDetails) => {
      if (userDetails) {
        setUser(userDetails)
      } else {
        console.log(" No User ...")
      }
    });
  }, [])

  const handleSubmit = () => {
    if (name && category && price && image) {
      const storage = getStorage();
      const storageRef = ref(storage, `images/${image.name}`);
      // Product creating
      uploadBytes(storageRef, image).then((snapshot) => {
        getDownloadURL(storageRef).then((url) => {
          addDoc(collection(db, "products"), {
            name,
            category,
            price,
            imageUrl: url,
            userId: user?.uid,
            createdOn: date.toDateString()
          });
          navigate('/')

        }).catch((error) => {
          console.log('Error getting download URL:', error);
          setError(error)

        });

      });

    } else {
      setError('Fill all the fields required')
    }

  }

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <label htmlFor="fname" className='label'>Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label htmlFor="fname" className='label'>Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <br />
          <label htmlFor="fname" className='label'>Price</label>
          <br />
          <input className="input" type="number" id="fname" name="Price" value={price}
            onChange={(e) => setPrice(e.target.value)} />
          <br />
          <br />
          {image && <img alt="Posts" width="200px" height="200px" src={URL.createObjectURL(image)} ></img>}

          <br />
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          <br />
          { error && <p className='error'>{error}</p> }

          <button className="uploadBtn" onClick={handleSubmit}>upload and Submit</button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
