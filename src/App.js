import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddProduct from "./components/AddProduct";
import Product from "./components/Product";
import ProductsList from "./components/ProductsList";
import AddBrand from "./components/AddBrand";
import AddCategory from "./components/AddCategory";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/products" className="navbar-brand">
          Módulo de produtos
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/products"} className="nav-link">
              Lista de produtos
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Adicionar produto
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/addBrand"} className="nav-link">
              Adicionar marca
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/addCategory"} className="nav-link">
              Adicionar categoria
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/products"]} component={ProductsList} />
          <Route exact path="/add" component={AddProduct} />
          <Route exact path="/addBrand" component={AddBrand} />
          <Route exact path="/addCategory" component={AddCategory} />
          <Route path="/products/:id" component={Product} />
        </Switch>
      </div>
    </div>
  );
}

export default App;