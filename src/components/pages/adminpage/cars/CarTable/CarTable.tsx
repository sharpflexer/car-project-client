import { Table } from "antd";
import classes from "./CarTable.module.css";
import { useEffect, useState } from "react";
import { PlusSquareOutlined } from "@ant-design/icons";
import { Car } from "../../../../../types/Car";
import getColumns from "./CarColumns";
import CarEditModal from "../modals/CarEditModal/CarEditModal";
import CarDeleteModal from "../modals/CarDeleteModal/CarDeleteModal";
import CarCreateModal from "../modals/CarCreateModal/CarCreateModal";
import { observer } from "mobx-react";
import CarProperties from "../../../../../types/CarProperties";
import CarService from "../../../../../services/CarService";
import CarStore from "../../../../../store/CarStore";

const CarTable = observer(() => {
    const { cars } = CarStore;

    const [isCreateVisible, setCreateVisible] = useState(false);
    const [isEditVisible, setEditVisible] = useState(false);
    const [isDeleteVisible, setDeleteVisible] = useState(false);
    const [car, setCar] = useState<Car>({} as Car);

    const [properties, setProperties] = useState<CarProperties>(
        {
            brands: [],
            models: [],
            colors: []
        }
    )

    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCars = async () => {
            await CarStore.readFullCars();
        };
        const fetchProperties = async () => {
            setProperties(await CarService.ReadProperties());
        };

        fetchCars()
            .then(() => fetchProperties())
            .then(() => setLoading(false));
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
                    scroll={{ y: 600 }}
                    loading={isLoading}
                    locale={{ emptyText: "Нет данных" }} />
                <PlusSquareOutlined
                    style={{ color: "green", fontSize: '25px' }}
                    onClick={() => Create()}

                />
            </div>
            {isCreateVisible ?
                <CarCreateModal setVisible={setCreateVisible}
                    properties={properties} />
                : null}

            {isEditVisible ?
                <CarEditModal setVisible={setEditVisible}
                    car={car}
                    properties={properties} />
                : null}

            {isDeleteVisible ?
                <CarDeleteModal setVisible={setDeleteVisible} car={car} />
                : null}
        </>
    )
});

export default CarTable;