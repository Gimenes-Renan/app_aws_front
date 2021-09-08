import http from "../http-common";

const getAll = () => {
  return http.get("/category");
};

const get = id => {
  return http.get(`/category/${id}`);
};

const create = data => {
  return http.post("/category", data);
};

const update = (id, data) => {
  return http.put(`/category/${id}`, data);
};

const remove = id => {
  return http.delete(`/category/${id}`);
};

const removeAll = () => {
  return http.delete(`/category`);
};

const findByTitle = title => {
  return http.get(`/category/search?title=${title}`);
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