import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { object, string } from 'yup';
import { Bounce, toast } from 'react-toastify';
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'


export default function SendCode() {
  const navigate = useNavigate();
  const [loader, setLoder] = useState(false);
  const [errors, setErrors] = useState([]);
  const [user, setUser] = useState({
    email: '',
  });
  const validateData = async () => {
    const loginSchema = object({
      email: string().email().required(),
    });
    try {
      await loginSchema.validate(user, { abortEarly: false });
      return true;
    } catch (error) {
      setErrors(error.errors);
      setLoder(false);
      return false;
    }
  };
  const handleSubmit = async e => {
    e.preventDefault();
    setLoder(true);

    if (await validateData()) {
      try {
        const { data } = await axios.patch(`https://ecommerce-node4-five.vercel.app/auth/sendcode`, {
          email: user.email,
        });
        setUser({
          email: '',
        });
        toast.success(data.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        });
        localStorage.setItem('userToken', data.token);
        navigate('/forgotPassword');
      } catch (error) {
        toast.error(error.response.status, {
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
      } finally {
        setLoder(false);
      }
    }
  };
  const handelChange = e => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  return (
    <>
      {errors.length > 0
        ? errors.map(error => (
            <div key={error.id}>
              <p>{error}</p>
            </div>
          ))
        : ''}
      <div className="container d-flex justify-content-center aligin-items-center flex-column w-25 gap-3">
        <form className="d-flex flex-column gap-1" onSubmit={handleSubmit}>
          <h4 className="text-center">Forgot Password</h4>
          <label className="text-muted">Email:</label>
          <input className="form-control" type="email" value={user.email} name="email" onChange={handelChange}></input>
          <button
            type="submit d-flex p-3 "
            className="btn btn-outline-success w-100 text-white bg-dark"
            disabled={loader ? 'disabled' : null}
          >
            {' '}
            {!loader ? 'Send code' : 'wait..'}
          </button>
        </form>
      </div>
    </>
  );
}
