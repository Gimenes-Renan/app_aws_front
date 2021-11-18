import React, { useState, useEffect } from "react";
import CategoryDataService from "../services/CategoriesService";

const Category = props => {
  const initialCategoryState = {
    categoryId: null,
    categoryName: "",
    published: false
  };
  const [currentCategory, setCurrentCategory] = useState(initialCategoryState);
  const [message, setMessage] = useState("");

  const getCategory = id => {
    CategoryDataService.get(id)
      .then(response => {
        setCurrentCategory(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getCategory(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentCategory({ ...currentCategory, [name]: value });
  };

  const updatePublished = status => {
    var data = {
      categoryId: currentCategory.categoryId,
      categoryName: currentCategory.categoryName,
      published: status
    };

    CategoryDataService.update(currentCategory.categoryId, data)
      .then(response => {
        setCurrentCategory({ ...currentCategory, published: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateCategory = () => {
    CategoryDataService.update(currentCategory.categoryId, currentCategory)
      .then(response => {
        console.log(response.data);
        setMessage("Categoria editada com sucesso!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteCategory = () => {
    CategoryDataService.remove(currentCategory.categoryId)
      .then(response => {
        console.log(response.data);
        props.history.push("/categories");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentCategory ? (
        <div className="edit-form">
          <h4>CATEGORIAS</h4>
          <form>
            <div className="form-group">
              <label htmlFor="categoryId">ID da categoria</label>
              <input
                type="text"
                className="form-control"
                id="categoryId"
                name="categoryId"
                value={currentCategory.categoryId}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="categoryName">Nome da categoria</label>
              <input
                type="text"
                className="form-control"
                id="categoryName"
                name="categoryName"
                value={currentCategory.categoryName}
                onChange={handleInputChange}
              />
            </div>
          </form>

          {/* {currentCategory.published ? (
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
          )} */}

          <button className="badge badge-danger mr-2" onClick={deleteCategory}>
            Apagar
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateCategory}
          >
            Editar
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Clique em uma categoria...</p>
        </div>
      )}
    </div>
  );
};

export default Category;