import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
    const navigate = useNavigate();

    const [applications, setApplications] = useState([]);
    const [statusFilter, setStatusFilter] = useState("All");

    // Logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        alert("Logged out successfully!");
        navigate("/login");
    };

    // Get applications
    const fetchApplications = async (status = "All") => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:5000/api/v1/applications",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const allApplications = response.data.applications;

            // Filter applications on dashboard
            const filteredApplications =
                status === "All"
                    ? allApplications
                    : allApplications.filter(
                          (application) =>
                              application.status === status
                      );

            setApplications(filteredApplications);

        } catch (error) {
            console.log(error);
        }
    };

    // Load applications when dashboard opens
    useEffect(() => {
        fetchApplications();
    }, []);

    // Handle status filter
    const handleFilter = (e) => {
        const selectedStatus = e.target.value;

        setStatusFilter(selectedStatus);
        fetchApplications(selectedStatus);
    };

    // Delete application
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this application?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            const token = localStorage.getItem("token");

            await axios.delete(
                `http://localhost:5000/api/v1/applications/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Application deleted successfully!");

            fetchApplications(statusFilter);

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to delete application"
            );
        }
    };

    return (
        <div>
            <h1>Internship Application Tracker</h1>

            <h2>My Applications</h2>

            <button onClick={handleLogout}>
                Logout
            </button>

            <br />
            <br />

            <Link to="/add-application">
                Add Application
            </Link>

            <br />
            <br />

            <label>Filter by Status: </label>

            <select
                value={statusFilter}
                onChange={handleFilter}
            >
                <option value="All">All</option>
                <option value="Applied">Applied</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Interview">Interview</option>
                <option value="Selected">Selected</option>
                <option value="Rejected">Rejected</option>
            </select>

            <br />
            <br />

            {applications.length === 0 ? (
                <p>No applications found.</p>
            ) : (
                <ul>
                    {applications.map((application) => (
                        <li key={application._id}>
                            <strong>
                                {application.company}
                            </strong>

                            {" - "}

                            {application.position}

                            {" - "}

                            {application.status}

                            {" "}

                            <Link
                                to={`/edit-application/${application._id}`}
                            >
                                Edit
                            </Link>

                            {" "}

                            <button
                                onClick={() =>
                                    handleDelete(application._id)
                                }
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Dashboard;