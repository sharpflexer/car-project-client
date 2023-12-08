import { Link } from "react-router-dom";
import classes from "./Header.module.css";
import { StoreContext } from "../../../..";
import { useContext } from "react";

function Header() {

    const tokenStore = useContext(StoreContext).tokenStore;

    return (
        <div className={classes.layout}>
            <label className={classes.title}>Car Shop Online</label>
            <div className={classes.linkContainer}>
                <Link className={classes.linkLayout + " " + classes.catalog} to="../catalog">
                    <div className={classes.element}>Каталог</div>
                </Link>
                {tokenStore.role === Role.Admin ? (<Link className={classes.linkLayout + " " + classes.admin} to="../admin">
                    <div className={classes.element}>Панель администрирования</div>
                </Link>) : null}
            </div>
        </div>
    );
}

export default Header;