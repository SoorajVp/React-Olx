import React, { useContext } from 'react';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext } from '../../Store/Context';
import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { SearchContext } from '../../Store/SearchContext';
import './Header.css';




function Header() {

  const { setSearchValue } = useContext(SearchContext)
  const { user, setUser } = useContext(AuthContext)
  const navigate = useNavigate();
  console.log(" This is user console ...",user);

  const Logout = () => {
    const auth = getAuth();
    console.log("logout")
    signOut(auth).then(() => {
      setUser(false);
    })
  }

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName" onClick={()=> navigate('/') }>
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>

          <input type="text" onChange={(e)=> setSearchValue(e.target.value)} onBlur={()=>setSearchValue('')} />
          
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
              onChange={(e)=> setSearchValue(e.target.value)}
              onBlur={()=>setSearchValue('')}
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          {user ? user.displayName : <Link to='/login'> Login </Link>}
          <hr />
        </div>
        {user && <span onClick={Logout}>Logout </span> }

        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>

            { user ? <Link to={'/create'}><span style={{color: "black", textDecoration: 'none'}}> SELL</span> </Link> : <Link to={'/login'}><span style={{color: "black", textDecoration: 'none'}}> SELL</span> </Link> }
            
          </div>
        </div>

      </div>
    </div>
  );
}

export default Header;
