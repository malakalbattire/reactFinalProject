import Root from './routes/Root';
import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/home/Home';
import Categories from './pages/categories/Categories';
import AllProducts from './pages/allProducts/AllProducts';
import SignIn from './auth/signIn/SignIn';
import SignUp from './auth/signUp/SignUp';
import Cart from './pages/cart/Cart';
import Category from './pages/category/Category';
import ForgotPassword from './auth/forgotPassword/FogotPassword';
import NotFound from './pages/notFound/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoutes from './components/ProtectedRoutes';
import ProtectedRoutesMessage from './components/ProtectedRoutesMessage';
import ProtectedRoutesCart from './components/protectedRoutesCart/ProtectedRoutesCart';
import ProtectedRoutesCartMessage from './components/protectedRoutesCart/protectedRoutesCartMessage';
import SendCode from './auth/forgotPassword/SendCode';
import UserContextProvider from './context/User';
import ProductDetails from './pages/productDetails/ProductDetails';
import Profile from './pages/profile/Profile';
import Loader from './pages/loader/Loader';
import Hero from './pages/hero/Hero';
import Order from './pages/createOrder/CreateOrder';
import GetOrder from './pages/order/GetOrder';
import OrderDetails from './pages/order/OrderDetails';
import Reviews from './pages/reviews/Reviews';
import ProductsQantity from './pages/cart/ProductsQantity';


function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        {
          path: '/',
          element:
          
          
            <Home />,
            
        },
        {
          path: '/categories',
          element: <Categories />,
        },
        {
          path: '/order',
          element: <Order />,
        },
        {
          path: '/getorder',
          element: <GetOrder />,
        },
        {
          path: 'products/:id',
          element: <ProductDetails />,
        },{
          path: '/reviews',
          element: <Reviews />,
        }
        ,{
          path: '/productQuantity',
          element: <ProductsQantity />,
        }

        ,{
          path: '/allProducts',
          element:
          <ProtectedRoutes>
            <AllProducts />
          </ProtectedRoutes>
          
        },
        {
          path: '/signin',
          element: <SignIn />,
        },
        {
          path: '/loader',
          element: <Loader />,
        },
        {
          path: '/hero',
          element: <Hero />,
        },
        {
          path: '/profile',
          element: <Profile />,
        },
        {
          path: '/signup',
          element:
          
            <SignUp />
          
        },
        {
          path: '/cart',
          element:
          <ProtectedRoutesCart>
             <Cart />

          </ProtectedRoutesCart>
         
          
        },
        {
          path:'category/:id',
          element:<Category/>,
        },
        {
          path:'/sendCode',
          element:<SendCode/>,
        },
        
        {
          path:'/forgotPassword',
          element:<ForgotPassword/>,
        },
        {
          path:'/protectedRouteMessage',
          element:<ProtectedRoutesMessage/>,
        },
        {
          path:'/protectedRoutesCartMessage',
          element:<ProtectedRoutesCartMessage/>,
        },
        {
          path:'*',
          element:<NotFound/>,
        },
        {
          path:'/orderdetails',
          element:<OrderDetails/>,
        },
      ],
    },
  ]);
  return(
    <>
    <UserContextProvider>
    <RouterProvider router={router} />

    </UserContextProvider>
    
    
 
     
     <ToastContainer />
    </>
   
  ) 
}
export default App;
