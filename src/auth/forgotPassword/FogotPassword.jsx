import { useState } from 'react';
import axios from 'axios';
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'

import { useNavigate } from 'react-router-dom';
import { object, string } from 'yup';
import { Bounce, toast } from 'react-toastify';

export default function FogotPassword() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [loader, setLoder] = useState(false);
  const [user, setUser] = useState({
    email: '',
    password: '',
    code: '',
  });
  const validateData = async () => {
    const loginSchema = object({
      email: string().email().required(),
      password: string().min(8).max(20).required(),
      code: string().min(3).max(6).required(),
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
  const handelChange = e => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    setLoder(true);

    if (await validateData()) {
      try {
        const { data } = await axios.patch(`https://ecommerce-node4-five.vercel.app/auth/forgotPassword`, {
          email: user.email,
          password: user.password,
          code: user.code,
        });
        setUser({
          email: '',
          password: '',
        });

        if (data.message == 'success') {
          toast(' login successfully.');
          localStorage.setItem('userToken', data.token);
          navigate('/');
        }
      } catch (error) {
        toast.error(error.response.data.message, {
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
  return (
    <>
      {errors.length > 0
        ? errors.map(error => (
            <div key={error.id}>
              <p>{error}</p>
            </div>
          ))
        : ''}
      <div className=" container d-flex justify-content-center aligin-items-center flex-column w-50 gap-3">
        <h2 className="text-center">Update Password</h2>
        <form className="d-flex flex-column gap-1" onSubmit={handleSubmit}>
          <label className="text-muted">Email:</label>
          <input className="form-control" type="email" value={user.email} name="email" onChange={handelChange} />

          <label className="text-muted">Code:</label>
          <input className="form-control" type="code" value={user.code} name="code" onChange={handelChange} />

          <label className="text-muted">Password:</label>
          <input className="form-control" type="password" value={user.password} name="password" onChange={handelChange} />

          <button
            type="submit d-flex p-3 "
            className="btn btn-outline-success w-100 text-white bg-dark"
            disabled={loader ? 'disabled' : null}
          >
            {!loader ? ' Update Password' : 'wait..'}
          </button>
        </form>
      </div>
    </>
  );
}
