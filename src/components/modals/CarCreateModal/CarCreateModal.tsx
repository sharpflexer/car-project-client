import { Input, Modal, Select, Typography } from "antd";
import { useState } from "react";
import CarStore from "../../../store/CarStore";
import { Car } from "../../../types/Car";
import CarProperties from "../../../types/CarProperties";
import Model from "../../../types/Model";
import Color from "../../../types/Color";

interface ICarCreateModal {
    setVisible: (value: boolean) => void,
    properties: CarProperties
}

function CarCreateModal({ setVisible, properties }: ICarCreateModal) {
    const [car, setCar] = useState<Car>({} as Car);
    const [nestedModels, setNestedModels] = useState<Model[]>([]);
    const [nestedColors, setNestedColors] = useState<Color[]>([]);

    function brandsChange(id: number): void {
        const selectedBrand = properties.brands.find(b => b.id === id)!;

        setCar({ ...car, brand: selectedBrand });
        setNestedModels(selectedBrand.models);
    }

    function modelsChange(id: number): void {
        const selectedModel = properties.models.find(m => m.id === id)!;

        setCar({ ...car, model: selectedModel });;
        setNestedColors(selectedModel.colors);
    }

    function colorsChange(id: number): void {
        const selectedColor = properties.colors.find(c => c.id === id)!;

        setCar({ ...car, color: selectedColor });
    }

    return (
        <Modal
            title="Создание автомобиля"
            open={true}
            okText="Добавить"
            cancelText='Отмена'
            onCancel={() => setVisible(false)}
            onOk={async () => {
                await CarStore.createCar(car!);
                setVisible(false);
            }}
        >
            <Typography.Title level={5}>Марка</Typography.Title>
            <Select
                style={{ width: 200 }}
                onChange={brandsChange}
                options={properties.brands.map(brand => {
                    return {
                        label: brand.name,
                        value: brand.id
                    }
                })}
            />
            <Typography.Title level={5}>Модель</Typography.Title>
            <Select
                style={{ width: 200 }}
                disabled={nestedModels.length === 0}
                onChange={modelsChange}
                options={nestedModels.map(model => {
                    return {
                        label: model.name,
                        value: model.id
                    }
                })}
            />
            <Typography.Title level={5}>Цвет</Typography.Title>
            <Select
                style={{ width: 200 }}
                disabled={nestedColors?.length === 0}
                onChange={colorsChange}
                options={nestedColors.map(color => {
                    return {
                        label: color.name,
                        value: color.id
                    }
                })}
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