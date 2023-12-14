import classes from "./InputError.module.css";

function InputError({error}: {error:string}){
    return (
        <p className={classes.inputError}>{error}</p>
    );
}

export default InputError;