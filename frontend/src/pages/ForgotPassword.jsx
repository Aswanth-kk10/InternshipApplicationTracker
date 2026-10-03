import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../services/api";
import "./ForgotPassword.css";

function ForgotPassword() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [notification, setNotification] = useState({
        show: false,
        type: "",
        message: ""
    });

    const showNotification = (type, message) => {
        setNotification({
            show: true,
            type,
            message
        });

        setTimeout(() => {
            setNotification({
                show: false,
                type: "",
                message: ""
            });
        }, 2500);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${API_URL}/api/v1/auth/forgot-password`,
                { email }
            );

            const token = response.data.resetToken;

            showNotification(
                "success",
                "Reset link generated! Opening password reset..."
            );

            // Automatically open Reset Password page
            setTimeout(() => {
                navigate(`/reset-password/${token}`);
            }, 1000);

        } catch (error) {
            showNotification(
                "error",
                error.response?.data?.message ||
                "Failed to generate reset token"
            );
        }
    };

    return (
        <div className="forgot-password-page">

            {/* TOAST NOTIFICATION */}
            {notification.show && (
                <div
                    className={`forgot-password-toast ${notification.type}`}
                    role="alert"
                >
                    <div className="forgot-password-toast-icon">
                        {notification.type === "success" ? "✓" : "!"}
                    </div>

                    <div className="forgot-password-toast-content">
                        <strong>
                            {notification.type === "success"
                                ? "Success"
                                : "Something went wrong"}
                        </strong>

                        <span>
                            {notification.message}
                        </span>
                    </div>
                </div>
            )}

            <div className="forgot-password-container">

                {/* Header */}
                <div className="forgot-password-header">

                    <div className="header-icon">
                        🔐
                    </div>

                    <div>
                        <h1>Forgot Password?</h1>

                        <p>
                            Generate a password reset token for your account
                        </p>
                    </div>

                </div>

                {/* Form Card */}
                <div className="forgot-password-card">

                    <div className="form-card-header">

                        <h2>Reset Your Password</h2>

                        <p>
                            Enter your registered email address to continue.
                        </p>

                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="form-group">

                            <label htmlFor="email">
                                Email Address
                            </label>

                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                        </div>

                        <button
                            type="submit"
                            className="reset-button"
                        >
                            🔑 Continue to Reset Password
                        </button>

                    </form>

                    {/* Back to Login */}
                    <button
                        type="button"
                        className="back-login-button"
                        onClick={() => navigate("/login")}
                    >
                        ← Back to Login
                    </button>

                </div>

                {/* Tip */}
                <div className="forgot-password-tip">

                    <span>💡</span>

                    <div>
                        <strong>Secure Password Reset</strong>

                        <p>
                            Enter the email associated with your account.
                            You'll be taken directly to the password reset
                            page after verification.
                        </p>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default ForgotPassword;