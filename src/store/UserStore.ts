import { makeAutoObservable } from "mobx";
import { User } from "../types/User";
import UserService from "../services/UserService";
import { Car } from "../types/Car";


export default class UserStore {
    users: User[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    async readUsers(): Promise<User[]> {
        return await UserService.GetUsers();
    }

    async updateUser(user: User): Promise<void> {
        if (await UserService.UpdateUser(user)) {
            this.users.forEach((value) => value.id === user.id ? user : value);
        }
        else {
            alert("Не удалось обновить пользователя.");
        }
    }

    async deleteUser(user: User) {
        if (await UserService.DeleteUser(user)) {
            const index = this.users.findIndex(u => u.id === user.id);
            this.users.splice(index, 1);
        }
        else {
            alert("Не удалось удалить пользователя.");
        }
    }
}