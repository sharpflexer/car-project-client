import { useContext } from "react";
import { StoreContext } from "../../..";
import classes from "./ModalCart.module.css";
import ReactDOM from 'react-dom';
import IModalCart from "../../../interfaces/IModalCart";
import Scroll from "../../share/Scroll/Scroll";
import CartCard from "../CartCard/CartCard";

const ModalCart = ({ isCartActive, setCartActive }: IModalCart) => {

    const { cartStore } = useContext(StoreContext);
    const { cars } = cartStore;

    const mapItems = () => uniqueSortedItems().map(car => (
        <CartCard car={car} />
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
                            Итог: {cartStore.getTotalPrice()} рублей.
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