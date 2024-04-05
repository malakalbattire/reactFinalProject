import { useState, useEffect } from 'react';
import axios from 'axios';
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios';
import { NavLink } from 'react-router-dom';
import Loader from '../loader/Loader';
import '../category/Category.css';
import { Bounce, toast } from 'react-toastify';
import Pagination from './../pagination/PaginationPro';

export default function AllProducts() {
  const [allProducts, setAllProducts] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  let [page, setPage] = useState(1);
  let [price, setPrice] = useState('');
  let [min, setMin] = useState('');
  let [max, setMax] = useState('');
  const [pro, setpro] = useState();

  const getProductsByMin = async (page, min, max) => {
    if (min == '' && max != '') {
      min = 0;
    } else if (max == '' && min != '') {
      max = 200;
    }
    try {
      const { data } = await axios.get(`https://ecommerce-node4-five.vercel.app/products?page=${page}&price[gte]=${min}&price[lte]=${max}`);
      setAllProducts(data.products);
      setLoader(false);
    } catch (error) {
      setLoader(false);
    }
  };

  const getProductsByPrice = async (page, price) => {
    try {
      const { data } = await axios.get(`https://ecommerce-node4-five.vercel.app/products?page=${page}&price=${price}`);
      setAllProducts(data.products);
      setLoader(false);
    } catch (error) {
      setLoader(false);
    } finally {
      setLoader(false);
    }
  };
  const getProductsSorted = async (page, sort) => {
    try {
      const { data } = await axios.get(`https://ecommerce-node4.vercel.app/products?page=${page}&sort=${sort}`);
      setAllProducts(data.products);
      setLoader(false);
    } catch (error) {
      setLoader(false);
    }
  };
  const getAllProducts = async () => {
    const limit = 3;

    try {
      const { data } = await axios.get(`https://ecommerce-node4-five.vercel.app/products?page=${currentPage}&limit=${limit}`);
      setAllProducts(data.products);
      const numOfPage = data.total / limit;
      setTotalPages(numOfPage);
    } catch (error) {
      setError('error loading products');
    } finally {
      setLoader(false);
    }
  };
  const ResetInputs = () => {
    setPrice('');
    setMax('');
    setMin('');
    AllProducts(1);
  };
  useEffect(() => {
    getAllProducts();
  }, [currentPage]);

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  if (loader) {
    return <Loader />;
  }
  const addToCart = async productId => {
    try {
      const token = localStorage.getItem('userToken');
      const { data } = await axios.post(
        `https://ecommerce-node4-five.vercel.app/cart`,
        {
          productId,
        },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      console.log(data);
      if (data.message == 'success') {
        toast.success(data.message, {
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
    } catch (e) {
      toast.error('already exists in your cart', {
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

  return (
    <>
      {error ?? <p className="error"> {error}</p>}
      <div className="padBottom d-flex flex-column gap-4  ">
        <div className="  container d-flex w-100 gap-3 justify-content-center">
          <select  className='text-white bg-dark' onChange={e => getProductsSorted(page, e.target.value, e)}>
            <option selected>Sort Options</option>
            <option value="price">price</option>
            <option value="-price">-price</option>
          </select>

          <form
            onSubmit={e => {
              e.preventDefault();
              getProductsByPrice(page, price);
            }}
          ></form>
          <form
            className="sort d-flex gap-3 "
            onSubmit={e => {
              e.preventDefault();
              getProductsByMin(page, min, max);
            }}
          >
            <input 
              type="text"
              value={max}
              onChange={e => {
                setMax(e.target.value);
              }}
              placeholder="max"
            />
            <input
              type="text"
              value={min}
              onChange={e => {
                setMin(e.target.value);
              }}
              placeholder="min"
            />

            <input className='text-white bg-dark p-1' type="submit" value="Get" />
          </form>
        </div>
        <div className=" container categoryContainer flex-wrap ">
          {allProducts.map(products => (
            <>
              <div className="procont">
                <NavLink className="navLinkk" to={`/products/${products.id}`}>
                  <img className="categoryImg" src={products.mainImage.secure_url} alt="product image" key={products._id}></img>
                  <span className="productName">{products.name}</span>
                  <span className="h-50">{products.price}$</span>
                </NavLink>
                <button className="btn btn-outline-success w-100 text-white bg-dark" onClick={() => addToCart(products._id)}>
                  Add To Cart
                </button>
              </div>
            </>
          ))}
        </div>
        <Pagination className="p-2" currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </>
  );
}
