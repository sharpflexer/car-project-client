import { makeAutoObservable } from "mobx";
import { Car } from "../types/Car";
import CarService from "../services/CarService";


export default class CarStore {
    cars: Car[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    async createCar(car: Car): Promise<void> {
        if (await CarService.CreateCar(car)) {
            this.cars.push(car);
        }
        else {
            alert("Не удалось добавить автомобиль.");
        }
    }

    async readCars(): Promise<Car[]> {
        return await CarService.GetFullCars();
    }

    async updateCar(car: Car): Promise<void> {
        if (await CarService.UpdateCar(car)) {
            this.cars.forEach((value) => value.id === car.id ? car : value);
        }
        else {
            alert("Не удалось обновить автомобиль.");
        }
    }

    async deleteCar(car: Car): Promise<void> {
        if (await CarService.DeleteCar(car)) {
            const index = this.cars.findIndex(c => c.id === car.id);
            this.cars.splice(index, 1);
        }
        else {
            alert("Не удалось удалить автомобиль.");
        }
    }
}