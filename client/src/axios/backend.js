import axios from "axios";
import { getSubnet, dbServerUrl } from "../config";

export function getProxyURL() {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3001";
  }
  if (getSubnet() === "vpn") {
    return "http://100.107.227.112:3001";
  }
  return "http://192.168.0.176:3001";
}

const backend = axios.create({
  baseURL: dbServerUrl(),
});

export default backend;
