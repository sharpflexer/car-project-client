import { Role } from "../enums/Role";

export interface ILogin{
    access_token: string;
    role: Role;
}