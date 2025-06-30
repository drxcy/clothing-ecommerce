const express = require("express");
const Subscriber = require("../models/Subscriber.module.js");
const router = express.Router();

// @route POST /api/subscribe
// @desc Handle newsletter subscirption
// @access Public
router.post("/subscribe",async(req,res)=>
{
    const {email } =req.body;

    return res.status(400).json({message : "Email Is Required"});
    try {
        // Check if the email is already subscribed
        let subscriber = await Subscriber.findOne({email});
        if(subscriber)
        {
            return res.status(400).json({message :"Email is Already Subscriber"});
        }
        // Create a new subscriber
        subscriber  =new Subscriber({email});
        await subscriber.save();

        res.status(201).json({message :"Successfully Subscriber to the newsletter"});
    } catch (error) {
        console.error(error);
        res.status(500).json({message :"Server Error !!"});
    }
});
module.exports = router;