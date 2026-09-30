import { useState } from "react";
import axios from "axios";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                "http://localhost:5000/api/v1/auth/register",
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
        <div>
            <h1>Internship Application Tracker</h1>

            <h2>Register</h2>

            <form onSubmit={handleRegister}>
                <div>
                    <label>Name</label>
                    <br />
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <br />

                <div>
                    <label>Email</label>
                    <br />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <br />

                <div>
                    <label>Password</label>
                    <br />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <br />

                <button type="submit">
                    Register
                </button>
            </form>
        </div>
    );
}

export default Register;