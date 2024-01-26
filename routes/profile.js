const express = require("express");
const Profile = require("../models/Profile");
const auth = require("../middlewares/auth");
const router = express.Router();

//<----CRUD(Create, Read, Update, Delete) Operation--->

/**
 * @route /create
 * @description  creating the profile for user
 * @access  Private(when auth use in the route it's private, otherwise it'll be public)
 */
router.post("/create", auth, async(req, res) => {
    try {
        const { bio, company, website, location } = req.body;
        
        // console.log('req', req.user);

        //Creating an instance
        const profile = new Profile({
            user: req.user.id,
            bio, 
            company, 
            website, 
            location 
        })

        await profile.save();
        res.status(201).json({
            profile
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Server Error"
        })
    }
})

/**
 * @route /get(read)
 * @description  getting all the users profile 
 * @access  Public
 */

router.get('/get', async (req, res) => {
    try {
        const profiles = await Profile.find();
        
        if(profiles.length > 0) {
            return res.status(200).json({
                profiles
            })
        }

        return res.status(200).json({
            message: 'No profile found'
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: 'Server Error'
        })
    }
})

/**
 * @route /get-profile
 * @description  getting all the profiles with user information using populate method 
 * @access  Public
 */

router.get('/get-profile', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'email']);
        
        if(profiles.length > 0) {
            return res.status(200).json({
                profiles
            })
        }

        return res.status(200).json({
            message: 'No profile found'
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: 'Server Error'
        })
    }
})


/**
 * @route /get/id
 * @description  getting the users profile by id 
 * @access  Public
 */

router.get("/get/:id", async(req, res) => {
    const id = req.params.id
    // console.log(id);
    try {
        const profile = await Profile.findById(id)
        console.log(profile);
        if(!profile) {
            return res.status(400).json({
                message: 'Profile not found'
            })
        }

        return res.status(200).json({
            profile
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Server Error"
        })
    }
})

/**
 * @route /update/:id
 * @description update the bio property of profile
 * @access  private(use auth)
 */

//<----When I update only one property I have to use "patch" method----->
//<----When I update whole profile object I have to use "put" method---->

//On this profile updating only (bio) property so I use patch method
router.patch("/update/:id", auth, async(req, res) => {
    const id = req.params.id;
    const { bio} = req.body;

    try {
        const profile = await Profile.findById(id);
        if(!profile) {
            return res.status(400).json({
                message: "Profile not found"
            })
        }

        console.log(req.user.id, profile?.user.toString());

        //checks the requested user is the owner of this profile
        
        if(req.user.id !== profile?.user.toString()) {
           return res.status(400).json({
            message: "You are not allowed to update the profile"
           })
        }

        const updatedProfile = await Profile.findByIdAndUpdate(id, { $set: { bio: bio}}, { new: true })
        return res.status(200).json({
            updatedProfile
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: 'Server Error'
        })
    }
})

/**
 * @route /delete/:id
 * @description delete the profile by id
 * @access  private
 */

router.delete("/delete/:id", auth, async(req, res) => {
    const id = req.params.id;

    try {
        const profile = await Profile.findById(id);
        if(!profile) {
            return res.status(400).json({
                message: "Profile not found"
            })
        }

        console.log(req.user.id, profile?.user.toString());

        //checks the requested user is the owner of this profile
        if(req.user.id !== profile?.user.toString()) {
           return res.status(400).json({
            message: "You are not allowed to delete the profile"
           })
        }

        await Profile.findByIdAndDelete(id)
        return res.status(200).json({
            message: "Profile has been deleted successfully!"
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: 'Server Error'
        })
    }
})


module.exports = router;