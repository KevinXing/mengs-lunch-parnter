import axios from "axios";
import { getProxyURL } from "./backend";

const bilibili = axios.create({
  baseURL: getProxyURL() + "/fetch/https://api.bilibili.com/x",
});

export default bilibili;
