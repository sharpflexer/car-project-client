import Role from "./Role"

export type User = {
    id: number,
    email: string,
    login: string,
    password: string,
    role: Role
}