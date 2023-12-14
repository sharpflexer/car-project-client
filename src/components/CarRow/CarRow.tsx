import ReadonlyCar from "../../types/ReadonlyCar";
import classes from "./CarRow.module.css";

function CarRow({ car }: { car: ReadonlyCar }) {
    return (
        <div className={classes.card}>
            <div className={classes.items}>
                <div>
                    №{car.id}
                </div>
                <div>
                    {car.brand} {car.model} {car.color}
                </div>
                <div>
                    {car.price} рублей
                </div>
                <button className={classes.cartButton}>
                    В корзину
                </button>
            </div>
            <img className={classes.image} src={`${process.env.PUBLIC_URL}/png/lada.png`}></img>
        </div>
    );
}

export default CarRow;