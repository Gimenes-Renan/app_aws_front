import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";

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
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Produtos
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link to={"/products"} className="dropdown-item">
                Listar / Editar / Apagar
              </Link>
              <Link to={"/addProduct"} className="dropdown-item">
                Adicionar
              </Link>
            </div>
          </li>

          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Marcas
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link to={"/brands"} className="dropdown-item">
                Listar / Editar / Apagar
              </Link>
              <Link to={"/addBrand"} className="dropdown-item">
                Adicionar
              </Link>
            </div>
          </li>

          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Categorias
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link to={"/categories"} className="dropdown-item">
                Listar / Editar / Apagar
              </Link>
              <Link to={"/addCategory"} className="dropdown-item">
                Adicionar
              </Link>
            </div>
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
