import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <>
     <div className="bg-dark  text-center p-1 fixed-bottom">
      <NavLink className='navLinkk' to="https://ar.shein.com/">
        <h4 className="navLinkk d-flex text-white  ">Shein.com</h4>
        
      </NavLink>
     </div>
    
    </>
  
  );
}
