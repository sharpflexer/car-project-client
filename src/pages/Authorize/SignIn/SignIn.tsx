import { Formik, Field } from "formik";
import InputError from "../InputError/InputError";
import classes from "./SignIn.module.css";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import TokenStore from "../../../store/TokenStore";
import SignInFields from "../../../types/SignInFields";
import { CredentialResponse, useGoogleLogin } from "@react-oauth/google";
import AuthService from "../../../services/AuthService";

const clientId = "512072756601-r7ibo68bvteters981sgf84cb5vvarer.apps.googleusercontent.com";

const SignInSchema = Yup.object().shape({
  login: Yup.string()
    .min(4, 'Too Short! Minimum 4 symbols.')
    .max(50, 'Too Long! Maximum 50 symbols.')
    .required('Required!'),
  password: Yup.string()
    .min(8, 'Too Short! Minimum 8 symbols.')
    .max(50, 'Too Long! Maximum 50 symbols.')
    .required('Required!')
});

const defaultValues: SignInFields = {
  login: "",
  password: ""
}

function SignIn({ toSignUp }: { toSignUp: () => void }) {
  const navigate = useNavigate();

  async function doSignIn(values: SignInFields): Promise<void> {
    await TokenStore.login(values);
    if (TokenStore.isAuth) {
      navigate("/catalog");
    }
  }

  const googleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      const response = await AuthService.LoginViaGoogle(code);
      localStorage.setItem('access_token', response.accessToken);
      TokenStore.setAuth(true, response.roleName);
      navigate("/catalog");
    },
    flow: 'auth-code',
  });

  return (
    <Formik
      initialValues={defaultValues}
      validationSchema={SignInSchema}
      onSubmit={(values) => doSignIn(values)}
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
            <Field className={classes.login__input} name="login" type="login" placeholder="User name" />
            {errors.login && touched.login ? (
              <InputError error={errors.login} />
            ) : null}
          </div>
          <div className={classes.login__field}>
            <i className={`${classes.login__icon} ${"fas"} ${"fa-user"}`}></i>
            <Field className={classes.login__input} name="password" type="password" placeholder="Password" />
            {errors.password && touched.password ? (
              <InputError error={errors.password} />
            ) : null}
          </div>
          <button className={`${classes.button} ${classes.login__submit}`} type="submit" disabled={isSubmitting}>
            <span className={classes.button__text}>Log In Now</span>
            <i className={`${classes.button__icon} ${"fas"} ${"fa-chevron-right"}`}></i>
          </button>
          <p className={classes.register__link} onClick={toSignUp}>Register</p>
          <button className={classes.google_button}
            onClick={googleLogin}
          >
            <img src = {`${process.env.PUBLIC_URL}/png/google.png`} />
          </button>
        </form>
      )}
    </Formik>
  );
}

export default SignIn;