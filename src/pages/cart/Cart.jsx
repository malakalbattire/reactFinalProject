/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useState, useEffect } from 'react';
import './Cart.css';
import { Bounce, toast } from 'react-toastify';
import Loader from '../loader/Loader';
import { FaTrash } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import AllProducts from '../allProducts/AllProducts';

export default function Cart() {
  const [loader, setLoader] = useState([]);
  const [error, setError] = useState('');
  const [item, setItem] = useState([]);
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
  }, []);

  const removeItemContext = async productId => {
    try {
      const token = localStorage.getItem('userToken');
      const { data } = await axios.patch(
        `https://ecommerce-node4-five.vercel.app/cart/removeItem`,
        { productId },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      if (data.message == 'success') {
        toast.success('product removed successfully', {
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

      return data;
    } catch (error) {
      toast.error('there is error', {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Bounce,
      });
    }
  };

  const clearCartContext = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const { data } = await axios.patch(
        `https://ecommerce-node4-five.vercel.app/cart/clear`,
        {},
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
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

      return data;
    } catch (err) {
      console.log(err);
    }
  };
  const increaseQuantity = async productId => {
    try {
      const token = localStorage.getItem('userToken');
      const { data } = await axios.patch(
        `https://ecommerce-node4-five.vercel.app/cart/incraseQuantity`,
        { productId },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  const decreaseQuantity = async productId => {
    try {
      const token = localStorage.getItem('userToken');
      const { data } = await axios.patch(
        `https://ecommerce-node4-five.vercel.app/cart/decraseQuantity`,
        { productId },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    showCart();
  }, [removeItemContext, increaseQuantity, decreaseQuantity, clearCartContext]);
  if (loader) {
    return <Loader />;
  }

  return (
    <>
      <div className="d-flex flex-column gap-3 align-items-end">
        {error ?? <p className="error"> {error}</p>}
        {item.length > 0 ? (
          <h2>
            <button className="btn btn-outline-success text-white bg-dark w-100 " onClick={clearCartContext}>
              Clear Cart
            </button>
          </h2>
        ) : (
          <>
            <h2 className="d-flex justify-content-center w-100">Your Cart Is Empty!</h2>
            <div className="d-flexjustify-content-center w-100  p-5">
              <h5 className="text-center p-3">✨ You Might Like to Fill it With ✨</h5>
              <AllProducts />
            </div>
          </>
        )}
        {item.map(products => (
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
                        <button className="incBtn" onClick={() => increaseQuantity(products.details._id)}>
                          +
                        </button>
                        <h2>{products.quantity}</h2>
                        <button className="incBtn" onClick={() => decreaseQuantity(products.details._id)}>
                          -
                        </button>
                      </div>
                      <div>
                        <button className=" btn btn-link " onClick={() => removeItemContext(products.details._id)}>
                          <FaTrash className="trashBtn" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
        <div className="container flex-end">
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
          <NavLink className="btn btn-outline-success text-white bg-dark w-100 " to="/order">
            place order
          </NavLink>
        </div>
      </div>
    </>
  );
}
