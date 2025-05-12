import axios from "axios";

const instance = axios.create({
    baseURL : import.meta.env.API_BACKEND,
    withCredentials: true,
});

export default instance;