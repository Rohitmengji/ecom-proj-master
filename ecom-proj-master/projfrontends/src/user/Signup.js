import React, { useState } from 'react';
import Footer from '../core/Footer';
import { Redirect, Link } from "react-router-dom";

import { signup } from "../auth/helper";




const date = new Date().getFullYear()



const TestLogin = () => {

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
    loading:false
  });

  const { name, email, password, error, success , loading} = values;

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false ,loading: true });
    signup({ name, email, password })
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false , loading:false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true
          });
        }
      })
      .catch(console.log("Error in signup"));
  };


  const successMessage = () => {
    return (
      <div
        className="alert alert-success"
        style={{ display: success ? "" : "none" }}
      >
        New account was created successfully. Please
        <Link to="/signin">Login Here</Link>

      </div>
    );
  };
  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };
  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}

      </div>
    );
  };




  return (
    <div>
      <div className="lcontainer">
        <div className="lcontainer-image">



          <div className="lcontainer-image-product" style={{ backgroundImage: `url(${require('../images/login.jpg')})` }}></div>

          <img className="lcontainer-image-logo" src={require('../images/logo.png')} alt="" />

          <div className="lcontainer-image-text">
            <h1 className="lcontainer-image-text-headding">Welcome to Emarket!</h1>

            <p className="lcontainer-image-text-description" >A place where you can buy luxury home accessories</p>

          </div>
          <h3 className="lcontainer-image-date">@ {date} Emarket</h3>
        </div>
        <div className="lcontainer-form">
        <Link to='/' >
        <div  className="lcontainer-form-back-container">
        <img src={require('../images/SVG/arrow-left.svg')} alt=""/>
        </div>
          
        </Link>
          <Link to="/signin">
            <h4 className="lcontainer-form-signup">Already have an account? <a href="">Sign In</a></h4>
          </Link>
          <div className="center-form">
          {loadingMessage()}
            {successMessage()}
            {errorMessage()}
            <h2 className="center-form-hedding">Sign Up form</h2>
            <div className="center-form-image-box">
              <img className="center-form-image" src={require('../images/user.png')} alt="" />
            </div>

            <div className="wrap-input100 ">
              <input onChange={handleChange("name")}
                type="text"
                value={name}
                className="input100" type="text" placeholder="" />

              {!name && <span className="focus-input100" data-placeholder="Name" />}
            </div>

            <div className="wrap-input100 ">
              <input onChange={handleChange("email")}
                value={email} className="input100" type="Email" />

              {!email && <span className="focus-input100" data-placeholder="Email" />}
            </div>

            <div>
              <div className="wrap-input100 ">

                <input onChange={handleChange("password")}
                  value={password} className="input100" type="password" />
                {!password && <span className="focus-input100" data-placeholder="Password" />}
              </div>



            </div>
            <button onClick={onSubmit} className="center-form-button">
              Sign Up
       </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
export default TestLogin