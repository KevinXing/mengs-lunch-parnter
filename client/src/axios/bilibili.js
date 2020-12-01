import axios from "axios";

const bilibili = axios.create({
  baseURL: "http://192.168.0.176:3001/fetch/https://api.bilibili.com/x",
});

export default bilibili;
