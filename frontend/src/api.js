import axios from 'axios';

const API = axios.create({
  baseURL: 'https://stylemaite-api.onrender.com',
});

export default API;