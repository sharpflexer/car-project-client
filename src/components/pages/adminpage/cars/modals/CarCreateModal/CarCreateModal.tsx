import { Input, Modal, Select, Typography } from "antd";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../../../../..";
import { Car } from "../../../../../../types/Car";
import CarService from "../../../../../../services/CarService";
import CarProperties from "../../../../../../types/CarProperties";
import Brand from "../../../../../../types/Brand";
import Model from "../../../../../../types/Model";
import Color from "../../../../../../types/Color";

interface IUserModal {
    visible: boolean,
    setVisible: (value: boolean) => void,
}

function CarCreateModal({ visible, setVisible }: IUserModal) {
    const { carStore } = useContext(StoreContext);
    const [properties, setProperties] = useState<CarProperties>({ brands: [], models: [], colors: [] })
    const [car, setCar] = useState<Car>();
    const [nestedModels, setNestedModels] = useState<Model[]>([]);
    const [nestedColors, setNestedColors] = useState<Color[]>([]);

    useEffect(() => {
        const fetchProperties = async () => {
            setProperties(await CarService.ReadProperties());
        };
        fetchProperties();
    }, []);

    function brandsChange(value: number, option: { label: string; value: number; } | { label: string; value: number; }[]): void {
        const models = properties.brands
            .find(b => b.id === value)?.models;
        setNestedModels(models!);
    }

    function modelsChange(value: number, option: { label: string; value: number; } | { label: string; value: number; }[]): void {
        const colors = properties.models
            .find(m => m.id === value)?.colors;
        setNestedColors(colors!);
    }

    return (
        <Modal
            title="Создание пользователя"
            open={visible}
            okText="Добавить"
            cancelText='Отмена'
            onCancel={() => setVisible(false)}
            onOk={async () => {
                await carStore.createCar(car!);
                setVisible(false);
            }}
        >
            <Typography.Title level={5}>Марка</Typography.Title>
            <Select
                defaultValue={properties.brands.length > 0 ?
                    properties.brands[0].id
                    : null}
                style={{ width: 200 }}
                onChange={brandsChange}
                options={properties.brands ? properties.brands.map(brand => {
                    return {
                        label: brand.name,
                        value: brand.id
                    }
                }) : []}
            />
            <Typography.Title level={5}>Модель</Typography.Title>
            <Select
                defaultValue={nestedModels.length > 0 ?
                    nestedModels[0].id
                    : null}
                style={{ width: 200 }}
                onChange={modelsChange}
                options={nestedModels ? nestedModels.map(model => {
                    return {
                        label: model.name,
                        value: model.id
                    }
                }) : []}
            />
            <Typography.Title level={5}>Цвет</Typography.Title>
            <Select
                defaultValue={nestedColors?.length > 0 ?
                    nestedColors[0].id
                    : null}
                style={{ width: 200 }}
                options={nestedColors ? nestedColors.map(color => {
                    return {
                        label: color.name,
                        value: color.id
                    }
                }) : []}
            />
            <Typography.Title level={5}>Цена</Typography.Title>
            <Input
                onChange={e => {
                    setCar({ ...car!, price: Number(e.target.value!) });
                }}
            />
        </Modal >
    );
}

export default CarCreateModal;