import { observer } from "mobx-react";
import Layout from "../../../share/Layout/Layout";
import UserTable from "../users/UserTable/UserTable";
import CarTable from "../cars/CarTable/CarTable";
import { Tabs, TabsProps } from "antd";
import TokenStore from "../../../../store/TokenStore";
import { Role } from "../../../../enums/Role";

const Admin = observer(() => {
    const { role } = TokenStore;

    function checkoutAdmin(): boolean {
        TokenStore.checkoutRole();

        return role !== Role.Admin;
    }

    const tabs: TabsProps['items'] = [
        {
            key: 'cars',
            label: 'Автомобили',
            children: <CarTable />,
        },
        {
            key: 'users',
            label: 'Пользователи',
            children: <UserTable />,
            disabled: checkoutAdmin()
        }
    ]
    return (
        <Layout>
            <Tabs defaultActiveKey="cars" items={tabs} />
        </Layout>
    );
});

export default Admin;


