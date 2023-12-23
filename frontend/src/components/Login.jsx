import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, setAuthToken } from "../utils/auth.js";

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
    console.log("User logged in successfully");
    window.location.reload()
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/login", {
        username: String(formData.username),
        password: String(formData.password),
      });

      if (!response) {
        return console.log("Invalid credentials");
      }

      const token = response.data.message;

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
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </label>

      <br />

      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </label>

      <br />

      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
