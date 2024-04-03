import { NavLink } from 'react-router-dom';

export default function ProtectedRoutesMessage() {
  return (
    <div className="container d-flex justify-content-center align-items-center flex-column w-50 gap-3 ">
    <h4 className='text-center'>Please Sing In To View All Products</h4>
    <NavLink to="/signin">
        <button className="btn btn-outline-success w-100 text-white bg-dark">Sign In</button> 
    </NavLink>
</div>
  )
}
