import { Table } from "antd";
import classes from "./CarTable.module.css";
import { useContext, useEffect, useState } from "react";
import { PlusSquareOutlined } from "@ant-design/icons";
import { StoreContext } from "../../../../..";
import { Car } from "../../../../../types/Car";
import getColumns from "./CarColumns";
import CarEditModal from "../modals/CarEditModal/CarEditModal";
import CarDeleteModal from "../modals/CarDeleteModal/CarDeleteModal";
import CarCreateModal from "../modals/CarCreateModal/CarCreateModal";
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

    const Create = () => {
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
                    style={{ color: "green", fontSize: '25px' }}
                    onClick={() => Create()}

                />
            </div>
            {isCreateVisible ?
                <CarCreateModal setVisible={setCreateVisible} />
                : null}

            {isEditVisible ?
                <CarEditModal setVisible={setEditVisible} car={car} setCar={setCar} />
                : null}

            {isDeleteVisible ?
                <CarDeleteModal setVisible={setDeleteVisible} car={car} />
                : null}
        </>
    )
});

export default CarTable;