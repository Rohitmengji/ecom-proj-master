import React , { useState , useEffect} from 'react';
import {isAutheticated} from "../auth/helper/index";
import { loadCart  , cartEmpty} from './helper/cartHelper';
import {Link , Redirect} from "react-router-dom";
import StripeCheckoutButton from "react-stripe-checkout"
import { API, STRIPE } from '../backend';
import { createOrder } from './helper/orderHelper';

const StripeCheckout = ({products , setReload = f => f , reload = undefined}) => {

    const [data , setData] = useState({
        name:"",
        loading:false,
        error:"",
        address:"",
        phone:"",
        count:1,
        redirect:true
    })
    const {name , loading , error , address , phone , count} = data

    const token = isAutheticated() && isAutheticated().token;
    const userId = isAutheticated() && isAutheticated()._id;
    const user = isAutheticated() && isAutheticated();


    /// todo:
    const showTotalAmount = () =>{
        let amount = 0
       products.forEach(product => {
           amount += product.price
       });
       return amount
    }

    const makePayment = (token) => {
        let body = {
            products ,
            token
        }
        return fetch(`${API}/stripepayment` , {
            method:'POST',
            headers:{
                "Content-Type":"application/json",
            
            },
            body:JSON.stringify(body)
        })
        .then(response => {
          if(response.status !==200){
            return console.log("payment failed")
          }
          const orderData = {
            products:products,
            quantity:data.count,
            amount:showTotalAmount(),
            address:data.address,
            user:user.user._id,
            phone:data.phone

          }
        
           createOrder(user.user._id , user.token , orderData).then(data=>{
             if(!data || data.error){
               console.log("failed to create order" , data.error);
               
             }else{
               console.log("order created successfully");
               
             }
           })
          cartEmpty(() => {
            console.log("did we got a crash!");
            
          })
          setReload(!reload);


         console.log(response);
         console.log(products);
         console.log(user)   
         console.log(data)
         console.log(orderData);
         
     
        })
        .catch(err => console.log(err))
    }


    const showButton = () => {
        return isAutheticated() ? (
        <StripeCheckoutButton
        stripeKey={STRIPE}
        token={makePayment}
        amount={ showTotalAmount() * 100}
        currency="INR"
        >
       <button  className="btn btn-success"> pay with stripe</button>
     
        </StripeCheckoutButton>

        ) : 
        
        (
            <Link to="/signup"><button className="btn btn-warning">signup</button></Link>
        ) ;
     }

     const handleChange = event => {
         setData({...data, error:false , loading: true , name: event.target.value})
     }

     const handleChange1 = event => {
        setData({...data, error:false , loading: true , address: event.target.value})
    }
    const handleChange2 = event => {
        setData({...data, error:false , loading: true , phone: event.target.value})
    }
    const handleChange3 = event => {
        setData({...data, error:false , loading: true , count: event.target.value})
    }

  
    return (
        <div>
         
            <div className="form-group">
              <label className="text-light">Name</label>
              <input
                className="form-control"
                onChange={handleChange}
                type="text"
                value={name}
                placeholder="Name"
              />
            </div>

             <div className="form-group">
              <label className=" text-danger">Address Required</label>
              <input
                className="form-control"
                onChange={handleChange1}
                type="text"
                value={address}
                placeholder="Address"
              />
            </div>

            <div className="form-group">
              <label className="text-danger">phone Required</label>
              <input
                onChange={handleChange2}
                className="form-control"
                type="tel"
                value={phone}
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                placeholder="123-45-678"
                required
              />
            </div>

            <div className="form-group">
              <label className="text-light">quantity</label>
              <input
                onChange={handleChange3}
                className="form-control"
                type="number"
                value={count}
              />
            </div>
          
         
            
            <h3 className="text-white">stripe checkouts {showTotalAmount()} </h3>
            {showButton()}
        </div>
    )
}

export default StripeCheckout;