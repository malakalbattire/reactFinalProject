//import  sheinLogo  from '../assets/shein.png';
import './NavBar.css';
import { BiSearch } from 'react-icons/bi';
import { BiSolidUser } from 'react-icons/bi';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import CategoriesName from '../pages/categories/CategoriesName';
import { useContext } from 'react';
import { UserContext } from '../context/User';
import ProductsQantity from '../pages/cart/ProductsQantity';

export default function NavBar() {
  const { setUserToken, setUserName, userToken, userName } = useContext(UserContext);
  const logout = () => {
    setUserToken('');
    setUserName(null);
  };

  return (
    <nav className="navbar sticky-top d-flex flex-column gap-2 fl navbar-expand-lg navbar-light  shadow-sm p-3 mb-5 bg-white  ">
      <div className="  d-flex justify-content-between  justify-content-center flex-nowrap w-100">
        <NavLink className=" logo navbar-brand" to="/">
          SHEIN
        </NavLink>
        <div className="search d-flex">
          <label></label>
          <input className="searchInput border border-dark" type="text"></input>
          <button className="serachBtn ">
            <BiSearch className="serachIcon" />
          </button>
        </div>
   
        
          <div className="row " id="navbarSupportedContent">
            <ul className=" d-flex justify-content-center  align-items-center navbar-nav  mb-lg-0 flex-nowrap flex-row">
              <li className="nav-item dropdown">
                <a className="dropdown-toggle nav-link" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <BiSolidUser />
                </a>
                <ul className="dropdown-menu unstyled">
                  {userToken ? (
                    <>
                      <li>
                        <NavLink className="dropdown-item text-capitalize" to="/profile">
                          hello {userName}
                        </NavLink>
                      </li>
                      <li>
                        <button onClick={logout} className="dropdown-item text-capitalize">
                          Log out
                        </button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <NavLink className="dropdown-item" to="/signin">
                          Sign In
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className="dropdown-item" to="/signup">
                          Sign Up
                        </NavLink>
                      </li>
                    </>
                  )}
                </ul>
              </li>
              <li>
                <NavLink className="navLinkk cart" to="/cart">
                  <div className="container d-flex align-items-center ">
                    <AiOutlineShoppingCart className="cartIcon" />
                    <div className="quantity d-flex  ">
                      <ProductsQantity />
                    </div>
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>
      
      </div>
      <div className=" category container d-flex justify-content-center flex-nowrap ">
        <ul className=" ulCat d-flex flex-row justify-content-center navbar-nav mr-auto ">
          <li className="nav-item2row ">
            <NavLink className=" nav-link " role="button" aria-expanded="false" to="/">
              Home
            </NavLink>
          </li>
          <li className="nav-item2row dropdown">
            <NavLink
              className=" nav-link  dropdown-toggle nav-link"
              data-bs-toggle="dropdown"
              role="button"
              aria-expanded="false"
              to="/categories"
            >
              Categories
            </NavLink>
            <ul className=" categoryName dropdown-menu ">
              <li className="w-100 ">
                <CategoriesName />
              </li>
            </ul>
          </li>
          <li className="nav-item2row ">
            <NavLink className=" nav-link  " role="button" aria-expanded="false" to="/allProducts">
              Products
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
