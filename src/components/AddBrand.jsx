import React, { useState } from "react";
import TutorialDataService from "../services/TutorialsService";

const AddBrand = () => {
  const initialBrandState = {
    brandId: null,
    brandName: "",
    published: false
  };
  const [brand, setBrand] = useState(initialBrandState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setBrand({ ...brand, [name]: value });
  };

  const saveBrand = () => {
    var data = {
      brandId: brand.brandId,
      brandName: brand.brandName
    };

    BrandDataService.create(data)
      .then(response => {
        setBrand({
          brandId: response.data.brandId,
          brandName: response.data.brandName,
          published: true
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newBrand = () => {
    setBrand(initialBrandState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>Adicionada com sucesso!</h4>
          <button className="btn btn-success" onClick={newBrand}>
            Adicionar
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="brandId">ID da marca</label>
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
            <label htmlFor="brandName">Nome da marca</label>
            <input
              type="text"
              className="form-control"
              id="brandName"
              required
              value={brand.brandName}
              onChange={handleInputChange}
              name="brandName"
            />
          </div>

          <button onClick={saveBrand} className="btn btn-success">
            Adicionar
          </button>
        </div>
      )}
    </div>
  );
};

export default AddBrand;