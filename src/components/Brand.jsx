import React, { useState, useEffect } from "react";
import BrandDataService from "../services/BrandsService";

const Brand = props => {
  const initialBrandState = {
    brandId: null,
    brandName: "",
    published: false
  };
  const [currentBrand, setCurrentBrand] = useState(initialBrandState);
  const [message, setMessage] = useState("");

  const getBrand = id => {
    BrandDataService.get(id)
      .then(response => {
        setCurrentBrand(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getBrand(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentBrand({ ...currentBrand, [name]: value });
  };

  const updatePublished = status => {
    var data = {
      brandId: currentBrand.brandId,
      brandName: currentBrand.brandName,
      published: status
    };

    BrandDataService.update(currentBrand.id, data)
      .then(response => {
        setCurrentBrand({ ...currentBrand, published: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateBrand = () => {
    BrandDataService.update(currentBrand.brandId, currentBrand)
      .then(response => {
        console.log(response.data);
        setMessage("Marca editada com sucesso!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteBrand = () => {
    BrandDataService.remove(currentBrand.brandId)
      .then(response => {
        console.log(response.data);
        props.history.push("/brands");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentBrand ? (
        <div className="edit-form">
          <h4>MARCAS</h4>
          <form>
            <div className="form-group">
              <label htmlFor="brandId">ID da marca</label>
              <input
                type="text"
                className="form-control"
                id="brandId"
                name="brandId"
                value={currentBrand.brandId}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="brandName">Nome da marca</label>
              <input
                type="text"
                className="form-control"
                id="brandName"
                name="brandName"
                value={currentBrand.brandName}
                onChange={handleInputChange}
              />
            </div>

          </form>

          {currentBrand.published ? (
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

          <button className="badge badge-danger mr-2" onClick={deleteBrand}>
            Apagar
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateBrand}
          >
            Editar
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Clique em uma marca...</p>
        </div>
      )}
    </div>
  );
};

export default Brand;