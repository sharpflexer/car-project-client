import { useEffect, useState } from "react";
import { Car } from "../../../../types/Car";
import CarRow from "../CarRow/CarRow";
import Layout from "../Layout/Layout";
import classes from "./Catalog.module.css";
import RequestService from "../../../../services/RequestService";
import CarHeader from "../CarHeader/CarHeader";

function Catalog() {
    const [cars, setCars] = useState<Car[]>([]);

    const [isIdDesc, setIdDesc] = useState<boolean>(false);
    const [isBrandDesc, setBrandDesc] = useState<boolean>(false);
    const [isModelDesc, setModelDesc] = useState<boolean>(false);
    const [isColorDesc, setColorDesc] = useState<boolean>(false);
    const [isPriceDesc, setPriceDesc] = useState<boolean>(false);

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

    // , isDescending?: boolean, setDescending: (value: boolean) => void }
    function filterBy(property: keyof Car, isDescending: boolean, setDescending: (value: boolean) => void) {

        const sortedCars = cars
            .filter((car) => car.hasOwnProperty(property))
            .sort((a, b) => {
                const aValue = isDescending ? a[property] : b[property];
                const bValue = isDescending ? b[property] : a[property];

                if (typeof aValue === 'number' && typeof bValue === 'number') {
                    return bValue - aValue;
                } else if (typeof aValue !== 'number' && typeof bValue !== 'number') {
                    return bValue.name.localeCompare(aValue.name);
                }

                return 0;
            });

        setCars(sortedCars);
        setDescending(!isDescending);
    }

    const filterById = () => filterBy("id", isIdDesc, setIdDesc);
    const filterByBrand = () => filterBy("brand", isBrandDesc, setBrandDesc);
    const filterByModel = () => filterBy("model", isModelDesc, setModelDesc);
    const filterByColor = () => filterBy("color", isColorDesc, setColorDesc);
    const filterByPrice = () => filterBy("price", isPriceDesc, setPriceDesc);

    return (
        <Layout>
            <div className={classes.list}>
                <CarHeader filterById={filterById}
                    filterByBrand={filterByBrand}
                    filterByModel={filterByModel}
                    filterByColor={filterByColor}
                    filterByPrice={filterByPrice} />

                <div className={classes.items}>
                    {mapItems()}
                </div>
            </div>
        </Layout>
    );
}

export default Catalog;