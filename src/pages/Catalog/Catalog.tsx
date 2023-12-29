import { useEffect, useState } from "react";
import { Layout } from "antd";
import classes from "./Catalog.module.css";
import Scroll from "@shared/Scroll/Scroll";
import CarService from "services/CarService";
import { Filter } from "types/Filter";
import ReadonlyCar from "types/ReadonlyCar";
import CarCard from "./CarCard/CarCard";
import CarHeader from "./CarHeader/CarHeader";

function Catalog() {
    const [cars, setCars] = useState<ReadonlyCar[]>([]);
    const [filterState, setFilterState] = useState<Filter>({ field: "id", isDesc: false });


    useEffect(() => {
        const fetchCars = async () => {
            const result = await CarService.GetCars();
            setCars(result);
        };
        fetchCars();
    }, []);

    const mapItems = () => cars.map(car => (
        <CarCard key={car.id} car={car} />
    ));

    function filterBy(property: keyof ReadonlyCar) {
        let isDesc = filterState.isDesc;

        if (filterState.field !== property) {
            setFilterState({ field: property, isDesc: false });
            isDesc = false;
        }

        const sortedCars = cars
            .filter((car) => car.hasOwnProperty(property))
            .sort((a, b) => {
                const aValue = isDesc ? a[property] : b[property];
                const bValue = isDesc ? b[property] : a[property];

                if (typeof aValue === 'number' && typeof bValue === 'number') {
                    return bValue - aValue;
                } else if (typeof aValue !== 'number' && typeof bValue !== 'number') {
                    return bValue.localeCompare(aValue);
                }

                return 0;
            });

        setCars(sortedCars);
        setFilterState({ field: property, isDesc: !isDesc });
    }

    return (
        <Layout>
            <div className={classes.list}>
                <CarHeader filterBy={filterBy} />
                <Scroll>
                    <div className={classes.items}>
                        {mapItems()}
                    </div>
                </Scroll>
            </div>
        </Layout>
    );
}

export default Catalog;