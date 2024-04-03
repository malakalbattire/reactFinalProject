import { jwtDecode } from 'jwt-decode';
import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();
const UserContextProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(localStorage.getItem('userToken') ? localStorage.getItem('userToken') : '');
  const [userName, setUserName] = useState(null);
  const getUserData = () => {
    if (userToken) {
      const decode = jwtDecode(userToken);
      setUserName(decode.userName);
    }
  };
  useEffect(() => {
    userToken ? localStorage.setItem('userToken', userToken) : localStorage.removeItem('userToken');
    getUserData();
  }, [userToken]);
  return <UserContext.Provider value={{ setUserToken, setUserName, userName, userToken }}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
