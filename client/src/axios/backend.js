import axios from "axios";

const backend = axios.create({
  baseURL: "http://localhost:3002",
});

export default backend;
