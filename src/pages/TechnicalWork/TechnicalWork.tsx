import classes from "./TechnicalWork.module.css";

function TechnicalWork(){

    return (
    <div className={classes.imageContainer}>
        <div className={classes.textContainer}>
            <label className={classes.errorCode}>503</label>
            <label className={classes.description}>Технические работы</label>   
        </div>
    </div>
    )
}

export default TechnicalWork;