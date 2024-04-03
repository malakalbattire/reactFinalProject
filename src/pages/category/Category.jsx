import './Category.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink, useParams } from 'react-router-dom';
import Loader from '../loader/Loader';
import { Bounce, toast } from 'react-toastify';



export default function Category() {
  const { id } = useParams("id");
  const[loader, setLoader]=useState(true);
  const [error, setError] = useState('');

  const [categoryProducts, setCategoryProducts] = useState([]);
  const getCategoryProducts = async () => {
    try{
      const { data } = await axios.get(`https://ecommerce-node4-five.vercel.app/products/category/${id}`);
      setCategoryProducts(data.products);
      

    }catch (error) {
      setError('error loading category');
    }
      finally{
      setLoader(false);
    }
   
  };
  useEffect(() => {
    getCategoryProducts();
    

  }, [categoryProducts]);
  const addToCart=async (productId)=>{

    const token = localStorage.getItem('userToken')
    try{
     
    const {data}= await axios.post(`https://ecommerce-node4-five.vercel.app/cart`,{
      productId
    },{
      headers:{
        Authorization:`Tariq__${token}`
      }
    }
    );
    
    console.log(data)
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
    }catch(error){

      toast.error("already exists in your cart", {
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
  
  if(loader){
    return <Loader/>
  }
  return (

    <div className='categoryContainer'>
      {error ?? <p className="error"> {error}</p>}
      {(categoryProducts.length>0)?
      categoryProducts.map(product => (
        <>
        <div className='procont'>

       
         <NavLink className="product navLinkk " key={product.id} to={`/products/${product.id}`}>
              <img className="categoryImg" src={product.mainImage.secure_url}></img>
              <span className='productName'>{product.name}</span>
              <span>{product.price}$</span>

            </NavLink>  
            <button className='btn btn-outline-success w-100 text-white bg-dark' onClick={()=>addToCart(product._id)}>Add To Cart</button>

        </div>
         
        </>
            
      )):<h3 className='text-center'>No Products</h3>}
    </div>
  );
}
