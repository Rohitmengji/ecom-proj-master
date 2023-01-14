import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import { getBanners } from "./helper/adminapicall";
import { Table } from 'react-bootstrap'
import Menu from "../core/Menu";


const ManageBanners = () => {
  const [banners, setBanners] = useState([]);

  const { user, token } = isAutheticated();

  const preload = () => {
    getBanners().then(data => {
      if (!data) {
        console.log("Banner not found");
      } else {
        setBanners(data);
        console.log(data);

      }
    });
  };

  useEffect(() => {
    preload();
  }, []);


  return (

    <div>
      <Menu />
      <div className="ocontainer padding-bottom">
        <h1 className="text-center pb-4 pt-4">Total Banners Are {banners.length}</h1>

        <Table className="tab text-center " striped responsive bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>

            {banners.map((banner, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{banner.name}</td>
                  <td><Link className="btn btn-success" to={`/admin/banner/update/${banner._id}`}>Update</Link></td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );

};

export default ManageBanners;
