import React from "react";
import { FaHeart } from "react-icons/fa";
import { FiSearch, FiShoppingCart, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 backdrop-blur bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/UEFA_Champions_League_logo.svg/1200px-UEFA_Champions_League_logo.svg.png"
            alt="Homeplus"
            className="h-auto w-25 object-contain cursor-pointer hover:opacity-90 transition"
          />
        </div>

        <div className="flex-1 max-w-lg md:mx-2 mx-1 hidden md:block">
          <div className="flex border border-gray-300 rounded-full overflow-hidden focus-within:ring-2 focus-within:ring-red-500">
            <input
              type="text"
              placeholder="Qidirish..."
              className="w-full px-5 py-2 text-sm outline-none"
            />
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 flex items-center justify-center transition">
              <FiSearch size={18} />
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-6 text-gray-600 ">
          <Link to="/wish">
            <FaHeart className="text-lg text-gray-600 hover:text-red-500" />
          </Link>
          <button className="hover:text-red-600 transition">
            <FiUser size={22} />
          </button>

          <Link to="/cart" className="relative hover:text-red-600 transition">
            <FiShoppingCart size={22} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full px-1.5 py-0.5 shadow">
              0
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
