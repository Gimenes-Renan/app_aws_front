import axios from "axios";

export default axios.create({
  //baseURL: "http://localhost:5000",
  baseURL: "http://52.200.190.182",
  headers: {
    "Content-type": "application/json"
  }
});