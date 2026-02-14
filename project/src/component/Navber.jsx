import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";

const Navber = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('Unauthorized');
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });
  }, []);

  const handleLogout = async () => {
    await fetch('http://127.0.0.1:8000/api/auth/logout', { method: 'POST' });
    window.location.reload();
  };
  
  return (
    <>
      <div className="flex justify-between items-center fixed w-full px-5 bg-gray-300 py-3 top-0 z-50 shadow-md">
        
        {/* Profile Section (Left) */}
        <div 
          className="relative group flex items-center cursor-pointer"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="flex items-center gap-2 text-gray-800 hover:text-blue-600 transition-colors">
            <FaUser className="text-xl border border-gray-500 rounded-full p-0.5" />
            
            {/* Logic to handle Loading vs Guest vs User */}
            <span className="font-bold text-lg">
              {loading ? (
                "Loading..."
              ) : user ? (
                user.first_name || user.username
              ) : (
                "Guest"
              )}
            </span>
          </div>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-xl rounded-md border border-gray-100 py-2 text-gray-800">
              <Link to="/all-items" className="block px-4 py-2 hover:bg-blue-50">All Items</Link>
              <Link to="/settings" className="block px-4 py-2 hover:bg-blue-50 font-semibold border-t">Settings</Link>
            </div>
          )}
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:block">
          <ul className="flex gap-10 font-semibold uppercase text-sm">
            <li className="hover:text-blue-600 transition-colors"><Link to="/contact">Home</Link></li>
            <li className="hover:text-blue-600 transition-colors"><Link to="/men">Men</Link></li>
            <li className="hover:text-blue-600 transition-colors"><Link to="/Cart">Cart</Link></li>
          </ul>
        </nav>

        {/* Right Side Icons */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsSideMenuOpen(true)} 
            className="text-2xl cursor-pointer hover:text-blue-600 transition-colors"
          >
            <FaBars />
          </button>
        </div>
      </div>

      {/* Sidebar Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ${isSideMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setIsSideMenuOpen(false)}
      ></div>

      {/* Right Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out ${isSideMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-5">
          <div className="flex justify-between items-center border-b pb-4">
            <h2 className="text-xl font-bold uppercase">Menu</h2>
            <button onClick={() => setIsSideMenuOpen(false)} className="text-2xl hover:text-red-500">
              <FaTimes />
            </button>
          </div>

          <ul className="mt-6 flex flex-col gap-5 text-lg font-medium">
            <li onClick={() => setIsSideMenuOpen(false)}><Link to="/contact" className="hover:text-blue-600">Home</Link></li>
            <li onClick={() => setIsSideMenuOpen(false)}><Link to="/Cart" className="hover:text-blue-600">My Cart</Link></li>
            
            <hr />

            {/* Show Logout if logged in, otherwise show Login/Signup */}
            {user ? (
               <li onClick={handleLogout} className="w-full text-center py-2 border border-red-500 text-red-500 rounded cursor-pointer hover:bg-red-50 uppercase">
                 Sign Out
               </li>
            ) : (
              <>
                <li onClick={() => setIsSideMenuOpen(false)}><Link to="/login" className="block w-full text-center py-2 border rounded uppercase">Login</Link></li>
                <li onClick={() => setIsSideMenuOpen(false)}><Link to="/" className="block w-full text-center py-2 bg-blue-600 text-white rounded uppercase">Sign Up</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>

      {/* Spacer for fixed navbar */}
      <div className="h-16"></div>
      
    </>
  );
};

export default Navber;