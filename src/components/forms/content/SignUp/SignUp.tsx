import { Formik, Field } from "formik";
import SignUpFields from "../../types/SignUpFields";
import { Link } from "react-router-dom";

function SignUp() {

  const defaultValues: SignUpFields = {
    email: "",
    login: "",
    password: ""
  }

  function doSignUp(values: SignUpFields, setSubmitting: (isSubmitting: boolean) => void) {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  }

  return (
    <Formik
      initialValues={defaultValues}
      onSubmit={(values, { setSubmitting }) => doSignUp(values, setSubmitting)}
    >
      {({
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit}>
          <Field name="email" type="email" />
          <Field name="login" type="login" />
          <Field name="password" type="password" />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
          <Link to="/signin">Войти в аккаунт</Link>
        </form>
      )}
    </Formik>
  );
}

export default SignUp;