import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

const Api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json;charset=UTF-8",
    },
});

// before request is sent
Api.interceptors.request.use(
    (config) => {
        // Do something before request is sent
        // print the url
        console.log(`Request URL: ${config.url}`);
        return config;
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error);
    }
);

export default Api;
