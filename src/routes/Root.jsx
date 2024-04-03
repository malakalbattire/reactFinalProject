import  Navbar  from '../components/NavBar';
import { Outlet } from 'react-router-dom';
//import  Footer  from '../components/Footer';
export default function Root() {
  return (
    <div >
        <Navbar />
        <div className='container'>
        <Outlet/>
        </div>
        
        
    </div>
  )
}