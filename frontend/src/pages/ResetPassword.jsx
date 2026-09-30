import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            await axios.post(
                `http://localhost:5000/api/v1/auth/reset-password/${token}`,
                {
                    password
                }
            );

            alert("Password reset successfully!");

            navigate("/login");

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to reset password"
            );
        }
    };

    return (
        <div>
            <h1>Reset Password</h1>

            <form onSubmit={handleSubmit}>

                <label>New Password</label>
                <br />

                <input
                    type="password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    required
                />

                <br />
                <br />

                <label>Confirm Password</label>
                <br />

                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) =>
                        setConfirmPassword(e.target.value)
                    }
                    required
                />

                <br />
                <br />

                <button type="submit">
                    Reset Password
                </button>

            </form>
        </div>
    );
}

export default ResetPassword;