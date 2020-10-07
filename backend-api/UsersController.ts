import axios, { AxiosInstance } from "axios";
import { useContext } from "react";
import AuthContext, { isAuthenticated } from "../contexts/AuthContext";
import IAuthenticatedUserData from "../models/IAuthenticatedUserData";

export function useUsersController() {
  const contextAuthData = useContext(AuthContext);

  const getAxiosInstance = async (): Promise<AxiosInstance> => {
    return axios.create({
      baseURL: "http://localhost:5000/users",
      headers: {
        Authorization: `Bearer ${await contextAuthData.getAccessToken()}`,
        "Content-Type": "application/json",
      },
    });
  };

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
  };
}
