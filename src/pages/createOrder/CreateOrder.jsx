import axios from 'axios';
import { useEffect, useState } from 'react';
import { Bounce, toast } from 'react-toastify';
import Loader from '../loader/Loader';

export default function CreateOrder() {
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState('');
  const [carts, setCarts] = useState([]);
  const [createOrder, setCreateOrder] = useState({
    couponName: '',
    address: '',
    phone: '',
  });
  const getCart = async () => {
    const token = localStorage.getItem('userToken');
    try {
      const { data } = await axios.get('https://ecommerce-node4-five.vercel.app/cart', {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      });

      setCarts(data.products);
      setError('');
    } catch (error) {
      setError('error loading orders');
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    getCart();
  }, []);
  const handelChange = e => {
    const { name, value } = e.target;
    setCreateOrder({
      ...createOrder,
      [name]: value,
    });
  };

  const handelSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem('userToken');
    try {
      const { data } = await axios.post(`https://ecommerce-node4-five.vercel.app/order`, createOrder, {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      });
      setCreateOrder({
        couponName: '',
        address: '',
        phone: '',
      });
      toast.success('order Successfully', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      });

    } catch (error) {
      toast.error('error create order', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      });
    } finally {
      setLoader(false);
    }
  };
  if (loader) {
    return <Loader />;
  }

  return (
    <div>
      <h2 className='p-2'>Place Order:</h2>
      {error ?? <p className="error"> {error}</p>}
      {carts.map(products => (
        <>
          <div className="container bg-light d-flex gap-4 p-2   align-items-center">
            <div className="container w-100 d-flex gap-2">
              <img className="cartImg" src={products.details.mainImage.secure_url}></img>
              <div className="d-flex flex-column w-100">
                <span>{products.details.name}</span>
                <div className=" container d-flex justify-content-between align-items-end">
                  <div>
                    <span className="text-danger">{products.details.price}$</span>
                  </div>
                  <div className="d-flex gap-3">
                    <div className="increasCont d-flex   ">
                      <h2>{products.quantity}</h2>
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ))}
      <form onSubmit={handelSubmit} className="d-flex flex-column gap-3   ">
        <div className="d-flex flex-column">
          <label>coupon Name:</label>
          <input type="text" value={createOrder.couponName} name="couponName" onChange={handelChange} />
        </div>
        <div className="d-flex flex-column">
          <label>address:</label>
          <input type="address" value={createOrder.address} name="address" onChange={handelChange} />
        </div>
        <div className="d-flex flex-column">
          <label>phone Number:</label>
          <input type="Phone" value={createOrder.phone} name="phone" onChange={handelChange} />
        </div>

        <button type="submit" className="btn text-white w-100 bg-dark btn-primary ">
          Submit
        </button>
      </form>
    </div>
  );
}
