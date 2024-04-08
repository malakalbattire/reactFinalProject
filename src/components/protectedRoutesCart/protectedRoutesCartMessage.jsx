import { NavLink } from 'react-router-dom';
import cart from '../../assets/cart.png';
export default function protectedRoutesCartMessage() {
  return (
    <div className="container padBottom d-flex justify-content-center align-items-center flex-column w-50 gap-3 ">
      <img className="w-50" src={cart} alt="cart img" />
      <h4>YOUR CART IS EMPTY</h4>
      <p className="text-center">sign in to view your cart and start shopping</p>
      <NavLink to="/signin">
        <button className="btn btn-outline-success w-100 text-white bg-dark ">Sign In</button>
      </NavLink>
    </div>
  );
}
