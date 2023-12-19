import { useContext } from "react";
import { StoreContext } from "../..";
import ReadonlyCar from "../../types/ReadonlyCar";
import classes from "./CartCard.module.css";

function CartCard({ car}: { car: ReadonlyCar}) {

    const { cartStore } = useContext(StoreContext);

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
                <div className={classes.buttonPanel}>
                    <button className={classes.cartButton}
                        onClick={() => cartStore.removeFromCart(car)}>
                        -
                    </button>
                    <div className={classes.count}>
                        {cartStore.getCount(car)}
                    </div>
                    <button className={classes.cartButton}
                        onClick={() => cartStore.addToCart(car)}>
                        +
                    </button>
                </div>
            </div>
            <img
                className={classes.image}
                src={`${process.env.PUBLIC_URL}/png/lada.png`}>
            </img>
        </div>
    );
}

export default CartCard;