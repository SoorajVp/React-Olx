import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Shimmer from '../Shimmer/Shimmer';
import Heart from '../../assets/Heart';
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { Firebase } from '../../Firebase/Config';
import { PostContext } from '../../Store/PostContext';
import { SearchContext } from '../../Store/SearchContext';
import './Post.css';





function Posts() {

  const { searchValue } = useContext(SearchContext)
  const [ products, setProducts ] = useState([]);
  const [ filteredData, setFilteredData ] = useState([]);

  const { setPostDetails } = useContext(PostContext);
  const navigate = useNavigate();
  console.log(searchValue)
  console.log(filteredData)


  useEffect(()=> {
    const db = getFirestore(Firebase);
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const Products = querySnapshot.docs.map((doc) => doc.data());
        console.log("Products:", Products);
        setProducts(Products);
        setFilteredData(Products)
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [])


  useEffect(()=> {
    if(searchValue) {

      const SearchItems = products.filter((product) => {
        return product.name.toLowerCase().includes(searchValue.toLowerCase()) || product.category.toLowerCase().includes(searchValue.toLowerCase())
      })

      setFilteredData(SearchItems)
    }else {
      
      setFilteredData(products)
    }
  }, [searchValue])

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">

          {
            (searchValue && filteredData.length == 0 ) && <h4 style={{textAlign: 'center'}}>No Search results</h4>
          }
        { 

          products?.length === 0 ? <Shimmer/> :

          filteredData.map((item) => {
            return (
              <div
              className="card"
              onClick={() => {
                setPostDetails(item);
                localStorage.setItem('productDetails', JSON.stringify(item))
                console.log("This is local storage .....", JSON.parse(localStorage.getItem('productDetails')));
                navigate('/view');
              }}
            >
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
                <img src={item?.imageUrl} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {item?.price}</p>
                <span className="kilometer">{item?.category}</span>
                <p className="name"> {item?.name }</p>
              </div>
              <div className="date">
                <span>{item?.createdOn}</span>
              </div>
            </div>
            )
          })

          }

        </div>
      </div>
      
    </div>
  );
}

export default Posts;
