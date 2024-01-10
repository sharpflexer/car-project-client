import ReadonlyCar from "../../../types/ReadonlyCar";
import classes from "./CarHeader.module.css";

interface ICarHeader {
    filterBy: (property: keyof ReadonlyCar) => void;
}

function CarHeader({ filterBy }: ICarHeader) {
    return (
        <div className={classes.header}>
            <div className={classes.item}>
                №
                <button className={classes.filter}
                    onClick={() => filterBy("id")}>
                    ^
                </button>
            </div>
            <div className={classes.item}>
                Brand
                <button className={classes.filter}
                    onClick={() => filterBy("brand")}>
                    ^
                </button>
            </div>
            <div className={classes.item}>
                Model
                <button className={classes.filter}
                    onClick={() => filterBy("model")}>
                    ^
                </button>
            </div>
            <div className={classes.item}>
                Color
                <button className={classes.filter}
                    onClick={() => filterBy("color")}>
                    ^
                </button>
            </div>
            <div className={classes.item}>
                Price
                <button className={classes.filter}
                    onClick={() => filterBy("price")}>
                    ^
                </button>
            </div>
        </div>
    );
}

export default CarHeader;