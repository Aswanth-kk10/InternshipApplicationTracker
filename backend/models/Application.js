const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        company: {
            type: String,
            required: true
        },

        position: {
            type: String,
            required: true
        },

        status: {
            type: String,
            enum: [
                "Applied",
                "Shortlisted",
                "Interview",
                "Selected",
                "Rejected"
            ],
            default: "Applied"
        },

        applicationDate: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

// Database index for faster student application queries
applicationSchema.index({ student: 1 });

module.exports = mongoose.model("Application", applicationSchema);