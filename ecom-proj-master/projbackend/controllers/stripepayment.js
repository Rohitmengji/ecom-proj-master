const {v4}= require("uuid")
const stripe = require("stripe")(process.env.STRIPEBACK)


exports.stripepayment = (req , res) => {
const {products , token} = req.body;

const idempotencyKey = v4();

let amount = 0;
products.map((product) => {
    amount += product.price;
})

return stripe.customers
       .create({
           email: token.email,
           source: token.id
       })
       .then(customer => {
           stripe.charges
           .create({
               amount:amount * 100,
               currency:'INR',
               customer:customer.id,
               receipt_email: token.email,
               description:"a test account",
               shipping:{
                   name:token.card.name,
                   address:{
                       line1: token.card.address_line1,
                       line2: token.card.address_line2,
                       city: token.card.address_city,
                       country: token.card.address_country,
                       postal_code: token.card.address_zip
                   }
               }
           },{idempotencyKey})
           .then(result => res.status(200).json(result))
           .catch(err => console.log(err))
       })

}