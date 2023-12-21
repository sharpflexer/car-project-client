import { Input, Modal } from "antd";
import { useContext, useState } from "react";
import { User } from "../../../types/User";
import { StoreContext } from "../../..";

interface IUserModal{
    visible: boolean,
    setVisible: (value: boolean) => void,
    edit: User
}

function UserModal({visible, setVisible, edit }: IUserModal) {
    const {userStore} = useContext(StoreContext);

    function ResetEditing(): void {
        setVisible(false);
    }

    return (
        <Modal
            title="Edit Details"
            open={visible}
            okText="Save"
            onCancel={() => ResetEditing()} 
            onOk={() => userStore.updateUser(edit!)}
        >
            <Input title="Email"
                value={edit?.email}
            />
            <Input
                value={edit?.login}
            />
            <Input
                value={edit?.password}
            />
            <Input
                value={edit?.role.name}
            />
        </Modal>
    );
}

export default UserModal;