import React, { useState } from "react";
import ProductDataService from "../services/ProductsService";

const AddProduct = () => {
  const initialProductState = {
    productId: null,
    productName: "",
    brandName: "",
    categoryName: "",
    listPrice: "",
    quantity: "",
    published: false
  };
  const [product, setProduct] = useState(initialProductState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const saveProduct = () => {
    var data = {
      productName: product.productName,
      brandName: product.brandName,
      categoryName: product.categoryName,
      listPrice: product.listPrice,
      quantity: product.quantity
    };

    ProductDataService.create(data)
      .then(response => {
        setProduct({
          productId: response.data.productId,
          productName: response.data.productName,
          brandName: response.data.brandName,
          categoryName: response.data.categoryName,
          listPrice: response.data.listPrice,
          quantity: response.data.quantity,
          published: true
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newProduct = () => {
    setProduct(initialProductState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>Adicionado com sucesso!</h4>
          <button className="btn btn-success" onClick={newProduct}>
            Adicionar
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="productName">Nome do produto</label>
            <input
              type="text"
              className="form-control"
              id="productName"
              required
              value={product.productName}
              onChange={handleInputChange}
              name="productName"
            />
          </div>

          <div className="form-group">
            <label htmlFor="brandName">Marca</label>
            <input
              type="text"
              className="form-control"
              id="brandName"
              required
              value={product.brandName}
              onChange={handleInputChange}
              name="brandName"
            />
          </div>

          <div className="form-group">
            <label htmlFor="categoryName">Categoria</label>
            <input
              type="text"
              className="form-control"
              id="categoryName"
              required
              value={product.categoryName}
              onChange={handleInputChange}
              name="categoryName"
            />
          </div>

          <div className="form-group">
            <label htmlFor="listPrice">Preço</label>
            <input
              type="text"
              className="form-control"
              id="listPrice"
              required
              value={product.listPrice}
              onChange={handleInputChange}
              name="listPrice"
            />
          </div>

          <div className="form-group">
            <label htmlFor="quantity">Quantidade</label>
            <input
              type="text"
              className="form-control"
              id="quantity"
              required
              value={product.quantity}
              onChange={handleInputChange}
              name="quantity"
            />
          </div>

          <button onClick={saveProduct} className="btn btn-success">
            Adicionar
          </button>
        </div>
      )}
    </div>
  );
};

export default AddProduct;