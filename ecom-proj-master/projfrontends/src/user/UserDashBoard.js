import React, { useState, useEffect ,useRef} from 'react';
import '../scss/styles.scss'
import Menu from '../core/Menu';
import Footer from "../core/Footer"
import { Table } from 'react-bootstrap'
import { getUserOrders, getOrderStaus } from "../user/helper/userapicalls";
import { isAutheticated } from "../auth/helper";
import { Link } from 'react-router-dom';
import { API } from '../backend';

const TestUpdate = () => {
  const userId = isAutheticated() && isAutheticated().user._id;
  const token = isAutheticated() && isAutheticated().token;

  const [orders, setOrders] = useState([])
  const [errors, setErrors] = useState(false)
  const [status, setStatus] = useState("")

  const wrapper = useRef(null)


  useEffect(() => {
    document.addEventListener("mousedown" , handleClickOutSite); 
  
    return () => {
      document.removeEventListener("mousedown" , handleClickOutSite);
    }
  } , [])
  
  const handleClickOutSite = event => {
      
    if(wrapper.current && !wrapper.current.contains(event.target)){
      window.location.reload()
    }
  }

  

  let preload = (userId, token) => {
    getUserOrders(userId, token).then(order => {

      if (!order) {
        setErrors(true)
      } else {
        setOrders(order)
      }

    })
  }
  const { amount, address, updatedAt, products, transaction_id, user } = orders

  let track = (event) => {
    getOrderStaus(event.target.value).then(order => {

      if (!order) {
        setErrors(true)
      } else {
        setStatus(order)
      }

    })
  }
  const cancle = (event) => {
    window.location.reload(true)
  }
  const statusMessage = () => {
    return (
      status && (
        <div  className="popup">
          <button className="popup-cancle-button" onClick={cancle}>x</button>
          <div ref={wrapper} className="popup-container">
            <h3 className="popup-container-hedding">Track Order</h3>
            {status == "Order Placed" && (
              <ul className="popup-container-list">
                <li className="popup-container-list-item">
                  <img className="popup-container-list-item-image " src={require('../images/Order-Placed-Icon.jpg')} alt="" />
                  <span className="popup-container-list-item-circle line sub-green line-color ">
                    <img className="popup-container-list-item-circle-icon" src={require('../images/SVG/checkmark.svg')} alt="" />
                  </span> Order Place</li>
                <li className="popup-container-list-item">
                  <img className="popup-container-list-item-image" src={require('../images/Order-Processing.png')} alt="" />
                  <span className="popup-container-list-item-circle line green ">
                    <img className="popup-container-list-item-circle-icon big" src={require('../images/SVG/setting.svg')} alt="" />
                  </span> Processing</li>
                <li className="popup-container-list-item">
                  <img className="popup-container-list-item-image gray" src={require('../images/Order-shipping.png')} alt="" />
                  <span className="popup-container-list-item-circle line ">
                    <img className="popup-container-list-item-circle-icon small" src={require('../images/SVG/cancle.svg')} alt="" />
                  </span> Shipped</li>
                <li className="popup-container-list-item">
                  <img className="popup-container-list-item-image gray" src={require('../images/Order-delivered-Icon copy.png')} alt="" />
                  <span className="popup-container-list-item-circle ">
                    <img className="popup-container-list-item-circle-icon small" src={require('../images/SVG/cancle.svg')} alt="" />
                  </span> Delivered</li>
              </ul>
            )}
            {status == "Processing" && (
              <ul className="popup-container-list">
                <li className="popup-container-list-item">
                  <img className="popup-container-list-item-image " src={require('../images/Order-Placed-Icon.jpg')} alt="" />
                  <span className="popup-container-list-item-circle line sub-green line-color ">
                    <img className="popup-container-list-item-circle-icon" src={require('../images/SVG/checkmark.svg')} alt="" />
                  </span> Order Place</li>
                <li className="popup-container-list-item">
                  <img className="popup-container-list-item-image" src={require('../images/Order-Processing.png')} alt="" />
                  <span className="popup-container-list-item-circle line green ">
                    <img className="popup-container-list-item-circle-icon big" src={require('../images/SVG/setting.svg')} alt="" />
                  </span> Processing</li>
                <li className="popup-container-list-item">
                  <img className="popup-container-list-item-image gray" src={require('../images/Order-shipping.png')} alt="" />
                  <span className="popup-container-list-item-circle line ">
                    <img className="popup-container-list-item-circle-icon small" src={require('../images/SVG/cancle.svg')} alt="" />
                  </span> Shipped</li>
                <li className="popup-container-list-item">
                  <img className="popup-container-list-item-image gray" src={require('../images/Order-delivered-Icon copy.png')} alt="" />
                  <span className="popup-container-list-item-circle ">
                    <img className="popup-container-list-item-circle-icon small" src={require('../images/SVG/cancle.svg')} alt="" />
                  </span> Delivered</li>
              </ul>
            )}
            {status == "Shipped" && (
              <ul className="popup-container-list">
                <li className="popup-container-list-item">
                  <img className="popup-container-list-item-image " src={require('../images/Order-Placed-Icon.jpg')} alt="" />
                  <span className="popup-container-list-item-circle line sub-green line-color ">
                    <img className="popup-container-list-item-circle-icon" src={require('../images/SVG/checkmark.svg')} alt="" />
                  </span> Order Place</li>
                <li className="popup-container-list-item">
                  <img className="popup-container-list-item-image" src={require('../images/Order-Processing.png')} alt="" />
                  <span className="popup-container-list-item-circle line sub-green line-color">
                    <img className="popup-container-list-item-circle-icon " src={require('../images/SVG/checkmark.svg')} alt="" />
                  </span> Processing</li>
                <li className="popup-container-list-item">
                  <img className="popup-container-list-item-image " src={require('../images/Order-shipping.png')} alt="" />
                  <span className="popup-container-list-item-circle green line ">
                    <img className="popup-container-list-item-circle-icon big" src={require('../images/SVG/setting.svg')} alt="" />
                  </span> Shipped</li>
                <li className="popup-container-list-item">
                  <img className="popup-container-list-item-image gray" src={require('../images/Order-delivered-Icon copy.png')} alt="" />
                  <span className="popup-container-list-item-circle ">
                    <img className="popup-container-list-item-circle-icon small" src={require('../images/SVG/cancle.svg')} alt="" />
                  </span> Delivered</li>
              </ul>
            )}
            {status == "Delivered" && (
              <ul className="popup-container-list">
                <li className="popup-container-list-item">
                  <img className="popup-container-list-item-image " src={require('../images/Order-Placed-Icon.jpg')} alt="" />
                  <span className="popup-container-list-item-circle line sub-green line-color ">
                    <img className="popup-container-list-item-circle-icon" src={require('../images/SVG/checkmark.svg')} alt="" />
                  </span> Order Place</li>
                <li className="popup-container-list-item">
                  <img className="popup-container-list-item-image" src={require('../images/Order-Processing.png')} alt="" />
                  <span className="popup-container-list-item-circle line sub-green line-color">
                    <img className="popup-container-list-item-circle-icon " src={require('../images/SVG/checkmark.svg')} alt="" />
                  </span> Processing</li>
                <li className="popup-container-list-item">
                  <img className="popup-container-list-item-image " src={require('../images/Order-shipping.png')} alt="" />
                  <span className="popup-container-list-item-circle sub-green line line-color ">
                    <img className="popup-container-list-item-circle-icon" src={require('../images/SVG/checkmark.svg')} alt="" />
                  </span> Shipped</li>
                <li className="popup-container-list-item">
                  <img className="popup-container-list-item-image " src={require('../images/Order-delivered-Icon copy.png')} alt="" />
                  <span className="popup-container-list-item-circle green">
                    <img className="popup-container-list-item-circle-icon small" src={require('../images/SVG/checkmark.svg')} alt="" />
                  </span> Delivered</li>
              </ul>
            )}
          </div>
        </div>
      )
    );
  };
  useEffect(() => {
    preload(userId, token)
  }, [])

  console.log(orders);


  return (
    <div>
      {statusMessage()}
      <Menu />

      <div className="ocontainer">
        <h1 className="text-center pb-4 pt-4">All Orders</h1>
        <Table className="tab" responsive striped bordered hover  >
          <thead>
            <tr>
              <th>#</th>
              <th>Amount</th>
              <th>Address</th>
              <th>Date</th>
              <th>Status</th>
              <th>Product</th>
              <th>Transaction-id</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>₹{order.amount}</td>
                  <td>{order.address}</td>
                  <td>{order.updatedAt.split('T')[0]}</td>
                  <td className="pr-5">{order.status}<option className="nittu" value={order._id} onClick={track}>Track</option>  </td>
                  <td > {order.products.map((product, i) => {
                    return (
                      <ul key={i}>
                        <li>
                          {product.name} <br /> quantity - {product.count}
                        </li>

                      </ul>
                    )
                  })}</td>
                  <td>{order.transaction_id}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
      <Footer />
    </div >
  )
}

export default TestUpdate;