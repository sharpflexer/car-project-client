
import classes from "./CarHeader.module.css";

interface ICarHeader {
    filterById: () => void;
    filterByBrand: () => void;
    filterByModel: () => void;
    filterByColor: () => void;
    filterByPrice: () => void;
}


function CarHeader({ filterById,
    filterByBrand,
    filterByModel,
    filterByColor,
    filterByPrice }: ICarHeader) {
    return (
        <div className={classes.header}>
            <div className={classes.item}>
                №
                <button className={classes.filter} onClick={filterById}>^</button>
            </div>
            <div className={classes.item}>
                Brand
                <button className={classes.filter} onClick={filterByBrand}>^</button>
            </div>
            <div className={classes.item}>
                Model
                <button className={classes.filter} onClick={filterByModel}>^</button>
            </div>
            <div className={classes.item}>
                Color
                <button className={classes.filter} onClick={filterByColor}>^</button>
            </div>
            <div className={classes.item}>
                Price
                <button className={classes.filter} onClick={filterByPrice}>^</button>
            </div>
        </div>
    );
}

export default CarHeader;