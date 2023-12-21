import { useContext, useEffect, useState } from "react";
import UserService from "../../../services/UserService";
import Layout from "../../share/Layout/Layout";
import classes from "./Admin.module.css";
import { StoreContext } from "../../..";
import UserRow from "../UserRow/UserRow";
import Scroll from "../../share/Scroll/Scroll";
import { observer } from "mobx-react";
import UserHeader from "../UserHeader/UserHeader";
import { Input, Modal, Table } from "antd";
import Role from "../../../types/Role";
import { User } from "../../../types/User";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import UserModal from "../UserModal/UserModal";

const Admin = observer(() => {
    const { userStore } = useContext(StoreContext);
    const { users } = userStore;

    useEffect(() => {
        const fetchUsers = async () => {
            await userStore.readUsers();
        };
        fetchUsers();
    }, []);

    const mapItems = () => users.map(user => (
        <UserRow
            key={user.id}
            user={user} />
    ));
    const [visible, setVisible] = useState(false);
    const [edit, setEdit] = useState(users[0]);
    const [remove, setRemove] = useState(users[0]);

    const Edit = (user: User) => {
        setEdit(user);
        setVisible(true);
    };

    const Delete = (user: User) => {
        setRemove(user);
        setVisible(true);
    };

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Login',
            dataIndex: 'login',
            key: 'login'
        },
        {
            title: 'Password',
            dataIndex: 'password',
            key: 'password'
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (item: Role) => item.name
        },
        {
            key: "action",
            title: "Actions",
            render: (user: User) => {

                return (
                    <>
                        <div className="flex">
                            <EditOutlined
                                style={{ color: "black" }}
                                onClick={() => Edit(user)}
                            />
                            <DeleteOutlined
                                style={{ color: "red" }}
                                onClick={() => Delete(user)}
                            />
                        </div>
                    </>
                );
            },
        },

    ]

    return (
        <Layout>
            <div className={classes.content}>
                <Table dataSource={users} columns={columns} />;
            </div>
           <UserModal visible={visible} setVisible={setVisible} edit={edit}/>
        </Layout>
    );
});

export default Admin;