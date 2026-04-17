import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update state when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
      setRole(localStorage.getItem("role"));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
    setRole(null);
    navigate("/login");
  }

  const navLinks = [
    { path: "/", label: "Home", icon: "🏠" },
    ...(role === "admin" ? [{ path: "/add-product", label: "Add Product", icon: "➕" }] : []),
    ...(role === "user" ? [{ path: "/cart", label: "Cart", icon: "🛒" }] : []),
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: isScrolled 
            ? 'rgba(255, 255, 255, 0.95)' 
            : 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(20px)',
          boxShadow: isScrolled 
            ? '0 4px 20px rgba(0, 0, 0, 0.08)' 
            : '0 1px 0 rgba(0, 0, 0, 0.05)',
          transition: 'all 0.3s ease',
          borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
        }}
      >
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '16px 32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Logo/Brand */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
            }}
            onClick={() => navigate('/')}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(102,126,234,0.3)',
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2h-5v-8H9v8H4a2 2 0 0 1-2-2z" />
              </svg>
            </div>
            <span
              style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.5px',
              }}
            >
              ShopHub
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
              }}
            >
              {token ? (
                <>
                  {navLinks.map((link) => (
                    <motion.div
                      key={link.path}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        to={link.path}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '8px 20px',
                          borderRadius: '50px',
                          textDecoration: 'none',
                          fontWeight: '500',
                          fontSize: '0.95rem',
                          transition: 'all 0.3s ease',
                          background: location.pathname === link.path
                            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                            : 'transparent',
                          color: location.pathname === link.path
                            ? 'white'
                            : '#333',
                          boxShadow: location.pathname === link.path
                            ? '0 4px 12px rgba(102,126,234,0.3)'
                            : 'none',
                        }}
                        onMouseEnter={(e) => {
                          if (location.pathname !== link.path) {
                            e.target.style.background = '#f5f5f5';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (location.pathname !== link.path) {
                            e.target.style.background = 'transparent';
                          }
                        }}
                      >
                        <span>{link.icon}</span>
                        <span>{link.label}</span>
                      </Link>
                    </motion.div>
                  ))}

                  {/* User Profile Section */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginLeft: '8px',
                      paddingLeft: '12px',
                      borderLeft: '1px solid #e0e0e0',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontWeight: '600',
                          fontSize: '14px',
                        }}
                      >
                        {role === 'admin' ? 'A' : 'U'}
                      </div>
                      <span
                        style={{
                          fontSize: '0.85rem',
                          color: '#666',
                          fontWeight: '500',
                        }}
                      >
                        {role === 'admin' ? 'Admin' : 'User'}
                      </span>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleLogout}
                      style={{
                        padding: '8px 20px',
                        borderRadius: '50px',
                        border: 'none',
                        background: 'linear-gradient(135deg, #f56565 0%, #ed64a6 100%)',
                        color: 'white',
                        fontWeight: '600',
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 12px rgba(245,101,101,0.3)',
                      }}
                    >
                      Logout
                    </motion.button>
                  </div>
                </>
              ) : (
                <>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/login"
                      style={{
                        padding: '8px 24px',
                        borderRadius: '50px',
                        textDecoration: 'none',
                        fontWeight: '600',
                        fontSize: '0.95rem',
                        background: 'transparent',
                        color: '#667eea',
                        border: '2px solid #667eea',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Sign In
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/register"
                      style={{
                        padding: '8px 24px',
                        borderRadius: '50px',
                        textDecoration: 'none',
                        fontWeight: '600',
                        fontSize: '0.95rem',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 12px rgba(102,126,234,0.3)',
                      }}
                    >
                      Create Account
                    </Link>
                  </motion.div>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
              }}
              className="mobile-menu-btn"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: '73px',
              left: 0,
              right: 0,
              background: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(20px)',
              zIndex: 999,
              padding: '20px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              display: 'none',
            }}
            className="mobile-menu"
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              {token ? (
                <>
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        textDecoration: 'none',
                        fontWeight: '500',
                        background: location.pathname === link.path
                          ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                          : '#f5f5f5',
                        color: location.pathname === link.path ? 'white' : '#333',
                      }}
                    >
                      <span>{link.icon}</span>
                      <span>{link.label}</span>
                    </Link>
                  ))}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    style={{
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: 'none',
                      background: 'linear-gradient(135deg, #f56565 0%, #ed64a6 100%)',
                      color: 'white',
                      fontWeight: '600',
                      cursor: 'pointer',
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{
                      padding: '12px 16px',
                      borderRadius: '12px',
                      textDecoration: 'none',
                      fontWeight: '600',
                      textAlign: 'center',
                      background: '#f5f5f5',
                      color: '#667eea',
                      border: '2px solid #667eea',
                    }}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{
                      padding: '12px 16px',
                      borderRadius: '12px',
                      textDecoration: 'none',
                      fontWeight: '600',
                      textAlign: 'center',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                    }}
                  >
                    Create Account
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add padding to body to prevent content from hiding under navbar */}
      <div style={{ height: '73px' }} />

      <style>
        {`
          @media (max-width: 768px) {
            .mobile-menu-btn {
              display: flex !important;
            }
            
            .mobile-menu {
              display: block !important;
            }
            
            div[style*="display: flex"][style*="gap: 8px"]:not(.mobile-menu *) {
              display: none !important;
            }
          }
        `}
      </style>
    </>
  );
}