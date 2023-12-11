import { useEffect, useState } from "react";
import { Car } from "../../../../types/Car";
import CarRow from "../CarRow/CarRow";
import Layout from "../Layout/Layout";
import classes from "./Catalog.module.css";
import RequestService from "../../../../services/RequestService";

function Catalog(){
    const [cars, setCars] = useState<Car[]>([]);
    const [items, setItems] = useState<JSX.Element[]>([]); 
    
    useEffect(() => {
        const fetchCars = async () => {
            const result = await RequestService.GetCars();
            setCars(result);
        };
    
        const mapItems = () => cars.map(car => (
            <CarRow car = {car}/>
        ));
         fetchCars()
        .then(() => setItems(mapItems()));
    }, []);   



    return (
        <Layout>
            <div className="list">
                {items}
            </div>
        </Layout>
    );
}

export default Catalog;