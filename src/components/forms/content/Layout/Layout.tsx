import IMain from "../../../../interfaces/IMain";
import Header from "../Header/Header";
import classes from "./Layout.module.css";

function Layout({children} : IMain){
    return (
        <div>
            <Header/>
            This is the main!
            {children}
        </div>
    );
}

export default Layout;