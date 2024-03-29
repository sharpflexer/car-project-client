
import ReactDOM from "react-dom";
import classes from "./ModalCart.module.css";
import IModalCart from "../../../interfaces/IModalCart";
import CartStore from "../../../store/CartStore";
import Scroll from "../../shared/Scroll/Scroll";
import CartCard from "../CartCard/CartCard";

const ModalCart = ({ isCartActive, setCartActive }: IModalCart) => {
    const { cars } = CartStore;

    const mapItems = () => uniqueSortedItems().map(car => (
        <CartCard key={car.id} car={car} />
    ));

    const uniqueSortedItems = () => cars.filter((elem, index, self) => {
        return self.indexOf(elem) === index && self.includes(elem);
    }).sort((a, b) => a.id - b.id);

    function closeModal() {
        setCartActive(false);
    }

    const modalContainer = document.getElementById("root");

    const modalContent = isCartActive ? (
        <div className={classes.modal} onClick={() => setCartActive?.(false)}>
            <div className={classes.content} onClick={(e) => e.stopPropagation()}>
                <Scroll>
                    <div className={classes.items}>
                        {mapItems()}
                        <div className={classes.totalPrice}>
                            Итог: {CartStore.getTotalPrice()} рублей.
                        </div>
                    </div>
                </Scroll>
                <button className={classes.close} onClick={closeModal}>
                    Закрыть
                </button> 
            </div>
        </div>
    ) : null;

    return modalContainer ? ReactDOM.createPortal(modalContent, modalContainer) : null;
};

export default ModalCart;