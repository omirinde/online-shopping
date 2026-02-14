import { FaShoppingCart } from "react-icons/fa";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navber from "../Navber";

function Men({ addToCart }) {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/posts")
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  return (
    <>
      <Navber />
      <div className="p-4 mt-10">
        <div className="flex items-center gap-2 mb-6 bg-gray-100 p-3 rounded w-fit">
          <FaShoppingCart size={24} />
          <span className="font-bold">Total Items: {jobs.length}</span>
        </div>

     
        <div className="grid grid-cols-3 gap-4 lg:grid-cols-4 shadow rounded">
          {jobs.map((omi) => (
            <div key={omi.id} className="border p-2 rounded hover:shadow-lg transition">
              <Link to="/Cart">
                <img
                  
               src={omi.image.startsWith('http') ? omi.image : `http://127.0.0.1:8000${omi.image}`}
                  alt={omi.name}
                  className="h-50 w-full object-cover cursor-pointer"
                  onClick={() => addToCart(omi)}
                />
                 <div className="flex items-center px-1 lg:justify-between mt-2 justify-between">
                <div>
                  <p className="font-semibold">{omi.name}</p>
                  <p className="text-gray mx-auto max-w-7xl">{omi.description}</p>
                  <p className="text-red-600 font-bold">${omi.price}</p>
                </div>
                <div
                  className="text-xl px-2 py-2 rounded-xl cursor-pointer hover:bg-blue-50 duration-200"
                  onClick={() => addToCart(omi)}
                >
                  <FaShoppingCart className="text-red-600" />
                </div>
              </div>
              </Link>
             
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Men;