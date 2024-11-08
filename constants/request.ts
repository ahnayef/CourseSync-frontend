// DO NOT MODIFY THIS FILE, if it's really necessary, contact @AHNayef first. Or just create an issue. Thanks!

import axios, { AxiosResponse } from 'axios';
import { ToastAndroid } from 'react-native';

const api = `${process.env.EXPO_PUBLIC_API_URL}/api`;

type RequestData = Record<string, any>;

const getRequest = async (endpoint: string): Promise<AxiosResponse<any>> => {
  const response = await axios.get(`${api}${endpoint}`)
    .then((response) => response.data)
    .catch((error) => {
      toastError(error.message);
      throw error;
    });
  return response;
};

const postRequest = async (endpoint: string, data: RequestData): Promise<AxiosResponse<any>> => {
  console.log(`${api}${endpoint}`, data);
  const response = await axios.post(`${api}${endpoint}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.data).catch((error) => {
    toastError(error.response.data);
    console.log(error.response.data);
  });
  return response;
};

const putRequest = async (endpoint: string, data: RequestData): Promise<AxiosResponse<any>> => {
  const response = await axios.put(`${api}${endpoint}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.data)
    .catch((error) => {
      toastError(error.message);
      throw error;
    });
  return response;
};

const deleteRequest = async (endpoint: string): Promise<AxiosResponse<any>> => {
  const response = await axios.delete(`${api}${endpoint}`)
    .then((response) => response.data)
    .catch((error) => {
      toastError(error.message);
      throw error;
    });
  return response;
};

export const request = {
  get: getRequest,
  post: postRequest,
  put: putRequest,
  delete: deleteRequest,
};

function toastError(message: string) {
  ToastAndroid.showWithGravity(
    message,
    ToastAndroid.LONG,
    ToastAndroid.CENTER
  );
}