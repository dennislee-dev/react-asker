import axios from "axios";


const baseURL = process.env.REACT_APP_API_URL;
const timeout = 60000;

export const http = axios.create({
  baseURL,
  timeout,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  }
});
