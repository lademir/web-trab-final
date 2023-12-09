import Axios from "axios";

const baseURL = "http://localhost:9999";

export const api = Axios.create({ baseURL });
