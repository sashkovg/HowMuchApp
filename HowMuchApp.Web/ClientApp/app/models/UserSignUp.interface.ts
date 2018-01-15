export interface UserSignUp {
    email: string; // required, must be valid email format
    password: string; // required, must be 5-10 characters
    confirmPassword: string; // required, value must be equal to password.
}