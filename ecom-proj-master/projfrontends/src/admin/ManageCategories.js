import React, { useState, useEffect } from 'react';
import '../scss/styles.scss'
import Menu from '../core/Menu';
import { isAutheticated } from "../auth/helper";
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap'
import Disabled from "./Disabled";

import { getCategories, deleteCategory } from '../admin/helper/adminapicall';


const TestUpdate = () => {
  const [categories, setCategories] = useState([]);

  const { user, token } = isAutheticated();

  const preload = () => {
    getCategories().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisCategory = categoryId => {
    deleteCategory(categoryId, user._id, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  return (
    <div>
      <Menu />
      <div className="ocontainer">
        <h1 className="text-center pb-4 pt-4">Total Categories Are {categories.length}</h1>

        <Table className="tab text-center" striped responsive bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>

            {categories.map((category, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{category.name}</td>
                  <td><Link className="btn btn-success" to={`/admin/category/update/${category._id}`}>Update</Link></td>
                  <td><button
                    onClick={Disabled}
                    className="btn btn-danger"
                  >
                    Delete
                          </button></td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default TestUpdate;