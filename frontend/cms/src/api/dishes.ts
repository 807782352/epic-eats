import axios from "axios";

const rootUrl = import.meta.env.VITE_API_BASE_URL;

export const getDishes = async () => {
  console.log("Request: " + rootUrl + "/api/v1/dish");
  const response = await axios.get(`${rootUrl}/api/v1/dish`);
  console.log("Response: " + response.data);
  return response.data;
};

export const getDishById = async (id) => {
  console.log("Request: " + `${rootUrl}/api/v1/dish/${id}`);
  const response = await axios.get(`${rootUrl}/api/v1/dish/${id}`);
  console.log("Response: " + response.data);
  return response.data;
};

export const getDishesByCategoryId = async (categoryId) => {
  console.log("Request: " + `${rootUrl}/api/v1/dish/categoryId/${categoryId}`);
  const response = await axios.get(
    `${rootUrl}/api/v1/dish/categoryId/${categoryId}`
  );
  console.log("Response: " + response.data);
  return response.data;
};

export const updateDishById = async (id, data) => {
  console.log("Request: " + `${rootUrl}/api/v1/dish/${id}`);
  const response = await axios.put(`${rootUrl}/api/v1/dish/${id}`, data);
  console.log("Response: " + response.data.data);
  return response.data;
};

export const addDish = async (data) => {
  console.log("Request: " + `${rootUrl}/api/v1/dish`);
  const response = await axios.post(`${rootUrl}/api/v1/dish`, data);
  console.log("Response: " + response.data.data);
  return response.data;
};

export const changeDishStatusById = async (id) => {
  console.log("Request: " + `${rootUrl}/api/v1/dish/${id}`);
  const response = await axios.patch(`${rootUrl}/api/v1/dish/${id}`);
  console.log("Response: " + response.data.data);
  return response.data;
};

export const changeDishDeleteById = async (id) => {
  console.log("Request: " + `${rootUrl}/api/v1/dish/${id}`);
  const response = await axios.delete(`${rootUrl}/api/v1/dish/${id}`);
  console.log("Response: " + response.data.data);
  return response.data;
};
