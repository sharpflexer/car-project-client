import { Link } from "react-router-dom";
import classes from "./Header.module.css";
import { StoreContext } from "../..";
import { useContext, useState } from "react";
import { Role } from "../../enums/Role";

function Header() {

    const { tokenStore, cartStore } = useContext(StoreContext);

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
                <div className={classes.cart}>
                    Товары: {cartStore.goodsCount}
                    <button>
                        Корзина
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Header;