import axios from "axios";

export const api = axios.create({
  baseURL: "https://onlinegiftbackend.onrender.com/api",
});