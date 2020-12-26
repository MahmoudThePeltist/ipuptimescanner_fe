import axios from "axios";

const instance = axios.create({
  baseURL: "http://172.16.0.80:3500/api",
});

export default instance;
