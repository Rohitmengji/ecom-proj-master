const express = require("express")
const router = express.Router();
const Razorpay = require('razorpay')
const {v4}= require("uuid")


var razorpay = new Razorpay({
    key_id: 'rzp_test_NWtBjDWspuxUvT',
    key_secret: 'rFYiiuGFkrhBMkiiEoIDW1dA',
  });

router.get('/hellow' ,  (req , res) => {
    res.send('hey')
})

router.post('/razorpay' , async (req,res) => {
    const object ={
        amount:req.amount * 100,
        currency:'INR',
        receipt:v4(),
        payment_capture:1
    }

  try{
    const response = await razorpay.orders.create(object)
    console.log(response);
    res.status(200).json(response)
    
  }catch (error){
    console.log(error);
    
  }
})

module.exports = router;