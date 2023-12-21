import classes from "../UserRow/UserRow.module.css";

function UserHeader() {
    return (
        <div className={classes.content}>
            <div className={classes.items}>
                <div className={classes.cell}>
                    ID
                </div>
                <div className={classes.cell}>
                    Email
                </div>
                <div className={classes.cell}>
                    Login
                </div>
                <div className={classes.cell}>
                    Password
                </div>
                <div className={classes.cell}>
                    Role
                </div>
            </div>
        </div>
    );
}

export default UserHeader;