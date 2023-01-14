import React , {useState , useEffect} from 'react';
import { addItemToCart, loadCart } from './helper/cartHelper';
import { Link, Redirect } from 'react-router-dom';
import { API } from '../backend';
import ImageHelper from './helper/ImageHelper';

const SideProduct = ({product , setReload = f => f /* (f) => return f  */ , reload = undefined  }) => {
  

    const [redirect , setRedirect ] = useState(false)
    const cartTitle = product ? product.name : "Default Title"
    const cartDescription = product ? product.description : "Default Description"
    const cartPrice = product ? product.price : "Default Price"
    const imageUrl = product.image.slice(0,1).map(photo => photo.url)
  


    const addtocart = () => {
        addItemToCart(product , () => {
          setRedirect(true)
        })
      }
      const getARedirect = (redirect) => {
        if (redirect) {
          return <Redirect to="/cart" />
        }
      }
  
  

    return (
      <Link style={{ textDecoration: 'none' }} className="side-productlog"    to={`/product/${product._id}`} >
        <div  className="side-product">
           <div className="side-product-image">
             <div className="side-product-image-main" style={{backgroundImage: `url(${imageUrl})`}}></div>
           </div>
            {getARedirect(redirect)}
            <div className="side-product-info">
                <h3 className="side-product-info-title" >{cartTitle}</h3>
             
                <h2 className="side-product-info-price">₹{cartPrice}</h2>
            </div>
        </div>
        </Link>
    )
}

export default SideProduct