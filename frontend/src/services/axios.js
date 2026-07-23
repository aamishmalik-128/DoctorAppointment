import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response &&
            error.response.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url?.includes("/auth/login") &&
            !originalRequest.url?.includes("/auth/refresh-token")
        ) {
            originalRequest._retry = true;

            try {
                const refreshResponse = await axios.post(
                    "http://localhost:5000/api/auth/refresh-token",
                    {},
                    { withCredentials: true }
                );

                const newAccessToken = refreshResponse.data.accessToken;
                if (newAccessToken) {
                    localStorage.setItem("accessToken", newAccessToken);
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return api(originalRequest);
                }
            } catch (refreshError) {
                localStorage.removeItem("accessToken");
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;