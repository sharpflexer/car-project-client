import { TabsProps, Tabs } from "antd";
import { observer } from "mobx-react";
import CarTable from "../../components/tables/CarTable/CarTable";
import UserTable from "../../components/tables/UserTable/UserTable";
import { Role } from "../../enums/Role";
import TokenStore from "../../store/TokenStore";
import Layout from "../../components/shared/Layout/Layout";

function Admin() {
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
}

export default observer(Admin);

