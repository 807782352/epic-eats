import axios from "axios";

const rootUrl = import.meta.env.VITE_API_BASE_URL;

export const getDishesByCategoryId = async (categoryId) => {
  try {
    const requestUrl = `${rootUrl}/api/v1/dish/categoryId/${categoryId}`;
    console.log("Request URL: " + requestUrl);
    
    const response = await axios.get(requestUrl);
    
    console.log("Response Data:", response.data);
    
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    
    // Optional: return an empty array or a specific error response
    return [];
  }
};
