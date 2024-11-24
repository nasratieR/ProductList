import axios from 'axios';
import API_BASE_URL from '../config';

export const getProducts = async () => {
  const response = await axios.get(`${API_BASE_URL}/products`);
  return response.data;
};

export const createProduct = async (product) => {
  const response = await axios.post(`${API_BASE_URL}/products`, product);
  return response.data;
};

export const updateProduct = async (id, product) => {
  const response = await axios.put(`${API_BASE_URL}/products/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id) => {
  await axios.delete(`${API_BASE_URL}/products/${id}`);
};
