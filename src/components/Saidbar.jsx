import React from "react";
import { FiHome, FiTag, FiStar, FiHeart, FiMenu } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
    isActive
      ? "bg-red-100 text-red-600"
      : "text-gray-700 hover:bg-red-50 hover:text-red-600"
  }`;

const Sidebar = () => {
  return (
    <aside className="fixed top-0 left-0 w-64 h-screen bg-white shadow-lg border-r hidden lg:flex flex-col z-40 mt-20">
      <div className="p-5 border-b border-gray-200">
        <h2 className="text-xl font-bold text-red-600 flex items-center gap-2">
          <FiMenu className="text-lg" /> Bo‘limlar
        </h2>
      </div>
      <nav className="flex-1 overflow-y-auto p-4 space-y-2 text-sm">
        <NavLink to="/" className={linkClass}>
          <FiHome /> Asosiy
        </NavLink>
        <NavLink to="/cart" className={linkClass}>
          <FiTag /> Chegirmalar
        </NavLink>
        <NavLink to="/yangi-mahsulotlar" className={linkClass}>
          <FiStar /> Yangi mahsulotlar
        </NavLink>
        <NavLink to="/wish" className={linkClass}>
          <FiHeart /> Sevimlilar
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
