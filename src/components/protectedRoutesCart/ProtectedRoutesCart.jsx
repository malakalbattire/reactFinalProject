import { Navigate } from 'react-router-dom';

export default function ProtectedRoutesCart({children}) {
    const token= localStorage.getItem('userToken');

    if(!token){
        return <Navigate to='/protectedRoutesCartMessage' replace/>
    }
  return children;
}
