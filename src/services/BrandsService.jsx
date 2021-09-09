import http from "../http-common";

const getAll = () => {
  return http.get("/brand");
};

const get = id => {
  return http.get(`/brand/${id}`);
};

const create = data => {
  return http.post("/brand", data);
};

const update = (id, data) => {
  return http.put(`/brand/${id}`, data);
};

const remove = id => {
  return http.delete(`/brand/${id}`);
};

const removeAll = () => {
  return http.delete(`/brand`);
};

const findByTitle = title => {
  return http.get(`/brand/search?title=${title}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};