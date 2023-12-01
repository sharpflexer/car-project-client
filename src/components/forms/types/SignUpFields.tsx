import SignInFields from "./SignInFields";

type SignUpFields = SignInFields & {
    email: string;
}

export default SignUpFields;