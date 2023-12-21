import { useContext, useEffect } from "react";
import UserService from "../../../services/UserService";
import Layout from "../../share/Layout/Layout";
import classes from "./Admin.module.css";
import { StoreContext } from "../../..";
import UserRow from "../UserRow/UserRow";
import Scroll from "../../share/Scroll/Scroll";
import { observer } from "mobx-react";
import UserHeader from "../UserHeader/UserHeader";

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


    return (
        <Layout>
            <Scroll>
                <div className={classes.content}>
                    <UserHeader/>
                    {mapItems()}
                </div>
            </Scroll>
        </Layout>
    );
});

export default Admin;