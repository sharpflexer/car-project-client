import { Modal } from "antd";
import { User } from "../../../../../../types/User";
import UserStore from "../../../../../../store/UserStore";

interface IUserDeleteModal {
    setVisible: (value: boolean) => void;
    user: User;
}

function UserDeleteModal({ setVisible, user }: IUserDeleteModal) {

    return (
        <Modal title="Вы уверены что хотите удалить этого пользователя?"
            okText="Да"
            cancelText="Нет"
            open={true}
            onOk={async () => {
                await UserStore.deleteUser(user);
                setVisible(false);
            }}
            onCancel={() => setVisible(false)}
        >
        </Modal>
    );
}

export default UserDeleteModal;