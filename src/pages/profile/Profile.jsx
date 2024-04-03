import { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../loader/Loader';
import './Profile.css';
import GetOrder from '../order/GetOrder';

export default function Profile() {
  const [loader, setLoader] = useState([]);
  const [error, setError] = useState('');
  const [profile, setProfile] = useState([]);
  const showCart = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const { data } = await axios.get(`https://ecommerce-node4-five.vercel.app/user/profile`, {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      });
      setProfile(data.user);
    } catch (error) {
      setError('error loading cart');
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    showCart();
  }, []);

  if (loader) {
    return <Loader />;
  }
  return (
    <>
      {error ?? <p className="error"> {error}</p>}

      <div className="container d-flex flex-column shadow p-3 mb-5 bg-body rounded gap-4">
        <div className="d-flex  align-items-center gap-4">
          <img className="profileImg rounded-circle" src={profile.image.secure_url}></img>
          <h2 className="text-capitalize">{profile.userName}</h2>
        </div>
        <p> Email: {profile.email}</p>
        <div className="bg-light p-2">
          <h4>My Orders:</h4>
          <GetOrder />
        </div>
      </div>
    </>
  );
}
