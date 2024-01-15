import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

export const axiosConfig: CreateAxiosDefaults<any | undefined> = {
    baseURL: 'https://localhost:7191',
    withCredentials: true, // Разрешить передачу куки
}