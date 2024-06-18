import axios from "axios";

const rootUrl = import.meta.env.VITE_API_BASE_URL;

export const getCategories = async () => {
  console.log("Request: " + rootUrl + "/api/v1/category");
  const response = await axios.get(`${rootUrl}/api/v1/category`);
  console.log("Response: " + response.data);
  return response.data;
};

export const getCategoryById = async (id) => {
  console.log("Request: " + `${rootUrl}/api/v1/category/${id}`);
  const response = await axios.get(`${rootUrl}/api/v1/category/${id}`);
  console.log("Response: " + response.data);
  return response.data;
};

export const updateCategoryById = async (id, data) => {
  console.log("Request: " + `${rootUrl}/api/v1/category/${id}`);
  const response = await axios.put(`${rootUrl}/api/v1/category/${id}`, data);
  console.log("Response: " + response.data);
  return response.data;
};

export const addCategory = async (data) => {
  console.log("Request: " + `${rootUrl}/api/v1/category`);
  const response = await axios.post(`${rootUrl}/api/v1/category`, data);
  console.log("Response: " + response.data);
  return response.data;
};

export const deleteCategoryById = async (id) => {
  console.log("Request: " + `${rootUrl}/api/v1/category/${id}`);
  const response = await axios.delete(`${rootUrl}/api/v1/category/${id}`);
  console.log("Response: " + response.data);
  return response.data;
};
