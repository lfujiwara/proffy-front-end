import _axios from "axios";
import jwt from "jwt-decode";
import React from "react";
import IAuthenticatedUserData from "../models/IAuthenticatedUserData";

const API_URL = "http://localhost:5000";
const axios = _axios.create({ withCredentials: true, baseURL: API_URL });

export interface ITokenContextValue {
  accessToken: string | null;
  expires: Date | null;
}

export interface IAuthContextValue extends ITokenContextValue {
  userData: IAuthenticatedUserData | null;
  credentialsLogin: (
    email: string,
    password: string,
    rememberMe: boolean
  ) => Promise<boolean>;
  cookieLogin: () => Promise<boolean>;
  logout: () => Promise<void>;
}

export const AuthContextDefaultValue: IAuthContextValue = {
  accessToken: null,
  userData: null,
  expires: null,
  credentialsLogin: (email: string, password: string, rememberMe: boolean) =>
    new Promise<boolean>(() => false),
  cookieLogin: () => new Promise<boolean>(() => false),
  logout: () => new Promise<void>(() => {}),
};

export async function fetchUserData(
  bearerToken: string
): Promise<IAuthenticatedUserData> {
  return await axios
    .get("/users/me", {
      headers: { Authorization: `Bearer ${bearerToken}` },
      withCredentials: true,
    })
    .then((response) => response.data);
}

export async function credentialsLogin(
  email: string,
  password: string,
  rememberMe: boolean
): Promise<ITokenContextValue> {
  return axios
    .post(
      "/auth/login",
      { email, password, rememberMe },
      { withCredentials: true }
    )
    .then((response) => response.data)
    .then((data) => ({
      accessToken: data.access,
      expires: new Date(jwt(data.access).exp * 1000),
    }));
}

export function isAuthenticated(value: IAuthContextValue): boolean {
  return value.expires !== null && new Date() <= value.expires;
}

export async function cookieLogin(): Promise<ITokenContextValue> {
  return axios
    .post("/auth/access", {}, { withCredentials: true })
    .then((response) => response.data)
    .then((data) => ({
      accessToken: data.token,
      expires: new Date(jwt(data.token).exp * 1000),
    }));
}

export async function logout() {
  await axios.post("/auth/logout");
}

const AuthContext = React.createContext<IAuthContextValue>(
  AuthContextDefaultValue
);
AuthContext.displayName = "AuthContext";

export default AuthContext;
