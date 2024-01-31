// Calling middleware for error handler has 3 parameter
//Custom handler has request object(req), the response object(res), and the next function(middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function.
//)  
const notFoundHandler = (req, res, next) => {
    const error = new Error('Resources not found');
    error.status = 404;
    // we call the next(error) function and pass the error object as input.
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