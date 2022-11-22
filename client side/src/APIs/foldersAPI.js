import axios from "../utils/axiosInstance";

export const getFolders = async (parentId) => {
  const response = await axios.get(`/folders/${parentId}`);
  return response.data;
};

export const createFolder = async (data) => {
  const response = await axios.post(`/folders`, data);
  return response.data;
};

export const deleteFolder = async (folderId) => {
  const response = await axios.delete(`/folders/${folderId}`);
  return response.data;
};
