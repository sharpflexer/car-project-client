import { Input, Modal, Typography } from "antd";
import { useContext } from "react";
import { StoreContext } from "../../../../../..";
import { Car } from "../../../../../../types/Car";

interface IUserModal {
    visible: boolean,
    setVisible: (value: boolean) => void,
    car: Car,
    setCar: (value: Car) => void
}

function CarCreateModal({ visible, setVisible, car, setCar }: IUserModal) {
    const { carStore } = useContext(StoreContext);

    return (
        <Modal
            title="Создание пользователя"
            open={visible}
            okText="Добавить"
            cancelText='Отмена'
            onCancel={() => setVisible(false)}
            onOk={async () => {
                await carStore.updateCar(car!);
                setVisible(false);
            }}
        >
            <Typography.Title level={5}>E-mail</Typography.Title>
            <Input value={car?.brand.id} onChange={e => {
                setCar({ ...car, brand: { ...car.brand, id: Number(e.target.value) } });
            }}
            />
            <Typography.Title level={5}>Логин</Typography.Title>
            <Input value={car?.model.id} onChange={e => {
                setCar({ ...car, model: { ...car.model, id: Number(e.target.value) } });
            }}
            />
            <Typography.Title level={5}>Пароль</Typography.Title>
            <Input value={car?.color.id} onChange={e => {
                setCar({ ...car, color: { ...car.color, id: Number(e.target.value) } });
            }}
            />
            <Typography.Title level={5}>Роль</Typography.Title>
            <Input value={car?.price} onChange={e => {
                setCar({ ...car, price: Number(e.target.value)});
            }}
            />
        </Modal >
    );
}

export default CarCreateModal;