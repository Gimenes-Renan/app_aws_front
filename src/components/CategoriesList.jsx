import React, { useState, useEffect } from "react";
import CategoryDataService from "../services/CategoriesService";
import { Link } from "react-router-dom";

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrieveCategories();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveCategories = () => {
    CategoryDataService.getAll()
      .then(response => {
        setCategories(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveCategories();
    setCurrentCategory(null);
    setCurrentIndex(-1);
  };

  const setActiveCategory = (category, index) => {
    setCurrentCategory(category);
    setCurrentIndex(index);
  };

  const removeAllCategories = () => {
    CategoryDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    CategoryDataService.findByTitle(searchTitle)
      .then(response => {
        setCategories(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Busca por nome"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Buscar
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Lista de categorias</h4>

        <ul className="list-group">
          {categories &&
            categories.map((category, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveCategory(category, index)}
                key={index}
              >
                {category.categoryName}
              </li>
            ))}
        </ul>

        {/* <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllCategories}
        >
          Remover todas
        </button> */}
      </div>
      <div className="col-md-6">
        {currentCategory ? (
          <div>
            <h4>Categoria</h4>
            <div>
              <label>
                <strong>ID da categoria:</strong>
              </label>{" "}
              {currentCategory.categoryId}
            </div>
            <div>
              <label>
                <strong>Nome:</strong>
              </label>{" "}
              {currentCategory.categoryName}
            </div>
            <Link
              to={"/categories/" + currentCategory.categoryId}
              className="badge badge-warning"
            >
              Editar
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Clique em uma categoria...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesList;