const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true
        },

        role: {
            type: String,
            enum: ["student", "admin"],
            default: "student"
        },

        // Password reset fields
        resetPasswordToken: {
            type: String,
            default: null
        },

        resetPasswordExpires: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

// Database index for faster password reset token lookup
userSchema.index({ resetPasswordToken: 1 });

module.exports = mongoose.model("User", userSchema);