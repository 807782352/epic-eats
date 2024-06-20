import axios from "axios";

const rootUrl = import.meta.env.VITE_API_BASE_URL;

export const uploadIamge = async (formData) => {
  console.log(`Requesting: ${rootUrl}/upload`);
  const response = await axios.post(`${rootUrl}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log("Response:", response);

  return response.data;
};
