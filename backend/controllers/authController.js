const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");

// Email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


// ==================== REGISTER ====================

const register = async (req, res) => {
    try {
        console.log("REGISTER REQUEST RECEIVED");

        const { name, email, password } = req.body;

        console.log("REGISTER DATA RECEIVED");

        // Required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required"
            });
        }

        // Email validation
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Please enter a valid email address"
            });
        }

        // Password validation
        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters"
            });
        }

        console.log("CHECKING USER IN DATABASE");

        // Check existing user
        const existingUser = await User.findOne({
            email: email.toLowerCase()
        });

        console.log("DATABASE CHECK COMPLETED");

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        console.log("HASHING PASSWORD");

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        console.log("PASSWORD HASHED");

        console.log("CREATING USER");

        // Create user
        const user = await User.create({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            role: "student"
        });

        console.log("USER CREATED");

        return res.status(201).json({
            message: "User registered successfully",
            userId: user._id
        });

    } catch (error) {
        console.error("REGISTRATION ERROR:", error);

        return res.status(500).json({
            message: "Registration failed"
        });
    }
};


// ==================== LOGIN ====================

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        return res.json({
            message: "Login successful",
            token
        });

    } catch (error) {
        console.error("LOGIN ERROR:", error);

        return res.status(500).json({
            message: "Login failed"
        });
    }
};


// ==================== FORGOT PASSWORD ====================

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            });
        }

        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const resetToken = crypto.randomBytes(32).toString("hex");

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires =
            Date.now() + 15 * 60 * 1000;

        await user.save();

        return res.json({
            message: "Password reset token generated",
            resetToken
        });

    } catch (error) {
        console.error("FORGOT PASSWORD ERROR:", error);

        return res.status(500).json({
            message: "Failed to generate reset token"
        });
    }
};


// ==================== RESET PASSWORD ====================

const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        if (!password || password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters"
            });
        }

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: {
                $gt: Date.now()
            }
        });

        if (!user) {
            return res.status(400).json({
                message: "Invalid or expired reset token"
            });
        }

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        user.password = hashedPassword;
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;

        await user.save();

        return res.json({
            message: "Password reset successfully"
        });

    } catch (error) {
        console.error("RESET PASSWORD ERROR:", error);

        return res.status(500).json({
            message: "Failed to reset password"
        });
    }
};


// ==================== EXPORT ====================

module.exports = {
    register,
    login,
    forgotPassword,
    resetPassword
};