import axios, { AxiosInstance } from "axios";
import setupInterceptorsTo from "../http/Interceptors";
import { Car } from "../types/Car";
import { User } from "../types/User";

class UserService {
    CreateCar(car: Car) {
        throw new Error("Method not implemented.");
    }
    /***
     *  Экземпляр axios с необходимиыми настройками.
     */
    instance: AxiosInstance = axios.create({
        baseURL: 'https://localhost:7191',
        withCredentials: true, // Разрешить передачу куки
    });

    /***
     *  Конструктор, устанавливающий интерцепторы.
     */
    constructor() {
        this.instance = setupInterceptorsTo(this.instance);
    }

    /***
     * Получает список пользователей для админ-панели
     */
    public async GetUsers(): Promise<User[]> {
        return (await this.instance.get<User[]>("/api/user/read")).data;
    }

    /***
     * Обновляет пользователя
     */
    public async UpdateUser(user: User): Promise<boolean> {
        return (await this.instance.put<User>("/api/user/update", { user }))
            .status === 200;
    }

    /***
     * Удаляет пользователя
     */
    public async DeleteUser(user: User): Promise<boolean> {
        return (await this.instance.delete<User>("/api/user/delete", { data: { user } }))
            .status === 200;
    }
}

const _instance = new UserService();
export default _instance as UserService;