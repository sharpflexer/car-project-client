import { useEffect, useState } from "react";
import CarRow from "../CarRow/CarRow";
import Layout from "../Layout/Layout";
import classes from "./Catalog.module.css";
import RequestService from "../../services/RequestService";
import CarHeader from "../CarHeader/CarHeader";
import ReadonlyCar from "../../types/ReadonlyCar";
import { Filter } from "../../types/Filter";

function Catalog() {
    const [cars, setCars] = useState<ReadonlyCar[]>([]);
    const [whichIsDesc, setWhichIsDesc] = useState<Filter>({field:"id", isDesc: false});

    useEffect(() => {
        const fetchCars = async () => {
            const result = await RequestService.GetCars();
            setCars(result);
        };
        fetchCars();
    }, []);
 
    const mapItems = () => cars.map(car => (
        <CarRow car={car} />
    ));

    function filterBy(property: keyof ReadonlyCar, isDescending: boolean, setWhichIsDesc: (value: Filter) => void) {
        const sortedCars = cars
            .filter((car) => car.hasOwnProperty(property))
            .sort((a, b) => {
                const aValue = isDescending ? a[property] : b[property];
                const bValue = isDescending ? b[property] : a[property];

                if (typeof aValue === 'number' && typeof bValue === 'number') {
                    return bValue - aValue;
                } else if (typeof aValue !== 'number' && typeof bValue !== 'number') {
                    return bValue.localeCompare(aValue);
                }

                return 0;
            });

        setCars(sortedCars);
        setWhichIsDesc({field: property, isDesc: !isDescending});
    }

    return (
        <Layout>
            <div className={classes.list}>
                <CarHeader filterBy={filterBy} whichIsDesc={whichIsDesc} setWhichIsDesc={setWhichIsDesc}/>
                <div className={classes.items}>
                    {mapItems()}
                </div>
            </div>
        </Layout>
    );
}

export default Catalog;