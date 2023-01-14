import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import UserDashBoard from "./user/UserDashBoard";
import AdminDashBoard from "./user/AdminDashBoard";
import AddCategory from "./admin/AddCategory";
import ManageCategories from "./admin/ManageCategories";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import ManageBanners from "./admin/ManageBanners";
import UpdateProducts from "./admin/UpdateProduct";
import UpdateBanner from "./admin/UpdateBanner";
import UpdateCategory from "./admin/UpdateCategory"
import Cart from "./core/Cart";
import TestUpdate from "./core/TestUpdate";
import ManageOrders from "./admin/ManageOrders";
import UpdateProfiles from "./admin/UpdateProfile";
import ProductPage from "./core/PrductPage";
import RelatedPage from "./core/RelatedPage";


const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/cart" exact component={Cart} />
        <Route path="/product/:productId" exact component={ProductPage} />
        <Route path="/related/product/:productId" exact component={RelatedPage} />

        <PrivateRoute path="/user/dashboard" exact component={UserDashBoard} />
        <PrivateRoute path="/user/update/:userId" exact component={UpdateProfiles} />
        <PrivateRoute path="/test" exact component={TestUpdate} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard} />
        <AdminRoute
          path="/admin/create/category"
          exact
          component={AddCategory}
        />
        <AdminRoute
          path="/admin/categories"
          exact
          component={ManageCategories}
        />
        <AdminRoute path="/admin/create/product" exact component={AddProduct} />

        <AdminRoute path="/admin/products" exact component={ManageProducts} />
        <AdminRoute path="/admin/banners" exact component={ManageBanners} />
        <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProducts} />
        <AdminRoute path="/admin/banner/update/:bannerId" exact component={UpdateBanner} />
        <AdminRoute path="/admin/category/update/:categoryId" exact component={UpdateCategory} />
        <AdminRoute path="/admin/orders" exact component={ManageOrders} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
