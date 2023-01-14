import React, { Fragment, useState, useEffect , useRef } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import { signout, isAutheticated, authenticate } from "../auth/helper";
import "../scss/styles.scss"
import { loadCart } from "./helper/cartHelper";
import { getUserOrders } from "../user/helper/userapicalls";
import { Dropdown } from 'react-bootstrap'
import { API } from "../backend";
import { getProductname  } from '../admin/helper/adminapicall';
import Width from "./Width";



const Menu = ({ history }) => {
  // cart items length
  const [cart, setCart] = useState([])
  const [display, setDisplay] = useState(false)
  const [products, setProducts] = useState([])
  const [error , setErrors] = useState("")
  const [search , setSearch] = useState("")
  const [width , setWidth] = useState('')

  const wrapper = useRef(null)
  const preload2 = () => {
    getProductname().then(data => {
      if (!data) {
        setErrors(true)
      } else {
    setProducts(data)
      }
    })

  }
  useEffect(() => {
    preload2()
    setWidth(Width)
  }, [])
  useEffect(() => {
    if (!loadCart()) {
      return setCart(cart.length = [])
    }
    setCart(loadCart())
  }, [])
  // orders length

  let name
  if (isAutheticated()) {
    if (isAutheticated().user.name.length > 7) {
      name = `${isAutheticated().user.name.slice(0, 7)}...`
    } else {
      name = isAutheticated().user.name
    }
  }
  const [orders, setOrders] = useState([])

  let preload = (userId, token) => {
    getUserOrders(userId, token).then(order => {

      if (!order) {
        setOrders(0)
      } else {
        setOrders(order)
      }

    })
  }
  useEffect(() => {
    if (isAutheticated()) {
      preload(isAutheticated().user._id, isAutheticated().token)
    }

  }, [])

  // let margin = () => {
  //   if (display) {
  //     return(
  //     )
  //   }
  //   else{
  //     return (
  //       "margin:0"
  //     )
  //   }
  // }
// const change = (event) => {
//   if(event.target.value.length > 0) {
//     setReload(true)


//   }
//   else{
//     setReload(false)
//   }
  
// }
// console.log(search);
// const Admin = () => {
//   const mql = window.matchMedia('(max-width: 1000px)');
  
//   let smallview = mql.matches;
//   if(smallview){
//     return (
//       <div style={{width:'235px'}} className="menu-box-3">
    
//       </div>
//     )
//   } else {
//     return (
//       <div style={{width:'304px'}} className="menu-box-3">
    
//       </div>
//     )
//   }

// }


// const UnAuthorised = () => {
//   const mql = window.matchMedia('(max-width: 1000px)');
  
//   let smallview = mql.matches;
//   if(smallview){
//     return (
//       <div style={{width:'190px'}} className="menu-box-3">
    
//       </div>
//     )
//   } else {
//     return (
//       <div style={{width:'190px'}} className="menu-box-3">
    
//       </div>
//     )
//   }

// }

// const Authorised = () => {
//   const mql = window.matchMedia('(max-width: 1000px)');
  
//   let smallview = mql.matches;
//   if(smallview){
//     return (
//       <div style={{width:'205px'}} className="menu-box-3">
    
//       </div>
//     )
//   } else {
//     return (
//       <div style={{width:'245px'}} className="menu-box-3">
    
//       </div>
//     )
//   }



// }


const setSearchValue = value => {
setSearch(value)
setDisplay(false)
}

useEffect(() => {
  document.addEventListener("mousedown" , handleClickOutSite); 

  return () => {
    document.removeEventListener("mousedown" , handleClickOutSite);
  }
} , [])

const handleClickOutSite = event => {
    
  if(wrapper.current && !wrapper.current.contains(event.target)){
    setDisplay(false);
  }
}


  return (

    <div >
      <header className="header">
      <Link to='/' className="logo-box" >

        <img src={require("../images/websitelogo.png")} className="logo" alt="" />
      </Link>
        <form ref={wrapper} action="#" className="search">
          <input onChange={(event) => setSearch(event.target.value) }  onClick={() => setDisplay(!display)} type="text" value={search} placeholder="Search Items" className="search-input" />
 
          <button className="search-button">
            <img src={require("../images/SVG/search.svg")} className="search-icon" alt="" />

          </button>
     
        </form>

        <nav className="user-nav">
          {/* home */}

          <Link to="/">
            <div className="user-nav-icon-box">
              <img src={require("../images/SVG/home2.svg")} className="user-nav-icon" alt="" />
            </div>
          </Link>



          {/* user dashbord */}
          {isAutheticated() && isAutheticated().user.role === 0 && (
            <Link to="/user/dashboard"
            >
              <div className="user-nav-icon-box">
                <img src={require("../images/SVG/dashboard.svg")} className="user-nav-icon" alt="" />
                <span className="user-nav-notification">{orders.length}</span>
              </div>
            </Link>
          )}

          {/* admin dashbord */}
          {isAutheticated() && isAutheticated().user.role === 1 && (
            <Fragment>
              <Link

                to="/user/dashboard"
              >
                <div className="user-nav-icon-box">
                  <img src={require("../images/SVG/dashboard.svg")} className="user-nav-icon" alt="" />

                  <span className="user-nav-notification">{orders.length}</span>
                </div>

              </Link>
              <Link

                to="/admin/dashboard"
              >
                <div className="user-nav-icon-box">
                  <img src={require("../images/SVG/user-tie.svg")} className="user-nav-icon" alt="" />


                </div>
              </Link>
            </Fragment>

          )}

          {/* cart */}
          <Link to="/cart" >


            <div className="user-nav-icon-box">
              <img src={require("../images/SVG/cart.svg")} className="user-nav-icon" alt="" />

              <span className="user-nav-notification">{cart.length}</span>
            </div>

          </Link>

          {/* profile */}
          {!isAutheticated() && (
            <Fragment>

              <Link to="/signup"
                className="authenticate"
              >
                Signup
   </Link>

              <Link to="/signin"
                className="authenticate"

              >
                Sign In
   </Link>
            </Fragment>
          )}
          {isAutheticated() && (
            <Dropdown>
              <Dropdown.Toggle className="ndropdown" id="dropdown-basic">

                <img src={require("../images/user.png")} className="user-nav-user-profile" alt="" />
                <span className="ndropdown-name">{name}</span>

              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item className="ndropdown-item" >
                  <Link to={"/user/update/" + isAutheticated().user._id}>
                    <div className="user-nav-user">
                      <span className="ndropdown-item-update">Update Profile</span>
                    </div>

                  </Link>
                </Dropdown.Item>

                <Dropdown.Item onClick={() => {
                  signout(() => {
                    history.push("/")
                  });
                }} className="ndropdown-item">
                  <span
                    className="ndropdown-item-signout"

                  >
                    Signout
 </span>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

          )}





        </nav>
      </header>
      
<div  className="header-2" style={{margin: display ? '2.5rem 0' : 0}}>

  {/* <div className="menu-box-1"></div> */}

  <div ref={wrapper}>      
  
    {display && (
<div className="testing2 shadow-lg" >
  {   products.filter(({name}) => 
  
  
 
  
  name.indexOf(search) > -1).map((product , i) => {

     return (
       <Link key={i} className="test-link" to={`/Product/${product._id}`}>

       <div  onClick={ () => setSearchValue(product.name)} key={i} className="testing3"  >

          <h1 tabIndex="0" className="search-name"  key={i} >{product.name}</h1>
         
       </div>
       </Link>
     )

    
   
   })
   
   }
</div>
 )}
 
 </div>




</div>
    </div>
  )
}
export default withRouter(Menu);


// {reload && (
//   <div className="testing2" >
//     {   products.map((product , i) => {
//        return (
//          <div >
  
//             <h1 className="testing3"  key={i}>{product.name}</h1>
//          </div>
//        )
//      })}
//   </div>
//    )}