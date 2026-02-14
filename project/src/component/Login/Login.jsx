import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false); 
  
  const navigate = useNavigate();

  const handleChange = (e) => {
 
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
    const response = await fetch('http://127.0.0.1:8000/api/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', 
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        }),
      });

      const result = await response.json();

      if (response.ok) {
        if (result.token) {
          localStorage.setItem('token', result.token);
          
        }
    
        localStorage.setItem('user', JSON.stringify({
          username: formData.username,
         
        }));

 
  
        alert("Login Success!");
         navigate('/men');
       
      } else {
       
        alert(result.detail || result.message || "Invalid credentials");
      }
    } catch (error) {
      
      alert("Could  `not connect to the server. Is your backend running?");
      navigate("/men")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', paddingTop: '50px', fontFamily: 'Arial' }}>
      <h2>Login to Account</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '10px' }}>
          <input 
            name="username" 
            placeholder="Username" 
            value={formData.username} 
            onChange={handleChange} 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required 
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input 
            name="password" 
            type="password" 
            placeholder="Password" 
            value={formData.password}
            onChange={handleChange} 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required 
          />
        </div>
        <button 
          type="submit" 
          disabled={loading} // Prevent double clicks
          style={{ 
            width: '100%', 
            padding: '10px', 
            backgroundColor: loading ? '#ccc' : '#4CAF50', 
            color: 'white', 
            border: 'none', 
            cursor: loading ? 'not-allowed' : 'pointer' 
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;