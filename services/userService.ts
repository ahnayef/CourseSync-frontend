import { request } from "@/utils/request";

export const userServices = {
  login: (data: any) => request.post("/auth/login", data),
  register: (data: any) => request.post("/auth/register", data),
};
