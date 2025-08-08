import axios from "axios";

const BASE_URL = "https://personal-portifolio-backend.onrender.com/api"

const api = axios.create({
    baseURL : BASE_URL
});

export default api
