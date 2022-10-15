import { axiosFormInstance, axiosInstance } from "./axiosInstance";

export const addData = async (endpoint, requestBody) => {
  try {
    console.log("hheh")
    const result = await axiosInstance.post(endpoint, requestBody);
    console.log(result.data);
    return result;
  } catch (error) {
    console.log(error.status)
    return error.status;
  }
};

export const addFormData = async (endpoint, requestBody) => {
  try {
    const result = await axiosFormInstance.post(endpoint, requestBody);
    return result;
  } catch (error) {
    return error;
  }
};

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
    return result;
  } catch (error) {
    return error;
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
