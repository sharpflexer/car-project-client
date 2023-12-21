import axios, { AxiosInstance, AxiosResponse } from "axios";
import setupInterceptorsTo from "../http/Interceptors";
import { Car } from "../types/Car";
import ReadonlyCar from "../types/ReadonlyCar";


class CarService {
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
     * Получает список автомобилей для каталога
     */
    public async GetCars(): Promise<ReadonlyCar[]> {
        const result = (await this.instance.get<Car[]>("/api/car/read")).data;

        return result.map<ReadonlyCar>(car => new ReadonlyCar(car));
    }

    /***
     * Получает список автомобилей для админ-панели
     */
    public async GetFullCars(): Promise<Car[]> {
        return (await this.instance.get<Car[]>("/api/car/read")).data;
    }

    /***
     * Создает автомобиль
     */
    public async CreateCar(car: Car): Promise<boolean> {
        return (await this.instance.post<Car>("/api/car/create", { car }))
            .status === 200;
    }

    /***
     * Обновляет автомобиль
     */
    public async UpdateCar(car: Car): Promise<boolean> {
        return (await this.instance.put<Car>("/api/car/update", { car }))
            .status === 200;
    }

    /***
     * Удаляет автомобиль
     */
    public async DeleteCar(car: Car): Promise<boolean> {
        return (await this.instance.delete<Car>("/api/car/delete", { data: { car } }))
            .status === 200;
    }
}

const _instance = new CarService();
export default _instance as CarService;