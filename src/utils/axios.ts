import Axios, { AxiosHeaders, AxiosRequestConfig } from "axios";
import { config } from "process";

export const baseURL = "http://20.251.27.176:8083";
const axios = Axios.create({ baseURL: baseURL });
axios.defaults.headers.common["API-KEY"] = "secret-api-key";

export { axios as default };
