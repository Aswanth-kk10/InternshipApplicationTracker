const express = require("express");

const {
    createApplication,
    getApplications,
    getApplication,
    updateApplication,
    deleteApplication
} = require("../controllers/applicationController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const { validateApplication } = require("../middleware/validationMiddleware");

const router = express.Router();


// Create application
router.post(
    "/",
    protect,
    validateApplication,
    createApplication
);


// Get all applications
router.get(
    "/",
    protect,
    getApplications
);


// Admin-only test route
router.get(
    "/admin-test",
    protect,
    authorizeRoles("admin"),
    (req, res) => {
        res.json({
            message: "Admin access granted"
        });
    }
);


// Get one application
router.get(
    "/:id",
    protect,
    getApplication
);


// Update application
router.put(
    "/:id",
    protect,
    updateApplication
);


// Partial update application
router.patch(
    "/:id",
    protect,
    updateApplication
);


// Delete application
router.delete(
    "/:id",
    protect,
    deleteApplication
);


module.exports = router;