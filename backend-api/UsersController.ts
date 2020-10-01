import axios, { AxiosInstance } from "axios";
import { useContext, useEffect, useState } from "react";
import AuthContext, {
  AuthContextDefaultValue,
  IAuthContextValue,
  isAuthenticated,
} from "../contexts/AuthContext";
import IAuthenticatedUserData from "../models/IAuthenticatedUserData";

export function useUsersController() {
  const contextAuthData = useContext(AuthContext);
  const [authData, setAuthData] = useState<IAuthContextValue>(
    AuthContextDefaultValue
  );

  useEffect(() => {
    setAuthData(contextAuthData);
  }, [contextAuthData]);

  const getAxiosInstance = (): AxiosInstance => {
    return axios.create({
      baseURL: "http://localhost:5000/users",
      headers: {
        Authorization: `Bearer ${authData.accessToken}`,
        "Content-Type": "application/json",
      },
    });
  };

  return {
    isAuthenticated: isAuthenticated(authData),
    async me(): Promise<IAuthenticatedUserData> {
      return await getAxiosInstance()
        .get("/me")
        .then((response): IAuthenticatedUserData => response.data);
    },
  };
}
