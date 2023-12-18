import { useState, useEffect, useContext } from "react";
import RequestService from "../../services/RequestService";
import { Filter } from "../../types/Filter";
import ReadonlyCar from "../../types/ReadonlyCar";
import CarCard from "../CarCard/CarCard";
import Layout from "../Layout/Layout";
import classes from "./Cart.module.css";
import { StoreContext } from "../..";

function Cart(){

    const {cars} = useContext(StoreContext).cartStore; 
 
    const mapItems = () => cars.map(car => (
        <CarCard car={car} />
    ));

    return (
        <Layout>
            <div className={classes.list}>
                <div className={classes.items}>
                    {mapItems()}
                </div>
            </div>
        </Layout>
    );
}

export default Cart;