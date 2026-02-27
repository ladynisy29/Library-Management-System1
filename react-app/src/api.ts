import axios, { type AxiosInstance } from 'axios'

export const apiClient: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
})
