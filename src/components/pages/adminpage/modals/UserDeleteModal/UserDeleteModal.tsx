import { useContext } from "react";
import { StoreContext } from "../../../../..";
import { User } from "../../../../../types/User";
import { Modal } from "antd";

interface IUserDeleteModal {
    visible: boolean;
    setVisible: (value: boolean) => void;
    user: User;
}

function UserDeleteModal({ visible, setVisible, user }: IUserDeleteModal) {
    const { userStore } = useContext(StoreContext);

    return (
        <Modal title="Вы уверены что хотите удалить этого пользователя?"
            okText="Да"
            cancelText="Нет"
            open={visible}
            onOk={async () => {
                await userStore.deleteUser(user);
                setVisible(false);
            }}
            onCancel={() => setVisible(false)}
        >
        </Modal>
    );
}

export default UserDeleteModal;