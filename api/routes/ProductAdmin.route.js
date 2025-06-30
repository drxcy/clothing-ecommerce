const express = require("express");
const Product = require("../models/Product.module.js");
const {protect,admin} = require("../middlewares/authMiddleware.js");
const router = express.Router();

// @route GET /api/admin/products
// @desc GET all products (Admin only)
// @access Private/Admin
router.get("/",protect,admin,async()=>
{
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({message:"Server Error"});
    }
});
module.exports = router;