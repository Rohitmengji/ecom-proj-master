import React, { useState, useEffect } from 'react';
import '../scss/styles.scss'
import Menu from '../core/Menu';
import { loadCart, removeItemFromCart } from "./helper/cartHelper";
import { API } from '../backend';
import Razorpay from "./Razorpay";

const TestUpdate = ({ match }) => {


    const [products, setProducts] = useState([])
    const [reload, setReload] = useState(false)
    const [total, setTotal] = useState(0)
    const [count, setCount] = useState(1)


    useEffect(() => {
        setProducts(loadCart())
    }, [reload])

    const CartProduct = ({ product }) => {
        const [count, setCount] = useState(1)

        const handlechange = event => {
            setCount(event.target.value)
        }
        product.count = count;
        const image = `${API}/product/photo/${product._id}`;
        const name = product.name;
        const description = product.description;
        const price = product.price * product.count;

        return (
            <div className="cart-items-1-product">
                <div className="cart-items-1-product-left">
                    <img className="cart-items-1-product-left-image " src={image} alt="" />

                </div>
                <div className="cart-items-1-product-right">
                    <div className="cart-items-1-product-right-count">
                        <h3 className="cart-items-1-product-right-description">Quantity</h3>

                        <span onClick={() => {
                            setCount(count - 1)
                        }} className="minus">-</span>
                        <input className="quantity" type="text" onChange={handlechange} value={count} />
                        <span onClick={() => {
                            setCount(count + 1)

                        }} className="plus">+</span>
                    </div>
                    <h3 className="cart-items-1-product-right-name">{name}</h3>
                    <h3 className="cart-items-1-product-right-description descrip">Description : {description}</h3>
                    <h3 className="cart-items-1-product-right-description">Color : Yellow</h3>
                    <h3 className="cart-items-1-product-right-description">Size : M</h3>
                    <button onClick={() => {
                        removeItemFromCart(product._id);
                        window.location.reload(true)
                    }} className="cart-items-1-product-right-delete">
                        <img className="cart-items-1-product-right-delete-icon" src={require("../images/SVG/trash-o.svg")} alt="" />
                        <h5 className="cart-items-1-product-right-delete-text">REMOVE ITEM</h5>

                    </button>
                    <h1 className="cart-items-1-product-right-amount">₹{price}</h1>
                </div>
            </div>
        )
    }
    let totals = () => {
        let am = 0
        products.forEach((prd, i) => {
            am += prd.price * prd.count
        })
        return am
    }
    console.log(totals());

    return (
        <div className="cart-container">
            <Menu />
            <div className="cart">
                <div className="cart-items shadow-lg">
                    <div className="cart-items-1">
                        <h2 className="cart-items-1-hedding">
                            Cart ({products.length} items)
                        </h2>

                        {products.map((product, i) => {

                            return (

                                <CartProduct product={product} key={i} />
                            )
                        })}



                    </div>
                </div>
                <div className="cart-details shadow-lg">
                    <div className="cart-details-container">

                        <div className="cart-details-container-sum">
                            <h3 className="cart-details-container-sum-hedding">The Total Amount Of</h3>
                            <ol className="cart-details-container-sum-list">


                                <li className="cart-details-container-sum-list-item">Products Amount <span className="cart-details-container-sum-list-item-amount">₹{totals()}
                                </span></li>

                                <li className="cart-details-container-sum-list-item">Shipping Charge <span className="cart-details-container-sum-list-item-amount">₹30</span></li>
                            </ol>
                        </div>


                        <div className="cart-details-container-total">
                            <h3 className="cart-details-container-total-hedding">The Total Amount <span className="cart-details-container-total-hedding-amount">₹{totals() + 30}</span></h3>
                        </div>

                        <Razorpay

                            products={products}

                        />
                        <div className="cart-details-container-shipping">
                            <h1 className="cart-details-container-shipping-hedding">Expected Delivery Date</h1>
                            <h3 className="cart-details-container-shipping-details">July 17th 2020 - July 27th 2020</h3>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default TestUpdate;