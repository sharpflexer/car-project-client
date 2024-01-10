import { Role } from "../enums/Role";

export interface ILogin {
    accessToken: string;
    roleName: Role;
}