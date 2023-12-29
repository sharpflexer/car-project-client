import { observer } from "mobx-react";
import { TabsProps, Layout, Tabs } from "antd";
import CarTable from "@tables/CarTable/CarTable";
import UserTable from "@tables/UserTable/UserTable";

const Admin = observer(() => {
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
        }
    ]
    return (
        <Layout>
            <Tabs defaultActiveKey="cars" items={tabs} />
        </Layout>
    );
});

export default Admin;