import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../services/api";
import "./Dashboard.css";

function Dashboard() {
    const navigate = useNavigate();

    const [applications, setApplications] = useState([]);
    const [allApplications, setAllApplications] = useState([]);
    const [statusFilter, setStatusFilter] = useState("All");

    // Logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        alert("Logged out successfully!");
        navigate("/login");
    };

    // Get applications
    const fetchApplications = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.get(
                `${API_URL}/api/v1/applications`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = response.data.applications || [];

            setAllApplications(data);
            setApplications(data);

        } catch (error) {
            console.log(error);
        }
    };

    // Load applications
    useEffect(() => {
        fetchApplications();
    }, []);

    // Handle status filter
    const handleFilter = (e) => {
        const selectedStatus = e.target.value;

        setStatusFilter(selectedStatus);

        if (selectedStatus === "All") {
            setApplications(allApplications);
        } else {
            const filtered = allApplications.filter(
                (application) =>
                    application.status === selectedStatus
            );

            setApplications(filtered);
        }
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
                `${API_URL}/api/v1/applications/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Application deleted successfully!");

            fetchApplications();

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to delete application"
            );
        }
    };

    // Count applications by status
    const appliedCount = allApplications.filter(
        (app) => app.status === "Applied"
    ).length;

    const shortlistedCount = allApplications.filter(
        (app) => app.status === "Shortlisted"
    ).length;

    const interviewCount = allApplications.filter(
        (app) => app.status === "Interview"
    ).length;

    const selectedCount = allApplications.filter(
        (app) => app.status === "Selected"
    ).length;

    const rejectedCount = allApplications.filter(
        (app) => app.status === "Rejected"
    ).length;

    return (
        <div className="dashboard-page">

            {/* ================= HEADER ================= */}

            <header className="dashboard-header">

                <div className="dashboard-brand">

                    <div className="dashboard-logo">
                        💼
                    </div>

                    <div>
                        <h1>Internship Tracker</h1>
                        <span>Application Dashboard</span>
                    </div>

                </div>

                <button
                    className="logout-button"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </header>


            {/* ================= MAIN ================= */}

            <main className="dashboard-main">

                {/* Welcome */}

                <section className="dashboard-welcome">

                    <div>
                        <p className="welcome-small">
                            Welcome back 👋
                        </p>

                        <h2>
                            My Applications
                        </h2>

                        <p className="welcome-description">
                            Keep track of your internship applications
                            and monitor your progress.
                        </p>
                    </div>

                    <Link
                        to="/add-application"
                        className="add-application-button"
                    >
                        + Add Application
                    </Link>

                </section>


                {/* ================= STAT CARDS ================= */}

                <section className="stats-grid">

                    <div className="stat-card">

                        <div className="stat-icon">
                            📋
                        </div>

                        <div>
                            <span>Total Applications</span>
                            <strong>
                                {allApplications.length}
                            </strong>
                        </div>

                    </div>


                    <div className="stat-card">

                        <div className="stat-icon">
                            📝
                        </div>

                        <div>
                            <span>Applied</span>
                            <strong>
                                {appliedCount}
                            </strong>
                        </div>

                    </div>


                    <div className="stat-card">

                        <div className="stat-icon">
                            ⭐
                        </div>

                        <div>
                            <span>Shortlisted</span>
                            <strong>
                                {shortlistedCount}
                            </strong>
                        </div>

                    </div>


                    <div className="stat-card">

                        <div className="stat-icon">
                            🎯
                        </div>

                        <div>
                            <span>Interviews</span>
                            <strong>
                                {interviewCount}
                            </strong>
                        </div>

                    </div>


                    <div className="stat-card">

                        <div className="stat-icon">
                            🎉
                        </div>

                        <div>
                            <span>Selected</span>
                            <strong>
                                {selectedCount}
                            </strong>
                        </div>

                    </div>


                    <div className="stat-card">

                        <div className="stat-icon">
                            ❌
                        </div>

                        <div>
                            <span>Rejected</span>
                            <strong>
                                {rejectedCount}
                            </strong>
                        </div>

                    </div>

                </section>


                {/* ================= APPLICATIONS ================= */}

                <section className="applications-section">

                    <div className="applications-header">

                        <div>
                            <h3>
                                Your Applications
                            </h3>

                            <p>
                                View and manage your internship applications.
                            </p>
                        </div>


                        <div className="filter-box">

                            <label htmlFor="status">
                                Filter
                            </label>

                            <select
                                id="status"
                                value={statusFilter}
                                onChange={handleFilter}
                            >
                                <option value="All">
                                    All
                                </option>

                                <option value="Applied">
                                    Applied
                                </option>

                                <option value="Shortlisted">
                                    Shortlisted
                                </option>

                                <option value="Interview">
                                    Interview
                                </option>

                                <option value="Selected">
                                    Selected
                                </option>

                                <option value="Rejected">
                                    Rejected
                                </option>

                            </select>

                        </div>

                    </div>


                    {/* APPLICATION LIST */}

                    {applications.length === 0 ? (

                        <div className="empty-state">

                            <div className="empty-icon">
                                📂
                            </div>

                            <h3>
                                No applications found
                            </h3>

                            <p>
                                Start tracking your internship
                                applications by adding one.
                            </p>

                            <Link
                                to="/add-application"
                                className="empty-add-button"
                            >
                                + Add Application
                            </Link>

                        </div>

                    ) : (

                        <div className="application-list">

                            {applications.map((application) => (

                                <div
                                    className="application-card"
                                    key={application._id}
                                >

                                    <div className="company-icon">
                                        🏢
                                    </div>


                                    <div className="application-info">

                                        <h4>
                                            {application.company}
                                        </h4>

                                        <p>
                                            {application.position}
                                        </p>

                                    </div>


                                    <div className="application-status">

                                        <span
                                            className={`status-badge status-${application.status
                                                .toLowerCase()
                                                .replace(/\s+/g, "-")}`}
                                        >
                                            {application.status}
                                        </span>

                                    </div>


                                    <div className="application-actions">

                                        <Link
                                            to={`/edit-application/${application._id}`}
                                            className="edit-button"
                                        >
                                            Edit
                                        </Link>

                                        <button
                                            className="delete-button"
                                            onClick={() =>
                                                handleDelete(
                                                    application._id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </section>

            </main>

        </div>
    );
}

export default Dashboard;