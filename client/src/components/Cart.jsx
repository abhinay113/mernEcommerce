import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [removingId, setRemovingId] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setError(null);
      const res = await API.get("/cart");
      setCart(res.data);
      console.log("Cart data:", res.data);
    } catch (err) {
      console.error("Error fetching cart:", err);
      setError("Failed to load cart. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getTotal = () => {
    if (!cart || !cart.item) return 0;
    return cart.item.reduce((total, item) => {
      return total + (item.productId?.price || 0) * (item.quantity || 0);
    }, 0);
  };

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setUpdatingId(itemId);
    setError(null);
    
    try {
      // Try different possible API endpoints
      let response;
      try {
        // Try first endpoint pattern
        response = await API.put(`/cart/${itemId}`, { quantity: newQuantity });
      } catch (err) {
        if (err.response?.status === 404) {
          // Try second endpoint pattern
          response = await API.put(`/cart/update/${itemId}`, { quantity: newQuantity });
        } else {
          throw err;
        }
      }
      
      console.log("Update response:", response);
      await fetchCart(); // Refresh cart after update
    } catch (err) {
      console.error("Error updating quantity:", err);
      setError(err.response?.data?.message || "Failed to update quantity. Please try again.");
    } finally {
      setUpdatingId(null);
    }
  };

  const removeItem = async (itemId) => {
    setRemovingId(itemId);
    setError(null);
    
    try {
      // Try different possible API endpoints
      let response;
      try {
        // Try first endpoint pattern
        response = await API.delete(`/cart/${itemId}`);
      } catch (err) {
        if (err.response?.status === 404) {
          // Try second endpoint pattern
          response = await API.delete(`/cart/remove/${itemId}`);
        } else {
          throw err;
        }
      }
      
      console.log("Remove response:", response);
      await fetchCart(); // Refresh cart after removal
    } catch (err) {
      console.error("Error removing item:", err);
      setError(err.response?.data?.message || "Failed to remove item. Please try again.");
    } finally {
      setRemovingId(null);
    }
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

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
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 20px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "60px" }}
        >
          <h1
            style={{
              fontSize: "3.5rem",
              fontWeight: "700",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "15px",
              letterSpacing: "-0.5px",
            }}
          >
            Your Cart
          </h1>
          <p style={{ color: "#666", fontSize: "1.1rem", fontWeight: "400" }}>
            {cart?.item?.length
              ? `You have ${cart.item.length} item${
                  cart.item.length > 1 ? "s" : ""
                } in your cart`
              : "Your cart is waiting for you"}
          </p>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: "#ffebee",
              color: "#c62828",
              padding: "15px",
              borderRadius: "12px",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            {error}
          </motion.div>
        )}

        {/* Loading State */}
        {loading ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "400px",
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
                marginBottom: "20px",
              }}
            />
            <p style={{ color: "#667eea", fontSize: "1.1rem", fontWeight: "500" }}>
              Loading your cart...
            </p>
          </div>
        ) : !cart || !cart.item || cart.item.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              textAlign: "center",
              padding: "80px 40px",
              background: "rgba(255, 255, 255, 0.95)",
              borderRadius: "40px",
              backdropFilter: "blur(10px)",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.05)",
            }}
          >
            <div
              style={{
                fontSize: "5rem",
                marginBottom: "20px",
              }}
            >
              🛒
            </div>
            <h2
              style={{
                fontSize: "1.8rem",
                color: "#333",
                marginBottom: "15px",
              }}
            >
              Your cart is empty
            </h2>
            <p style={{ color: "#666", marginBottom: "30px" }}>
              Looks like you haven't added any items yet
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/")}
              style={{
                padding: "14px 32px",
                fontSize: "1rem",
                fontWeight: "600",
                background:
                  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                border: "none",
                borderRadius: "50px",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(102,126,234,0.3)",
              }}
            >
              Continue Shopping
            </motion.button>
          </motion.div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 380px",
              gap: "30px",
            }}
          >
            {/* Cart Items */}
            <div>
              <AnimatePresence>
                {cart.item.map((item, index) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    style={{
                      background: "rgba(255, 255, 255, 0.95)",
                      backdropFilter: "blur(10px)",
                      borderRadius: "24px",
                      padding: "20px",
                      marginBottom: "16px",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                      transition: "all 0.3s ease",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {removingId === item._id && (
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: "rgba(255,255,255,0.9)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          zIndex: 10,
                        }}
                      >
                        <div
                          style={{
                            width: "30px",
                            height: "30px",
                            border: "3px solid rgba(102,126,234,0.2)",
                            borderTopColor: "#667eea",
                            borderRadius: "50%",
                            animation: "spin 0.6s linear infinite",
                          }}
                        />
                      </div>
                    )}
                    <div
                      style={{
                        display: "flex",
                        gap: "20px",
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      {/* Product Image */}
                      <div
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "16px",
                          overflow: "hidden",
                          background: "#f8f9fa",
                          flexShrink: 0,
                        }}
                      >
                        <img
                          src={item.productId?.image}
                          alt={item.productId?.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/100";
                          }}
                        />
                      </div>

                      {/* Product Details */}
                      <div style={{ flex: 1, minWidth: "150px" }}>
                        <h3
                          style={{
                            fontSize: "1.2rem",
                            fontWeight: "600",
                            color: "#333",
                            marginBottom: "8px",
                          }}
                        >
                          {item.productId?.name || "Product"}
                        </h3>
                        <p
                          style={{
                            color: "#666",
                            fontSize: "0.85rem",
                            marginBottom: "8px",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {item.productId?.description || "No description"}
                        </p>
                        <p
                          style={{
                            fontSize: "1.3rem",
                            fontWeight: "700",
                            background:
                              "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }}
                        >
                          ₹{(item.productId?.price || 0).toLocaleString()}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            background: "#f8f9fa",
                            padding: "8px",
                            borderRadius: "50px",
                          }}
                        >
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() =>
                              updateQuantity(item._id, item.quantity - 1)
                            }
                            disabled={updatingId === item._id}
                            style={{
                              width: "32px",
                              height: "32px",
                              borderRadius: "50%",
                              border: "none",
                              background: "white",
                              cursor: updatingId === item._id ? "not-allowed" : "pointer",
                              fontSize: "1.2rem",
                              fontWeight: "600",
                              color: "#667eea",
                              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                              opacity: updatingId === item._id ? 0.5 : 1,
                            }}
                          >
                            -
                          </motion.button>
                          <span
                            style={{
                              fontSize: "1.1rem",
                              fontWeight: "600",
                              minWidth: "40px",
                              textAlign: "center",
                            }}
                          >
                            {updatingId === item._id ? (
                              <div
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  border: "2px solid rgba(102,126,234,0.2)",
                                  borderTopColor: "#667eea",
                                  borderRadius: "50%",
                                  animation: "spin 0.6s linear infinite",
                                  margin: "0 auto",
                                }}
                              />
                            ) : (
                              item.quantity
                            )}
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() =>
                              updateQuantity(item._id, item.quantity + 1)
                            }
                            disabled={updatingId === item._id}
                            style={{
                              width: "32px",
                              height: "32px",
                              borderRadius: "50%",
                              border: "none",
                              background: "white",
                              cursor: updatingId === item._id ? "not-allowed" : "pointer",
                              fontSize: "1.2rem",
                              fontWeight: "600",
                              color: "#667eea",
                              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                              opacity: updatingId === item._id ? 0.5 : 1,
                            }}
                          >
                            +
                          </motion.button>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => removeItem(item._id)}
                          disabled={removingId === item._id}
                          style={{
                            padding: "6px 16px",
                            fontSize: "0.8rem",
                            background: "transparent",
                            color: "#f56565",
                            border: "1px solid #f56565",
                            borderRadius: "50px",
                            cursor: removingId === item._id ? "not-allowed" : "pointer",
                            opacity: removingId === item._id ? 0.5 : 1,
                          }}
                        >
                          {removingId === item._id ? "Removing..." : "Remove"}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                position: "sticky",
                top: "100px",
                height: "fit-content",
              }}
            >
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "24px",
                  padding: "28px",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    color: "#333",
                    marginBottom: "20px",
                    paddingBottom: "15px",
                    borderBottom: "2px solid #f0f0f0",
                  }}
                >
                  Order Summary
                </h3>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "15px",
                    color: "#666",
                  }}
                >
                  <span>Subtotal ({cart.item.length} items)</span>
                  <span>₹{getTotal().toLocaleString()}</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "15px",
                    color: "#666",
                  }}
                >
                  <span>Shipping</span>
                  <span style={{ color: "#4caf50" }}>Free</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "20px",
                    color: "#666",
                  }}
                >
                  <span>Tax (GST)</span>
                  <span>Included</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "20px",
                    paddingTop: "20px",
                    borderTop: "2px solid #f0f0f0",
                    marginBottom: "25px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "1.3rem",
                      fontWeight: "700",
                      color: "#333",
                    }}
                  >
                    Total
                  </span>
                  <span
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "700",
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    ₹{getTotal().toLocaleString()}
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheckout}
                  style={{
                    width: "100%",
                    padding: "16px",
                    fontSize: "1rem",
                    fontWeight: "600",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                    border: "none",
                    borderRadius: "16px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 12px rgba(102,126,234,0.3)",
                    marginBottom: "12px",
                  }}
                >
                  Proceed to Checkout
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/")}
                  style={{
                    width: "100%",
                    padding: "14px",
                    fontSize: "0.95rem",
                    fontWeight: "500",
                    background: "transparent",
                    color: "#667eea",
                    border: "2px solid #667eea",
                    borderRadius: "16px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                >
                  Continue Shopping
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
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
          
          @media (max-width: 968px) {
            div[style*="gridTemplateColumns: 1fr 380px"] {
              grid-template-columns: 1fr !important;
            }
            
            div[style*="position: sticky"] {
              position: static !important;
              margin-top: 20px;
            }
          }
          
          @media (max-width: 640px) {
            div[style*="display: flex"][style*="gap: 20px"] {
              flex-direction: column !important;
              text-align: center;
            }
            
            div[style*="width: 100px"] {
              margin: 0 auto;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Cart;