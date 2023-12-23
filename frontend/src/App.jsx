import { Route, Routes, Navigate } from "react-router-dom"
import Register from "./components/Register"
import Login from "./components/Login"
import Home from './components/Home';
import { isAuthenticated } from "./utils/auth";

function App() {
    // const isAuthenticated = localStorage.getItem('authToken')

    return (
    <>
      <p className="text-3xl">Hello</p>
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/register" element={<Register />} />
        
        {isAuthenticated() ? (
          <Route path="/home" element={<Home />} />
        ) : (
          <Route path="/" element={<Login />} />
        )}
      </Routes>
    </>
  )
}

export default App
