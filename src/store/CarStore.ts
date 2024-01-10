import { makeAutoObservable } from "mobx";
import { Car } from "../types/Car";
import CarService from "../services/CarService";

class CarStore {
    cars: Car[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    async createCar(car: Car): Promise<void> {
        car = await CarService.CreateCar(car);

        if (car) {
            this.cars = [...this.cars, car];
        }
        else {
            alert("Не удалось добавить автомобиль.");
        }
    }

    async readFullCars(): Promise<void> {
        this.cars =  await CarService.GetFullCars();
    }

    async updateCar(car: Car): Promise<void> {
        const isUpdated = await CarService.UpdateCar(car);
        if (isUpdated) {
            const index = this.cars.findIndex(c => c.id === car.id);
            const updatedCars = this.cars.filter((value) => value.id !== car.id);
            updatedCars.splice(index, 0, car);
            this.cars = updatedCars;
        }
        else {
            alert("Не удалось обновить автомобиль.");
        }
    }

    async deleteCar(car: Car): Promise<void> {
        const isDeleted = await CarService.DeleteCar(car);
        if (isDeleted) {
            const filteredCars = this.cars.filter((value) => value.id !== car.id);
            this.cars = filteredCars;
        }
        else {
            alert("Не удалось удалить автомобиль.");
        }
    }
}

const _instance = new CarStore();
export default _instance as CarStore;