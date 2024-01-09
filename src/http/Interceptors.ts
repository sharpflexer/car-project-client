import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';

/***
 * Подкидывает JWT-токен в заголовок авторизации запроса.
 */
const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = "Bearer " + token;
        console.info(`[request] [${JSON.stringify(config)}]`);
    }
    return config;
}

/***
 * Обрабатывает 401 и пытается обновить токен в случае получения такой ошибки.
 */
const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && originalRequest && !originalRequest.headers._isRetry) {
        originalRequest.headers._isRetry = true;
        try {
            const response = await axios.get("/api/auth/refresh");
            localStorage.setItem('access_token', response.data);

            return axios.request(originalRequest);
        } catch (e) {
            console.log(`[refresh error] [${JSON.stringify(error)}]`)
        }
    }
    else {
        console.error(`[response error] [${JSON.stringify(error)}]`);
    }

    return Promise.reject(error);
}

export function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
    axiosInstance.interceptors.request.use((config) => onRequest(config));
    axiosInstance.interceptors.response.use((response) => response, (error) => onResponseError(error));
    return axiosInstance;
}

export default setupInterceptorsTo;