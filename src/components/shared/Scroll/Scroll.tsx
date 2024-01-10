import classes from "./Scroll.module.css";

interface IScroll {
    children: React.ReactNode;
}

function Scroll({ children }: IScroll) {
    return (
        <div className={classes.scrollableContainer}>
            <ul className={classes.list}>
                {children}
            </ul>
        </div>
    );
};

export default Scroll;