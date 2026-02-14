import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Sign = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password: ''
  });
  const navigator = useNavigate()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Account created! You can now log in.");
        navigator('/men')
      } else {
      
        alert("Registration Failed: " + result.message);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div className="items-center pt-30 justify-center mt-20">
      <div className="b">
    <div style={{ maxWidth: '400px', margin: 'auto' }} className='border py-3 px-3 border-gray-300 rounded shadow'>
      <h2 className='text-2xl font-bold text-center uppercase'>welconme to online shop</h2>
      <form onSubmit={handleSignUp}>
        <input className='border w-full py-1 px-2 rounded mt-3' name="username" placeholder="Username" onChange={handleChange} required /><br/>
        <input  className='border w-full py-1 px-2 rounded mt-3' name="email" type="email" placeholder="Email" onChange={handleChange} required /><br/>
        <input className='border w-full py-1 px-2 rounded mt-3' name="password" type="password" placeholder="Password" onChange={handleChange} required /><br/>
        <input className='border w-full py-1 px-2 rounded mt-3' name="confirm_password" type="password" placeholder="Confirm Password" onChange={handleChange} required /><br/>
        <button className=' w-full py-1 px-2 rounded mt-3 bg-blue-300 text-white font-bold' type="submit">Sign Up</button>
      </form>
      </div>
    </div>
    </div>
  );
};

export default Sign;