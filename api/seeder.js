const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product.module.js");
const User = require("./models/User.module.js");
const Cart = require("./models/Cart.module.js");
const products = require("./data/products");

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);
// Function to Seed
const seedData = async () =>
{
    try {
        // Clear existing data
        await Product.deleteMany();
        await User.deleteMany();
        await Cart.deleteMany();
        // Create a Default Admin User
        const createdUser = await User.create({
            name : "Admin User",
            email : "admin@example.com",
            password :"123456",
            role:"admin",
        });
        // Assign the default user ID to each product
        const userID = createdUser._id;
        const sampleProducts = products.map((product) =>
        {
            return {...product,user:userID};
        });
        // Insert the products into the database 
        await Product.insertMany(sampleProducts);
        console.log("Product Added Successfully");
        process.exit();
    } catch (error) {
        console.error("Error seeding the data",error);
        process.exit(1);
    }
}
seedData();
