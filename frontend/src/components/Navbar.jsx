import React from "react";
import { isAuthenticated, handleLogout } from "../utils/auth";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
     const navigate = useNavigate()

  const username = localStorage.getItem("username");

  const logout = () => {
     handleLogout();
   };
 
   if (!isAuthenticated()) {
     navigate("/");
   }

  return (
    <div>
      <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-2xl font-thin">MobileMunch</span>
        </div>

        <div className="text-center">
          <p className="text-lg text-bold">Welcome, <b>{username}!</b></p>
        </div>

        <div className="flex items-center">
          <button
            className="mr-4 text-blue-600 bg-white p-2 transition duration-300 ease-in-out border rounded hover:bg-blue-800 hover:text-white"
            onClick={() => {
              navigate("/orders");
            }}
          >
            <b>Your orders</b>
          </button>

          <button
            onClick={logout}
            className="font-bold mr-4 bg-blue-800 p-2 border rounded hover:bg-white hover:text-blue-600 transition duration-300 ease-in-out"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
