const express = require("express");
const router = express.Router();
const User = require("../models/user");

const {
  getUserById,
  getAllUser,
  getUser,
  updateUser,
  userPurchaseList
} = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);
router.get("/:userId/allusers", isSignedIn, isAuthenticated, isAdmin, getAllUser);

router.get("/:userId/role", (req,res) => {
User.findById(req.params.userId)
.select("-name")
.select("-lastname")
.select("-userinfo")
.select("-email")
.select("-encry_password")
.select("-purchases")
.select("-salt")
.select("-createdAt")
.select("-updatedAt")
.exec((err, user) => {
  if (err) {
    console.log(error);
    return res.status(400).json({
      error: err
    });
  }
  res.json(user);
});

});

router.get(
  "/orders/user/:userId",
  isSignedIn,
  isAuthenticated,
  userPurchaseList
);

module.exports = router;
