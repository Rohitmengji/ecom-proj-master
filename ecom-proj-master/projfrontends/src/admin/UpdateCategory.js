import React, { useState, useEffect } from 'react';
import '../scss/styles.scss'
import Menu from '../core/Menu';
import { isAutheticated } from "../auth/helper";
import { Link } from 'react-router-dom';
import { updateCategory, getCategory } from '../admin/helper/adminapicall';
import Disabled from './Disabled';

const TestUpdate = ({ match }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading , setLoading] = useState(false);

  const { user, token } = isAutheticated();

  const preload = (categoryId) => {
    setLoading(true)
    getCategory(categoryId).then(data => {
      if (data.error) {
        setError(true)
      }
      else {
        setName(data.name)
        setLoading(false)
      }
    })
  }

  useEffect(() => {
    preload(match.params.categoryId);
  }, [])

  const HomeAdmin = () => (
    <div >
      <Link to="/admin/dashboard">

        <button className="btn btn-dark c">&#8606; Admin Home</button>

      </Link>
    </div>
  );
  const ManageCategory = () => (
    <div >
      <Link to="/admin/categories">

        <button className="btn btn-dark c">Manage Category &#8608;</button>

      </Link>
    </div>
  );

  const handleChange = event => {
    setError("");
    setName(event.target.value);
  };
  const onSubmit = event => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    //backend request fired
    updateCategory(match.params.categoryId, user._id, token, { name }).then(data => {
      if (!data) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
        setName("");
      }
    });
  };

  const successMessage = () => {
    if (success) {
      return (
        <div className="alert alert-success mt-3">
          <h1> Category Updated Successfully </h1>
        </div>
      )
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
  const warningMessage = () => {
    if (error) {
      return (
        <div className="alert alert-danger mt-3">
          <h1>{error} Failed To Update Category </h1>
        </div>
      )
    }
  };
  return (
    <div className="p">
      <Menu />
      <div className="cbuttons">
        {HomeAdmin()}
        {ManageCategory()}

      </div>
      <div className="ccontainer">

        <h2 className="ccontainer-hedding">Update Category</h2>
        {loadingMessage()}
        {successMessage()}
        {warningMessage()}
        <form className="ccontainer-form">
          <h5 className="ccontainer-form-label mt-4">Enter New Category Name</h5>
          <input onChange={handleChange}
            value={name}
            autoFocus
            required placeholder="for Ex. summer"
            type="text"
            className="ccontainer-form-input form-control" />
          <button onClick={Disabled} className="ccontainer-form-button center-form-button">Update Category</button>
        </form>
      </div>
    </div>
  )
}

export default TestUpdate;