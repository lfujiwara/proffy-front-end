import axios from "axios";

const API_URL = "http://localhost:3333";

const anonymousAxiosInstance = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export function useEmailServiceController() {
  return {
    async register(data: any) {
      return anonymousAxiosInstance.post("/register", data);
    },
    async confirm(data: any) {
      return anonymousAxiosInstance.post("/confirm", data);
    },
  };
}
