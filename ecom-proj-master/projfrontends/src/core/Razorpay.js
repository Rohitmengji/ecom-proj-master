import React, { useState, useEffect } from 'react';
import { isAutheticated } from "../auth/helper/index";
import { loadCart, cartEmpty } from './helper/cartHelper';
import { Link, Redirect } from "react-router-dom";
import StripeCheckoutButton from "react-stripe-checkout"
import { API, STRIPE } from '../backend';
import { createOrder } from './helper/orderHelper';

const Razorpay = ({ products, setReload = f => f, reload = undefined }) => {

    const [data, setData] = useState({
        phone: "",
        loading: false,
        error: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        redirect: true,
        price: 0


    })

    const { phone, loading, error, street, city, state, zipcode, redirect, price } = data
    let address = `${street} , ${city} , ${state} , ${zipcode}`;
    const token = isAutheticated() && isAutheticated().token;
    const userId = isAutheticated() && isAutheticated()._id;
    const user = isAutheticated() && isAutheticated();


    const showTotalAmount = () => {
        let amount = 0
        products.forEach(product => {
            amount += product.price * product.count
        });
        return amount + 30
    }



    const loadScript = (src) => {
        return new Promise(resolve => {
            const script = document.createElement('script')
            script.src = src
            script.onload = () => {
                resolve(true)
            }
            script.onerror = () => {
                resolve(false)
            }
            document.body.appendChild(script)

        })
    }

    async function displayRazorpay(event) {
        await event.preventDefault();

        if (!street || !city || !state || !phone || !zipcode) {
            return alert("all fields are required")
        } else {

            const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')


            if (!res) {
                alert("Faield to load please try agian!")
                return
            }

            async function data(paymentInfo) {

                return await fetch(`${API}/razorpay`, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(paymentInfo)
                })
                    .then(response => {
                        
           
                    
                        console.log(response);
                        return response.json()
                    })
                    .catch(err => {
                        return console.log(err)
                    })
            }


            const detail = data({

                amount: showTotalAmount(),
            })




            var options = {
                key: "rzp_test_NWtBjDWspuxUvT", // Enter the Key ID generated from the Dashboard
                amount: showTotalAmount() * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                currency: "INR",
                name: products.name,
                description: products.description,
                image: require('../images/loader2.png'),
                order_id: detail.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                handler: function (response) {

               
                    const orderData = {
                        products: products,
                        amount: showTotalAmount(),
                        address: address,
                        user: isAutheticated().user._id,
                        phone: phone,
                        transaction_id: response.razorpay_payment_id
                    }
                    
                    createOrder(isAutheticated().user._id, isAutheticated().token, orderData).then(data => {
                        if (!data || data.error) {
                            console.log("failed to create order", data.error);
                            
                        } else {
                            console.log("order created successfully");
                            
                        }
                    })
                    alert('order placed successfully')

                    cartEmpty(() => {
                        console.log("did we got a crash!");
                        
                    })
                    window.location.reload(true)
                },
                prefill: {
                    name: isAutheticated().user.name,
                    email: isAutheticated().user.email,
                    contact: `+91${phone}`
                },
                theme: {
                    color: "#0187de"
                }
            };
            var paymentObject = new window.Razorpay(options);
            paymentObject.open()
        }


    }






















    const showButton = () => {
        return isAutheticated() ? (
            <button className="cart-details-container-form-address-button btn " onClick={displayRazorpay}>CHECKOUT</button>

        ) :

            (
                <Link to="/signup"><button className="cart-details-container-form-address-button btn ">SIGNUP</button></Link>
            );
    }



    const handleChange = event => {
        setData({ ...data, error: false, loading: true, phone: event.target.value })
    }

    const handleChange1 = event => {
        setData({ ...data, error: false, loading: true, street: event.target.value })
    }
    const handleChange2 = event => {
        setData({ ...data, error: false, loading: true, city: event.target.value })
    }
    const handleChange3 = event => {
        setData({ ...data, error: false, loading: true, state: event.target.value })
    }
    const handleChange4 = event => {
        setData({ ...data, error: false, loading: true, zipcode: event.target.value })
    }
    console.log(address);
    return (

        <div className="cart-details-container-form">
            <h3 className="cart-details-container-form-phone">Phone Number</h3>
            <input required type="text" onChange={handleChange} value={phone} className="cart-details-container-form-phone-input" placeholder="Phone Number" />
            <h3 className="cart-details-container-form-phone">Address</h3>

            <form className="cart-details-container-form-address" action="">
                <input type="text" onChange={handleChange1} value={street} className="cart-details-container-form-address-street" placeholder="Street" />
                <input type="text" onChange={handleChange2} value={city} className="cart-details-container-form-address-city" placeholder="City" />
                <input type="text" onChange={handleChange3} value={state} className="cart-details-container-form-address-state" placeholder="State" />
                <input type="text" onChange={handleChange4} value={zipcode} className="cart-details-container-form-address-zip-code" placeholder="zip-code" />
                {showButton()}
            </form>

        </div>

    )

}







export default Razorpay;