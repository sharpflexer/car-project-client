import { Modal } from "antd";
import CarStore from "../../../store/CarStore";
import { Car } from "../../../types/Car";


interface ICarDeleteModal {
    setVisible: (value: boolean) => void;
    car: Car;
}

function CarDeleteModal({ setVisible, car }: ICarDeleteModal) {
    return (
        <Modal title="Вы уверены что хотите удалить этот автомобиль?"
            open={true}
            okText="Да"
            cancelText="Нет"
            onOk={async () => {
                await CarStore.deleteCar(car);
                setVisible(false);
            }}
            onCancel={() => setVisible(false)}
        >
        </Modal>
    );
}

export default CarDeleteModal;