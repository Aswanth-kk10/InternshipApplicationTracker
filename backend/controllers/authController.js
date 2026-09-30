const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");


// Register
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Server-side validation
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters"
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "student"
        });

        res.status(201).json({
            message: "User registered successfully",
            userId: user._id
        });

    } catch (error) {
        res.status(500).json({
            message: "Registration failed",
            error: error.message
        });
    }
};


// Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

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

        res.json({
            message: "Login successful",
            token
        });

    } catch (error) {
        res.status(500).json({
            message: "Login failed",
            error: error.message
        });
    }
};


// Forgot password
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

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

        res.json({
            message: "Password reset token generated",
            resetToken
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to generate reset token",
            error: error.message
        });
    }
};


// Reset password
const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        if (!password || password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters"
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
    return res.status(400).json({
        message: "Please enter a valid email address"
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

        res.json({
            message: "Password reset successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to reset password",
            error: error.message
        });
    }
};


module.exports = {
    register,
    login,
    forgotPassword,
    resetPassword
};