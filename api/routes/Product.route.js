const express = require("express");
const Product = require("../models/Product.module.js");
const {protect,admin} = require("../middlewares/authMiddleware.js");


const router = express.Router();
// @route POST /api/products
// @desc Create a new Product
// @access Private/Admin

router.post("/",protect, admin,async (req,res) =>
{
    try {
       const {name,
        description,
        price,
        discountPrice,
        countInStock,
        category,
        brand,
        sizes,
        colors,
        collections,
        material,
        gender,
        images,
        isFeatured,
        isPublished,
        tags, 
        dimensions,
        sku,
        weight,
    } =req.body 
    const product = new Product (
        {name,
        description,
        price,
        discountPrice,
        countInStock,
        category,
        brand,
        sizes,
        colors,
        collections,
        material,
        gender,
        images,
        isFeatured,
        isPublished,
        tags, 
        dimensions,
        sku,
        weight,
        user: req.user._id, //Reference to the admin user who created it
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
    } catch (error) {
        console.error(error);
        res.status(500).send("Send Error");
    }
});
// @route PUT /api/products/:id
// @desc Update an existing product ID
// @access Private/Admin
router.put("/:id",protect,admin,async(req,res)=>
{
    try {
 const {name,
        description,
        price,
        discountPrice,
        countInStock,
        category,
        brand,
        sizes,
        colors,
        collections,
        material,
        gender,
        images,
        isFeatured,
        isPublished,
        tags, 
        dimensions,
        sku,
        weight,
    }= req.body;
    // Find Product By Id
    const product = await Product.findById(req.params.id);
    if (product) {
        //Update product fields
        product.name = name || product.name; 
        product.description = description || product.description; 
        product.price = price || product.price; 
        product.discountPrice = discountPrice || product.discountPrice; 
        product.countInStock = countInStock || product.countInStock; 
        product.category = category || product.category; 
        product.brand = brand || product.brand; 
        product.sizes = sizes || product.sizes; 
        product.colors = colors || product.colors; 
        product.collections = collections || product.collections; 
        product.material = material || product.material; 
        product.gender = gender || product.gender; 
        product.images = images || product.images; 
        product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured; 
        product.isPublished = isPublished !== undefined ? isPublished : product.isPublished; 
        product.isPublished = isPublished || product.isPublished; 
        product.tags = tags || product.tags; 
        product.dimensions = dimensions || product.dimensions; 
        product.sku = sku || product.sku; 
        product.weight = weight || product.weight; 
        //  Save the updated product
        const updatedProduct =await product.save();
        res.json(updatedProduct); 
    } else {
        res.status(404).json({message: "Product Not Found"})
    }
    }
    catch(error)
    {
        console.error(error);
        res.status(500).send("Server Error");
    }
});
// @route Delete/api/products/:id
// @desc Delete an existing product ID
// @access Private/Admin
router.delete("/:id", protect,admin, async(req,res)=>
{
try {
    // Find the product by ID
    const product = await Product.findById(req.params.id);
    if (product) {
        //Remove product from DB
        await product.deleteOne();
        res.json({message:"Product Removed"}); 
    } else {
        res.status(404).send("Product Not Found");
    }
} catch (error) {
   console.error(error);
   res.status(500).send("Server Error"); 
}
});
// @route GET /api/products/
// @desc GET all products with optional query filters
// @access Public
router.get("/",async (req,res)=>
{
    try {
        const{collection,size,color,gender,minPrice,maxPrice,sortBy,search,category,material,brand,limit} =req.query;
        let query = {};
        // Filter Logic
        if (collection && collection.toLocaleLowerCase() !=="all") {
           query.collections= collection; 
        }
        if (category && category.toLocaleLowerCase() !=="all") {
           query.category= category; 
        }
        if (material) {
           query.material= {$in: material.split(",")} ;
        }
        if (brand) {
           query.brand= {$in: brand.split(",")} ;
        }
        if (size) {
           query.sizes= {$in: size.split(",")} ;
        }
        if (color) {
           query.colors= {$in: [color]} ;
        }
        if (gender) {
           query.gender= gender ;
        }
        if (minPrice || maxPrice) {
           query.price= {};
           if(minPrice) query.price.$gte = Number(minPrice);
           if(maxPrice) query.price.$lte = Number(maxPrice);
        }
        if (search) {
          query.$or = [
            {name :{$regex: search,$options:"i"} },
            {description :{$regex: search,$options:"i"} },
          ]
        }
        // Sort Logic
        let sort = {};
        if(sortBy)
        {
            switch (sortBy)
            {
                case "priceAsc":
                sort ={price:1};
                break ;
                case "priceDesc":
                sort = {price:-1};
                break;
                case "popularity":
                    sort ={rating : -1};
                    break ;
                    default :
                    break;
            }
        }
        // Fetch products and apply sorting  and limit
        let products = await Product.find(query).sort(sort).limit(Number(limit) || 0);
            res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});
// @route GET /api/products/:id
// @desc GET a single product by ID
// @access Public
router.get("/:id", async (req,res) =>
{
    try {
        const product = await Product.findById(req.params.id);
        if(product){
            res.json(product)
        }else
        {
            res.status(404).send({message:"Product Not Found !!"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error !!!");
    }
});
// @route GET /api/products/similar/:id
// @desc Retrieve similar products based on the current product`s gender and category
// @access Public
router.get("/similar/:id",async(res,req)=>
{
    const { id } =req.params;
try {
    const product = Product.findById(id);
    if(!product)
    {
        return res.status(404).json({message:"Product Not Found"});
    }
    const similarProducts = await Product.find({
        _id : { $ne:id }, //Exclude the current product ID
        gender : product.gender,
        category : product.category,
    }).limit(4);
    res.json(similarProducts);
} catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
}
});
// @route GET /api/products/best-seller
// @desc Retrieve the product with highest rating
// @access Public
router.get("/best-seller", async(req,res)=> {
    try {
        const bestSeller = await Product.findOne().sort({rating: -1});
        if (bestSeller) {
            res.json(bestSeller);
        } else {
           res.status(404).json({message :"Not Best Seller Found"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});
// @route GET /api/products/new-arrivals
// @desc Retrieve latest 8 products - Creation Date
// @access Public
router.get("/new-arrivals", async(req,res) =>
{
    try {
        // Fetch latest 8 products
        const newArrivals = await Product.find().sort({createdAt:-1}).limit(8);
        res.json(newArrivals);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
})

module.exports = router ;