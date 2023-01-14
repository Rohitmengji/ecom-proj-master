import React, { useState, useEffect } from 'react';
import '../scss/styles.scss'
import Menu from '../core/Menu';
import GoogleMapReact from 'google-map-react';
import { isAutheticated } from "../auth/helper";
import { getOrders } from '../admin/helper/adminapicall';
import { API } from '../backend';
import { Link } from 'react-router-dom';

const TestUpdate = () => {
  const [orders, setOrders] = useState([])
  const [errors, setErrors] = useState(false)
  const [user, setUsers] = useState([])

  const userId = isAutheticated() && isAutheticated().user._id;
  const token = isAutheticated() && isAutheticated().token;


  let amount = 0;
  let sale = 0;

  orders.map((order, i) => {
    amount += order.amount
  })


  orders.map((order, i) => {
    order.products.map(quantity => {
      sale += quantity.count
    })
  })

  const preload = (userId, token) => {
    getOrders(userId, token).then(order => {

      if (!order) {
        setErrors(" order error")

      } else {
        setOrders(order)
      }
    })
  }

  useEffect(() => {
    preload(userId, token)
  } , [])


  const getUsers = (userId, token) => {
    return fetch(`${API}/${userId}/allusers`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        return response.json();
      })
      .catch(err => {
        return console.log(err);

      });
  }
  const preload2 = (userId, token) => {
    getUsers(userId, token).then(user => {

      if (!user) {
        setErrors(" user error")

      } else {
        setUsers(user)
      }
    })
  }

  useEffect(() => {
    preload2(userId, token)
  } , [])


  return (
    <div>
      <Menu />
      <div className="acontainer">
        <div className="acontainer-nav">
          <div className="acontainer-nav-list">
            <h3 className="acontainer-nav-list-item">
            <Link to="/admin/banners" className="text-white">
                Update Banners
                      </Link></h3>

            <h3 className="acontainer-nav-list-item">
              <Link className="text-white" to="/admin/create/category"> Create Category </Link>
            </h3>


            <h3 className="acontainer-nav-list-item">
              <Link to="/admin/categories" className="text-white">
                Manage Categories
                      </Link>
            </h3>
            <h3 className="acontainer-nav-list-item">
              <Link to="/admin/create/product" className="text-white">
                Create Product
                      </Link>

            </h3>
            <h3 className="acontainer-nav-list-item">
              <Link to="/admin/products" className="text-white">
                Manage Products
            </Link>
            </h3>
            <h3 className="acontainer-nav-list-item">
              <Link to="/admin/orders" className="text-white">
                Manage Orders
                        </Link>
            </h3>
          </div>
          <div className="acontainer-nav-admin">
            <img className="acontainer-nav-admin-image" src={`${API}/banner/photo/5f5a6a2a274bd10a880e2b5e`} alt="" />
            <div className="acontainer-nav-admin-name">
              <h4 className="acontainer-nav-admin-name-names">{isAutheticated().user.name}</h4>
              <img className="acontainer-nav-admin-name-icon" src={require('../images/SVG/checked.svg')} alt="" />
            </div>
            <p className="acontainer-nav-admin-description">Owner of the site</p>
          </div>
        </div>
        <div className="acontainer-area">
          <div className="acontainer-area-hedding">
            <h1 className="acontainer-area-hedding-welcome">Welcome To The Admin Panel</h1>
          </div>
          <div className="acontainer-area-boxs">
            <div className="acontainer-area-boxs-1 box-1">
              <h3 className="acontainer-area-boxs-1-hedding">Total Sales</h3>
              <h2 className="acontainer-area-boxs-1-value">{sale}</h2>
            </div>
            <div className="acontainer-area-boxs-1 box-2">
              <h3 className="acontainer-area-boxs-1-hedding">Total Amount</h3>
              <h2 className="acontainer-area-boxs-1-value">₹{amount}</h2>
            </div>
            <div className="acontainer-area-boxs-1 box-3">
              <h3 className="acontainer-area-boxs-1-hedding">Total Profit</h3>
              <h2 className="acontainer-area-boxs-1-value">₹{Math.ceil(amount / 100 * 40)}</h2>
            </div>
            <div className="acontainer-area-boxs-1 box-4">
              <h3 className="acontainer-area-boxs-1-hedding">All Users</h3>
              <h2 className="acontainer-area-boxs-1-value">{user.length}</h2>
            </div>
          </div>
          <div className="acontainer-area-map">
            {/*
          <GoogleMapReact
              bootstrapURLKeys={{ key: "AIzaSyARS3Y0nP3KFEKU3ECq9qGblZ4NOdy-kY4" }}
              defaultCenter={{
                lat: 12.9716,
                lng: 77.5946
              }}
              defaultZoom={11}
            >


            </GoogleMapReact>
          */}
            <div style={{ width: '100%' }}><iframe width="100%" height={300} frameBorder={0} scrolling="no" marginHeight={0} marginWidth={0} src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=banglore%20india+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed" /><a href="https://www.maps.ie/map-my-route/"></a></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestUpdate;