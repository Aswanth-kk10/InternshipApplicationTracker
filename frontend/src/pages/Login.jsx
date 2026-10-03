import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../services/api";
import "./Login.css";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${API_URL}/api/v1/auth/login`,
                {
                    email,
                    password
                }
            );

            // Save JWT token
            localStorage.setItem(
                "token",
                response.data.token
            );

            alert("Login successful!");

            // Go to dashboard
            navigate("/dashboard");

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Login failed"
            );
        }
    };

    return (
        <div className="login-page">

            {/* LEFT SIDE */}
            <div className="login-hero">

                <div className="hero-content">

                    <div className="brand-icon">
                        💼
                    </div>

                    <h1>
                        Internship
                        <br />
                        Application
                        <br />
                        Tracker
                    </h1>

                    <p>
                        Keep track of your internship journey,
                        from your first application to your final offer.
                    </p>

                    <div className="hero-features">

                        <div className="feature">
                            <span>✓</span>
                            <p>Track all your applications</p>
                        </div>

                        <div className="feature">
                            <span>✓</span>
                            <p>Monitor interview progress</p>
                        </div>

                        <div className="feature">
                            <span>✓</span>
                            <p>Stay organized and focused</p>
                        </div>

                    </div>

                </div>

            </div>


            {/* RIGHT SIDE */}
            <div className="login-section">

                <div className="login-card">

                    <div className="login-heading">

                        <h2>
                            Welcome back 👋
                        </h2>

                        <p>
                            Sign in to continue to your dashboard
                        </p>

                    </div>


                    <form onSubmit={handleLogin}>

                        {/* EMAIL */}
                        <div className="form-group">

                            <label htmlFor="email">
                                Email
                            </label>

                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                required
                            />

                        </div>


                        {/* PASSWORD */}
                        <div className="form-group">

                            <label htmlFor="password">
                                Password
                            </label>

                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                required
                            />

                        </div>


                        {/* LOGIN BUTTON */}
                        <button
                            type="submit"
                            className="login-button"
                        >
                            Login
                        </button>

                    </form>


                    {/* FORGOT PASSWORD */}
                    <div className="forgot-password">

                        <Link to="/forgot-password">
                            Forgot Password?
                        </Link>

                    </div>


                    {/* REGISTER */}
                    <div className="register-link">

                        <span>
                            Don't have an account?
                        </span>

                        <Link to="/register">
                            Create an account
                        </Link>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;