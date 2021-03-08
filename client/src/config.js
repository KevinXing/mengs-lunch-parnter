const dev_dbServerUrl = "http://localhost:3002";
const prod_dbServerUrl = "http://192.168.0.176:3002";

export const dbServerUrl =
  process.env.NODE_ENV === "development" ? dev_dbServerUrl : prod_dbServerUrl;
