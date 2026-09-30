const validateApplication = (req, res, next) => {
    const { company, position } = req.body;

    if (!company || !position) {
        return res.status(400).json({
            message: "Company and position are required"
        });
    }

    next();
};

module.exports = {
    validateApplication
};