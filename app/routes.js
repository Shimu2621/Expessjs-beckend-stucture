// import express
const express = require("express");

// call router method
const router = express.Router();

// api routes(routes folder)
router.use('/api/user', require("../routes/user"))
router.use('/api/auth', require("../routes/auth"))
router.use('/api/profile', require("../routes/profile"))

// create router with end point "health" to check it's healthy, like Db connection is live,if not reject it
router.get('/health', (req, res) => {
    return res.status(200).json({
        message: "Success"
    })
})

module.exports = router;

//Status code: 200= OK, 201=created, 400=bad request, 404=not found, 500=server error
