import { EditOutlined, DeleteOutlined, PlusSquareOutlined } from "@ant-design/icons";
import Role from "../../../../../types/Role";
import { Car } from "../../../../../types/Car";
import { CarProperty } from "../../../../../types/CarProperty";


function getColumns(
    edit: (value: Car) => void,
    remove: (value: Car) => void) {

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Brand',
            dataIndex: 'brand',
            key: 'brand',
            render: (item: CarProperty) => item.name
        },
        {
            title: 'Model',
            dataIndex: 'model',
            key: 'model',
            render: (item: CarProperty) => item.name
        },
        {
            title: 'Color',
            dataIndex: 'color',
            key: 'color',
            render: (item: CarProperty) => item.name
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            key: "action",
            title: "Actions",
            render: (car: Car) => {
                return (
                    <>
                        <div>
                            <EditOutlined
                                style={{ color: "black", fontSize: '20px' }}
                                onClick={() => edit(car)}

                            />
                            <DeleteOutlined
                                style={{ color: "red", fontSize: '20px' }}
                                onClick={() => remove(car)}
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