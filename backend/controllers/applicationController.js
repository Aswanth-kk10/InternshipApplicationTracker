const Application = require("../models/Application");

// Create a new application
const createApplication = async (req, res) => {
    try {
        const { company, position, status, applicationDate } = req.body;

        const application = await Application.create({
            student: req.user.userId,
            company,
            position,
            status,
            applicationDate
        });

        res.status(201).json({
            message: "Application created successfully",
            application
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to create application",
            error: error.message
        });
    }
};


// Get applications of logged-in student
// Supports filtering and pagination
const getApplications = async (req, res) => {
    try {
        const filter = {
            student: req.user.userId
        };

        // Filter by status if provided
        if (req.query.status) {
            filter.status = req.query.status;
        }

        // Pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        // Prevent invalid pagination values
        const safePage = page < 1 ? 1 : page;
        const safeLimit =
            limit < 1 ? 5 : Math.min(limit, 50);

        const skip = (safePage - 1) * safeLimit;

        // Get applications
        const applications = await Application.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(safeLimit);

        // Count total matching applications
        const totalApplications =
            await Application.countDocuments(filter);

        const totalPages =
            Math.ceil(totalApplications / safeLimit);

        res.json({
            applications,
            pagination: {
                currentPage: safePage,
                limit: safeLimit,
                totalApplications,
                totalPages
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to get applications",
            error: error.message
        });
    }
};


// Get one application
const getApplication = async (req, res) => {
    try {
        const application = await Application.findOne({
            _id: req.params.id,
            student: req.user.userId
        });

        if (!application) {
            return res.status(404).json({
                message: "Application not found"
            });
        }

        res.json({
            application
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to get application",
            error: error.message
        });
    }
};


// Update an application
const updateApplication = async (req, res) => {
    try {
        // Only allow these fields to be updated
        const {
            company,
            position,
            status,
            applicationDate
        } = req.body;

        const application = await Application.findOneAndUpdate(
            {
                _id: req.params.id,
                student: req.user.userId
            },
            {
                company,
                position,
                status,
                applicationDate
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!application) {
            return res.status(404).json({
                message: "Application not found"
            });
        }

        res.json({
            message: "Application updated successfully",
            application
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update application",
            error: error.message
        });
    }
};


// Delete an application
const deleteApplication = async (req, res) => {
    try {
        const application = await Application.findOneAndDelete({
            _id: req.params.id,
            student: req.user.userId
        });

        if (!application) {
            return res.status(404).json({
                message: "Application not found"
            });
        }

        res.json({
            message: "Application deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete application",
            error: error.message
        });
    }
};


module.exports = {
    createApplication,
    getApplications,
    getApplication,
    updateApplication,
    deleteApplication
};