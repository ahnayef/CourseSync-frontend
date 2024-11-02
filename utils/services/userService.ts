import { request } from "@/constants/request";

export const userServices = {
  login: (data: any) => request.post("/auth/login", data),
  register: (data: any) => request.post("/auth/register", data),
};
