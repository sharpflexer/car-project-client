import { Table } from "antd";
import UserDeleteModal from "../../modals/UserDeleteModal/UserDeleteModal";
import UserEditModal from "../../modals/UserEditModal/UserEditModal";
import classes from "./UserTable.module.css";
import { useContext, useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { StoreContext } from "../../../../..";
import { User } from "../../../../../types/User";
import { Role } from "../../../../../types/Role";
import getColumns from "./UserColumns";
import { observer } from "mobx-react";

const UserTable = observer(() => {
    const { userStore } = useContext(StoreContext);
    const { users } = userStore;

    const [isEditVisible, setEditVisible] = useState(false);
    const [isDeleteVisible, setDeleteVisible] = useState(false);
    const [user, setUser] = useState(users[0]);

    useEffect(() => {
        const fetchUsers = async () => {
            await userStore.readUsers();
        };
        fetchUsers();
    }, []);

    const Edit = (user: User) => {
        setUser(user);
        setEditVisible(true);
    };

    const Delete = (user: User) => {
        setUser(user);
        setDeleteVisible(true);
    };

    return (
        <>
            <div className={classes.content}>
                <Table dataSource={users} 
                columns={getColumns(Edit, Delete)} 
                pagination={false} 
                scroll={{ y: 700 }} 
                locale={{emptyText: "Нет данных"}}/>
            </div>
            <UserEditModal visible={isEditVisible} setVisible={setEditVisible} user={user} setUser={setUser} />
            <UserDeleteModal visible={isDeleteVisible} setVisible={setDeleteVisible} user={user} />
        </>
    );
});

export default UserTable;