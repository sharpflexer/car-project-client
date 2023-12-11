import IMain from "../../../../interfaces/IMain";
import Header from "../Header/Header";
import classes from "./Layout.module.css";

function Layout({ children }: IMain) {
    return (
        <div>
            <Header />
            <div className={classes.content}>
                {children}
            </div>
        </div>
    );
}

export default Layout;