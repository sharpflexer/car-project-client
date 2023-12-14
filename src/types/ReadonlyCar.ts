import { Car } from "./Car";

class ReadonlyCar {
    id: number;
    brand: string;
    model: string;
    color: string;
    price: number;

    constructor(car: Car){
        this.id = car.id;
        this.brand = car.brand.name;
        this.model = car.model.name;
        this.color = car.color.name;
        this.price = car.price;
    }
}

export default ReadonlyCar;