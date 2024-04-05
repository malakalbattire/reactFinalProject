import axios from 'axios';
import { useState, useEffect } from 'react';

import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'
import Loader from '../loader/Loader';

export default function OrderSummery() {
    const [item, setItem] = useState([]);
    const [loader, setLoader] = useState(true);
  const [error, setError] = useState('');
    const showCart = async () => {
        try {
          const token = localStorage.getItem('userToken');
          const { data } = await axios.get(`https://ecommerce-node4-five.vercel.app/cart`, {
            headers: {
              Authorization: `Tariq__${token}`,
            },
          });
          setItem(data.products);
        } catch (error) {
          setError('error loading cart');
        } finally {
          setLoader(false);
        }
      };
      useEffect(() => {
        showCart();
      }, [item]);
      if (loader) {
        return <Loader />;
      }
  return (
    <>
      
        <>
          <div className="w-100 d-flex flex-column">
            <div className="d-flex align-items-center w-100">
              <h5 className="w-50">Total:</h5>
              <h5 className="d-flex w-50 justify-content-end">
                {item.reduce((total, product) => total + product.details.price * product.quantity, 0) + '$'}
              </h5>
            </div>

            <div className=" d-flex align-items-center w-100 border-bottom ">
              <h5 className="w-50">Discount:</h5>
              <h5 className="d-flex w-50 justify-content-end">
                {item.reduce((total, product) => total + product.details.discount * product.quantity, 0) + '$'}
              </h5>
            </div>
            <div className="subtotal d-flex align-items-center w-100">
              <h5 className="w-50">Subtotal:</h5>
              <h5 className="d-flex w-50 justify-content-end">
                {item.reduce(
                  (total, product) => total + product.details.price * product.quantity - product.details.discount * product.quantity,
                  0
                ) + '$'}
              </h5>
            </div>
          </div>
        </>
    
    </>
  );
}
