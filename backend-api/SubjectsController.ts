import axios, { AxiosInstance } from "axios";
import { useContext } from "react";
import AuthContext, { isAuthenticated } from "../contexts/AuthContext";

export function useSubjectsController() {
  const contextAuthData = useContext(AuthContext);

  const getAxiosInstance = async (): Promise<AxiosInstance> => {
    return axios.create({
      baseURL: "http://localhost:5000/subjects",
      headers: {
        Authorization: `Bearer ${await contextAuthData.getAccessToken()}`,
        "Content-Type": "application/json",
      },
    });
  };

  return {
    isAuthenticated: isAuthenticated(contextAuthData),
    async get(): Promise<string[]> {
      const localAxios = await getAxiosInstance();
      return localAxios.get("").then((response): string[] => response.data);
    },
  };
}
