import { Link } from "react-router-dom";
import classes from "./Header.module.css";
import { StoreContext } from "../../..";
import { useContext, useState } from "react";
import { Role } from "../../../enums/Role";
import { observer } from "mobx-react";
import ModalCart from "../../shopcart/ModalCart/ModalCart";

const Header = observer(() => {
    const { cartStore } = useContext(StoreContext);
    const { tokenStore } = useContext(StoreContext);

    const [isCartActive, setCartActive] = useState(false);

    function hasAccess(...rolesWithAccess: Role[]): boolean {
        return rolesWithAccess.includes(tokenStore.role);
    }

    return (
        <div className={classes.layout}>
            <label className={classes.title}>Car Shop Online</label>
            <div className={classes.linkContainer}>
                <Link className={classes.linkLayout + " " + classes.catalog} to="../catalog">
                    <div className={classes.element}>Каталог</div>
                </Link>
                {hasAccess(Role.Admin, Role.Manager) ? (
                    <Link className={classes.linkLayout + " " + classes.admin} to="../admin">
                        <div className={classes.element}>Панель администрирования</div>
                    </Link>) : null}
                <div className={classes.cartContainer}>
                    <button className={classes.linkLayout + " " + classes.cart}
                        onClick={() => setCartActive(true)}>
                        Корзина
                    </button>
                    {cartStore.cars.length !== 0 ?
                        <div className={classes.cartCount}>
                            {cartStore.cars.length}
                        </div>
                        : null}
                </div>
            </div>
            {isCartActive ? <ModalCart isCartActive={isCartActive} setCartActive={setCartActive} />
                : null}
        </div>
    );
});

export default Header;