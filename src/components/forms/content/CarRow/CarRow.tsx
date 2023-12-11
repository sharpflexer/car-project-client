import { Car } from "../../../../types/Car";
import classes from "./CarRow.module.css";

function CarRow({ car }: { car: Car }) {
    return (
        <div className={classes.row}>
            <div>
                {car.id}
            </div>
            <div>
                {car.brand.name}
            </div>
            <div>
                {car.model.name}
            </div>
            <div>
                {car.color.name}
            </div>
            <div>
                {car.price}
            </div>
        </div>
    );
}

export default CarRow;