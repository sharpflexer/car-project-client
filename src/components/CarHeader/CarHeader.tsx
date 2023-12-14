import classes from "./CarHeader.module.css";
import ReadonlyCar from "../../types/ReadonlyCar";
import { Filter } from "../../types/Filter";

interface ICarHeader {
    filterBy: (property: keyof ReadonlyCar,
        isDescending: boolean,
        setDescending: (value: Filter) => void)
        => void;
    whichIsDesc: Filter;
    setWhichIsDesc: (value: Filter) => void;
}

function CarHeader({ filterBy, whichIsDesc, setWhichIsDesc }: ICarHeader) {

    function changeFilterBy(property: keyof ReadonlyCar) {
        if(whichIsDesc.field === property){
            setWhichIsDesc(whichIsDesc);
            filterBy(whichIsDesc.field, whichIsDesc.isDesc, setWhichIsDesc);
        }
        else{
            setWhichIsDesc({ field: property, isDesc: false });
            filterBy(property, false, setWhichIsDesc);
        }      
    }

    return (
        <div className={classes.header}>
            <div className={classes.item}>
                №
                <button className={classes.filter}
                    onClick={() => changeFilterBy("id")}>
                    ^
                </button>
            </div>
            <div className={classes.item}>
                Brand
                <button className={classes.filter}
                    onClick={() => changeFilterBy("brand")}>
                    ^
                </button>
            </div>
            <div className={classes.item}>
                Model
                <button className={classes.filter}
                    onClick={() => changeFilterBy("model")}>
                    ^
                </button>
            </div>
            <div className={classes.item}>
                Color
                <button className={classes.filter}
                    onClick={() => changeFilterBy("color")}>
                    ^
                </button>
            </div>
            <div className={classes.item}>
                Price
                <button className={classes.filter}
                    onClick={() => changeFilterBy("price")}>
                    ^
                </button>
            </div>
        </div>
    );
}

export default CarHeader;