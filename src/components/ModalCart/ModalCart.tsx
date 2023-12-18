import { useContext } from "react";
import { StoreContext } from "../..";
import CarCard from "../CarCard/CarCard";
import Layout from "../Layout/Layout";
import classes from "./ModalCart.module.css";
import ReactDOM from 'react-dom';
import IModalCart from "../../interfaces/IModalCart";

const ModalCart = ({ isCartActive, setCartActive }: IModalCart) => {

    const { cars } = useContext(StoreContext).cartStore;

    const mapItems = () => cars.map(car => (
        <CarCard car={car} />
    ));

    function closeModal() {
        setCartActive(false);
    }

    const modalContainer = document.getElementById("root");

    const modalContent = isCartActive ? (
        <div className={classes.modal} onClick={() => setCartActive?.(false)}>
            <div className={classes.content} onClick={(e) => e.stopPropagation()}>
                <button onClick={closeModal}>Закрыть</button>
                <div className={classes.list}>
                    <div className={classes.items}>
                        {mapItems()}
                    </div>
                </div>
            </div>
        </div>
    ) : null;

    return modalContainer ? ReactDOM.createPortal(modalContent, modalContainer) : null;
};

export default ModalCart;