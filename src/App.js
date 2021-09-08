import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTutorial from "./components/AddTutorial";
import Tutorial from "./components/Tutorial";
import TutorialsList from "./components/TutorialsList";
import AddBrand from "./components/AddBrand";
import AddCategory from "./components/AddCategory";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/tutorials" className="navbar-brand">
          Módulo de produtos
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/tutorials"} className="nav-link">
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
          <Route exact path={["/", "/tutorials"]} component={TutorialsList} />
          <Route exact path="/add" component={AddTutorial} />
          <Route exact path="/addBrand" component={AddBrand} />
          <Route exact path="/addCategory" component={AddCategory} />
          <Route path="/tutorials/:id" component={Tutorial} />
        </Switch>
      </div>
    </div>
  );
}

export default App;