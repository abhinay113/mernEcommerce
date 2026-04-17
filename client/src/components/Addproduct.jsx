import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Addproduct() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is admin
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");
    
    if (!token) {
      // No token, redirect to login
      alert("Please login first");
      navigate("/login");
    } else if (role !== "admin") {
      // Not admin, redirect to home
      alert("Access denied. Admin only area.");
      navigate("/");
    } else {
      setIsAdmin(true);
    }
  }, [navigate]);

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    // Clear error for this field when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  }

  function validateForm() {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.price) newErrors.price = "Price is required";
    else if (isNaN(formData.price) || Number(formData.price) <= 0) 
      newErrors.price = "Price must be a positive number";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    else if (formData.description.length < 10) 
      newErrors.description = "Description must be at least 10 characters";
    if (!formData.image.trim()) newErrors.image = "Image URL is required";
    else if (!formData.image.match(/\.(jpeg|jpg|gif|png|webp)$/i) && !formData.image.includes("placeholder"))
      newErrors.image = "Please enter a valid image URL (jpg, png, gif, webp)";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleAddProduct(e) {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    // Convert price to number
    const productData = {
      ...formData,
      price: Number(formData.price)
    };
    
    API.post("/product/add", productData)
      .then((res) => {
        if (res.status === 201) {
          alert("Product added successfully!");
          navigate("/");
        }
      })
      .catch(err => {
        console.log(err);
        if (err?.response?.data?.message) {
          setErrors({ submit: err.response.data.message });
        } else {
          setErrors({ submit: "Failed to add product. Please try again." });
        }
      })
      .finally(() => setIsLoading(false));
  }

  // Show nothing while checking admin status
  if (!isAdmin) {
    return (
      <div
        style={{
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "60px",
            height: "60px",
            border: "4px solid rgba(102,126,234,0.1)",
            borderTopColor: "#667eea",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        minHeight: "100vh",
        padding: "80px 0",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {/* Animated background blobs */}
      <div
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(102,126,234,0.1) 0%, rgba(255,255,255,0) 70%)",
          borderRadius: "50%",
          top: "-300px",
          right: "-200px",
          animation: "float 6s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(118,75,162,0.08) 0%, rgba(255,255,255,0) 70%)",
          borderRadius: "50%",
          bottom: "-250px",
          left: "-150px",
          animation: "float 8s ease-in-out infinite reverse",
        }}
      />

      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          padding: "0 20px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header Section */}
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              style={{
                width: "70px",
                height: "70px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                borderRadius: "20px",
                margin: "0 auto 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 10px 20px rgba(102,126,234,0.3)",
              }}
            >
              <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M12 4v16m8-8H4" />
              </svg>
            </motion.div>
            <h1
              style={{
                fontSize: "2.5rem",
                fontWeight: "700",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "10px",
              }}
            >
              Add New Product
            </h1>
            <p style={{ color: "#666", fontSize: "1rem" }}>
              Fill in the details to add a new product to your store
            </p>
          </div>

          {/* Form Card */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              borderRadius: "32px",
              padding: "40px",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            <form onSubmit={handleAddProduct}>
              {/* Product Name */}
              <div className="mb-4">
                <label
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: "600",
                    color: "#333",
                    marginBottom: "8px",
                    display: "block",
                    letterSpacing: "0.5px",
                  }}
                >
                  Product Name
                </label>
                <div style={{ position: "relative" }}>
                  <svg
                    style={{
                      position: "absolute",
                      left: "15px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "18px",
                      height: "18px",
                      color: "#999",
                    }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    className={errors.name ? "error" : ""}
                    placeholder="Enter product name"
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "14px 15px 14px 45px",
                      fontSize: "1rem",
                      border: `2px solid ${errors.name ? "#ff4444" : "#e0e0e0"}`,
                      borderRadius: "15px",
                      transition: "all 0.3s ease",
                      outline: "none",
                      background: "#f8f9fa",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#667eea")}
                    onBlur={(e) =>
                      (e.target.style.borderColor = errors.name ? "#ff4444" : "#e0e0e0")
                    }
                  />
                </div>
                {errors.name && (
                  <small style={{ color: "#ff4444", fontSize: "0.75rem", marginTop: "5px", display: "block" }}>
                    {errors.name}
                  </small>
                )}
              </div>

              {/* Price */}
              <div className="mb-4">
                <label
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: "600",
                    color: "#333",
                    marginBottom: "8px",
                    display: "block",
                  }}
                >
                  Price (₹)
                </label>
                <div style={{ position: "relative" }}>
                  <svg
                    style={{
                      position: "absolute",
                      left: "15px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "18px",
                      height: "18px",
                      color: "#999",
                    }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    placeholder="Enter product price"
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "14px 15px 14px 45px",
                      fontSize: "1rem",
                      border: `2px solid ${errors.price ? "#ff4444" : "#e0e0e0"}`,
                      borderRadius: "15px",
                      transition: "all 0.3s ease",
                      outline: "none",
                      background: "#f8f9fa",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#667eea")}
                    onBlur={(e) =>
                      (e.target.style.borderColor = errors.price ? "#ff4444" : "#e0e0e0")
                    }
                  />
                </div>
                {errors.price && (
                  <small style={{ color: "#ff4444", fontSize: "0.75rem", marginTop: "5px", display: "block" }}>
                    {errors.price}
                  </small>
                )}
              </div>

              {/* Description */}
              <div className="mb-4">
                <label
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: "600",
                    color: "#333",
                    marginBottom: "8px",
                    display: "block",
                  }}
                >
                  Description
                </label>
                <div style={{ position: "relative" }}>
                  <svg
                    style={{
                      position: "absolute",
                      left: "15px",
                      top: "18px",
                      width: "18px",
                      height: "18px",
                      color: "#999",
                    }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h7"
                    />
                  </svg>
                  <textarea
                    name="description"
                    value={formData.description}
                    placeholder="Enter product description"
                    onChange={handleChange}
                    rows="4"
                    style={{
                      width: "100%",
                      padding: "14px 15px 14px 45px",
                      fontSize: "1rem",
                      border: `2px solid ${errors.description ? "#ff4444" : "#e0e0e0"}`,
                      borderRadius: "15px",
                      transition: "all 0.3s ease",
                      outline: "none",
                      background: "#f8f9fa",
                      resize: "vertical",
                      fontFamily: "inherit",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#667eea")}
                    onBlur={(e) =>
                      (e.target.style.borderColor = errors.description ? "#ff4444" : "#e0e0e0")
                    }
                  />
                </div>
                {errors.description && (
                  <small style={{ color: "#ff4444", fontSize: "0.75rem", marginTop: "5px", display: "block" }}>
                    {errors.description}
                  </small>
                )}
              </div>

              {/* Image URL */}
              <div className="mb-4">
                <label
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: "600",
                    color: "#333",
                    marginBottom: "8px",
                    display: "block",
                  }}
                >
                  Image URL
                </label>
                <div style={{ position: "relative" }}>
                  <svg
                    style={{
                      position: "absolute",
                      left: "15px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "18px",
                      height: "18px",
                      color: "#999",
                    }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    placeholder="https://example.com/image.jpg"
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "14px 15px 14px 45px",
                      fontSize: "1rem",
                      border: `2px solid ${errors.image ? "#ff4444" : "#e0e0e0"}`,
                      borderRadius: "15px",
                      transition: "all 0.3s ease",
                      outline: "none",
                      background: "#f8f9fa",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#667eea")}
                    onBlur={(e) =>
                      (e.target.style.borderColor = errors.image ? "#ff4444" : "#e0e0e0")
                    }
                  />
                </div>
                {errors.image && (
                  <small style={{ color: "#ff4444", fontSize: "0.75rem", marginTop: "5px", display: "block" }}>
                    {errors.image}
                  </small>
                )}
              </div>

              {/* Image Preview */}
              {formData.image && !errors.image && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    marginBottom: "20px",
                    padding: "15px",
                    background: "#f8f9fa",
                    borderRadius: "15px",
                    textAlign: "center",
                  }}
                >
                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "#666",
                      marginBottom: "10px",
                    }}
                  >
                    Image Preview
                  </p>
                  <img
                    src={formData.image}
                    alt="Preview"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "150px",
                      borderRadius: "10px",
                      objectFit: "contain",
                    }}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/150?text=Invalid+Image+URL";
                    }}
                  />
                </motion.div>
              )}

              {/* Submit Error */}
              {errors.submit && (
                <div
                  style={{
                    background: "#ffebee",
                    color: "#c62828",
                    padding: "12px",
                    borderRadius: "12px",
                    fontSize: "0.85rem",
                    marginBottom: "20px",
                    textAlign: "center",
                  }}
                >
                  {errors.submit}
                </div>
              )}

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "15px", marginTop: "30px" }}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  style={{
                    flex: 1,
                    padding: "14px",
                    fontSize: "1rem",
                    fontWeight: "600",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                    border: "none",
                    borderRadius: "15px",
                    cursor: isLoading ? "not-allowed" : "pointer",
                    transition: "all 0.3s ease",
                    opacity: isLoading ? 0.7 : 1,
                    boxShadow: "0 4px 12px rgba(102,126,234,0.3)",
                  }}
                >
                  {isLoading ? (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                      }}
                    >
                      <div
                        style={{
                          width: "20px",
                          height: "20px",
                          border: "3px solid white",
                          borderTopColor: "transparent",
                          borderRadius: "50%",
                          animation: "spin 0.6s linear infinite",
                        }}
                      />
                      Adding Product...
                    </div>
                  ) : (
                    "Add Product"
                  )}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => navigate("/")}
                  style={{
                    flex: 1,
                    padding: "14px",
                    fontSize: "1rem",
                    fontWeight: "600",
                    background: "transparent",
                    color: "#667eea",
                    border: "2px solid #667eea",
                    borderRadius: "15px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                >
                  Cancel
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          @keyframes reverse {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(20px); }
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          
          @media (max-width: 640px) {
            div[style*="padding: 40px"] {
              padding: 25px !important;
            }
            
            div[style*="display: flex"][style*="gap: 15px"] {
              flex-direction: column !important;
            }
            
            h1 {
              font-size: 1.8rem !important;
            }
          }
        `}
      </style>
    </div>
  );
}