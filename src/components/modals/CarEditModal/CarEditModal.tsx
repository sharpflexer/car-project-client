import { Modal, Typography, Select, Input } from "antd";
import { useState, useEffect } from "react";
import CarStore from "store/CarStore";
import { Car } from "types/Car";
import CarProperties from "types/CarProperties";
import Color from "types/Color";
import Model from "types/Model";

interface ICarEditModal {
    setVisible: (value: boolean) => void,
    car: Car,
    properties: CarProperties
}

function CarEditModal({ setVisible, car, properties }: ICarEditModal) {
    const [nestedModels, setNestedModels] = useState<Model[]>([]);
    const [nestedColors, setNestedColors] = useState<Color[]>([]);
    const [editCar, setEditCar] = useState<Car>(car);

    useEffect(() => {
        const models = properties.brands
            .find(b => b.id === editCar.brand.id)?.models;
        setNestedModels(models!);

        const colors = properties.models
            .find(m => m.id === editCar.model.id)?.colors;

        setNestedColors(colors!);
    }, []);

    function brandsChange(value: number): void {
        const selectedBrand = properties.brands.find(b => b.id === value)!;

        setEditCar({ ...editCar, brand: selectedBrand });
        setNestedModels(selectedBrand.models);
    }

    function modelsChange(value: number): void {
        const selectedModel = properties.models.find(m => m.id === value)!;

        setEditCar({ ...editCar, model: selectedModel });
        setNestedColors(selectedModel.colors);
    }

    function colorsChange(value: number): void {
        const selectedColor = properties.colors.find(c => c.id === value);

        setEditCar({ ...editCar, color: selectedColor! });
    }

    return (
        <Modal
            title="Изменение автомобиля"
            open={true}
            okText="Обновить"
            cancelText='Отмена'
            onCancel={() => setVisible(false)}
            onOk={async () => {
                await CarStore.updateCar(editCar);
                setVisible(false);
            }}
        >
            <Typography.Title level={5}>Марка</Typography.Title>
            <Select
                defaultValue={editCar.brand.id}
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
                defaultValue={editCar.model.id}
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
                defaultValue={editCar.color.id}
                style={{ width: 200 }}
                onChange={colorsChange}
                options={nestedColors ? nestedColors.map(color => {
                    return {
                        label: color.name,
                        value: color.id
                    }
                }) : []}
            />
            <Typography.Title level={5}>Цена</Typography.Title>
            <Input
                defaultValue={editCar.price}
                onChange={e => {
                    setEditCar({ ...editCar!, price: Number(e.target.value!) });
                }}
            />
        </Modal >
    );
}

export default CarEditModal;