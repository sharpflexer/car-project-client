import { makeAutoObservable } from "mobx";
import ReadonlyCar from "../types/ReadonlyCar";

export default class CartStore{
    cars: ReadonlyCar[] = [];

    constructor(){
        makeAutoObservable(this);
    }

    addToCart(car: ReadonlyCar): void {
        this.cars.push(car); 
    }

    removeFromCart(car: ReadonlyCar): void{
                    const index = this.cars.findIndex(c => c.id === car.id);
                this.cars.splice(index, 1);
    }

    getCountOf(car: ReadonlyCar): number{
        return this.cars.filter(c => c.id === car.id).length;
    }

    getTotalPrice(): number{
        return this.cars.reduce((prev, cur) => prev + cur.price, 0);
    }

    clearCart(car: ReadonlyCar): void {
        if(this.cars.includes(car))
        this.cars = this.cars.filter(c => c.id !== car.id);
    }

}