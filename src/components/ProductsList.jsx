import React, { useState, useEffect } from "react";
import ProductDataService from "../services/ProductsService";
import { Link } from "react-router-dom";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrieveProducts();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveProducts = () => {
    ProductDataService.getAll()
      .then(response => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveProducts();
    setCurrentProduct(null);
    setCurrentIndex(-1);
  };

  const setActiveProduct = (product, index) => {
    setCurrentProduct(product);
    setCurrentIndex(index);
  };

  const removeAllProducts = () => {
    ProductDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    ProductDataService.findByTitle(searchTitle)
      .then(response => {
        setProducts(response.data);
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
        <h4>Lista de produtos</h4>

        <ul className="list-group">
          {products &&
            products.map((product, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveProduct(product, index)}
                key={index}
              >
                {product.productName}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllProducts}
        >
          Remover todos
        </button>
      </div>
      <div className="col-md-6">
        {currentProduct ? (
          <div>
            <h4>Produto</h4>
            <div>
              <label>
                <strong>ID do produto:</strong>
              </label>{" "}
              {currentProduct.productId}
            </div>
            <div>
              <label>
                <strong>Nome:</strong>
              </label>{" "}
              {currentProduct.productName}
            </div>
            <div>
              <label>
                <strong>Marca:</strong>
              </label>{" "}
              {currentProduct.brand.brandName}
            </div>
            <div>
              <label>
                <strong>Categoria:</strong>
              </label>{" "}
              {currentProduct.category.categoryName}
            </div>
            <div>
              <label>
                <strong>Preço:</strong>
              </label>{" "}
              {currentProduct.listPrice}
            </div>
            <div>
              <label>
                <strong>Quantidade:</strong>
              </label>{" "}
              {currentProduct.quantity}
            </div>
            <Link
              to={"/products/" + currentProduct.productId}
              className="badge badge-warning"
            >
              Editar
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Clique em um produto...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsList;