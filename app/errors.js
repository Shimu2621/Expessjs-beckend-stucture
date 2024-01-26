// Calling middleware for error handler has 3 parameter
const notFoundHandler = (req, res, next) => {
    const error = new Error('Resources not found');
    error.status = 404;
    next(error)
}

// global error handler has 4 parameter by default
const globalErrorHandler = (error, req, res, next) => {
    if(error.status) {
        return res.status(error.status).json({
            message: error.message
        })
    }
    res.status(500).json({
        message: "Server error occured"
    })
}

module.exports = {
    notFoundHandler,
    globalErrorHandler
}