const Banner = require("../models/banner");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getBannerById = (req, res, next, id) => {
    Banner.findById(id)
      .exec((err, banner) => {
        if (err) {
          return res.status(400).json({
            error: "banner not found"
          });
        }
        req.banner = banner;
        next();
      });
  };
  
  
  exports.createBanner = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
  
    form.parse(req, (err, fields, file) => {
      if (err) {
        return res.status(400).json({
          error: "problem with image"
        });
      }
      //destructure the fields
      const { name  } = fields;
  
      if (!name) {
        return res.status(400).json({
          error: "Please include name"
        });
      }
  
      let banner = new Banner(fields);
  
      //handle file here
      if (file.photo) {
        if (file.photo.size > 6000000) {
          return res.status(400).json({
            error: "File size too big!"
          });
        }
        banner.photo.data = fs.readFileSync(file.photo.path);
        banner.photo.contentType = file.photo.type;
      }
      // console.log(banner);
  
      //save to the DB
      banner.save((err, banner) => {
        if (err) {
          res.status(400).json({
            error: " error while Saving banner in DB "
          });
        }
        res.json(banner);
      });
    });
  };

  exports.getBanner = (req, res) => {
  req.banner.photo = undefined;
    return res.json(req.banner);
  };

  exports.photo = (req, res, next) => {
    if (req.banner.photo.data) {
      res.set("Content-Type", req.banner.photo.contentType);
      return res.send(req.banner.photo.data);
    }
    next();
  };

  exports.updateBanner = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
  
    form.parse(req, (err, fields, file) => {
      if (err) {
        return res.status(400).json({
          error: "problem with image"
        });
      }
  
      //updation code
      let banner = req.banner;
      banner = _.extend(banner, fields);
  
      //handle file here
      if (file.photo) {
        if (file.photo.size > 6000000) {
          return res.status(400).json({
            error: "File size too big!"
          });
        }
        banner.photo.data = fs.readFileSync(file.photo.path);
        banner.photo.contentType = file.photo.type;
      }
      // console.log(banner);
  
      //save to the DB
      banner.save((err, banner) => {
        if (err) {
          res.status(400).json({
            error: "Updation of banner failed",
          });
        }
        res.json(banner);
      });
    });
  };

  exports.getAllBanner = (req, res) => {

    Banner.find()
      .select("-photo")
  
      .exec((err, banners) => {
        if (err) {
          return res.status(400).json({
            error: "NO banners FOUND"
          });
        }
        res.json(banners);
      });
  };