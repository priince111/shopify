import React from "react";
import AddProduct from "./AddProduct";
import HomePage from "./HomePage";
import { Switch, Route, Redirect } from "react-router-dom";
import Cart from "./Cart";
import Order from "./Order";

const Main = () => {
  return (
    <div>
      <Switch>
        <Route path="/home">
          <HomePage />
        </Route>
        <Route path="/addProduct">
          <AddProduct />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/orders">
          <Order />
        </Route>
        <Redirect to="/home" />
      </Switch>
    </div>
  );
};

export default Main;
