import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import API_URL from "../services/api";
import "./ResetPassword.css";

function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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

        if (password !== confirmPassword) {
            showNotification(
                "error",
                "Passwords do not match!"
            );
            return;
        }

        try {
            await axios.post(
                `${API_URL}/api/v1/auth/reset-password/${token}`,
                {
                    password
                }
            );

            showNotification(
                "success",
                "Password reset successfully! Redirecting to login..."
            );

            setTimeout(() => {
                navigate("/login");
            }, 1200);

        } catch (error) {
            showNotification(
                "error",
                error.response?.data?.message ||
                "Failed to reset password"
            );
        }
    };

    return (
        <div className="reset-password-page">

            {/* TOAST NOTIFICATION */}
            {notification.show && (
                <div
                    className={`reset-password-toast ${notification.type}`}
                    role="alert"
                >
                    <div className="reset-password-toast-icon">
                        {notification.type === "success" ? "✓" : "!"}
                    </div>

                    <div className="reset-password-toast-content">
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

            <div className="reset-password-container">

                {/* Header */}
                <div className="reset-password-header">

                    <div className="header-icon">
                        🔐
                    </div>

                    <div>
                        <h1>Reset Password</h1>

                        <p>
                            Create a new password for your account
                        </p>
                    </div>

                </div>

                {/* Form Card */}
                <div className="reset-password-card">

                    <div className="form-card-header">

                        <h2>Create New Password</h2>

                        <p>
                            Enter and confirm your new password below.
                        </p>

                    </div>

                    <form onSubmit={handleSubmit}>

                        {/* New Password */}
                        <div className="form-group">

                            <label htmlFor="password">
                                New Password
                            </label>

                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your new password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                required
                            />

                        </div>

                        {/* Confirm Password */}
                        <div className="form-group">

                            <label htmlFor="confirmPassword">
                                Confirm New Password
                            </label>

                            <input
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirm your new password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                required
                            />

                        </div>

                        {/* Password mismatch message */}
                        {confirmPassword &&
                            password !== confirmPassword && (
                                <p className="password-error">
                                    ⚠️ Passwords do not match
                                </p>
                            )}

                        {/* Submit */}
                        <button
                            type="submit"
                            className="reset-button"
                        >
                            🔑 Reset Password
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
                <div className="reset-password-tip">

                    <span>💡</span>

                    <div>
                        <strong>Password Tip</strong>

                        <p>
                            Choose a strong password that you don't use
                            for other accounts.
                        </p>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default ResetPassword;