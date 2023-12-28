import { Modal, Typography, Select, Input } from "antd";
import { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../../../../..";
import CarService from "../../../../../../services/CarService";
import { Car } from "../../../../../../types/Car";
import CarProperties from "../../../../../../types/CarProperties";
import Model from "../../../../../../types/Model";
import Color from "../../../../../../types/Color";

interface ICarEditModal {
    setVisible: (value: boolean) => void,
    car: Car,
    setCar: (value: Car) => void;
}

function CarEditModal({ setVisible, car, setCar }: ICarEditModal) {
    const { carStore } = useContext(StoreContext);
    const [properties, setProperties] = useState<CarProperties>({ brands: [], models: [], colors: [] })
    const [nestedModels, setNestedModels] = useState<Model[]>([]);
    const [nestedColors, setNestedColors] = useState<Color[]>([]);

    useEffect(() => {
        const fetchProperties = async () => {
            setProperties(await CarService.ReadProperties());
            return properties;
        };
        fetchProperties().then(() => {
            const models = properties.brands
                .find(b => b.id === car.brand.id)?.models;
            setNestedModels(models!);
            const colors = properties.models
                .find(m => m.id === car.model.id)?.colors;
            setNestedColors(colors!);
        });
    }, []);

    function brandsChange(value: number, option: { label: string; value: number; } | { label: string; value: number; }[]): void {
        setCar({ ...car!, brand: properties.brands.find(b => b.id === value)! });
        const models = properties.brands
            .find(b => b.id === value)?.models;
        setNestedModels(models!);
    }

    function modelsChange(value: number, option: { label: string; value: number; } | { label: string; value: number; }[]): void {
        setCar({ ...car!, model: properties.models.find(m => m.id === value)! });
        const colors = properties.models
            .find(m => m.id === value)?.colors;
        setNestedColors(colors!);
    }

    function colorsChange(value: number, option: { label: string; value: number; } | { label: string; value: number; }[]): void {
        setCar({ ...car!, color: properties.colors.find(c => c.id === value)! });
    }

    function getInitialModels(): { label: string; value: number; }[] | undefined {
        return properties.brands
            .find(b => b.id === car.brand.id)!
            .models
            .map(model => {
                return {
                    label: model.name,
                    value: model.id
                }
            }
            );
    }

    function getInitialColors(): { label: string; value: number; }[] | undefined {
        return properties.models
            .find(b => b.id === car.model.id)!
            .colors
            .map(color => {
                return {
                    label: color.name,
                    value: color.id
                }
            }
            );
    }

    return (
        <Modal
            title="Изменение автомобиля"
            open={true}
            okText="Обновить"
            cancelText='Отмена'
            onCancel={() => setVisible(false)}
            onOk={async () => {
                await carStore.updateCar(car);
                setVisible(false);
            }}
        >
            <Typography.Title level={5}>Марка</Typography.Title>
            <Select
                defaultValue={car.brand.id}
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
                defaultValue={car.model.id}
                style={{ width: 200 }}

                onChange={modelsChange}
                options={nestedModels ? nestedModels.map(model => {
                    return {
                        label: model.name,
                        value: model.id
                    }
                }) : getInitialModels()}
            />
            <Typography.Title level={5}>Цвет</Typography.Title>
            <Select
                defaultValue={car.color.id}
                style={{ width: 200 }}
                onChange={colorsChange}
                options={nestedColors ? nestedColors.map(color => {
                    return {
                        label: color.name,
                        value: color.id
                    }
                }) : getInitialColors()}
            />
            <Typography.Title level={5}>Цена</Typography.Title>
            <Input
                defaultValue={car.price}
                onChange={e => {
                    setCar({ ...car!, price: Number(e.target.value!) });
                }}
            />
        </Modal >
    );
}

export default CarEditModal;