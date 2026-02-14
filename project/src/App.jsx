import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Navber from './component/Navber'
import Dashboard from './component/dashboard/Dashboard'
import Login from './component/Login/Login'
import Cart from './component/dashboard/Cart'
import Men from './component/dashboard/Men'
import Contact from './component/dashboard/Contact'
import Sign from './component/Login/Sign-up'
import Banktransfer from './component/dashboard/Banktransfer'
import Deliver from './component/dashboard/Deliver'
import Post from './component/dashboard/Post'
function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const isItemInCart = prev.find((item) => item.id === product.id);
      if (isItemInCart) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) =>
      prev.reduce((acc, item) => {
        if (item.id === productId) {
          if (item.quantity === 1) return acc; 
          return [...acc, { ...item, quantity: item.quantity - 1 }];
        }
        return [...acc, item];
      }, [])
    );
  };

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/Men' element={<Men cart={cart} addToCart={addToCart} />} />
       <Route path='/Cart' element={<Cart cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} />}/>
      <Route path='/Login' element= {<Login/>}/>
      <Route path='/Contact' element ={<Contact/>}/>
      <Route path='/' element= {<Sign/>}/>
      <Route path='/Banktransfer' element={<Banktransfer/>}/>
      <Route path='/Deliver' element ={<Deliver/>}/>
      <Route path='/Post' element = {<Post/>}/>
    </Routes>
    
    
    
    </BrowserRouter>
    
    
    
    </>
     
)
}

export default App
