import axios from "axios";

const API_BASE_URL = "http://abdulkareem3.pythonanywhere.com/";

export const Axios = axios.create({
  baseURL: API_BASE_URL,
});
