import { useState } from "react";
import axios from "axios";
import API_URL from "../services/api";

function ForgotPassword() {
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
        <div>
            <h1>Forgot Password</h1>

            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <br />

                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <br />
                <br />

                <button type="submit">
                    Generate Reset Token
                </button>
            </form>

            {resetToken && (
                <div>
                    <h3>Reset Token</h3>
                    <p>{resetToken}</p>
                </div>
            )}
        </div>
    );
}

export default ForgotPassword;