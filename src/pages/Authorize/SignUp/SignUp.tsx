import { Formik, Field } from "formik";
import InputError from "../InputError/InputError";
import * as Yup from "yup";
import classes from "./SignUp.module.css";
import AuthService from "../../../services/AuthService";
import TokenStore from "../../../store/TokenStore";
import SignUpFields from "../../../types/SignUpFields";

export const SignUpSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email!').required('Required!'),
  login: Yup.string()
    .min(4, 'Too Short! Minimum 4 symbols.')
    .max(50, 'Too Long! Maximum 50 symbols.')
    .required('Required!'),
  password: Yup.string()
    .min(8, 'Too Short! Minimum 8 symbols.')
    .max(50, 'Too Long! Maximum 50 symbols.')
    .required('Required!')
});

const defaultValues: SignUpFields = {
  email: "",
  login: "",
  password: ""
}

function SignUp({ toSignIn }: { toSignIn: () => void }) {
  async function doSignUp(values: SignUpFields, setSubmitting: (isSubmitting: boolean) => void) : Promise<void> {
      await AuthService.Register(values);
      setSubmitting(false);
  }

  async function logOut(): Promise<void> {
    await TokenStore.logout(toSignIn);
  }

  return (
    <Formik
      initialValues={defaultValues}
      validationSchema={SignUpSchema}
      onSubmit={(values, { setSubmitting }) => doSignUp(values, setSubmitting)}
    >
      {({
        handleSubmit,
        isSubmitting,
        errors,
        touched
      }) => (

        <form className={classes.login} onSubmit={handleSubmit}>
          <div className={classes.login__field}>
            <i className={`${classes.login__icon} ${"fas"} ${"fa-user"}`}></i>
            <Field className={classes.login__input} name="email" type="email" placeholder="Email" />
            {errors.email && touched.email ? (
              <InputError error={errors.email} />
            ) : null}
          </div>
          <div className={classes.login__field}>
            <i className={`${classes.login__icon} ${"fas"} ${"fa-user"}`}></i>
            <Field className={classes.login__input} name="login" type="login" placeholder="User name" />
            {errors.login && touched.login ? (
              <InputError error={errors.login} />
            ) : null}
          </div>
          <div className={classes.login__field}>
            <i className={`${classes.login__icon} ${"fas"} ${"fa-user"}`}></i>
            <Field className={classes.login__input} name="password" type="password" placeholder="Password" />
            {errors.password && touched.password ? (
              <InputError error={errors.password}/>
            ) : null}
          </div>
          <button className={`${classes.button} ${classes.login__submit}`} type="submit" disabled={isSubmitting}>
            <span className={classes.button__text}>Register Now</span>
            <i className={`${classes.button__icon} ${"fas"} ${"fa-chevron-right"}`}></i>
          </button>
          <p className={classes.register__link} onClick={toSignIn}>Log In</p>
          <p className={classes.register__link} onClick={logOut}>Log Out</p>
        </form>
      )}
    </Formik>
  );
}

export default SignUp;