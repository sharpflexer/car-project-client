import { useContext } from "react";
import { Modal } from "antd";
import { Car } from "../../../../../../types/Car";
import { StoreContext } from "../../../../../..";

interface ICarDeleteModal {
    visible: boolean;
    setVisible: (value: boolean) => void;
    car: Car;
}

function CarDeleteModal({ visible, setVisible, car }: ICarDeleteModal) {
    const { carStore } = useContext(StoreContext);

    return (
        <Modal title="Вы уверены что хотите удалить этот автомобиль?"
            okText="Да"
            cancelText="Нет"
            open={visible}
            onOk={async () => {
                await carStore.deleteCar(car);
                setVisible(false);
            }}
            onCancel={() => setVisible(false)}
        >
        </Modal>
    );
}

export default CarDeleteModal;