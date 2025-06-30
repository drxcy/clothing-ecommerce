const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const connectDB = require("./config/db.js")
const userRoutes = require("./routes/User.route.js")
const productRoutes = require("./routes/Product.route.js")
const cartRoutes = require("./routes/Cart.route.js");
const checkoutRoutes = require("./routes/Checkout.route.js");
const orderRoutes = require("./routes/Order.route.js");
const uploadRoutes = require("./routes/Upload.Route.js");
const subscribeRoutes = require("./routes/Subscriber.routes.js");
const adminRoutes = require("./routes/Admin.route.js");
const productAdminRoutes = require("./routes/ProductAdmin.route.js")
const orderAdminRoutes = require("./routes/OrderAdmin.route.js")

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to Mongo Database
connectDB();

// Testing to backend 
app.get("/", (req,res) =>
    {
    console.log(`[${new Date().toISOString()}] Root route hit`);
    res.send("Connection to the Backend");
    console.log("Welcome to Backend !!");
});
// API Routes 
app.use("/api/users",userRoutes);
app.use("/api/products",productRoutes);
app.use("/api/cart",cartRoutes);
app.use("/api/checkout",checkoutRoutes);
app.use("/api/orders",orderRoutes);
app.use("/api/upload",uploadRoutes);
app.use("/api/subscribe",subscribeRoutes);
// Admin Routes
app.use("/api/admin/users",adminRoutes);
app.use("/api/admin/products",productAdminRoutes);
app.use("/api/admin/orders",orderAdminRoutes);
app.listen(PORT,() =>
{
    console.log(`Server is running on http://localhost:${PORT}/`)
})
