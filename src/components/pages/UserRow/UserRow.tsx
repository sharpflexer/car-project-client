import classes from "./UserRow.module.css";
import { User } from "../../../types/User";

function UserRow({ user }: { user: User }) {
    return (
        <div className={classes.content}>
            <div className={classes.items}>
                <div className={classes.cell}>
                    {user.id}
                </div>
                <div className={classes.cell}>
                    {user.email}
                </div>
                <div className={classes.cell}>
                    {user.login}
                </div>
                <div className={classes.cell}>
                    {user.password}
                </div>
                <div className={classes.cell}>
                    {user.role.name}
                </div>
            </div>
        </div>
    );
}

export default UserRow;