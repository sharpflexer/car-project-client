import axios, { AxiosInstance } from "axios";
import { axiosConfig } from "./instance";
import setupInterceptorsTo from "../http/Interceptors";
import { Car } from "../types/Car";
import CarProperties from "../types/CarProperties";
import ReadonlyCar from "../types/ReadonlyCar";


class CarService {
    /***
    *  Экземпляр axios с необходимиыми настройками.
    */
    instance: AxiosInstance = axios.create(axiosConfig);

    /***
     *  Конструктор, устанавливающий интерцепторы.
     */
    constructor() {
        this.instance = setupInterceptorsTo(this.instance);
    }

    /***
     * Получает список автомобилей для каталога.
     */
    public async GetCars(): Promise<ReadonlyCar[]> {
        const result = (await this.instance.get<Car[]>("/api/car/read")).data;

        return result.map<ReadonlyCar>(car => new ReadonlyCar(car));
    }

    /***
     * Получает список автомобилей для админ-панели.
     */
    public async GetFullCars(): Promise<Car[]> {
        return (await this.instance.get<Car[]>("/api/car/read")).data;
    }

    /***
     * Создает автомобиль.
     */
    public async CreateCar(car: Car): Promise<Car> {
        return (await this.instance.post<Car>("/api/car/create", car)).data;
    }

    /***
     * Обновляет автомобиль.
     */
    public async UpdateCar(car: Car): Promise<boolean> {
        return (await this.instance.put<Car>("/api/car/update", car))
            .status === 200;
    }

    /***
     * Удаляет автомобиль.
     */
    public async DeleteCar(car: Car): Promise<boolean> {
        return (await this.instance.delete<Car>("/api/car/delete", { data: car }))
            .status === 200;
    }

    /***
     * Получает список свойств автомобилей.
     */
    public async ReadProperties(): Promise<CarProperties> {
        return (await this.instance.get<CarProperties>("/api/car/read_properties")).data;
    }
}

const _instance = new CarService();
export default _instance as CarService;