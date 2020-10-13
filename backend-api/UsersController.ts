import axios, { AxiosInstance } from "axios";
import { useContext } from "react";
import AuthContext, { isAuthenticated } from "../contexts/AuthContext";
import IAuthenticatedUserData from "../models/IAuthenticatedUserData";

const API_URL = "http://localhost:5000";

export function useUsersController() {
  const contextAuthData = useContext(AuthContext);

  const getAxiosInstance = async (): Promise<AxiosInstance> => {
    return axios.create({
      baseURL: `${API_URL}/users`,
      headers: {
        Authorization: `Bearer ${await contextAuthData.getAccessToken()}`,
        "Content-Type": "application/json",
      },
    });
  };

  const anonymousAxiosInstance = axios.create({
    baseURL: `${API_URL}/users`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return {
    isAuthenticated: isAuthenticated(contextAuthData),
    async me(): Promise<IAuthenticatedUserData> {
      const localAxios = await getAxiosInstance();
      return localAxios
        .get("/me")
        .then((response): IAuthenticatedUserData => response.data);
    },
    async updateMe(
      data: IAuthenticatedUserData
    ): Promise<IAuthenticatedUserData> {
      const localAxios = await getAxiosInstance();
      return localAxios
        .put("", data)
        .then((response): IAuthenticatedUserData => response.data);
    },
    async validateEmail(email: string) {
      return anonymousAxiosInstance.get("/validate-email", {
        params: { email },
      });
    },
    async validatePhoneNumber(phoneNumber: string) {
      return anonymousAxiosInstance.get("/validate-phone-number", {
        params: { phoneNumber },
      });
    },
  };
}
