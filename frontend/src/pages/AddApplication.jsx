import { useState } from "react";
import axios from "axios";

function AddApplication() {
    const [company, setCompany] = useState("");
    const [position, setPosition] = useState("");
    const [status, setStatus] = useState("Applied");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            await axios.post(
                "http://localhost:5000/api/v1/applications",
                {
                    company,
                    position,
                    status
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Application added successfully!");

            setCompany("");
            setPosition("");
            setStatus("Applied");

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to add application"
            );
        }
    };

    return (
        <div>
            <h1>Add Internship Application</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Company</label>
                    <br />
                    <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        required
                    />
                </div>

                <br />

                <div>
                    <label>Position</label>
                    <br />
                    <input
                        type="text"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        required
                    />
                </div>

                <br />

                <div>
                    <label>Status</label>
                    <br />
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="Applied">Applied</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Interview">Interview</option>
                        <option value="Selected">Selected</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>

                <br />

                <button type="submit">
                    Add Application
                </button>
            </form>
        </div>
    );
}

export default AddApplication;