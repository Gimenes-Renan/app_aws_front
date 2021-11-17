import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddProduct from "./components/AddProduct";
import Product from "./components/Product";
import ProductsList from "./components/ProductsList";
import AddBrand from "./components/AddBrand";
import Brand from "./components/Brand";
import BrandsList from "./components/BrandsList";
import AddCategory from "./components/AddCategory";
import Category from "./components/Category";
import CategoriesList from "./components/CategoriesList";

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
            <Link to={"/addProduct"} className="nav-link">
              Adicionar produto
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/brands"} className="nav-link">
              Lista de marcas
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/addBrand"} className="nav-link">
              Adicionar marca
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/categories"} className="nav-link">
              Lista de categorias
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
          <Route exact path="/addProduct" component={AddProduct} />
          <Route exact path={["/brands"]} component={BrandsList} />
          <Route exact path="/addBrand" component={AddBrand} />
          <Route exact path={["/categories"]} component={CategoriesList} />      
          <Route exact path="/addCategory" component={AddCategory} />
          <Route path="/products/:id" component={Product} />
          <Route path="/brands/:id" component={Brand} />
          <Route path="/categories/:id" component={Category} />
        </Switch>
      </div>
    </div>
  );
}

export default App;