import { observer } from "mobx-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import classes from './Header.module.css';
import { Role } from "../../../enums/Role";
import CartStore from "../../../store/CartStore";
import TokenStore from "../../../store/TokenStore";
import ModalCart from "../../shopcart/ModalCart/ModalCart";

function Header() {
    const [isCartActive, setCartActive] = useState(false);
    const location = useLocation();

    function hasAccess(...rolesWithAccess: Role[]): boolean {
        TokenStore.checkoutRole();
        return rolesWithAccess.includes(TokenStore.role);
    }

    return (
        <div className={classes.layout}>
            <label className={classes.title}>Car Shop Online</label>
            <div className={classes.linkContainer}>
                <Link className={classes.linkLayout + " " + classes.catalog} to="/catalog">
                    <div className={classes.element}>Каталог</div>
                </Link>
                {hasAccess(Role.Admin, Role.Manager) ? (
                    <Link className={classes.linkLayout + " " + classes.admin} to="/admin">
                        <div className={classes.element}>Панель администрирования</div>
                    </Link>) : null}
                {location.pathname.includes("/catalog") ? (
                    <div className={classes.cartContainer}>
                        <button className={classes.linkLayout + " " + classes.cart}
                            onClick={() => setCartActive(true)}>
                            Корзина
                        </button>
                        {CartStore.cars.length !== 0 ?
                            <div className={classes.cartCount}>
                                {CartStore.cars.length}
                            </div>
                            : null}
                    </div>) : null}
            </div>
            {isCartActive ? <ModalCart isCartActive={isCartActive} setCartActive={setCartActive} />
                : null}
        </div>
    );
}

export default observer(Header);