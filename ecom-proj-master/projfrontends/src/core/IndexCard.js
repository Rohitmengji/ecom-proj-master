import React , {useState , useEffect} from 'react';
import { addItemToCart } from './helper/cartHelper';
import { Redirect, Link } from 'react-router-dom';
import { API } from '../backend';

const IndexCard = ({product ,   setReload = f => f /* (f) => return f  */ , reload = undefined}) => {


  const [redirect , setRedirect ] = useState(false)

    const cartTitle = product ? product.name : "Default Title"
    const cartDescription = product ? product.description.split('||') : "Default Description"
    const cartPrice = product ? product.price : "Default Price"
    const ProductId = product._id; 

    const imageUrl = product.image.slice(0,1).map(photo => photo.url)


    const addtocart = () => {
      addItemToCart(product , () => alert("item added to cart"))
    } 
    const addtocart2 = () => {
      addItemToCart(product , () => {
        setRedirect(true)
      })
    }


    const getARedirect = (redirect) => {
      if (redirect) {
        return <Redirect to="/cart" />
      }
    }
    
    let formateNumber = (num) => {
      let numSplit , int , dec;
      num = Math.abs(num);
      num = num.toFixed(2);
      numSplit = num.split('.');
      int = numSplit[0];
      if(int.length > 3){
        int = int.substr(0,int.length - 3) + ',' +int.substr(int.length - 3 , 3);
      }
      dec = numSplit[1]
      return int + '.' + dec
    }


    return (
        <div className="test">
         
        <div  id="curve" className="ccard">
        <div style={{backgroundImage: `url(${imageUrl})`}} className="ccard-image">

</div>
       <div className="price-box">
        <h1 className="price">₹{cartPrice}</h1>
        </div>
          <div className="cfooter">
            <div className="connections">
              <div onClick={addtocart} className="connection ccart">
              <img    src={require("../images/SVG/cart-copy.svg")} className="ccart-icon" alt=""/>
                </div>
              <div  onClick={addtocart2} className="connection cbuy">
              <img   src={require("../images/SVG/credit-card.svg")} className="cbuy-icon" alt=""/>
              </div>
        {getARedirect(redirect)}
              <Link className="connection cview" to={`/Product/${ProductId}`}>
              {/* <div  className="connection cview"> */}
              <img    src={require("../images/SVG/eye.svg")} className="cview-icon" alt=""/>
              {/* </div> */}
              </Link>
             
            </div>
        
            <div className="cinfo">
              <div className="name">{cartTitle}</div>
              <div className="job">{cartDescription[0]}</div>
            </div>
          </div>
          {/* <div className="ccard-blur" /> */}
        </div>
      </div>
    )
}

export default IndexCard