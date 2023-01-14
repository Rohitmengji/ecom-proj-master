const mongoose = require("mongoose");
const { array } = require("../utils/multer");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      maxlength: 32,
      trim: true
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true
    },
    stock: {
      type: Number
    },
    sold: {
      type: Number,
      default: 0
    },
    image: {
      required:true,
      type:Array

    },
    quantity:Number
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
