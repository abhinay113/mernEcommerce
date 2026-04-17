import React, { useState } from 'react';
import API from '../api/axios';
import { Link, useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';

export default function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobile, setMobile] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!name.trim()) newErrors.name = "Name is required";
        if (!email.trim()) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
        if (!password) newErrors.password = "Password is required";
        else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
        if (!mobile) newErrors.mobile = "Mobile number is required";
        else if (!/^\d{10}$/.test(mobile)) newErrors.mobile = "Mobile number must be 10 digits";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    function handleRegister(e) {
        e.preventDefault();
        if (!validateForm()) return;
        
        setIsLoading(true);
        API.post("/auth/register", { name, email, password, mobile: Number(mobile) })
            .then((res) => {
                if (res.status === 201) {
                    navigate("/login", { state: { message: "Registration successful! Please login." } });
                }
            })
            .catch(err => {
                console.log(err);
                setErrors({ submit: err.response?.data?.message || "Registration failed. Please try again." });
            })
            .finally(() => setIsLoading(false));
    }

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Animated background blobs */}
            <div style={{
                position: 'absolute',
                width: '500px',
                height: '500px',
                background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
                borderRadius: '50%',
                top: '-250px',
                right: '-100px',
                animation: 'float 6s ease-in-out infinite'
            }} />
            <div style={{
                position: 'absolute',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 70%)',
                borderRadius: '50%',
                bottom: '-200px',
                left: '-100px',
                animation: 'float 8s ease-in-out infinite reverse'
            }} />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="container"
                style={{ maxWidth: '500px', padding: '20px', position: 'relative', zIndex: 1 }}
            >
                <div style={{
                    background: 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '40px',
                    padding: '50px 40px',
                    boxShadow: '0 25px 45px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.3)'
                }}>
                    
                    {/* Logo/Brand */}
                    <div className="text-center mb-4">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            style={{
                                width: '70px',
                                height: '70px',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                borderRadius: '20px',
                                margin: '0 auto 20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 10px 20px rgba(102,126,234,0.3)'
                            }}
                        >
                            <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                        </motion.div>
                        <h1 style={{
                            fontSize: '2.5rem',
                            fontWeight: '700',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            marginBottom: '8px'
                        }}>Create Account</h1>
                        <p style={{ color: '#666', fontSize: '0.9rem' }}>Join us and start your journey</p>
                    </div>

                    <form onSubmit={handleRegister}>
                        {/* Name Field */}
                        <div className="mb-4">
                            <label style={{
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                color: '#333',
                                marginBottom: '8px',
                                display: 'block',
                                letterSpacing: '0.5px'
                            }}>Full Name</label>
                            <div style={{ position: 'relative' }}>
                                <svg style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', width: '18px', height: '18px', color: '#999' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <input
                                    type="text"
                                    className={errors.name ? "error" : ""}
                                    onChange={(e) => setName(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '14px 15px 14px 45px',
                                        fontSize: '1rem',
                                        border: `2px solid ${errors.name ? '#ff4444' : '#e0e0e0'}`,
                                        borderRadius: '15px',
                                        transition: 'all 0.3s ease',
                                        outline: 'none',
                                        background: '#f8f9fa'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#667eea'}
                                    onBlur={(e) => e.target.style.borderColor = errors.name ? '#ff4444' : '#e0e0e0'}
                                />
                            </div>
                            {errors.name && <small style={{ color: '#ff4444', fontSize: '0.75rem', marginTop: '5px', display: 'block' }}>{errors.name}</small>}
                        </div>

                        {/* Email Field */}
                        <div className="mb-4">
                            <label style={{
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                color: '#333',
                                marginBottom: '8px',
                                display: 'block'
                            }}>Email Address</label>
                            <div style={{ position: 'relative' }}>
                                <svg style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', width: '18px', height: '18px', color: '#999' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <input
                                    type="email"
                                    className={errors.email ? "error" : ""}
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '14px 15px 14px 45px',
                                        fontSize: '1rem',
                                        border: `2px solid ${errors.email ? '#ff4444' : '#e0e0e0'}`,
                                        borderRadius: '15px',
                                        transition: 'all 0.3s ease',
                                        outline: 'none',
                                        background: '#f8f9fa'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#667eea'}
                                    onBlur={(e) => e.target.style.borderColor = errors.email ? '#ff4444' : '#e0e0e0'}
                                />
                            </div>
                            {errors.email && <small style={{ color: '#ff4444', fontSize: '0.75rem', marginTop: '5px', display: 'block' }}>{errors.email}</small>}
                        </div>

                        {/* Password Field */}
                        <div className="mb-4">
                            <label style={{
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                color: '#333',
                                marginBottom: '8px',
                                display: 'block'
                            }}>Password</label>
                            <div style={{ position: 'relative' }}>
                                <svg style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', width: '18px', height: '18px', color: '#999' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                <input
                                    type="password"
                                    className={errors.password ? "error" : ""}
                                    onChange={(e) => setPassword(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '14px 15px 14px 45px',
                                        fontSize: '1rem',
                                        border: `2px solid ${errors.password ? '#ff4444' : '#e0e0e0'}`,
                                        borderRadius: '15px',
                                        transition: 'all 0.3s ease',
                                        outline: 'none',
                                        background: '#f8f9fa'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#667eea'}
                                    onBlur={(e) => e.target.style.borderColor = errors.password ? '#ff4444' : '#e0e0e0'}
                                />
                            </div>
                            {errors.password && <small style={{ color: '#ff4444', fontSize: '0.75rem', marginTop: '5px', display: 'block' }}>{errors.password}</small>}
                        </div>

                        {/* Mobile Field */}
                        <div className="mb-4">
                            <label style={{
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                color: '#333',
                                marginBottom: '8px',
                                display: 'block'
                            }}>Mobile Number</label>
                            <div style={{ position: 'relative' }}>
                                <svg style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', width: '18px', height: '18px', color: '#999' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <input
                                    type="tel"
                                    className={errors.mobile ? "error" : ""}
                                    onChange={(e) => setMobile(e.target.value)}
                                    maxLength="10"
                                    style={{
                                        width: '100%',
                                        padding: '14px 15px 14px 45px',
                                        fontSize: '1rem',
                                        border: `2px solid ${errors.mobile ? '#ff4444' : '#e0e0e0'}`,
                                        borderRadius: '15px',
                                        transition: 'all 0.3s ease',
                                        outline: 'none',
                                        background: '#f8f9fa'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#667eea'}
                                    onBlur={(e) => e.target.style.borderColor = errors.mobile ? '#ff4444' : '#e0e0e0'}
                                />
                            </div>
                            {errors.mobile && <small style={{ color: '#ff4444', fontSize: '0.75rem', marginTop: '5px', display: 'block' }}>{errors.mobile}</small>}
                        </div>

                        {errors.submit && (
                            <div style={{
                                background: '#ffebee',
                                color: '#c62828',
                                padding: '12px',
                                borderRadius: '12px',
                                fontSize: '0.85rem',
                                marginBottom: '20px',
                                textAlign: 'center'
                            }}>
                                {errors.submit}
                            </div>
                        )}

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                            style={{
                                width: '100%',
                                padding: '16px',
                                fontSize: '1rem',
                                fontWeight: '600',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '15px',
                                cursor: isLoading ? 'not-allowed' : 'pointer',
                                transition: 'all 0.3s ease',
                                opacity: isLoading ? 0.7 : 1,
                                marginTop: '10px',
                                boxShadow: '0 5px 15px rgba(102,126,234,0.4)'
                            }}
                        >
                            {isLoading ? (
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                    <div style={{
                                        width: '20px',
                                        height: '20px',
                                        border: '3px solid white',
                                        borderTopColor: 'transparent',
                                        borderRadius: '50%',
                                        animation: 'spin 0.6s linear infinite'
                                    }} />
                                    Creating Account...
                                </div>
                            ) : (
                                'Create Account'
                            )}
                        </motion.button>

                        <div style={{ marginTop: '30px', textAlign: 'center', position: 'relative' }}>
                            <p style={{ color: '#666', fontSize: '0.9rem' }}>
                                Already have an account?{' '}
                                <Link to="/login" style={{
                                    color: '#667eea',
                                    textDecoration: 'none',
                                    fontWeight: '600',
                                    transition: 'color 0.3s ease'
                                }}
                                onMouseEnter={(e) => e.target.style.color = '#764ba2'}
                                onMouseLeave={(e) => e.target.style.color = '#667eea'}>
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>

                <p style={{
                    textAlign: 'center',
                    marginTop: '20px',
                    color: 'rgba(255,255,255,0.8)',
                    fontSize: '0.8rem'
                }}>
                    By signing up, you agree to our Terms & Conditions
                </p>
            </motion.div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                @keyframes reverse {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(20px); }
                }
            `}</style>
        </div>
    );
}