import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../services/api";
import "./ForgotPassword.css";

function ForgotPassword() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [resetToken, setResetToken] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${API_URL}/api/v1/auth/forgot-password`,
                { email }
            );

            setResetToken(response.data.resetToken);

            alert("Password reset token generated!");

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to generate reset token"
            );
        }
    };

    return (
        <div className="forgot-password-page">

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
                            Enter your registered email address to generate
                            a password reset token.
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
                            🔑 Generate Reset Token
                        </button>

                    </form>

                    {/* Reset Token */}
                    {resetToken && (
                        <div className="reset-token-box">

                            <div className="token-header">
                                <span>🔑</span>
                                <h3>Reset Token Generated</h3>
                            </div>

                            <p className="token-description">
                                Use the token below to reset your password.
                            </p>

                            <div className="token-value">
                                {resetToken}
                            </div>

                        </div>
                    )}

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
                        <strong>Forgot your password?</strong>

                        <p>
                            Enter the email address associated with your
                            account to generate a reset token.
                        </p>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default ForgotPassword;