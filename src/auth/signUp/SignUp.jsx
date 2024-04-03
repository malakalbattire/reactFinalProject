import { useState } from 'react';
import axios from 'axios';
import { object, string } from 'yup';
import { toast, Bounce } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userName: '',
    email: '',
    password: '',
    image: '',
  });
  const [errors, setErrors] = useState([]);
  const [loader, setLoder] = useState(false);

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
      const formData = new FormData();
      formData.append('userName', user.userName);
      formData.append('email', user.email);
      formData.append('password', user.password);
      formData.append('image', user.image);
      try {
        const { data } = await axios.post(`https://ecommerce-node4-five.vercel.app/auth/signup`, formData);

        setUser({
          userName: '',
          email: '',
          password: '',
          image: '',
        });
        if (data.message == 'success') {
          toast('your account has been created successfully.');
          navigate('/');
        }
      } catch (error) {
        console.log(error.response);
        if (error.response.status === 409) {
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
        }
      } finally {
        setLoder(false);
      }
    }
  };
  const handelImageChange = e => {
    const { name, files } = e.target;
    setUser({
      ...user,
      [name]: files[0],
    });
  };
  const validateData = async () => {
    const registerSchema = object({
      userName: string().min(5).max(20).required(),
      email: string().email(),
      password: string().min(8).max(20).required(),
      image: string().required(),
    });
    try {
      await registerSchema.validate(user, { abortEarly: false });
      return true;
    } catch (error) {
      console.log('vadidaation error', error.errors);
      setErrors(error.errors);
      setLoder(false);
      return false;
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
      <div className="singup container vh-100 d-flex justify-content-center aligin-items-center flex-column w-25 gap-3">
        <h2 className="text-center">Sign up</h2>
        <form className="d-flex flex-column gap-1" onSubmit={handleSubmit}>
          <label className="text-muted">User name:</label>
          <input className="form-control" type="text" value={user.userName} name="userName" onChange={handelChange} />

          <label className="text-muted">Email:</label>
          <input className="form-control" type="email" value={user.email} name="email" onChange={handelChange} />

          <label className="text-muted">Password:</label>
          <input className="form-control" type="password" value={user.password} name="password" onChange={handelChange} />

          <label className="text-muted">image</label>
          <input className="form-control" type="file" name="image" onChange={handelImageChange} />

          <button
            type="submit d-flex p-3 "
            disabled={loader ? 'disabled' : null}
            className="btn btn-outline-success w-100 text-white bg-dark"
          >
            {!loader ? 'register' : 'wait..'}
          </button>
        </form>
      </div>
    </>
  );
}
