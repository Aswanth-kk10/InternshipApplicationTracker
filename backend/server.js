const express = require("express");
const authRoutes = require("./routes/authRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();

const PORT = 5000;


// Parse JSON requests
app.use(express.json());


// CORS configuration
app.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Origin",
        "http://localhost:5173"
    );

    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );

    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );

    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }

    next();
});


// Security headers
app.use(helmet());


// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

app.use(limiter);


// Authentication routes
app.use("/api/v1/auth", authRoutes);


// Application routes
app.use("/api/v1/applications", applicationRoutes);


// Backend status
app.get("/", (req, res) => {
    res.json({
        message: "Internship Application Tracker Backend is running"
    });
});


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected successfully");

        app.listen(PORT, () => {
            console.log(
                `Server running on http://localhost:${PORT}`
            );
        });
    })
    .catch((error) => {
        console.log("MongoDB connection failed");
        console.log(error.message);
    });