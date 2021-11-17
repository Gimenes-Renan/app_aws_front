import React, { useState, useEffect } from "react";
import BrandDataService from "../services/BrandsService";
import { Link } from "react-router-dom";

const BrandsList = () => {
  const [brands, setBrands] = useState([]);
  const [currentBrand, setCurrentBrand] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrieveBrands();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveBrands = () => {
    BrandDataService.getAll()
      .then(response => {
        setBrands(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveBrands();
    setCurrentBrand(null);
    setCurrentIndex(-1);
  };

  const setActiveBrand = (brand, index) => {
    setCurrentBrand(brand);
    setCurrentIndex(index);
  };

  const removeAllBrands = () => {
    BrandDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    BrandDataService.findByTitle(searchTitle)
      .then(response => {
        setBrands(response.data);
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
        <h4>Lista de marcas</h4>

        <ul className="list-group">
          {brands &&
            brands.map((brand, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveBrand(brand, index)}
                key={index}
              >
                {brand.brandName}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllBrands}
        >
          Remover todas
        </button>
      </div>
      <div className="col-md-6">
        {currentBrand ? (
          <div>
            <h4>Marca</h4>
            <div>
              <label>
                <strong>ID da marca:</strong>
              </label>{" "}
              {currentBrand.brandId}
            </div>
            <div>
              <label>
                <strong>Nome:</strong>
              </label>{" "}
              {currentBrand.brandName}
            </div>
            <Link
              to={"/brands/" + currentBrand.brandId}
              className="badge badge-warning"
            >
              Editar
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Clique em uma marca...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandsList;