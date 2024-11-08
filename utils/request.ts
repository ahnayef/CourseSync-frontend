// DO NOT MODIFY THIS FILE, if it's really necessary, contact @AHNayef first. Or just create an issue. Thanks!

import axios, { AxiosResponse } from 'axios';

const api = process.env.EXPO_PUBLIC_API_URL;

type RequestData = Record<string, any>;

// Use like this:   getUser: (userId: string) => request.get(`/users/${userId}`),
const getRequest = async (endpoint: string): Promise<AxiosResponse<any>> => {
  const response = await axios.get(`${api}${endpoint}`);
  return response.data;
};

// Use like this: login: (data: any) => request.post('/auth/login', data),
const postRequest = async (endpoint: string, data: RequestData): Promise<AxiosResponse<any>> => {
  const response = await axios.post(`${api}${endpoint}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Use like this: updateUser: (userId: string, data: any) => request.put(`/users/${userId}`, data),
const putRequest = async (endpoint: string, data: RequestData): Promise<AxiosResponse<any>> => {
  const response = await axios.put(`${api}${endpoint}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Use like this: deleteUser: (userId: string) => request.delete(`/users/${userId}`),
const deleteRequest = async (endpoint: string): Promise<AxiosResponse<any>> => {
  const response = await axios.delete(`${api}${endpoint}`);
  return response.data;
};

export const request = {
  get: getRequest,
  post: postRequest,
  put: putRequest,
  delete: deleteRequest,
};