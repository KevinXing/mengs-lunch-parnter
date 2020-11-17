import axios from "axios";

const bilibili = axios.create({
  baseURL: "https://thingproxy.freeboard.io/fetch/https://api.bilibili.com/x",
});

export default bilibili;
