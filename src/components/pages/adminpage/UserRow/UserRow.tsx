import classes from "./UserRow.module.css";
import { User } from "../../../../types/User";

function UserRow({ user }: { user: User }) {
    return (
        <div className={classes.content}>
            <div className={classes.items}>
                <input className={classes.cell} value={`${user.id}`} />
                <input className={classes.cell} value={user.email} />
                <input className={classes.cell} value={user.login} />
                <input className={classes.cell} value={user.password} />
                <input className={classes.cell} value={user.role.name} />
                <button className={classes.cell && classes.update} />
                <button className={classes.cell && classes.delete} />
            </div>
        </div>
    );
}

export default UserRow;