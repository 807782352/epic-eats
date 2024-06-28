import axios from "axios";

const rootUrl = import.meta.env.VITE_API_BASE_URL;

export const getOrders = async () => {
  console.log("Request: " + rootUrl + "/api/v1/order");
  const response = await axios.get(`${rootUrl}/api/v1/order`);
  console.log("Response: " + response.data);
  return response.data;
};

export const getOrderById = async (id) => {
  console.log("Request: " + `${rootUrl}/api/v1/order/${id}`);
  const response = await axios.get(`${rootUrl}/api/v1/order/${id}`);
  console.log("Response: " + response.data);
  return response.data;
};

export const getOrderItemsById = async (orderId) => {
    console.log("Request: " + `${rootUrl}/api/v1/order/item/${orderId}`);
    const response = await axios.get(`${rootUrl}/api/v1/order/item/${orderId}`);
    console.log("Response: " + response.data);
    return response.data;
  };

export const updateOrderStatusById = async (id) => {
  console.log("Request: " + `${rootUrl}/api/v1/order/${id}`);
  const response = await axios.put(`${rootUrl}/api/v1/order/${id}`);
  console.log("Response: " + response.data);
  return response.data;
};

export const addOrder = async (data) => {
  console.log("Request: " + `${rootUrl}/api/v1/order`);
  const response = await axios.post(`${rootUrl}/api/v1/order`, data);
  console.log("Response: " + response.data);
  return response.data;
};

export const updateOrderItemById = async (orderItemId) => {
  console.log("Request: " + `${rootUrl}/api/v1/order/item/${orderItemId}`);
  const response = await axios.patch(`${rootUrl}/api/v1/order/item/${orderItemId}`);
  console.log("Response: " + response.data);
  return response.data;
};

export const deleteOrderById = async (id) => { // archive
  console.log("Request: " + `${rootUrl}/api/v1/order/${id}`);
  const response = await axios.delete(`${rootUrl}/api/v1/order/${id}`);
  console.log("Response: " + response.data);
  return response.data;
};
