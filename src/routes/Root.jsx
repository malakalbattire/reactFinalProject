import Navbar from '../components/NavBar';
import { Outlet } from 'react-router-dom';
export default function Root() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
}
