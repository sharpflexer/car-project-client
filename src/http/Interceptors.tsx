import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { redirect, redirectDocument } from 'react-router-dom';
import { Error } from '../types/Error';

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
 * Обрабатывает 503 и делает редирект на страницу технических работ.
 */
const onResponseError = async (error: AxiosError<Error>): Promise<AxiosError | Response> => {
    const originalRequest = error.config;
    if(originalRequest?.headers._isRetry){
        redirectDocument("/authorize");
    }
    if (error.response?.data.statusCode === "401" && originalRequest && !originalRequest.headers._isRetry) {
        originalRequest.headers._isRetry = true;
        try {
            const response = await axios.get("/api/auth/refresh");
            localStorage.setItem('access_token', response.data);

            return axios.request(originalRequest);
        } catch (e) {
            console.log(`[refresh error] [${JSON.stringify(error)}]`)
        }
    }
    if(error.response?.data.statusCode === "503"){
        return redirect("/technicalWork");
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