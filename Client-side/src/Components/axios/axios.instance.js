import Cookies from "js-cookie";
import axios from "axios";
export const baseUrl = "https://server.dynamicskillbase.com/api/";
// export const baseUrl = "http://localhost:4001/api/";
export const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "x-access-token": Cookies.get("accessToken"),
  },
});

export const apiUpload = axios.create({
  baseURL: baseUrl,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "x-access-token": Cookies.get("accessToken"),
  },
});
