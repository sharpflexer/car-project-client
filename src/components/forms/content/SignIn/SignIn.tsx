import { Formik, Field } from "formik";
import SignInFields from "../../types/SignInFields";
import { Link } from "react-router-dom";
import "./SignIn.css";

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
          <div className="container">
            <div className="screen">
              <div className="screen__content">
                <form className="login" onSubmit={handleSubmit}>
                  <div className="login__field">
                    <i className="login__icon fas fa-user"></i>           
                    <Field className="login__input" name="login" type="login" placeholder="User name / Email"/>
                  </div>
                  <div className="login__field">
                    <i className="login__icon fas fa-lock"></i>
                    <Field className="login__input" name="password" type="password" placeholder="Password"/>
                  </div>
                  <button className="button login__submit" type="submit" disabled={isSubmitting}>
                    <span className="button__text">Log In Now</span>
                    <i className="button__icon fas fa-chevron-right"></i>
                  </button>
                  <Link className="register__link" to="/signup">Register</Link>
                </form>
                <div className="social-login">
                  <h3>log in via</h3>
                  <div className="social-icons">
                    <a href="#" className="social-login__icon fab fa-instagram"></a>
                    <a href="#" className="social-login__icon fab fa-facebook"></a>
                    <a href="#" className="social-login__icon fab fa-twitter"></a>
                  </div>
                </div>
              </div>
              <div className="screen__background">
                <span className="screen__background__shape screen__background__shape4"></span>
                <span className="screen__background__shape screen__background__shape3"></span>
                <span className="screen__background__shape screen__background__shape2"></span>
                <span className="screen__background__shape screen__background__shape1"></span>
              </div>
            </div>
            {/* <Link to="/signup">Зарегестрироваться</Link> */}
          </div>
      )}
    </Formik>
  );
}

export default SignIn;