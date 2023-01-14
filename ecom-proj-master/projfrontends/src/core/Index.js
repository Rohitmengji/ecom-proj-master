import React, { useState, useEffect, Fragment, useCallback } from 'react';
import "../scss/styles.scss"
import { Link } from 'react-router-dom';
import { isAutheticated, signout } from '../auth/helper';
import Carousel from './carousel'
import Dots from './indicator-dots'
import Buttons from './buttons'
import IndexCard from './IndexCard';
import Pagination from './Pagination';
import { getProducts, getCategories, getBanners } from '../admin/helper/adminapicall';
import { API } from '../backend';
import ImageHelper from './helper/ImageHelper';
import SideProduct from './SideProduct';
import { getCategoryById } from './helper/categoryHelper';
import RelatedCard from './RelatedCard';
//https://www.youtube.com/watch?v=_U0HHLX4EZE


export default function Index() {

  const [products, setProducts] = useState([])
  const [errors, seterrors] = useState(false)
  const [categories, setCategory] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [productPerPage, setProductPerPage] = useState(16)
  const [sideProducts , setSideProducts] = useState([])
  const [firstsidebar , setFirstsidebar] = useState(false)
  const [banners , setBanners] = useState({
    carousel:[],
    carouselside1:"",
    carouselside2:"",
    sidebar1:"",
    sidebar2:"",
    longbar:""
  });
  let {carousel , carouselside1 , carouselside2 , sidebar1 , sidebar2 , longbar} = banners ;
  const preload = () => {
    setLoading(true)
    getProducts().then(data => {
      if (!data) {
        seterrors(true)
      } else {
        setProducts(data)
        setSideProducts(data)

    setLoading(false)

      }
    })

  }
  // const preload2 = () => {
  //   // setLoading(true)
  //   getProducts().then(data => {
  //     if (!data) {
  //       seterrors(true)
  //     } else {
  //       // setSideProducts(data)
  //     }
  //   })
  //   // setLoading(false)

  // }
  // const preload3 = () => {
  //   getBanners().then(data => {
  //     if (!data) {
  //       seterrors(true)
  //     } else {
  //       data.map((data , i) => {
  //         if (i === 0) {
  //           setBanners({carousel:data.image})
  //         }
  //         if (i === 1) {
  //           setBanners({carouselside1: data.image})
  //         }
  //         if (i === 2) {
  //           setBanners({carouselside2 : data.image})
  //         }
  //         if( i === 4) {
  //           setBanners({sidebar1 : data.image})
          
  //         }
  //         if (i === 5) {
  //           setBanners({sidebar2 : data.image})
  //         }
  //         if (i === 6) {
  //           setBanners({longbar: data.image})
  //         }
  //       })
  //     }
  //   }) 
  // }


  useEffect(() => {
    preload()
    // preload2()
    // preload3()

  }, [])
// console.log(products);
  const preloadCategory = () => {
    getCategories().then(data => {
      if (!data) {
        seterrors(true);
      } else {
        setCategory(data);
      }
    });
  };

  useEffect(() => {
    preloadCategory();
  }, []);

  const handleChange = event => {

    event.target.value && event.target.value === "all" ? (

      getProducts().then(data => {
        if (data.error) {
          seterrors(data.error)
        } else {
          setProducts(data)
        }
      })
    ) : (
        getCategoryById({ "_id": event.target.value }).then(data => {
          if (data.error) {
            seterrors(data.error)
          } else {
            setProducts(data)
          }
        })
      );

  }

  /// get current product pagination
  const indexOfLastPage = currentPage * productPerPage;
  const indexOfFirstPost = indexOfLastPage - productPerPage;
  const currentProduct = products.slice(indexOfFirstPost, indexOfLastPage)

  const paginate = pageNumber => setCurrentPage(pageNumber)

  const pre = () => {
    setCurrentPage(currentPage - 1)
  }
  const next = () => {
    setCurrentPage(currentPage + 1)

  }
  // carousel item
  const Allcategory = () => {
    const mql = window.matchMedia('(max-width: 700px)');

    let mobileView = mql.matches;
    if (mobileView) {
        return (


          <option className="options" value="all"> All Category ▼ </option>

        )
    } else {
        return (
          <option className="options" value="all"> All Category  &#11167; </option>

        )
    }


}


console.log(banners);
  // {banners.slice(0,1).map((banner,i) =>{
  //   banner.image.map((image , i) => {
  //    console.log(image.url);
  //   })
  //  })}
  //  {banners.slice(4,5).map((banner=>{
  //   banner.image.map(image => {
  //     console.log(image.url);
  //   })
  // }))}
console.log(loading);
  return (
    <div className="hcontainer">
      <div className="sidebar">
        <h2 className="sidebar-title">Trending products</h2>
        {sideProducts.slice(8, 13).map((product, index) => {
          return (
            <div key={product._id} className="">
              <SideProduct product={product} />
            </div>
          )
        })}


<img onLoad={() => setFirstsidebar(true)} className="sidebar-image" src={require('../images/sidebar2.jpg')} alt="" /> 

   {/* {banners.slice(4,5).map((banner=>{
     banner.image.slice(0,1).map(image => {
return(
      <img onLoad={() => setFirstsidebar(true)} className="sidebar-image" src={image.url} alt="" /> 

)
     })
   }))} */}
       {/* <img onLoad={() => setFirstsidebar(true)} className="sidebar-image" src={``} alt="" /> */}
       
         {/* {!firstsidebar &&  <div className="loading-sidebar">
          <div className="loading-sidebar-inner">

            <img src={require('../images/loader2.png')} alt=""/> <br/>
            <h3 className="loading-sidebar-name">Loading..</h3>
          </div>
          </div>
} */}
        <div className="b">
          <h2 className="sidebar-title ">Top Rated</h2>

          {sideProducts.slice(30, 35).map((product, index) => {
            return (
              <div key={product._id} className="">
                <SideProduct product={product} />
              </div>
            )
          })}
           
<img onLoad={() => setFirstsidebar(true)} className="sidebar-image" src={require('../images/sidebar3.jpg')} alt="" /> 
         
        </div>

      </div>
      <div className="carousel">

        <div style={{ height: '100%', width: '100%' }}>

          <Carousel loop auto widgets={[Dots, Buttons]} className="custom-class">

            <img src={require('../images/carouselbanner1.png')} alt="" className="css" />
            <img src={require('../images/carouselbanner2.png')} alt="" className="css" />
            <img src={require('../images/carouselbanner3.png')} alt="" className="css" />

            {/* {banners.slice(1,2).map((banner,i) =>{
             banner.image.map((image , i) => {
               return(
                 <img src={`hey`} className="css" />
               )
             })
            })} */}
          
            {/* <div className="css carousel-imagess" style={{ backgroundImage: `url(${require("../images/carouselbanner1.png")})` }}></div>
            <div className="css carousel-imagess" style={{ backgroundImage: `url(${require("../images/flipkart2.jpg")})` }}></div>
            <div className="css carousel-imagess" style={{ backgroundImage: `url(${require("../images/flipkart4.jpg")})` }}></div> */}


          </Carousel>
        </div>

      </div>
      <div className="carousel-sidebar">
        <div className="carousel-sidebar-image1" style={{ backgroundImage: `url(${require("../images/sd.png")})` }}></div>
        <div className="carousel-sidebar-image2" style={{ backgroundImage: `url(${require("../images/sd2.png")})` }}></div>

         {/* <img className="carousel-sidebar-image1" src={require('../images/sd.png')} alt=""/>
            <img className="carousel-sidebar-image2" src={require('../images/sd2.png')} alt=""/> */}

      </div>
      <div className="banner">
        <img className="banner-image" src={require('../images/banner1.jpg')} alt="" />
      </div>

      <div className="products">
        <h1 className="sidebar-title sidebar-title-2">All products</h1>


        <div className="cselect">
          <select
            onChange={handleChange}
            placeholder="Category"
          >
            {/* <Allcategory /> */}
          <option className="options" value="all"> All Category ▼ </option>

            {categories &&
              categories.map((cate, index) => (
                <option key={index} value={cate._id}>
                  {cate.name}
                </option>
              ))}
          </select>
        </div>





        <div className="product ">

          {loading ? (
            <div className="loading-box">
              <img src={require("../images/grayboundry.png")} className="loading-icon" />
              <img src={require("../images/grayinner.png")} className="loading-icon-2" />
              
            </div>
          ) : (
            currentProduct.map((product, index) => {
              return (

                <div key={product._id} className="">
                  <IndexCard product={product} className="" />
                </div>


              )
            })
          )
          }


        </div>
        <div className="ppagination">
          <p className="ppagination-pre" onClick={pre}>&#8606;	</p>

          <Pagination productPerPage={productPerPage} totalProduct={products.length} paginate={paginate} />
          <p onClick={next}>	&#8608;</p>
        </div>
      </div>


    </div>
  )



}


/*
row 60vh 6-min-content
column 1fr 24rem 25(8) 1fr
*/