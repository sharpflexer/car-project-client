import { makeAutoObservable } from "mobx";
import { Car } from "../types/Car";
import CarService from "../services/CarService";


export default class CarStore {
    cars: Car[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    async createCar(car: Car): Promise<void> {
        if (car = await CarService.CreateCar(car)) {
            this.cars = [...this.cars, car];
        }
        else {
            alert("Не удалось добавить автомобиль.");
        }
    }

    async readCars(): Promise<void> {
        this.cars =  await CarService.GetFullCars();
        console.log(this.cars);
    }

    async updateCar(car: Car): Promise<void> {
        if (await CarService.UpdateCar(car)) {
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
        if (await CarService.DeleteCar(car)) {
            const filteredCars = this.cars.filter((value) => value.id !== car.id);
            this.cars = filteredCars;
        }
        else {
            alert("Не удалось удалить автомобиль.");
        }
    }
}