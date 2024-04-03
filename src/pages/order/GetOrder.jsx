/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import './GetOrder.css';
import axios from 'axios';
import Loader from '../loader/Loader';
import { NavLink } from 'react-router-dom';

export default function GetOrder() {
  const [loader, setLoader] = useState([]);
  const [error, setError] = useState('');
  const [getOrder, setGetOrder] = useState([]);
  const showOrders = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const { data } = await axios.get(`https://ecommerce-node4-five.vercel.app/order`, {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      });
      setGetOrder(data);
      console.log(data);
    } catch (error) {
      setError('error loading cart');
    } finally {
      setLoader(false);
    }
  };
  /*const cancelOrder = async (productId) => {
    try {
      const token = localStorage.getItem('userToken');
      const { data } = await axios.patch(
        `https://ecommerce-node4-five.vercel.app/order/cancel`,
        {productId},
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      console.log(data);
      if (data.message == 'success') {
        toast.success('cart cleared successfully', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
      }

      
    } catch (err) {
      console.log("err");
    }

    
  };
 */

  useEffect(() => {
    showOrders();
  }, []);
  if (loader) {
    return <Loader />;
  }

  return (
    <div>
      {error ?? <p className="error"> {error}</p>}

      <div className="">
        {
          <div>
            <div className="d-flex flex-column gap-3">
              {getOrder.orders.map((order, index) => (
                <div className="bg-white" key={index}>
                  <NavLink className="navLinkk" to="/orderdetails">
                    <div className="d-flex flex-column border-bottom p-2">
                      <span>
                        Status:
                        <span className="text-muted"> {order.status}</span>{' '}
                      </span>
                      <span>
                        Order #<span className="text-muted"> {order._id}</span>
                      </span>
                    </div>

                    <span className="d-flex gap-3 p-2 flex-wrap">
                      {order.products.map(product => (
                        <>
                          <div className='d-flex flex-column  ' key={product._id}>
                            <p className="text-muted">X{product.quantity}</p>

                            <img className="productImg d-flex " src={product.productId.mainImage.secure_url}></img>
                          </div>
                        </>
                      ))}
                    </span>
                    <h4 className=" p-2">Total Price: {order.finalPrice}$</h4>
                  </NavLink>
                </div>
              ))}
            </div>
          </div>
        }
      </div>
    </div>
  );
}
