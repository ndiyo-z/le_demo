import axios from 'axios'

export const baseURL = 'http://localhost:9000';
function buildAPI () {
  const instance = axios.create({
    baseURL,
    withCredentials: false
  })

  return instance;
}

export const api = buildAPI();