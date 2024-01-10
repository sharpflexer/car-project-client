import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Role } from "../../../types/Role";
import { User } from "../../../types/User";

function getColumns(edit: (value: User) => void,
    remove: (value: User) => void) {

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
                        <div>
                            <EditOutlined
                                style={{ color: "black", fontSize: '20px' }}
                                onClick={() => edit(user)}

                            />
                            <DeleteOutlined
                                style={{ color: "red", fontSize: '20px' }}
                                onClick={() => remove(user)}
                            />
                        </div>
                    </>
                );
            },
        },
    ]

    return columns;
}

export default getColumns;