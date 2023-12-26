import { Table } from "antd";
import classes from "./CarTable.module.css";
import { useContext, useEffect, useState } from "react";
import { PlusSquareOutlined } from "@ant-design/icons";
import { StoreContext } from "../../../..";
import { Car } from "../../../../types/Car";
import getColumns from "./CarColumns";
import CarEditModal from "../cars/modals/CarEditModal/CarEditModal";
import CarDeleteModal from "../cars/modals/CarDeleteModal/CarDeleteModal";
import CarCreateModal from "../cars/modals/CarCreateModal/CarCreateModal";
import { observer } from "mobx-react";

const CarTable = observer(() => {
    const { carStore } = useContext(StoreContext);
    const { cars } = carStore;

    const [isCreateVisible, setCreateVisible] = useState(false);
    const [isEditVisible, setEditVisible] = useState(false);
    const [isDeleteVisible, setDeleteVisible] = useState(false);
    const [car, setCar] = useState(cars[0]);

    useEffect(() => {
        const fetchCars = async () => {
            await carStore.readCars();
        };
        fetchCars();
    }, []);

    const Create = (car: Car) => {
        setCar(car);
        setCreateVisible(true);
    };

    const Edit = (car: Car) => {
        setCar(car);
        setEditVisible(true);
    };

    const Delete = (car: Car) => {
        setCar(car);
        setDeleteVisible(true);
    };

    return (
        <>
            <div className={classes.content}>
                <Table dataSource={cars}
                    columns={getColumns(Edit, Delete)}
                    pagination={false}
                    scroll={{ y: 700 }}
                    locale={{ emptyText: "Нет данных" }} />
                <PlusSquareOutlined
                    style={{ color: "green", fontSize: '25px'}}
                    onClick={() => Create(car)}

                />
            </div>
            <CarCreateModal visible={isCreateVisible} setVisible={setCreateVisible} car={car} setCar={setCar} />
            <CarEditModal visible={isEditVisible} setVisible={setEditVisible} car={car} setCar={setCar} />
            <CarDeleteModal visible={isDeleteVisible} setVisible={setDeleteVisible} car={car} />
        </>
    )
});

export default CarTable;