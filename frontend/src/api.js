// src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://zenreserve-lc.onrender.com/api/auth',
});

export const getUsers = () => API.get('/users');
export const registerUser = (data) => API.post('/register', data);