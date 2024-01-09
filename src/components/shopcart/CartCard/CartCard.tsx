import CartStore from "../../../store/CartStore";
import ReadonlyCar from "../../../types/ReadonlyCar";
import classes from "./CartCard.module.css";


function CartCard({ car }: { car: ReadonlyCar }) {
    return (
        <div className={classes.cardLayout}>
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
                            onClick={() => CartStore.removeFromCart(car)}>
                            -
                        </button>
                        <div className={classes.count}>
                            {CartStore.getCountOf(car)}
                        </div>
                        <button className={classes.cartButton}
                            onClick={() => CartStore.addToCart(car)}>
                            +
                        </button>
                    </div>
                </div>
                <img
                    className={classes.image}
                    src={`${process.env.PUBLIC_URL}/png/lada.png`}>
                </img>
            </div>
            <img
                className={classes.trashButton}
                src={`${process.env.PUBLIC_URL}/png/trash.png`}
                onClick={() => CartStore.clearCart(car)}>
            </img>
        </div>
    );
}

export default CartCard;