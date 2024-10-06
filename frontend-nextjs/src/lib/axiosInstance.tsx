import axios, { AxiosError } from "axios";

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
  timeout: 120000,
});

instance.interceptors.request.use(async (request) => {
  console.log("REQUEST => ", JSON.stringify(request, null, 2));
  return request;
});

instance.interceptors.response.use(
  async (response: any) => {
    console.log("RESPONSE => ", JSON.stringify(response, null, 2));

    return response;
  },
  async (error: AxiosError) => {
    if (error.response) {
      console.log("RESPONSE ERROR STATUS => ", error.response.status);
      console.log("RESPONSE ERROR DATA => ", error.response.data);
      return Promise.reject(error.response.data);
    } else if (error.request) {
      console.log("REQUEST ERROR => ", error.request);
    } else {
      console.log("ERROR MESSAGE => ", error.message);
    }
    return Promise.reject(error);
  }
);

export const setHeader = (key: string, value: string) => {
  console.log("SET HEADER => ", key, value);
  instance.defaults.headers.common[key] = value;
};
