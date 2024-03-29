import classes from "./Authorize.module.css";
import { useState } from "react";
import SignUp from "./SignUp/SignUp";
import SignIn from "./SignIn/SignIn";

function Authorize() {
    const [isSignIn, setSignIn] = useState(true);

    function switchToSignIn() {
        setSignIn(true);
    }

    function switchToSignUp() {
        setSignIn(false);
    }

    return (
        <div className={classes.container}>
            <div className={classes.screen}>
                <div className={classes.screen__content}>
                    {isSignIn ? 
                    <SignIn toSignUp={switchToSignUp} /> 
                    : <SignUp toSignIn={switchToSignIn} />}
                    <div className={classes.social_login}>
                    </div>
                </div>
                <div className={classes.screen__background}>
                    <span className={`${classes.screen__background__shape} ${classes.screen__background__shape4}`}></span>
                    <span className={`${classes.screen__background__shape} ${classes.screen__background__shape3}`}></span>
                    <span className={`${classes.screen__background__shape} ${classes.screen__background__shape2}`}></span>
                    <span className={`${classes.screen__background__shape} ${classes.screen__background__shape1}`}></span>
                </div>
            </div>
        </div>
    );
}

export default Authorize;