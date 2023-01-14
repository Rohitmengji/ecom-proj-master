import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {updateBanner , getBanner} from "./helper/adminapicall";
import { isAutheticated } from "../auth/helper/index";
import Menu from "../core/Menu";
import Disabled from "./Disabled";

const UpdateBanner = ({ match }) => {
  const HomeAdmin = () => (
    <div >
      <Link to="/admin/dashboard">

        <button className="btn btn-dark c">&#8606; Admin Home</button>

      </Link>
    </div>
  );

  const { user, token } = isAutheticated();

  const [values, setValues] = useState({
    name: "",
   image: [],
  loading: false,
    error: "",
     getaRedirect: false,
     createdBanner:"",
    formData: new FormData()
  });

  const {
    name,
    loading,
    error,
     getaRedirect,
    formData,
    createdBanner,
    image
  } = values;

  const preload = (bannerId) => {
    getBanner(bannerId).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
         
        });
        formData.append('name' , name);
        if (data.image && data.image.length > 0) {
          data.image.map((file,i) => {
            formData.append('image',file)
          })
        }
      }
    });
  };


  useEffect(() => {
    preload(match.params.bannerId);
  }, []);

  const onSubmit = event => {
    event.preventDefault();
    if (name) {
      // formData.append('name' , name)
    }
    setValues({ ...values, error: "", loading: true });
    updateBanner(match.params.bannerId, user._id, token, formData).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        console.log(formData);

        setValues({
          ...values,
          name: "",
         image: [],
         loading: false,
         createdBanner: data.name,

          getaRedirect: true
        });


      }
    });
  };

  const handleChange = names => event => {
    // const value = name === "photo" ? event.target.files[0] : event.target.value;
    // formData.set(name, value);
    // setValues({ ...values, [name]: value });
    let value = "";
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

  const successMessage = () => {
    return <div
      className="alert alert-success mt-3"
      style={{ display: createdBanner ? "" : "none" }}
    >
      <h4>{createdBanner} Updated successfully</h4>
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



  return (
    <div className="p">
      <Menu />
      <div className="cbuttons">
        {HomeAdmin()}
      </div>
      <div className="ccontainer">
        <h2 className="ccontainer-hedding">Update Banne</h2>
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
              name="photo"
              className="form-control"
              placeholder="Name"
              disabled
              value={name}
            />
          </div>
    
          <button
            type="submit"
            onClick={Disabled}
            className="ccontainer-form-button mt-4 center-form-button"
          >
            update Banner
</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBanner;
