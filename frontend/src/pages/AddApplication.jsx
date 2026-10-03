import { useState } from "react";
import axios from "axios";
import API_URL from "../services/api";
import "./AddApplication.css";

function AddApplication() {
    const [company, setCompany] = useState("");
    const [position, setPosition] = useState("");
    const [status, setStatus] = useState("Applied");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            await axios.post(
                `${API_URL}/api/v1/applications`,
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
        <div className="add-application-page">

            <div className="add-application-container">

                {/* Header */}
                <div className="add-application-header">
                    <div className="header-icon">💼</div>

                    <div>
                        <h1>Add Internship Application</h1>
                        <p>
                            Keep track of a new internship application
                        </p>
                    </div>
                </div>

                {/* Form Card */}
                <div className="application-form-card">

                    <div className="form-card-header">
                        <h2>Application Details</h2>
                        <p>
                            Enter the details of the internship you applied for.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>

                        {/* Company */}
                        <div className="form-group">
                            <label htmlFor="company">
                                Company
                            </label>

                            <input
                                id="company"
                                type="text"
                                placeholder="e.g. Google, Microsoft, Amazon"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                                required
                            />
                        </div>

                        {/* Position */}
                        <div className="form-group">
                            <label htmlFor="position">
                                Position
                            </label>

                            <input
                                id="position"
                                type="text"
                                placeholder="e.g. Software Engineer Intern"
                                value={position}
                                onChange={(e) => setPosition(e.target.value)}
                                required
                            />
                        </div>

                        {/* Status */}
                        <div className="form-group">
                            <label htmlFor="status">
                                Application Status
                            </label>

                            <select
                                id="status"
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

                        {/* Buttons */}
                        <div className="form-actions">

                            <button
                                type="button"
                                className="cancel-button"
                                onClick={() => window.history.back()}
                            >
                                ← Cancel
                            </button>

                            <button
                                type="submit"
                                className="submit-button"
                            >
                                + Add Application
                            </button>

                        </div>

                    </form>

                </div>

                {/* Tip */}
                <div className="application-tip">
                    <span>💡</span>
                    <div>
                        <strong>Tip</strong>
                        <p>
                            Keep your application status updated so you can
                            easily track your internship progress.
                        </p>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default AddApplication;