import React, {useState , useEffect, useCallback} from 'react';
import { getProduct } from '../admin/helper/adminapicall';
import { API } from '../backend';
import Menu from './Menu';
import Footer from './Footer';
import { getCategoryById } from './helper/categoryHelper';
import ReactElasticCarousel from 'react-elastic-carousel';
import RelatedCard2 from './RelatedCard2';
import { addItemToCart } from './helper/cartHelper';
import { Redirect, Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

const RelatedPage = ({match}) => {
  const [products, setProducts] = useState([])
  const [categories, setCategory] = useState("")
  const [redirect , setRedirect ] = useState(false)
  let [firstImage , setFirstimage] = useState("")
  let [active , setActive] = useState(0)
  let [loading1 , setLoading1] = useState(false)
const breakPoints = [
  {width:100 , itemsToShow: 1},
  {width:300 , itemsToShow: 2},
  {width:550 , itemsToShow: 3},
  {width:768 , itemsToShow: 4},
  {width:1200 , itemsToShow: 5},
]
    const [values, setValues] = useState({
        name: "",
        description: [],
        price: "",
        photo: [],
        error: "",
        megadescription:[],
        categoryId:"",
        product:{},
      });
    
      const {
        name,
        description,
        price,
        photo,
        error,
        product,
        category

      } = values;
    const preload = useCallback((productId) => {
      setLoading1(true)
        getProduct(productId).then(data => {
          if (data.error) {
            setValues({ ...values, error: data.error });
          } else {
            
            setValues({
              ...values,
              name: data.name,
              description: data.description.split("||"),
              price: data.price,
              photo: data.image,
              product:data
            });
            setCategory(data.category);
            setFirstimage(data.image[0].url);
            // console.log(data.category._id);
            setLoading1(false)

          }
        });
      },[setValues]);
     
        // console.log(loading);
          
        useEffect(()=> {
          getCategoryById({ "_id": product.category }).then(data => {
            if (data.error) {
              setValues({ ...values, error: data.error });
            } else {
              setProducts(data)
            }
          })
        },[values , preload])
  
  
         
      useEffect(() => {
        preload(match.params.productId);
      }, []);

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
let myRef = React.createRef()
 let handleclick = (index) => {
   setActive(100)
    setFirstimage(photo[index].url)
    let images = myRef.current.children;
  for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace("active-product" , 'product-container-left-header-images-box')
  }
  images[index].className = "active-product"
  }

  let AllContent1 = () => {
    if (loading1) {
      return (
        <div className="spinner-div">
        <div className="spinner">
        <Spinner animation="border" className="main-spinner" />
        <h1>Please Wait...</h1>
        </div>
      </div>
      )
    }
    else {
      return (
       ""
      )
    }
  }
    return (
      <div className="product-main">
        <div className="product-container-menu">
        <Menu></Menu>
        </div>
        {/* <AllContent1 /> */}
    {photo.length > 0 ? (    <div className="product-container ">
        <div className="product-container-left ">
        <div className="vertical-line"> </div>

<div className="product-container-left-header">

 <div className="product-container-left-header-images" ref={myRef} >
 {photo.map((photo , i) => {
    return (
      <div key={i} className={`product-container-left-header-images-box ${active === i ? "active-product" : ""}`}  onClick={() => handleclick(i)}>
        <div className="product-container-left-header-images-image" style={{backgroundImage:`url(${photo.url})`}}></div>
      </div>
    )
  })}

 </div>

<div className="product-container-left-header-image">
  <div className="product-container-left-header-image-main" style={{backgroundImage:`url(${firstImage})`}} ></div>
  
  </div>        
</div>
            <div className="product-container-left-button">
            {getARedirect(redirect)}

            <button onClick={addtocart2} className="product-container-left-button-2 product-button"> <img className="product-icon" src={require("../images/SVG/credit-card.svg")} alt=""/> Buy Now</button>
          
            <button onClick={addtocart} className="product-container-left-button-1 product-button"> <img className="product-icon" src={require("../images/SVG/cart.svg")} alt=""/> Add To Cart</button>
        </div>
            </div>
        <div className="product-container-right ">
        
            <h1 className="product-container-right-name">{name}</h1>
            <h3 className="product-container-right-description">Description : {description[1]}</h3>
            <h1 className="product-container-right-price">Price: ₹{formateNumber(price)}</h1>
           
            <div className="product-container-right-color">
                <h4 className="product-container-right-color-name">Color : </h4>
                  <div className="product-container-right-color-one-container">
                      <div className="product-container-right-color-one-container-blue shadow-lg">
                      </div>
                        <h3>Blue</h3>
                  </div>

                  <div className="product-container-right-color-one-container">
                      <div className="product-container-right-color-one-container-red shadow-lg">
                      </div>
                        <h3>Pink</h3>
                  </div>
                  <div className="product-container-right-color-one-container">
                      <div className="product-container-right-color-one-container-green shadow-lg">
                      </div>
                        <h3>Green</h3>
                  </div>
            </div>
        
            <div className="product-container-right-size">
                <h4 className="product-container-right-size-name">Size : </h4>
                <select >
                <option >Select</option>
                <option>S</option>
                <option>M</option>
                <option>L</option>
            </select>
            </div>
        
        <div className="product-container-right-content">
          <h4>Content:</h4>
          <ul>
          {description.map((point,i) => {
                  return(
                    <li className="product-container-right-content-point" key={i}>{point}</li>
                  )  
            })}
          </ul>
        </div>
     
        </div>
        <div className="horizontal-line">

        </div>
        <div className="related-products-container">
      {products.length > 0 ? (<div>
        <h1 className="related-products-hedding">
        {products.length} Related products 
        </h1>
            <ReactElasticCarousel className="related-products-carousel" breakPoints={breakPoints} >
          {products.map((product,i) => {
           return(
            <div key={i} className="related-products-card">
                  <RelatedCard2 product={product} />
                </div>
           )
          })}
              </ReactElasticCarousel>
      
      </div>) : <div className="noProduct"> <h1>No Related Product Found</h1></div>}
        </div>
        {/* <div className="testing">
          {products.map((product , i) => {
            return (
              <h1 key={i}>{product.name}</h1>
            )
          })}
        </div> */}
        </div>
    ) :  <div className="spinner-div">
    <div className="spinner">
    <Spinner animation="border" className="main-spinner" />
    <h1>Please Wait...</h1>
    </div>
  </div>}  
        <div className="product-main-footer">
            <Footer></Footer>
        </div>
        </div>
    )
}
export default RelatedPage