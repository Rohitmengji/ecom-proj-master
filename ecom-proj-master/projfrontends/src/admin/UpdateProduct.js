import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategories, updateProduct, getProduct } from "./helper/adminapicall";
import { isAutheticated } from "../auth/helper/index";
import Menu from "../core/Menu";
import Disabled from "./Disabled";

const UpdateProducts = ({ match }) => {
  const HomeAdmin = () => (
    <div >
      <Link to="/admin/dashboard">

        <button className="btn btn-dark c">&#8606; Admin Home</button>

      </Link>
    </div>
  );
  const ManageCategory = () => (
    <div >
      <Link to="/admin/products">

        <button className="btn btn-dark c">Manage Products &#8608;</button>

      </Link>
    </div>
  );
  const { user, token } = isAutheticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: [],
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getaRedirect: false,
    formData: new FormData()
  });

  const {
    name,
    description,
    price,
    stock,
    categories,
    category,
    loading,
    error,
    image,
    createdProduct,
    getaRedirect,
    formData
  } = values;

  const preload = (productId) => {
    getProduct(productId).then(data => {
      //console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
        console.log(data.error);
      } else {
        preloadCategories()
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category._id,
          stock: data.stock,
          // image:data.image,
          formData: new FormData()
        });

        formData.append('name',name);
        formData.append('description',description);
        formData.append('price',price);
        formData.append('stock',stock);
        formData.append('category',category);
        // console.log(value);
        if(data.image.length > 0){
          data.image.map((file, i ) => {
            formData.append('image', file)
          })
        }
        
      }
    });
  };

  const preloadCategories = () => {
    getCategories().then(
      data => {
        if (data.error) {
          setValues({ ...values, error: data.error });

        }
        else {
          setValues({ categories: data, formData: new FormData() })
        }
      }
    )
  }

  useEffect(() => {
    preload(match.params.productId);
  }, []);

  const onSubmit = event => {
    event.preventDefault();
    if (name) {
      formData.append('name' , name)
    }
    if (description) {
      formData.append('description',description)
    }
    if(price){
      formData.append('price',price)
    }
    if(stock){
      formData.append('stock',stock)
    }
    if (category) {
      formData.append('category',category)
    }
 
    
    setValues({ ...values, error: "", loading: true });
    updateProduct(match.params.productId, user._id, token, formData).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        console.log(formData);

        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          image: [],
          stock: "",
          loading: false,
          createdProduct: data.name,
          getaRedirect: true
        });


      }
    });
  };

  const handleChange = names => event => {
    // const value = name === "photo" ? event.target.files[0] : event.target.value;
    // formData.set(name, value);
    // setValues({ ...values, [name]: value });

    

    let value =  "";

    let photo = []

  if(names === 'image'){
    for (let i = 0; i < event.target.files.length; i++) {
      console.log('image found');
      photo.push(event.target.files[i])
  // formData.append(event.target.files[i].names , event.target.files[i])
      
      // console.log(event.target.files[i]);
    }
  }else{
    value = event.target.value
  }
  setValues({ ...values, [names]: value , image : photo});
  // setValues({...values,image:photo})
console.log(values);
console.log('photos' , photo);
  // console.log(formData);
  // if(names == 'name'){
  //   formData.append('name',name);
  // }
  // if (names == 'description') {
  //   formData.append('description',description);    
  // }
  // if (names == 'price') {
  //   formData.append('price',price);    
  // }
  // if (names == 'stock') {
  //   formData.append('stock',stock);    
  // }
  // if (names == 'category') {
  //   formData.append('category',category);
    
  // }
  console.log(value);
  if(photo.length > 0){
    photo.map((file, i ) => {
      console.log('hey');
      formData.append('image', file)
    })
  }

  console.log(values);
  // console.log(value);
//   for (var pair of formData.entries()) {
//     console.log(pair[0]+ ' - ' + pair[1]); 
// }

  };
console.log(values);
  const successMessage = () => {
    return <div
      className="alert alert-success mt-3"
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h4>{createdProduct} Updated successfully</h4>
    </div>

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
  const warningMessage = () => {
    if (error) {
      return <div className="alert alert-danger mt-3">
        <h1>{error} </h1>
      </div>

    }

  };
console.log(values);


  return (
    <div className="p">
      <Menu />
      <div className="cbuttons">
        {HomeAdmin()}
        {ManageCategory()}
      </div>
      <div className="ccontainer">
        <h2 className="ccontainer-hedding">Update Products</h2>
        {loadingMessage()}
        {successMessage()}
        {warningMessage()}
        <form>
          <span className="text-big">Post photo</span>
          <div className="form-group">
            <label className="btn btn-block btn-dark">
              <input
                onChange={handleChange("image")}
                type="file"
                name="image"
                accept="image"
                placeholder="choose a file"
                multiple
              />
            </label>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("name")}
              name="name"
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group">
            <textarea
              onChange={handleChange("description")}
              name="description"
              className="form-control"
              placeholder="Description"
              value={description}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
            />
          </div>
          <div className="form-group">
            <select
              onChange={handleChange("category")}
              className="form-control"
              placeholder="Category"
            >
              <option>Select</option>
              {categories &&
                categories.map((cate, index) => (
                  <option key={index} value={cate._id}>
                    {cate.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("stock")}
              type="number"
              className="form-control"
              placeholder="Stock"
              value={stock}
            />
          </div>

          <button
            type="submit"
            onClick={Disabled}
            className="ccontainer-form-button mt-4 center-form-button"
          >
            update Product
</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProducts;
