import { useState, useEffect } from 'react';
import axios from 'axios';
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'

import { NavLink } from 'react-router-dom';
import './CategoriesName.css';

export default function CategoriesName() {
  const [categoriesName, setCategoriesName] = useState([]);
  const getCategories = async () => {
    const { data } = await axios.get(`https://ecommerce-node4-five.vercel.app/categories/active?page=1&limit=20`);
    setCategoriesName(data.categories);
  };
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      <div>
        {categoriesName.map(catagory => (
          <NavLink className="container text-decoration-none " to={`/category/${catagory.id}`} key={catagory.id}>
            <p className="unstyled text-secondary p-2 active ">{catagory.name}</p>
          </NavLink>
        ))}
      </div>
    </>
  );
}
