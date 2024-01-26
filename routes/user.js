// importing 
const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * @route /register
 * @description  creating the user
 * @access  Public
 */
router.post('/register', async(req, res) => {
    try {
        // Extracting data by object destructuring
        const{ name, email, password } = req.body;

        // console.log(req.body);

        // Checks user exists or not
        const user = await User.findOne({ email: email});
        if (user) {
            return res.status(400).json({
                message: "User already exists"
            })
        }

        // Creating the user instance
        const newUser = new User({
            name,
            email,
            password
        })

         // Hashing password to using bcrypt library
         const saltRounds = 10;
         const salt = await bcrypt.genSalt(saltRounds)
         newUser.password = await bcrypt.hash(password, salt)
         
         // Saving the user
         await newUser.save();
 
         const payload = {
             user: {
                 id: newUser.id
             }
         }

        // Generate jwt
        jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'}, (err, token) => {
            if (err) {
                return res.status(400).json({
                    message: "Something went wrong"
                })
            }
            console.log(token);

            res.status(200).json({ token })
        });
        //  console.log(error);

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Server error"
        })
    }
})


module.exports = router;