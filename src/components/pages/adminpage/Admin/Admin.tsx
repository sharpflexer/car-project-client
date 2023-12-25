import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { observer } from "mobx-react";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../../..";
import { User } from "../../../../types/User";
import UserDeleteModal from "../UserDeleteModal/UserDeleteModal";
import UserEditModal from "../UserEditModal/UserEditModal";
import UserRow from "../UserRow/UserRow";
import classes from "./Admin.module.css";
import Role from "../../../../types/Role";
import Layout from "../../../share/Layout/Layout";

const Admin = observer(() => {
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
                        <div className={classes.actions}>
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
                <Table dataSource={users} columns={columns} pagination={false} scroll={{y: 800}}  />
            </div>
           <UserEditModal visible={isEditVisible} setVisible={setEditVisible} user={user} setUser={setUser}/>
           <UserDeleteModal visible={isDeleteVisible} setVisible={setDeleteVisible} user={user}/>
        </Layout>
    );
});

export default Admin;