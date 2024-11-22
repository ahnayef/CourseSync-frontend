// DO NOT MODIFY THIS FILE, if it's really necessary, contact @AHNayef first. Or just create an issue. Thanks!

import isTokenExpired from '@/constants/checkTokenExpirity';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosResponse } from 'axios';
import { Href, router } from 'expo-router';

const api = `${process.env.EXPO_PUBLIC_API_URL}/api`;

type RequestData = Record<string, any>;

const setAuthToken = async () => {

  if (await isTokenExpired()) {
    await Promise.all([
      AsyncStorage.removeItem("token"),
      AsyncStorage.removeItem("user"),
    ]);
    router.navigate("/" as Href);
    return;
  }

  const token = await AsyncStorage.getItem('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};



// Use like this: getUser: (userId: string) => request.get(`/users/${userId}`),
const getRequest = async (endpoint: string): Promise<AxiosResponse<any>> => {
  await setAuthToken();
  console.log(`${api}${endpoint}`);
  const response = await axios.get(`${api}${endpoint}`);
  return response.data;
};

// Use like this: login: (data: any) => request.post('/auth/login', data),
const postRequest = async (endpoint: string, data: RequestData): Promise<AxiosResponse<any>> => {
  await setAuthToken();
  console.log(`${api}${endpoint}`);
  const response = await axios.post(`${api}${endpoint}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Use like this: updateUser: (userId: string, data: any) => request.put(`/users/${userId}`, data),
const putRequest = async (endpoint: string, data: RequestData): Promise<AxiosResponse<any>> => {
  await setAuthToken();
  console.log(`${api}${endpoint}`);
  const response = await axios.put(`${api}${endpoint}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Use like this: deleteUser: (userId: string) => request.delete(`/users/${userId}`),
const deleteRequest = async (endpoint: string): Promise<AxiosResponse<any>> => {
  await setAuthToken();
  console.log(`${api}${endpoint}`);
  const response = await axios.delete(`${api}${endpoint}`);
  return response.data;
};

export const request = {
  get: getRequest,
  post: postRequest,
  put: putRequest,
  delete: deleteRequest,
};