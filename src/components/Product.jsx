import React, { useState, useEffect } from "react";
import ProductDataService from "../services/ProductsService";

const Product = props => {
  const initialProductState = {
    productId: null,
    productName: "",
    brandName: "",
    categoryName: "",
    listPrice: "",
    quantity: "",
    published: false
  };
  const [currentProduct, setCurrentProduct] = useState(initialProductState);
  const [message, setMessage] = useState("");

  const getProduct = id => {
    ProductDataService.get(id)
      .then(response => {
        setCurrentProduct(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getProduct(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
  };

  const updatePublished = status => {
    var data = {
      productId: currentProduct.productId,
      productName: currentProduct.productName,
      brandName: currentProduct.brandName,
      categoryName: currentProduct.categoryName,
      listPrice: currentProduct.listPrice,
      quantity: currentProduct.quantity,
      published: status
    };

    ProductDataService.update(currentProduct.id, data)
      .then(response => {
        setCurrentProduct({ ...currentProduct, published: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateProduct = () => {
    ProductDataService.update(currentProduct.productId, currentProduct)
      .then(response => {
        console.log(response.data);
        setMessage("Produto editado com sucesso!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteProduct = () => {
    ProductDataService.remove(currentProduct.productId)
      .then(response => {
        console.log(response.data);
        props.history.push("/products");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentProduct ? (
        <div className="edit-form">
          <h4>PRODUTOS</h4>
          <form>
            <div className="form-group">
              <label htmlFor="productId">ID do produto</label>
              <input
                type="text"
                className="form-control"
                id="productId"
                name="productId"
                value={currentProduct.productId}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="productName">Nome do produto</label>
              <input
                type="text"
                className="form-control"
                id="productName"
                name="productName"
                value={currentProduct.productName}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="brandName">Marca</label>
              <input
                type="text"
                className="form-control"
                id="brandName"
                name="brandName"
                value={currentProduct.brandName}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="categoryName">Categoria</label>
              <input
                type="text"
                className="form-control"
                id="categoryName"
                name="categoryName"
                value={currentProduct.categoryName}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="listPrice">Preço</label>
              <input
                type="text"
                className="form-control"
                id="listPrice"
                name="listPrice"
                value={currentProduct.listPrice}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="quantity">Quantidade</label>
              <input
                type="text"
                className="form-control"
                id="quantity"
                name="quantity"
                value={currentProduct.quantity}
                onChange={handleInputChange}
              />
            </div>
          </form>

          {currentProduct.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              Remover
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publicar
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteProduct}>
            Apagar
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateProduct}
          >
            Editar
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Clique em um produto...</p>
        </div>
      )}
    </div>
  );
};

export default Product;