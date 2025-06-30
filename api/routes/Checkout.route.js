const express = require("express");
const Checkout = require("../models/Checkout.module.js");
const Order = require("../models/Order.module.js");
const Product = require("../models/Product.module.js");
const Cart = require("../models/Cart.module.js");
const {protect} = require("../middlewares/authMiddleware.js");

const router = express.Router();

// @route POST /api/checkout
// @desc Create a new checkout session
// @access Private
router.post("/",protect,async(req,res)=>
{
    const {checkoutItems,shippingAddress,paymentMethod,totalPrice} =req.body;
    if(!checkoutItems || checkoutItems.length===0){
        return res.status(400).json({message :"No items in checkout"});
    }
    try {
            // Create a new checkout session
            const newCheckout = await Checkout.create({
                user :req.user._id,
                checkoutItems :checkoutItems,
                shippingAddress,
                paymentMethod,
                totalPrice,
                paymentStatus:"Pending",
                isPaid :false,
            });
            console.log(`Checkout Created For User :${req.user._id}`);
            res.status(201).json(newCheckout);
    } catch (error) {
        console.error("Error Creating Checkout Session",error);
        res.status(500).json({message : "Server Error !!"});
    }
});
// @route PUT /api/checkout/:id/pay
// @desc Update Checkout To Mark as Paid after Successful payment
// @access Private
router.put("/:id/pay",protect,async(req,res)=> {
    const {paymentStatus,paymentDetails} =req.body;
    try {
        const checkout = await Checkout.findById(req.params.id);
        if(!checkout)
        {
            return res.status(404).json({message:"Checkout Not Found"});
        }
        if(paymentStatus ==="paid")
        {
            checkout.isPaid =true ;
            checkout.paymentStatus=paymentStatus;
            checkout.paymentDetails=paymentDetails;
            checkout.paidAt=Date.now();
            await checkout.save();

            res.status(200).json(checkout);
        }
        else 
        {
            res.status(400).json({message:"Invalid Payment Status"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message :"Server Error"});
    }
});
// @route POST /api/checkout/:id/finalize
// @desc Finalize checkout and convert to an order after payment confirmation
// @access Private
router.post("/:id/finalize",protect,async(req,res) =>
{
    try {
        const checkout = await Checkout.findById(req.params.id);
        if (!checkout)
        {
            return res.status(404).json({message:"Checkout Not Found !! "});
        }
        if(checkout.isPaid && !checkout.isFinalized)
        {
            // Create Final Order Based on the checkout Details
            const finalOrder = await Order.create({
                user : checkout.user,
                orderItems:checkout.checkoutItems,
                shippingAddress:checkout.shippingAddress,
                paymentMethod:checkout.paymentMethod,
                totalPrice:checkout.totalPrice,
                isPaid :true,
                paidAt:checkout.paidAt,
                isDelivered :false,
                paymentStatus :"paid",
                paymentDetails:checkout.paymentDetails,
            });
            // Mark the Checkout is Finalized
            checkout.isFinalized =true ;
            checkout.finalizedAt=Date.now();
            await checkout.save();
            // Delete the Cart Associated with the user
            await Cart.findOneAndDelete({user:checkout.user});
            res.status(201).json(finalOrder);
        }
        else if (checkout.isFinalized)
        {
            res.status(400).json({message :"Checkout Already Finalized"});
        }
        else 
        {
            res.status(400).json({message:"Checkout is not Paid"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Server Error !!"});
    }
});
module.exports = router ;