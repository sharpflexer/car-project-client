import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { TokenContext } from '..';
import { useContext } from 'react';

const token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0Y2QxNmIwMC0xNzdiLTQxMGYtOWVlMy03YzdjYzkyN2E0Y2UiLCJpYXQiOiIxNzAxODY3NzM0IiwiQ2FuQ3JlYXRlIjoiVHJ1ZSIsIkNhblJlYWQiOiJUcnVlIiwiQ2FuVXBkYXRlIjoiVHJ1ZSIsIkNhbkRlbGV0ZSI6IlRydWUiLCJDYW5NYW5hZ2VVc2VycyI6IlRydWUiLCJleHAiOjE3MDE4NzM2NzQsImlzcyI6IkNhclByb2plY3RTZXJ2ZXIiLCJhdWQiOiJDYXJQcm9qZWN0Q2xpZW50In0._B8vBzLzEzvcviRPwiXcZoNfsN9ceFbx7XAh4BcMtwQ";

/***
 * Подкидывает JWT-токен в заголовок авторизации запроса.
 */
const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    config.headers.Authorization = "Bearer " + token + "FAIL_STRING"; 

    console.info(`[request] [${JSON.stringify(config)}]`); 
    
    return config;
}

/***
 * Обрабатывает 401 и пытается обновить токен в случае получения такой ошибки.
 */
const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
    const originalRequest = error.config;
    if(error.response?.status === 401 && originalRequest && !originalRequest.headers._isRetry){
        originalRequest.headers._isRetry = true;
        try{
            const response = await axios.get("/api/auth/refresh");
            localStorage.setItem('access_token', response.data);

            return axios.request(originalRequest);
        } catch(e){
            console.log(`[refresh error] [${JSON.stringify(error)}]`)
        }
    }
    else{
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