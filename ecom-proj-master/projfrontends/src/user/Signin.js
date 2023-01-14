import React, { useState  , useEffect} from 'react';
import Footer from '../core/Footer';
import { Redirect, Link } from "react-router-dom";
import {loadCart} from '../core/helper/cartHelper'
import { signin, authenticate, isAutheticated } from "../auth/helper";




const date = new Date().getFullYear()



const TestLogin = () => {
  const [products, setProducts] = useState([])


  useEffect(() => {
    setProducts(loadCart())
  } , [])
  
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false
  });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAutheticated();

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });

  };


  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true
            });
          });
        }
      })
      .catch(console.log("signin request failed"));
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else if (isAutheticated() && products.length > 0) {
        return <Redirect to="/cart" />;
      }
    }
    if (isAutheticated()  ) {
      return <Redirect to="/" />;
    }
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


          {performRedirect()}
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
          <Link to="/signup">
            <h4 className="lcontainer-form-signup">Don't have an account <a href="">Sign Up</a></h4>
          </Link>
          <div className="center-form">
            {loadingMessage()}
            {errorMessage()}
            <h2 className="center-form-hedding">Sign in Form</h2>
            <div className="center-form-image-box">
              <img className="center-form-image" src={require('../images/user.png')} alt="" />
            </div>

            <div className="wrap-input100 ">
              <input onChange={handleChange("email")}
                value={email} className="input100" type="text" placeholder="" />

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
              sign in
       </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
export default TestLogin