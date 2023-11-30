import { Formik, Field } from "formik";
import SignInFields from "../../types/SignInFields";
import { Link } from "react-router-dom";
import classes from "./SignIn.module.css";

function SignIn() {

  const defaultValues: SignInFields = {
    login: "",
    password: ""
  }

  function doSignIn(values: SignInFields, setSubmitting: (isSubmitting: boolean) => void) {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  }

  return (
    <Formik initialValues={defaultValues}
      onSubmit={(values, { setSubmitting }) => doSignIn(values, setSubmitting)}
    >
      {({
        handleSubmit,
        isSubmitting,
      }) => (
<div className={classes.container}>
        <div className={classes.screen}>
          <div className={classes.screen__content}>
            <form className={classes.login} onSubmit={handleSubmit}>
              <div className={classes.login__field}>
                <i className={`${classes.login__icon} ${"fas"} ${"fa-user"}`}></i>           
                <Field className={classes.login__input} name="login" type="login" placeholder="User name"/>
              </div>
              <div className={classes.login__field}>
                <i className={`${classes.login__icon} ${"fas"} ${"fa-user"}`}></i>
                <Field className={classes.login__input} name="password" type="password" placeholder="Password"/>
              </div>
              <button className={`${classes.button} ${classes.login__submit}`} type="submit" disabled={isSubmitting}>
                <span className={classes.button__text}>Log In Now</span>
                <i className={`${classes.button__icon} ${"fas"} ${"fa-chevron-right"}`}></i>
              </button>
              <Link className={classes.register__link} to="/signup">Register</Link>
            </form>
            <div className={classes.social_login}>
              <h3>log in via</h3>
              <div className={classes.social_icons}>
                <a href="#" className={`${classes.social_login__icon} ${"fab"} ${"fa-instagram"}`}></a>
                <a href="#" className={`${classes.social_login__icon} ${"fab"} ${"fa-facebook"}`}></a>
                <a href="#" className={`${classes.social_login__icon} ${"fab"} ${"fa-twitter"}`}></a>
              </div>
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
      )}
    </Formik>
  );
}

export default SignIn;