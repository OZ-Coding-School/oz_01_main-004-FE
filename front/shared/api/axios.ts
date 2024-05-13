import axios from "axios"

export const instance = axios.create({
  baseURL: process.env.VITE_API_URL,
  timeout: 40000,
  withCredentials: true,
})
