import React from "react";
import Navbar from "../Navbar";
import Saidbar from "../Saidbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Saidbar />
      <main className="ml-64 min-h-screen bg-gray-100 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
