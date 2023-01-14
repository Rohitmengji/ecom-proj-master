import React ,{useState , useEffect} from 'react';
import ImageHelper from "./helper/ImageHelper"
import { Redirect } from 'react-router-dom';
import { addItemToCart, removeItemFromCart, loadCart } from './helper/cartHelper';

const Card = ({product , addToCart = true , removeFromCart = false , setReload = f => f /* (f) => return f  */ , reload = undefined}) => {


  const [redirect , setRedirect ] = useState(false)
  const [count , setCount ] = useState(1)
  // const [reload , setReload] =useState(false)
    product.count = count;
 

    const cartTitle = product ? product.name : "Default Title"
    const cartDescription = product ? product.description : "Default Description"
    const cartPrice = product ? product.price : "Default Price"

    const addtocart = () => {
      addItemToCart(product , () => setRedirect(true))
    } 


    const getARedirect = (redirect) => {
      if (redirect) {
        return <Redirect to="/cart" />
      }
    }


    const handlechange = event => {
      setCount(event.target.value)
    }



   const showAddToCart = () => {
       return (
           addToCart && (
            <button
            onClick={addtocart}
            className="btn btn-block btn-outline-success mt-2 mb-2"
          >
            Add to Cart
          </button>
           )
       )
       
   } 

   const showRemoveFromCart = () => {
    return (
        removeFromCart && (
          <div>
            <button
                onClick= {() =>{
                  removeItemFromCart(product._id);
                  window.location.reload(true)
                }}
                className="btn btn-block btn-outline-danger mt-2 mb-2"
              >
                Remove from cart
               
              </button>
              <input type="number" value={count} onChange={handlechange}  name="" id=""/>
              </div>
        )
    )
} 




    return (
      <div className="card text-white bg-dark border border-info ">
        <div className="card-header lead">{cartTitle}</div>
        <div className="card-body">
        {getARedirect(redirect)}
          <div className="rounded border border-success p-2">
            <ImageHelper product={product} />
          </div>
          <p className="lead bg-success font-weight-normal text-wrap">
            {cartDescription}
          </p>
          <p className="btn btn-success rounded  btn-sm px-4">₹ {cartPrice}</p>
          <div className="row">
            <div className="col-12">
              {showAddToCart(addToCart)}
            </div>
            <div className="col-12">
              {showRemoveFromCart((removeFromCart)) }
             
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default Card ;