const express = require("express");
const router = express.Router();
const Banner = require("../models/banner");
const upload = require ("../utils/multer");
const cloudinary = require("cloudinary").v2;
require ("../utils/cloudinary");

const {
    getBannerById,
    createBanner,
    getBanner,
    photo,
    updateBanner,
    getAllBanner,
  } = require("../controllers/banner");
  const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
  const { getUserById } = require("../controllers/user");
  
  router.param("userId", getUserById);
router.param("BannerId", getBannerById);


router.post(
    "/banner/create",
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
        const { name,} = req.body;
  
           if (!name) {
        return res.status(400).json({
          error: "Please add the name of the bannner"
        });
      }
  
      let Banner = {
        name:name[name.length -1],
        image:urls,  
      }
      let saveB = new Banner(Banner)
        
          //save to the DB
      saveB.save((err, banner) => {
        if (err) {
          res.status(400).json({
            error: err
          });
        }
        res.json(banner);
      });
  
  
      } catch (err) {
        console.log(err);
      }
    
    }
  );
  
  // read routes
  router.get("/banner/:BannerId", getBanner);
  // router.get("/banner/photo/:BannerId", photo);
  

  
  //update route
  router.put(
    "/banner/update/:BannerId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    upload.array('image'),
    async (req , res) => {
    //  console.log(req.body ,"and" , req.files); 
     Banner.findOne({_id : req.params.BannerId} , async (err , foundobj) => {
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
            //  console.log(newPath);
             urls.push({public_id:newPath.public_id,url:newPath.secure_url})
             }
             foundobj.image = urls
           }
           foundobj.save((err,banner) => {
             if (err) {
               console.log(err);
               res.status(500).send();
             }
             else{
               console.log(banner);
               res.status(200).send(banner)
             }
           })
         }
       }
     })
   
   
   
     }
  );
  
  //listing route
  router.get("/banners", getAllBanner);

  module.exports = router;
  