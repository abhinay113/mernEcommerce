import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()

  const token = localStorage.getItem("token")
  const role = localStorage.getItem("role")

  function handleLogout() {
    alert("Logged out successfully")
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    navigate("/login")
  }

  return (
    <nav className="navbar navbar-dark bg-dark px-4 d-flex justify-content-between">

      {/* LEFT SIDE */}
      <Link className="btn btn-danger" to="/">
        Home
      </Link>

      {/* RIGHT SIDE */}
      <div className="d-flex align-items-center gap-3">

        {token ? (
          <>
            {role === "admin" && (
              <Link className="btn btn-danger" to="/add-product">
                Add Product
              </Link>
            )}

            {role === "user" && (
              <Link className="btn btn-danger" to="/cart">
                Cart
              </Link>
            )}

            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="btn btn-danger" to="/login">
              Login
            </Link>
            <Link className="btn btn-danger" to="/register">
              Register
            </Link>
          </>
        )}

      </div>
    </nav>
  )
}