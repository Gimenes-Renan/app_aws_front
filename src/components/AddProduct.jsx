import React, { useState, useEffect } from "react";
import ProductDataService from "../services/ProductsService";
import BrandDataService from "../services/BrandsService";
import CategoryDataService from "../services/CategoriesService";

const AddProduct = () => {
  const initialProductState = {
    productId: null,
    productName: '',
    brandName: '',
    brand: { brandName: '' },
    categoryName: '',
    category: { categoryName: '' },
    listPrice: '',
    quantity: '',
    published: false
  };
  const [product, setProduct] = useState(initialProductState);
  const [submitted, setSubmitted] = useState(false);

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    retrieveBrands();
    retrieveCategories();
  }, []);

  const retrieveBrands = () => {
    BrandDataService.getAll()
      .then(response => {
        setBrands(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const retrieveCategories = () => {
    CategoryDataService.getAll()
      .then(response => {
        setCategories(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const saveProduct = () => {
    console.log('product', product.categoryName);
    var data = {
      productName: product.productName,
      brand: { brandName: product.brandName },
      category: { categoryName: product.categoryName },
      listPrice: product.listPrice,
      quantity: product.quantity
    };
    console.log('data', data);

    ProductDataService.create(data)
      .then((response) => {
        setProduct({
          productId: response.data.productId,
          productName: response.data.productName,
          brand: response.data.brand.brandName,
          category: response.data.category.categoryName,
          listPrice: response.data.listPrice,
          quantity: response.data.quantity,
          published: true
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
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

          {/* <div className="form-group">
            <label class="mr-sm-2 sr-only" for="inlineFormCustomSelect">
              Marca
            </label>
            <select class="custom-select mr-sm-2" id="inlineFormCustomSelect">
              <option selected>Escolha...</option>
              { brands.map((brand, index) => (
              <option key={index}>
                {brand.brandName}
              </option>
              )) }
            </select>
          </div> */}

          <div className="form-group">
            <label htmlFor="brandName">Marca</label>
            <select className="custom-select mr-sm-2" name="brandName" id="brandName" onChange={handleInputChange}>
              <option selected>Escolha...</option>
              { brands.map((brand, index) => (
              <option key={index} value={brand.brandName} name="brandName">
                {brand.brandName}
              </option>
              )) }
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="categoryName">Categoria</label>
            <select className="custom-select mr-sm-2" name="categoryName" id="categoryName" onChange={handleInputChange}>
              <option selected>Escolha...</option>
              { categories.map((category, index) => (
              <option key={index} value={category.categoryName} name="categoryName">
                {category.categoryName}
              </option>
              )) }
            </select>
          </div>

          {/* <div className="form-group">
            <label htmlFor="category">Categoria</label>
            <input
              type="text"
              className="form-control"
              id="category"
              required
              value={product.category.categoryName}
              onChange={handleInputChange}
              name="category"
            />
          </div> */}

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
