import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductDetails.css'
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'

import Loader from '../loader/Loader';
import { Bounce, toast } from 'react-toastify';
import { Navigation, Autoplay, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Rating } from '@mui/material';

export default function ProductDetails() {
  const token = localStorage.getItem('userToken');
  const [values, setValues] = useState({
    comment: '',
    rating: '',
  });
  const { id } = useParams('id');
  const [productDetails, setProductDetails] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState('');
  const getProductDetails = async () => {
    try {
      const { data } = await axios.get(`https://ecommerce-node4-five.vercel.app/products/${id}`);
      setProductDetails(data.product);
    } catch (error) {
      setError('error loading products');
    } finally {
      setLoader(false);
    }
  };
  const addToCart = async productId => {
    const token = localStorage.getItem('userToken');
    try {
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
    } catch (error) {
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

  const handelSubmit = async e => {
    e.preventDefault();
    setLoader(true);
    try {
      const { data } = await axios.post(`https://ecommerce-node4-five.vercel.app/products/${id}/review`, values, {
        headers: { Authorization: `Tariq__${token}` },
      });

      if (data.message == 'success') {
        toast.success('your comment is puplished successfully', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
        //navigate(/products/${id});
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  if (loader) {
    return <Loader />;
  }

  return (
    <>
      {error ?? <p className="error"> {error}</p>}
      {
        <>
          <div className="productDetails vh-100 container d-flex ">
            <div className=" mm container w-50">
              <>
                <div className="">
                  <Swiper
                    slidesPerView={1}
                    modules={[Navigation, Autoplay, A11y]}
                    onSwiper={() => console.log()}
                    onSlideChange={() => console.log()}
                    autoplay={{
                      delay: 2000,
                      disableOnInteraction: false,
                    }}
                    navigation={true}
                  >
                    {productDetails.subImages.length > 0 ? (
                      productDetails.subImages.map(image => (
                        <SwiperSlide key={image.public_id}>
                          <img className="w-100" src={image.secure_url} alt="slide image" />
                        </SwiperSlide>
                      ))
                    ) : (
                      <p>no sub image</p>
                    )}
                  </Swiper>
                </div>
              </>
            </div>
            <div className="mm containerw-50">
              <h2>{productDetails.name}</h2>
              <p className="border-bottom p-2 text-muted">{productDetails.description}</p>
              <div className="row">
                <span className="text-danger p-3 bg-gray">{productDetails.price}$</span>
              </div>
              <div className="row gap-2">
                <Rating
                  className="p-2"
                  name="simple-controlled"
                  value={productDetails.rating}
                  onChange={(event, newValue) => {
                    setValues(newValue);
                  }}
                ></Rating>
                <button className="btn btn-outline-success w-100 text-white bg-dark" onClick={() => addToCart(productDetails.id)}>
                  Add To Cart
                </button>
                <span className="text-muted text-center">{productDetails.stock} In Stock</span>
              </div>
            </div>
          </div>
          <div className="container p-5 d-flex flex-column">
            <h4>Reviews:</h4>
            <div className="reviews d-flex gap-3">
              <form className="d-flex flex-column gap-4 " onSubmit={handelSubmit}>
                <input
                  placeholder="Write your Review..."
                  className="form-control rounded-1 w-100"
                  type="comment"
                  name="comment"
                  value={values.comment}
                  onChange={e => setValues({ ...values, comment: e.target.value })}
                />

                <Rating
                  name="simple-controlled"
                  value={productDetails.rating}
                  onChange={event => {
                    setValues({ ...values, rating: event.target.value });
                  }}
                />
                <button className="text-white bg-dark" type="submit">
                  submit
                </button>
              </form>
              <div className="container bg-light p-4">
                {productDetails.reviews.map(revi => (
                  <div className="review bg-white" key={revi._id}>
                    <p>{revi.review}</p>
                    <h2>{revi.comment}</h2>
                    <span>{revi.rating}</span>
                    <h3>{revi.name}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      }
    </>
  );
}
