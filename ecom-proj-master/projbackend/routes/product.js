const express = require("express");
const router = express.Router();
const upload = require ("../utils/multer");
const cloudinary = require("cloudinary").v2;
const Product = require('../models/product')
require ("../utils/cloudinary");

const {
  getProductById,
  createProduct,
  getProduct,
  photo,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getAllUniqueCategories,
  getAllProductsByCategory,
  getAllProductsName
} = require("../controllers/product");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//all of params
router.param("userId", getUserById);
router.param("productId", getProductById);

//all of actual routes
//create route
router.post(
  "/product/create/:userId",
  // "/product/create/",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  upload.array('image') ,
  async (req, res) => {
  
console.log(req.body);
    try {
      // const result = await cloudinary.uploader.upload(req.file.path);
      const uploader = async (path) => await cloudinary.uploader.upload(path);
      const urls = [];
      const files = req.files ;
      console.log(files , req.body);
      for( const file of files){
        const {path} = file ;
        const newPath = await uploader(path)
        urls.push({public_id:newPath.public_id,url:newPath.secure_url})
      }
      console.log(urls);
      const { name, description, price, category, stock } = req.body;

         if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({
        error: "Please include all fields"
      });
    }

    let product = {
      name:name[name.length -1],
      description:description[description.length - 1],
      price:price[price.length -1],
      category:category[category.length -1],
      stock:stock[stock.length -1],
      image:urls,

    }
    let saveP = new Product(product)
      
        //save to the DB
    saveP.save((err, product) => {
      if (err) {
        res.status(400).json({
          error: err
        });
      }
      res.json(product);
    });


    } catch (err) {
      console.log(err);
    }
  
  }
);

// read routes
router.get("/product/:productId", getProduct);

//delete route
router.delete(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  async  (req , res) => {
    let product = await Product.findById(req.params.productId);
    // res.send(product)
   if (product.image.length > 0) {
    product.image.map( async (photo) => {
      await cloudinary.uploader.destroy(photo.public_id);
    } )
   }
       product.remove((err, deletedProduct) => {
          if (err) {
            return res.status(400).json({
              error: "Failed to delete the product"
            });
          }
          res.json({
            message: "product deleted successfully",
            deletedProduct
          });
        });
  }
);

//update route
router.put(
  "/product/:productId/:userId",
  // "/product/update",

  isSignedIn,
  isAuthenticated,
  isAdmin,
  upload.array('image'),
 async (req , res) => {
  console.log(req.body ,"and" , req.files); 
  Product.findOne({_id : req.params.productId} , async (err , foundobj) => {
    if(err){
      console.log(err);
      res.status(500).send()
    }
    else{
      if(!foundobj){
        res.status(404).send()
      }
      else{
        if(req.body.name){
          foundobj.name = req.body.name
        }
        if (req.body.description) {
          foundobj.description = req.body.description
        }
        if (req.body.price) {
          foundobj.price = req.body.price
        }
        if (req.body.stock) {
          
          foundobj.stock = req.body.stock
        }
        if (req.body.category) {
          foundobj.category = req.body.category
        }
        if(foundobj.photo){
          foundobj.photo = ""
        }
        if (req.files.length > 0) {
          const urls = [];

        if (foundobj.image && foundobj.image.length > 0 ) {
          foundobj.image.map( async (photo) => {
            await cloudinary.uploader.destroy(photo.public_id);
            } )
        }
       
          const uploader = async (path) => await cloudinary.uploader.upload(path);
          const files = req.files ;
          for( const file of files){
          const {path} = file ;
          const newPath = await uploader(path)
          console.log(newPath);
          urls.push({public_id:newPath.public_id,url:newPath.secure_url})
          }
          foundobj.image = urls
        }
        foundobj.save((err,product) => {
          if (err) {
            console.log(err);
            res.status(500).send();
          }
          else{
            res.status(200).send(product)
          }
        })
      }
    }
  })



  }
  );
router.put('/pro/upd' , (req,res) => {
  console.log(req.body.files);
})
//listing route
router.get("/products", getAllProducts);
router.get("/products/name", getAllProductsName);

// router.get("/product/:ProductId", getProductById);
// 
router.post("/products/category", getAllProductsByCategory);

router.get("/products/categories", getAllUniqueCategories);

// router.post('/cloudinary', upload.array('image') , async (req ,res ) => {
//   try {
//     // const result = await cloudinary.uploader.upload(req.file.path);
//     const uploader = async (path) => await cloudinary.uploader.upload(path);
//     const urls = [];
//     const files = req.files ;
//     for( const file of files){
//       const {path} = file ;
//       const newPath = await uploader(path)
//       urls.push(newPath)
//     }
//     res.json(urls)
//   } catch (err) {
//     console.log(err);
//   }
// })



// router.post('/cloudinary',upload.single('image') ,( req ,res)=> {
//   try {
  
//     res.send(req.file);
//   } catch (err) {
//     console.log(err);
//   }
// })
module.exports = router;
