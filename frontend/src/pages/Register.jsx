import { useState } from "react";
import axios from "axios";
import API_URL from "../services/api";
import "./Register.css";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                `${API_URL}/api/v1/auth/register`,
                {
                    name,
                    email,
                    password,
                    role: "student"
                }
            );

            alert("Registration successful!");

            setName("");
            setEmail("");
            setPassword("");

        } catch (error) {
            alert(
                error.response?.data?.error ||
                error.response?.data?.message ||
                error.message ||
                "Registration failed"
            );
        }
    };

    return (
        <div className="register-page">

            {/* LEFT SIDE */}
            <div className="register-hero">

                <div className="register-hero-content">

                    <div className="register-brand-icon">
                        💼
                    </div>

                    <h1>
                        Start Your
                        <br />
                        Internship
                        <br />
                        Journey
                    </h1>

                    <p>
                        Create your account and start organizing
                        your internship applications in one place.
                    </p>

                    <div className="register-features">

                        <div className="register-feature">
                            <span>✓</span>
                            <p>Keep your applications organized</p>
                        </div>

                        <div className="register-feature">
                            <span>✓</span>
                            <p>Track your interview progress</p>
                        </div>

                        <div className="register-feature">
                            <span>✓</span>
                            <p>Never lose track of an opportunity</p>
                        </div>

                    </div>

                </div>

            </div>


            {/* RIGHT SIDE */}
            <div className="register-section">

                <div className="register-card">

                    <div className="register-heading">

                        <h2>
                            Create your account ✨
                        </h2>

                        <p>
                            Start tracking your internship applications
                        </p>

                    </div>


                    <form onSubmit={handleRegister}>

                        {/* NAME */}
                        <div className="register-form-group">

                            <label htmlFor="name">
                                Full Name
                            </label>

                            <input
                                id="name"
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                                required
                            />

                        </div>


                        {/* EMAIL */}
                        <div className="register-form-group">

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
                        <div className="register-form-group">

                            <label htmlFor="password">
                                Password
                            </label>

                            <input
                                id="password"
                                type="password"
                                placeholder="Create a password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                required
                            />

                        </div>


                        {/* REGISTER BUTTON */}
                        <button
                            type="submit"
                            className="register-button"
                        >
                            Create Account
                        </button>

                    </form>


                    <div className="login-link">

                        <span>
                            Already have an account?
                        </span>

                        <a href="/">
                            Login
                        </a>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Register;