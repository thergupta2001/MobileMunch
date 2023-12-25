import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, setAuthToken } from "../utils/auth.js";
// import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSuccessfulLogin = (token) => {
    setAuthToken(token);
    isAuthenticated();
    navigate("/home");
    // console.log("User logged in successfully");
    window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/login", {
        username: String(formData.username),
        password: String(formData.password),
      });

      if (!response) {
        // toast.error('Invalid')
        return console.log("Invalid credentials");
      }

      const token = response.data.message;
      const username = response.data.username;

      // console.log(username)

      localStorage.setItem("username", username);

      // toast.success('User logged in successfully')

      handleSuccessfulLogin(token);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error);
        console.log(error);
      } else if (err.request) {
        setError("No response received from the server");
      } else {
        setError("Error setting up the request: " + err.message);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-700 to-white">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          Login
        </h2>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        {/* <br /> */}

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </div>

        <div className="mt-4 text-sm text-gray-600 text-center">
          Do not have an account?{" "}
          <Link to='/register' className="text-blue-500 hover:underline">Click here</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
