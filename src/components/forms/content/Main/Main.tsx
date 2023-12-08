import IMain from "../../../../interfaces/IMain";
import Header from "../Header/Header";
import classes from "./Main.module.css";

function Main({children} : IMain){
    return (
        <div>
            <Header/>
            This is the main!
            {children}
        </div>
    );
}

export default Main;