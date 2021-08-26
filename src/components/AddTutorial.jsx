import React, { useState } from "react";
import TutorialDataService from "../services/TutorialsService";

const AddTutorial = () => {
  const initialTutorialState = {
    productId: null,
    productName: "",
    brandId: "",
    categoryId: "",
    modelYear: "",
    listPrice: "",
    published: false
  };
  const [tutorial, setTutorial] = useState(initialTutorialState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setTutorial({ ...tutorial, [name]: value });
  };

  const saveTutorial = () => {
    var data = {
      productName: tutorial.productName,
      brandId: tutorial.brandId,
      categoryId: tutorial.categoryId,
      modelYear: tutorial.modelYear,
      listPrice: tutorial.listPrice
    };

    TutorialDataService.create(data)
      .then(response => {
        setTutorial({
          productId: response.data.productId,
          productName: response.data.productName,
          brandId: response.data.brandId,
          categoryId: response.data.categoryId,
          modelYear: response.data.modelYear,
          listPrice: response.data.listPrice,
          published: true
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newTutorial = () => {
    setTutorial(initialTutorialState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newTutorial}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="productName">Product Name</label>
            <input
              type="text"
              className="form-control"
              id="productName"
              required
              value={tutorial.productName}
              onChange={handleInputChange}
              name="productName"
            />
          </div>

          <div className="form-group">
            <label htmlFor="brandId">brandId</label>
            <input
              type="text"
              className="form-control"
              id="brandId"
              required
              value={tutorial.brandId}
              onChange={handleInputChange}
              name="brandId"
            />
          </div>

          <div className="form-group">
            <label htmlFor="categoryId">categoryId</label>
            <input
              type="text"
              className="form-control"
              id="categoryId"
              required
              value={tutorial.categoryId}
              onChange={handleInputChange}
              name="categoryId"
            />
          </div>

          <div className="form-group">
            <label htmlFor="modelYear">modelYear</label>
            <input
              type="text"
              className="form-control"
              id="modelYear"
              required
              value={tutorial.modelYear}
              onChange={handleInputChange}
              name="modelYear"
            />
          </div>

          <div className="form-group">
            <label htmlFor="listPrice">listPrice</label>
            <input
              type="text"
              className="form-control"
              id="listPrice"
              required
              value={tutorial.listPrice}
              onChange={handleInputChange}
              name="listPrice"
            />
          </div>

          <button onClick={saveTutorial} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTutorial;