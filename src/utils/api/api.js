import { axiosFormInstance, axiosInstance } from "./axiosInstance";

export const addData = async (endpoint, requestBody) => {
  try {
    const result = await axiosInstance.post(endpoint, requestBody);
    return result.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getData = async (endpoint,requestBody) => {
  try {
    const result = await axiosInstance.get(endpoint);
    return result.data;
  } catch (error) {
    return error.response.data;
  }
};

export const addFormData = async (endpoint, requestBody) => {
  try {
    const result = await axiosFormInstance.post(endpoint,{
      params:
      {
        food_shared_by: requestBody.food_shared_by,
      }
    });
    return result;
  } catch (error) {
    return error;
  }
}

export const updateData = async (endpoint, requestBody) => {
  try {
    const result = await axiosInstance.patch(endpoint, requestBody);
    return result;
  } catch (error) {
    return error;
  }
};

export const updateFormData = async (endpoint, requestBody) => {
  try {
    const result = await axiosFormInstance.patch(endpoint, requestBody);
    return result;
  } catch (error) {
    return error;
  }
};

export const deleteData = async (endpoint) => {
  try {
    const result = await axiosInstance.delete(endpoint);
    return result.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getAllData = async (url) => {
  try {
    let result = await axiosInstance.get(url);
    return result.data;
  } catch (error) {
    return error.response;
  }
};
