import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Table } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import CarCreateModal from "@modals/CarCreateModal/CarCreateModal";
import CarDeleteModal from "@modals/CarDeleteModal/CarDeleteModal";
import CarEditModal from "@modals/CarEditModal/CarEditModal";
import CarService from "services/CarService";
import CarStore from "store/CarStore";
import { Car } from "types/Car";
import CarProperties from "types/CarProperties";
import getColumns from "./CarColumns";
import classes from "./CarTable.module.css";

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
                    style={{ backgroundColor: "white", color: "#77dd77", fontSize: '25px' }}
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