import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const getCategories = async () => {
    const { data } = await axios.get(`https://ecommerce-node4-five.vercel.app/categories/active?page=1&limit=20`);
    setCategories(data.categories);
  };
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      <div>
        {categories.map(catagory => (
          <NavLink className="container" to={`/category/${catagory._id}`} key={catagory._id}>
            <img src={catagory.image.secure_url} alt="slide image" />
          </NavLink>
        ))}
      </div>
    </>
  );
}
