import { useState } from "react";
import { FaPlus, FaMinus, FaRegCreditCard, FaUniversity } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Cart({ cart, addToCart, removeFromCart }) {

  const [paymentMethod, setPaymentMethod] = useState("bank_transfer");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
 const  navigate = useNavigate()
 

  const total = cart.reduce((sum, item) => {
    const itemPrice = typeof item.price === "string" 
      ? parseFloat(item.price.replace(/[^0-9.]/g, "")) 
      : item.price;
    return sum + (itemPrice * item.quantity);
  }, 0);

  const handleCheckout = async () => {
    setLoading(true);
    setMessage(null);

   
    const paymentData = {
      amount: total,
      currency: "USD",
      payment_method: paymentMethod,
      order_id: Math.floor(Math.random() * 1000) 
    };

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/payment/checkout", paymentData);
      setMessage({ type: "success", text: response.data.message });
      navigate('/Deliver')

    } catch (error) {
      setMessage({ 
        type: "error", 
        text: error.response?.data?.message || "Payment Failed. Please try again." 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      <Link to="/men" className="text-blue-500 underline">← Back to Shopping</Link>

      {cart.length === 0 ? (
        <p className="mt-4">Your cart is empty.</p>
      ) : (
        <div className="mt-6">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b py-4">
              <div className="flex items-center gap-4">
                <img src={`http://127.0.0.1:8000${item.image}`} className="w-20 h-20 object-cover rounded" alt="" />
                <div>
                  <h3 className="font-bold">{item.name}</h3>
                  <p className="text-gray-600">{item.price}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-gray-100 p-2 rounded">
                <button onClick={() => removeFromCart(item.id)} className="text-red-500">
                  <FaMinus />
                </button>
                <span className="font-bold text-xl">{item.quantity}</span>
                <button onClick={() => addToCart(item)} className="text-green-500">
                  <FaPlus />
                </button>
              </div>
            </div>
          ))}

          <div className="mt-6 text-right font-bold text-xl">
            Total: ${total.toFixed(2)}
          </div>

          {/* Payment Section */}
          <div className="mt-8 p-6 bg-gray-50 rounded-lg border">
            <h2 className="text-lg font-bold mb-4">Payment Method</h2>
            
            <div className="flex gap-4 mb-6">
              <button 
                onClick={() => setPaymentMethod("bank_transfer")}
                className={`flex items-center gap-2 p-3 border rounded-lg ${paymentMethod === 'bank_transfer' ? 'border-blue-500 bg-blue-50' : 'bg-white'}`}
              >
                <FaUniversity /> Bank Transfer
              </button>
              <button 
                onClick={() => setPaymentMethod("credit_card")}
                className={`flex items-center gap-2 p-3 border rounded-lg ${paymentMethod === 'credit_card' ? 'border-blue-500 bg-blue-50' : 'bg-white'}`}
              >
                <FaRegCreditCard /> Credit Card
              </button>
            </div>

            {message && (
              <div className={`mb-4 p-3 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {message.text}
              </div>
            )}

            <button 
              onClick={handleCheckout}
              disabled={loading || cart.length === 0}
              className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 disabled:bg-gray-400"
            >
              {loading ? "Processing..." : `Pay $${total.toFixed(2)} Now`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;