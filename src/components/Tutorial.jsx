import React, { useState, useEffect } from "react";
import TutorialDataService from "../services/TutorialsService";

const Tutorial = props => {
  const initialTutorialState = {
    productId: null,
    productName: "",
    brandId: "",
    categoryId: "",
    modelYear: "",
    listPrice: "",
    published: false
  };
  const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);
  const [message, setMessage] = useState("");

  const getTutorial = id => {
    TutorialDataService.get(id)
      .then(response => {
        setCurrentTutorial(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getTutorial(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentTutorial({ ...currentTutorial, [name]: value });
  };

  const updatePublished = status => {
    var data = {
      productId: currentTutorial.productId,
      productName: currentTutorial.productName,
      brandId: currentTutorial.brandId,
      categoryId: currentTutorial.categoryId,
      modelYear: currentTutorial.modelYear,
      listPrice: currentTutorial.listPrice,
      published: status
    };

    TutorialDataService.update(currentTutorial.id, data)
      .then(response => {
        setCurrentTutorial({ ...currentTutorial, published: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateTutorial = () => {
    TutorialDataService.update(currentTutorial.productId, currentTutorial)
      .then(response => {
        console.log(response.data);
        setMessage("The tutorial was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteTutorial = () => {
    TutorialDataService.remove(currentTutorial.productId)
      .then(response => {
        console.log(response.data);
        props.history.push("/tutorials");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentTutorial ? (
        <div className="edit-form">
          <h4>PRODUTOS</h4>
          <form>
            <div className="form-group">
              <label htmlFor="productId">productId</label>
              <input
                type="text"
                className="form-control"
                id="productId"
                name="productId"
                value={currentTutorial.productId}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="productName">productName</label>
              <input
                type="text"
                className="form-control"
                id="productName"
                name="productName"
                value={currentTutorial.productName}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="brandId">brandId</label>
              <input
                type="text"
                className="form-control"
                id="brandId"
                name="brandId"
                value={currentTutorial.brandId}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="categoryId">categoryId</label>
              <input
                type="text"
                className="form-control"
                id="categoryId"
                name="categoryId"
                value={currentTutorial.categoryId}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="modelYear">modelYear</label>
              <input
                type="text"
                className="form-control"
                id="modelYear"
                name="modelYear"
                value={currentTutorial.modelYear}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="listPrice">listPrice</label>
              <input
                type="text"
                className="form-control"
                id="listPrice"
                name="listPrice"
                value={currentTutorial.listPrice}
                onChange={handleInputChange}
              />
            </div>
          </form>

          {currentTutorial.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteTutorial}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateTutorial}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}
    </div>
  );
};

export default Tutorial;