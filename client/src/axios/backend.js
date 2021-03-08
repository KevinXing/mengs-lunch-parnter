import axios from "axios";
import { dbServerUrl } from "../config";

const backend = axios.create({
  baseURL: dbServerUrl,
});

export default backend;
