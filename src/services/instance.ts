import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

export const axiosConfig: CreateAxiosDefaults<any | undefined> = {
    baseURL: 'http://localhost:5118',
    withCredentials: true, // Разрешить передачу куки
}