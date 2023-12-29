import ReadonlyCar from "../../../../types/ReadonlyCar";
import classes from "./CarCard.module.css";
import CartStore from "../../../../store/CartStore";

function CarCard({ car }: { car: ReadonlyCar }) {

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
                <button className={classes.cartButton}
                    onClick={() => CartStore.addToCart(car)}>
                    В корзину
                </button>
            </div>
            <img
                className={classes.image}
                src={`${process.env.PUBLIC_URL}/png/lada.png`}>
            </img>
        </div>
    );
}

export default CarCard;