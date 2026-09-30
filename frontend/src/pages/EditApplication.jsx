import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import API_URL from "../services/api";

function EditApplication() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [company, setCompany] = useState("");
    const [position, setPosition] = useState("");
    const [status, setStatus] = useState("Applied");

    useEffect(() => {
        const fetchApplication = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await axios.get(
                    `${API_URL}/api/v1/applications/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const application = response.data.application;

                setCompany(application.company);
                setPosition(application.position);
                setStatus(application.status);

            } catch (error) {
                alert(
                    error.response?.data?.message ||
                    "Failed to load application"
                );
            }
        };

        fetchApplication();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            await axios.put(
                `${API_URL}/api/v1/applications/${id}`,
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

            alert("Application updated successfully!");

            navigate("/dashboard");

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to update application"
            );
        }
    };

    return (
        <div>
            <h1>Edit Internship Application</h1>

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
                    Update Application
                </button>

            </form>
        </div>
    );
}

export default EditApplication;