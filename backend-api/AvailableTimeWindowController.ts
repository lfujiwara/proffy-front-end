import axios, { AxiosInstance } from "axios";
import { useContext } from "react";
import AuthContext, { isAuthenticated } from "../contexts/AuthContext";
import IAvailableTimeWindow from "../models/IAvailableTimeWindow";

const API_URL = "http://localhost:5000";

export default function useAvailableTimeWindowController() {
  const contextAuthData = useContext(AuthContext);

  const getAxiosInstance = async (): Promise<AxiosInstance> => {
    return axios.create({
      baseURL: `${API_URL}/available-time-windows`,
      headers: {
        Authorization: `Bearer ${await contextAuthData.getAccessToken()}`,
        "Content-Type": "application/json",
      },
    });
  };

  return {
    isAuthenticated: isAuthenticated(contextAuthData),
    async list(): Promise<IAvailableTimeWindow[]> {
      const localAxios = await getAxiosInstance();
      return localAxios
        .get("")
        .then((response): IAvailableTimeWindow[] => response.data);
    },
    async delete(weekDay: number) {
      const localAxios = await getAxiosInstance();
      return localAxios.delete("", { params: { weekDay } }).then(() => {});
    },
    async set(weekDay: number, startHour: number, endHour: number) {
      const localAxios = await getAxiosInstance();
      return localAxios
        .put("", { weekDay, startHour, endHour })
        .then((response): IAvailableTimeWindow => response.data);
    },
  };
}
