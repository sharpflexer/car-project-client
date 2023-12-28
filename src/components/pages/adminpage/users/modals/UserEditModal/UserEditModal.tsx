import { Input, Modal, Typography } from "antd";
import { useContext, useState } from "react";
import { Formik } from "formik";
import { StoreContext } from "../../../../../..";
import { User } from "../../../../../../types/User";

interface IUserModal {
    visible: boolean,
    setVisible: (value: boolean) => void,
    user: User,
    setUser: (value: User) => void
}

function UserEditModal({ visible, setVisible, user, setUser }: IUserModal) {
    const { userStore } = useContext(StoreContext);

    return (
        <Modal
            title="Изменение пользователя"
            open={visible}
            okText="Сохранить"
            onCancel={() => setVisible(false)}
            onOk={async () => {
                await userStore.updateUser(user!);
                setVisible(false);
            }}
        >
            <Typography.Title level={5}>E-mail</Typography.Title>
            <Input value={user?.email} onChange={e => {
                setUser({ ...user, email: e.target.value });
            }}
            />
            <Typography.Title level={5}>Логин</Typography.Title>
            <Input value={user?.login} onChange={e => {
                setUser({ ...user, login: e.target.value });
            }}
            />
            <Typography.Title level={5}>Пароль</Typography.Title>
            <Input value={user?.password} onChange={e => {
                setUser({ ...user, password: e.target.value });
            }}
            />
            <Typography.Title level={5}>Роль</Typography.Title>
            <Input value={user?.role.name} onChange={e => {
                setUser({ ...user, role: { ...user.role, name: e.target.value } });
            }}
            />
        </Modal >
    );
}

export default UserEditModal;