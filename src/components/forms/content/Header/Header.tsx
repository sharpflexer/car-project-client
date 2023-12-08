import { Link } from "react-router-dom";
import classes from "./Header.module.css";

function Header() {

    return (
        <div className={classes.layout}>
            <label className={classes.title}>Car Shop Online</label>
            <div className={classes.linkContainer}>
                <Link className={classes.linkLayout + " " + classes.catalog} to="../catalog">
                    <div className={classes.element}>Каталог</div>
                </Link>
                <Link className={classes.linkLayout + " " + classes.admin}  to="../admin">
                    <div className={classes.element}>Панель администрирования</div>
                </Link>
            </div>
        </div>
    );
}

export default Header;