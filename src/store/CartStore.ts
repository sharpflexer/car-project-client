import { action, makeAutoObservable, observable, observe } from "mobx";
import ReadonlyCar from "../types/ReadonlyCar";

export default class CartStore{
    cars: ReadonlyCar[] = [];

    constructor(){
        makeAutoObservable(this);
    }

    addToCart = (car: ReadonlyCar) => {
        this.cars.push(car); 
    }

    removeFromCart(car: ReadonlyCar){
        this.cars = this.cars.filter(c => c.id === car.id);
    }
}