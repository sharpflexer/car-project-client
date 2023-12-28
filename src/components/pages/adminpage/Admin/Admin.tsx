import { observer } from "mobx-react";
import Layout from "../../../share/Layout/Layout";
import UserTable from "../users/UserTable/UserTable";
import { useState } from "react";
import CarTable from "../cars/CarTable/CarTable";
import { Tabs, TabsProps } from "antd";

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
            {/* <CarTable/> */}
        </Layout>
    );
});

export default Admin;