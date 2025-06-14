import { JoinReq } from "../pages/join/Join";
import { LoginProps } from "../pages/login/Login";
import { api } from "./https";

export const login = async (data: LoginProps) => {
  const response = await api.post<{ accessToken: string }>("/signin", {
    ...data,
  });
  return response;
};
export const join = async (data: JoinReq) => {
  const response = await api.post<string>(`/signup`, { ...data });
  return response.data;
};

export const checkId = async (id: string) => {
  try {
    const response = await api.post(`/check/id?id=${id}`);
    return response;
  } catch {
    throw new Error("이미 사용 중인 아이디입니다.");
  }
};
