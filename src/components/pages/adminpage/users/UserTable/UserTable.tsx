import { Table } from "antd";
import classes from "./UserTable.module.css";
import { useEffect, useState } from "react";
import { User } from "../../../../../types/User";
import getColumns from "./UserColumns";
import { observer } from "mobx-react";
import UserDeleteModal from "../modals/UserDeleteModal/UserDeleteModal";
import UserEditModal from "../modals/UserEditModal/UserEditModal";
import UserStore from "../../../../../store/UserStore";

const UserTable = observer(() => {
    const { users } = UserStore;

    const [isEditVisible, setEditVisible] = useState(false);
    const [isDeleteVisible, setDeleteVisible] = useState(false);
    const [user, setUser] = useState({} as User);

    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            await UserStore.readUsers();
        };
        fetchUsers()
            .then(() => setLoading(false));
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
                    scroll={{ y: 600 }}
                    loading={isLoading}
                    locale={{ emptyText: "Нет данных" }} />
            </div>
            {isEditVisible ?
                <UserEditModal setVisible={setEditVisible} user={user} setUser={setUser} />
                : null}
            {isDeleteVisible ?
                <UserDeleteModal setVisible={setDeleteVisible} user={user} />
                : null}
        </>
    );
});

export default UserTable;