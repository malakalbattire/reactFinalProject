import axios from 'axios';
import { useState, useEffect } from 'react';
import './Cart.css';

export default function ProductsQantity() {
  const [item, setItem] = useState([]);
  const showCart = async () => {
    const token = localStorage.getItem('userToken');
    const { data } = await axios.get(`https://ecommerce-node4-five.vercel.app/cart`, {
      headers: {
        Authorization: `Tariq__${token}`,
      },
    });
    setItem(data.products);

    //console.log(data.products);
  };
  useEffect(() => {
    showCart();
  }, [item]);
  return (
    <>
      <div className="  rounded-circle ">
        <h5 className="summ d-flex rounded-circle justify-content-center align-items-center ">
          {item.reduce((total, product) => total + product.quantity, 0)}
        </h5>
      </div>
    </>
  );
}
