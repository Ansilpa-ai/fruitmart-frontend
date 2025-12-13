import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Components/Login.css';

export default function Login() {

  const [state, setState] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = `${import.meta.env.VITE_API_URL}/user/login`;
    console.log("LOGIN API URL:", apiUrl);

    try {
      const res = await axios.post(apiUrl, state);

      console.log("STATUS:", res.status);
      console.log("DATA:", res.data);

      const response = res.data;
      alert(response.msg);

      if (res.status === 200) {
        if (response.role === 'admin') {
          navigate('/admin/adminview');
        } else {
          sessionStorage.setItem('id', response.id);
          sessionStorage.setItem('username', response.username);
          navigate('/user/userview');
        }
      }

    } catch (err) {
      console.error("LOGIN ERROR");
      console.log("STATUS:", err.response?.status);
      console.log("DATA:", err.response?.data);
      console.log("URL:", err.config?.url);
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className='login-page'>
      <div className='login-form'>
        <h1>LOGIN</h1>

        <form onSubmit={handleSubmit}>
          <p>
            <input
              type="email"
              name="email"
              placeholder="Email ID"
              value={state.email}
              onChange={handleChange}
              required
            />
          </p>

          <p>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={state.password}
              onChange={handleChange}
              required
            />
          </p>

          <button type="submit" className='login-button1'>
            Sign In
          </button>

          <button
            type="button"
            className='login-button2'
            onClick={() => navigate('/register')}
          >
            Register
          </button>
        </form>

      </div>
    </div>
  );
}
