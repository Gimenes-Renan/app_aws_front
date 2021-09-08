import React, { useState } from "react";
import TutorialDataService from "../services/TutorialsService";

const AddCategory = () => {
  const initialCategoryState = {
    categoryId: null,
    categoryName: "",
    published: false
  };
  const [category, setCategory] = useState(initialCategoryState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCategory({ ...category, [name]: value });
  };

  const saveCategory = () => {
    var data = {
      categoryId: category.categoryId,
      categoryName: category.categoryName
    };

    CategoryDataService.create(data)
      .then(response => {
        setCategory({
          categoryId: response.data.categoryId,
          categoryName: response.data.categoryName,
          published: true
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newCategory = () => {
    setCategory(initialCategoryState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>Adicionada com sucesso!</h4>
          <button className="btn btn-success" onClick={newCategory}>
            Adicionar
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="categoryId">ID da categoria</label>
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
            <label htmlFor="categoryName">Nome da categoria</label>
            <input
              type="text"
              className="form-control"
              id="categoryName"
              required
              value={category.categoryName}
              onChange={handleInputChange}
              name="categoryName"
            />
          </div>

          <button onClick={saveCategory} className="btn btn-success">
            Adicionar
          </button>
        </div>
      )}
    </div>
  );
};

export default AddCategory;