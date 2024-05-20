import axios from "axios";

const rootUrl = import.meta.env.VITE_API_BASE_URL;

export const getStaffs = async () => {
  console.log(`Requesting: ${rootUrl}/api/v1/staff`);
  const response = await axios.get(`${rootUrl}/api/v1/staff`);
  console.log("Response:", response);
  return response.data.data;
};

export const getStaffById = async (id) => {
  return await axios.get(`${rootUrl}/api/v1/staff/${id}`);
};

export const patchStaffActivateById = async (id) => {
  return await axios.patch(`${rootUrl}/api/v1/staff/${id}`);
};