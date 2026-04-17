import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/product");
      setProducts(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (id) => {
    API.post("/cart/add", { productId: id })
      .then((res) => {
        if (res.status == 201) {
          alert("Added to cart");
          navigate("/cart");
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
          maxWidth: "1400px",
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
            Our Collection
          </h1>
          <p style={{ color: "#666", fontSize: "1.1rem", fontWeight: "400" }}>
            Discover amazing products at best prices
          </p>
        </motion.div>

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
            <p
              style={{
                color: "#667eea",
                fontSize: "1.1rem",
                fontWeight: "500",
              }}
            >
              Loading amazing products...
            </p>
          </div>
        ) : (
          <>
            {products.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "60px 20px",
                  background: "rgba(255,255,255,0.9)",
                  borderRadius: "30px",
                  backdropFilter: "blur(10px)",
                }}
              >
                <p style={{ color: "#666", fontSize: "1.2rem" }}>
                  No products available at the moment
                </p>
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                  gap: "30px",
                }}
              >
                {products.map((p, index) => (
                  <motion.div
                    key={p._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -10 }}
                    style={{
                      background: "rgba(255, 255, 255, 0.98)",
                      backdropFilter: "blur(10px)",
                      borderRadius: "24px",
                      overflow: "hidden",
                      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
                      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      position: "relative",
                    }}
                  >
                    {/* Image Container */}
                    <div
                      style={{
                        position: "relative",
                        overflow: "hidden",
                        background: "#f8f9fa",
                        height: "250px",
                      }}
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition:
                            "transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                        }}
                        onMouseEnter={(e) => {
                          if (e.currentTarget) {
                            e.currentTarget.style.transform = "scale(1.05)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (e.currentTarget) {
                            e.currentTarget.style.transform = "scale(1)";
                          }
                        }}
                      />
                      {/* Image Overlay */}
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background:
                            "linear-gradient(135deg, rgba(102,126,234,0.9) 0%, rgba(118,75,162,0.9) 100%)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          opacity: 0,
                          transition: "opacity 0.3s ease",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                          if (e.currentTarget) {
                            e.currentTarget.style.opacity = "1";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (e.currentTarget) {
                            e.currentTarget.style.opacity = "0";
                          }
                        }}
                        onClick={() => addToCart(p._id)}
                      >
                        <button
                          style={{
                            background: "white",
                            border: "none",
                            padding: "12px 24px",
                            borderRadius: "50px",
                            fontWeight: "600",
                            color: "#667eea",
                            cursor: "pointer",
                            transition: "transform 0.3s ease",
                            fontSize: "0.9rem",
                          }}
                          onMouseEnter={(e) => {
                            if (e.currentTarget) {
                              e.currentTarget.style.transform = "scale(1.05)";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (e.currentTarget) {
                              e.currentTarget.style.transform = "scale(1)";
                            }
                          }}
                        >
                          Quick View
                        </button>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div style={{ padding: "20px" }}>
                      <h5
                        style={{
                          fontSize: "1.2rem",
                          fontWeight: "600",
                          color: "#333",
                          marginBottom: "10px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                        title={p.name}
                      >
                        {p.name}
                      </h5>
                      <p
                        style={{
                          fontSize: "0.9rem",
                          color: "#666",
                          marginBottom: "10px",
                          lineHeight: "1.5",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {p.description}
                      </p>
                      <p
                        style={{
                          fontSize: "1.5rem",
                          fontWeight: "700",
                          background:
                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          marginBottom: "15px",
                        }}
                      >
                        ₹{p.price?.toLocaleString()}
                      </p>

                      {role === "user" && (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => addToCart(p._id)}
                          style={{
                            width: "100%",
                            padding: "12px",
                            fontSize: "0.95rem",
                            fontWeight: "600",
                            background:
                              "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            color: "white",
                            border: "none",
                            borderRadius: "12px",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            boxShadow: "0 4px 12px rgba(102,126,234,0.3)",
                          }}
                        >
                          Add to Cart
                        </motion.button>
                      )}

                      {role === "admin" && (
                        <div
                          style={{
                            textAlign: "center",
                            padding: "10px",
                            background: "#f8f9fa",
                            borderRadius: "12px",
                            color: "#764ba2",
                            fontSize: "0.85rem",
                            fontWeight: "500",
                          }}
                        >
                          Admin View Only
                        </div>
                      )}
                    </div>

                    {/* Badge for new products (optional) */}
                    {index < 2 && (
                      <div
                        style={{
                          position: "absolute",
                          top: "15px",
                          right: "15px",
                          background:
                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          color: "white",
                          padding: "5px 12px",
                          borderRadius: "50px",
                          fontSize: "0.75rem",
                          fontWeight: "600",
                          zIndex: 1,
                        }}
                      >
                        New
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Add keyframes animation to document */}
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
          
          @media (max-width: 768px) {
            div[style*="gridTemplateColumns"] {
              grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)) !important;
              gap: 20px !important;
            }
            
            h1 {
              font-size: 2.5rem !important;
            }
          }
          
          @media (max-width: 480px) {
            div[style*="gridTemplateColumns"] {
              grid-template-columns: 1fr !important;
            }
            
            h1 {
              font-size: 2rem !important;
            }
            
            div[style*="height: 250px"] {
              height: 200px !important;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Home;